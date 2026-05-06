/**
 * NHS Tabs
 *
 * @reference https://service-manual.nhs.uk/design-system/components/tabs
 * @author Mahesh Murali Poovampilly, NHS Leadership Academy
 * @version 1.0
 */

const { __, sprintf } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { Fragment, useEffect } = wp.element;
const { InspectorControls, InnerBlocks, useBlockProps } = wp.blockEditor;
const { PanelBody, TextControl, Button, RangeControl } = wp.components;

// Limits
const MIN_TABS = 2;
const MAX_TABS = 6;
const DEFAULT_TAB_COUNT = 4;

// Helpers
const slugify = (text = '') =>
    String(text)
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');

const pad3 = (n) => String(n).padStart(3, '0');

/**
 * Returns a 3-digit numeric prefix derived from Date.now().
 * Guaranteed 3 digits, e.g. "042", "917".
 */
const make3DigitPrefix = () => pad3(Number(String(Date.now()).slice(-3)));

/**
 * Make tab id using label + 3-digit prefix (no "past-*").
 * Example: "tab-1-917" or "eligibility-842".
 */
const makeTabId = (label, prefix3) => `${slugify(label)}-${prefix3}`;

const makeDefaultLabel = (index) => sprintf(__('Tab %d', 'nhsblocks'), index + 1);

registerBlockType('nhsblocks/nhstabs', {
    apiVersion: 2,
    title: __('Tabs', 'nhsblocks'),
    category: 'nhsblocks',
    icon: 'editor-table',

    styles: [
        { name: 'standard', label: __('Standard', 'nhsblocks'), isDefault: true },
        { name: 'blue', label: __('Blue accent', 'nhsblocks') },
        { name: 'reverse', label: __('Reverse (dark)', 'nhsblocks') },
    ],

    supports: {
        align: true,
    },

    attributes: {
        title: { type: 'string', default: 'Contents' },

        tabs: {
            type: 'array',
            default: new Array(DEFAULT_TAB_COUNT).fill(null).map((_, i) => ({
                id: `tab-${i + 1}`,
                label: makeDefaultLabel(i),
            })),
        },

        activeTab: { type: 'number', default: 0 },

        tabsPrefix: { type: 'string', default: '' },
    },

    example: {
        attributes: {
            title: 'Contents',
            tabs: [
                { id: 'tab-1-001', label: 'Tab 1' },
                { id: 'tab-2-001', label: 'Tab 2' },
                { id: 'tab-3-001', label: 'Tab 3' },
                { id: 'tab-4-001', label: 'Tab 4' },
            ],
            activeTab: 0,
            tabsPrefix: '001',
        },
    },

    edit: (props) => {
        const { attributes, setAttributes, clientId } = props;
        const { title, tabs, activeTab, tabsPrefix } = attributes;

        const selectBE = wp.data.select('core/block-editor');
        const dispatchBE = wp.data.dispatch('core/block-editor');
        const dispatchUI = wp.data.dispatch('core/edit-post');

        const blockProps = useBlockProps({
            className: 'nhsuk-tabs is-editor-preview',
            'data-module': 'nhsuk-tabs',
        });

        const keepTabsSelected = () => {
            dispatchBE.selectBlock(clientId);

            if (dispatchUI && typeof dispatchUI.openGeneralSidebar === 'function') {
                dispatchUI.openGeneralSidebar('edit-post/block');
            }
        };

        /**
         * One-time init:
         * - Ensure we have a stable 3-digit prefix (tabsPrefix)
         * - Ensure tabs exist and each has an id
         * - Ensure inner Group anchors match tab ids
         * - Migrate any legacy ids starting with "past-" to new id format
         */
        useEffect(() => {
            // 1) Ensure prefix exists + reduce collision risk if duplicated in the same editor session
            let prefix = tabsPrefix;

            if (!prefix) {
                prefix = make3DigitPrefix();
            }

            // If another nhstabs block already uses this same prefix, bump it (still 3 digits).
            try {
                const allBlocks = wp.data.select('core/block-editor').getBlocks() || [];
                const used = new Set(
                    allBlocks
                        .filter((b) => b.name === 'nhsblocks/nhstabs' && b.clientId !== clientId)
                        .map((b) => b.attributes?.tabsPrefix)
                        .filter(Boolean)
                );

                let guard = 0;
                while (used.has(prefix) && guard < 50) {
                    // bump within 000-999 and keep 3 digits
                    prefix = pad3((Number(prefix) + 1) % 1000);
                    guard++;
                }
            } catch (e) {
                // ignore if editor store not ready
            }

            if (prefix !== tabsPrefix) {
                setAttributes({ tabsPrefix: prefix });
            }

            // 2) Ensure tabs exist + have ids
            const hasTabs = Array.isArray(tabs) && tabs.length > 0;

            // If tabs empty, create defaults
            if (!hasTabs) {
                const created = new Array(DEFAULT_TAB_COUNT).fill(null).map((_, i) => {
                    const label = makeDefaultLabel(i);
                    return { id: makeTabId(label, prefix), label };
                });

                setAttributes({ tabs: created, activeTab: 0 });
                setTimeout(keepTabsSelected, 0);
                return;
            }

            // If tabs exist but some missing id, or legacy past-* ids, normalise them
            const legacy = (id) => typeof id === 'string' && (id === 'past-day' || id === 'past-week' || id === 'past-month' || id === 'past-year' || id.startsWith('past-'));
            const needsNormalise =
                tabs.some((t) => !t?.id) || tabs.some((t) => legacy(t.id));

            if (needsNormalise) {
                const normalised = tabs.map((t, i) => {
                    const label = t?.label || makeDefaultLabel(i);

                    // If missing id or legacy past-*, replace with new format
                    if (!t?.id || legacy(t.id)) {
                        return { ...t, label, id: makeTabId(label, prefix) };
                    }

                    return { ...t, label };
                });

                setAttributes({ tabs: normalised });

                // Update inner group anchors to match (index mapping)
                const innerBlocks = selectBE.getBlocks(clientId) || [];
                innerBlocks.forEach((block, idx) => {
                    if (block.name !== 'core/group') return;

                    const newId = normalised[idx]?.id;
                    if (!newId) return;

                    dispatchBE.updateBlockAttributes(block.clientId, { anchor: newId });
                });

                setTimeout(keepTabsSelected, 0);
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        /**
         * Toggle nhsuk-tabs__panel--hidden on inner Group blocks so editor shows only active panel.
         */
        const syncPanelVisibility = (newActiveIndex) => {
            const innerBlocks = selectBE.getBlocks(clientId) || [];

            innerBlocks.forEach((block, idx) => {
                if (block.name !== 'core/group') return;

                const existing = (block.attributes && block.attributes.className) || '';
                const parts = existing.split(/\s+/).filter(Boolean);

                const kept = parts.filter(
                    (c) => c !== 'nhsuk-tabs__panel' && c !== 'nhsuk-tabs__panel--hidden'
                );

                const nextClasses = [
                    'nhsuk-tabs__panel',
                    ...(idx === newActiveIndex ? [] : ['nhsuk-tabs__panel--hidden']),
                    ...kept,
                ].join(' ');

                dispatchBE.updateBlockAttributes(block.clientId, { className: nextClasses });
            });
        };

        useEffect(() => {
            if (!Array.isArray(tabs) || tabs.length === 0) return;
            syncPanelVisibility(activeTab);
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [activeTab, tabs?.length]);

        const setActive = (index) => {
            setAttributes({ activeTab: index });
            syncPanelVisibility(index);
            keepTabsSelected();
        };

        const updateTabLabel = (index, value) => {
            const updated = (tabs || []).map((tab, i) =>
                i === index ? { ...tab, label: value } : tab
            );
            setAttributes({ tabs: updated });
        };

        const createPanelBlock = (tabId) => {
            return wp.blocks.createBlock(
                'core/group',
                {
                    anchor: tabId,
                    className: 'nhsuk-tabs__panel nhsuk-tabs__panel--hidden',
                },
                [
                    wp.blocks.createBlock('core/paragraph', {
                        content: '',
                    }),
                ]
            );
        };

        const insertPanelBlock = (block) => {
            try {
                dispatchBE.insertBlocks(block, undefined, clientId, false);
            } catch (e) {
                dispatchBE.insertBlocks(block, undefined, clientId);
            }
        };

        const addTab = () => {
            if ((tabs || []).length >= MAX_TABS) return;

            const newIndex = (tabs || []).length;
            const newLabel = makeDefaultLabel(newIndex);

            // Use stable block prefix if available, otherwise generate
            const prefix = tabsPrefix || make3DigitPrefix();

            const newTab = {
                id: makeTabId(newLabel, prefix),
                label: newLabel,
            };

            setAttributes({ tabs: [...(tabs || []), newTab], activeTab: newIndex });

            const panelBlock = createPanelBlock(newTab.id);
            insertPanelBlock(panelBlock);

            syncPanelVisibility(newIndex);
            setTimeout(keepTabsSelected, 0);
        };

        const removeCurrentTab = () => {
            if ((tabs || []).length <= MIN_TABS) return;

            const removeIndex = activeTab;
            const nextTabs = (tabs || []).filter((_, idx) => idx !== removeIndex);

            const innerBlocks = selectBE.getBlocks(clientId) || [];
            const toRemove = innerBlocks[removeIndex];
            if (toRemove) {
                dispatchBE.removeBlocks(toRemove.clientId);
            }

            const nextActive = Math.max(0, Math.min(removeIndex, nextTabs.length - 1));
            setAttributes({ tabs: nextTabs, activeTab: nextActive });

            syncPanelVisibility(nextActive);
            setTimeout(keepTabsSelected, 0);
        };

        const setTabCount = (target) => {
            if (typeof target !== 'number') return;

            const desired = Math.max(MIN_TABS, Math.min(MAX_TABS, target));
            const prefix = tabsPrefix || make3DigitPrefix();

            let currentTabs = [...(tabs || [])];

            while (currentTabs.length < desired) {
                const newIndex = currentTabs.length;
                const newLabel = makeDefaultLabel(newIndex);

                const newTab = {
                    id: makeTabId(newLabel, prefix),
                    label: newLabel,
                };

                currentTabs.push(newTab);
                insertPanelBlock(createPanelBlock(newTab.id));
            }

            while (currentTabs.length > desired) {
                const removeIndex = currentTabs.length - 1;
                currentTabs.pop();

                const innerBlocks = selectBE.getBlocks(clientId) || [];
                const toRemove = innerBlocks[removeIndex];
                if (toRemove) {
                    dispatchBE.removeBlocks(toRemove.clientId);
                }
            }

            const nextActive = Math.max(0, Math.min(activeTab, currentTabs.length - 1));
            setAttributes({ tabs: currentTabs, activeTab: nextActive });

            syncPanelVisibility(nextActive);
            setTimeout(keepTabsSelected, 0);
        };

        // If tabs not ready yet, render a minimal placeholder (prevents key warnings & UI flicker)
        if (!Array.isArray(tabs) || tabs.length === 0 || tabs.some((t) => !t?.id)) {
            return (
                <div {...blockProps}>
                    <h2 className="nhsuk-tabs__title">{title}</h2>
                    <p>{__('Initialising tabs…', 'nhsblocks')}</p>
                </div>
            );
        }

        const template = (tabs || []).map((tab, index) => [
            'core/group',
            {
                anchor: tab.id,
                className:
                    index === 0
                        ? 'nhsuk-tabs__panel'
                        : 'nhsuk-tabs__panel nhsuk-tabs__panel--hidden',
            },
            [['core/paragraph', { placeholder: __('Add tab content…', 'nhsblocks') }]],
        ]);

        return (
            <Fragment>
                <InspectorControls>
                    <PanelBody title={__('Tabs settings', 'nhsblocks')} initialOpen>
                        <TextControl
                            __nextHasNoMarginBottom
                            label={__('Tabs title', 'nhsblocks')}
                            value={title}
                            onChange={(value) => setAttributes({ title: value })}
                        />

                        <RangeControl
                            __nextHasNoMarginBottom
                            label={__('Number of tabs', 'nhsblocks')}
                            value={tabs.length}
                            onChange={(val) => setTabCount(val)}
                            min={MIN_TABS}
                            max={MAX_TABS}
                        />

                        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                            <Button
                                variant="secondary"
                                onClick={addTab}
                                disabled={tabs.length >= MAX_TABS}
                            >
                                {__('Add tab', 'nhsblocks')}
                            </Button>

                            <Button
                                variant="secondary"
                                onClick={removeCurrentTab}
                                disabled={tabs.length <= MIN_TABS}
                            >
                                {__('Remove current tab', 'nhsblocks')}
                            </Button>
                        </div>

                        {tabs.map((tab, index) => (
                            <TextControl
                                __nextHasNoMarginBottom
                                key={tab.id}
                                label={sprintf(__('Tab %d label', 'nhsblocks'), index + 1)}
                                value={tab.label}
                                onChange={(value) => updateTabLabel(index, value)}
                            />
                        ))}
                    </PanelBody>
                </InspectorControls>

                <div {...blockProps}>
                    <h2 className="nhsuk-tabs__title">{title}</h2>

                    <ul className="nhsuk-tabs__list">
                        {tabs.map((tab, index) => {
                            const isSelected = index === activeTab;

                            return (
                                <li
                                    key={tab.id}
                                    className={
                                        isSelected
                                            ? 'nhsuk-tabs__list-item nhsuk-tabs__list-item--selected'
                                            : 'nhsuk-tabs__list-item'
                                    }
                                >
                                    <a
                                        className="nhsuk-tabs__tab"
                                        href={`#${tab.id}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setActive(index);
                                        }}
                                    >
                                        {tab.label}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>

                    <InnerBlocks
                        template={template}
                        allowedBlocks={['core/group']}
                        templateLock={false}
                    />
                </div>
            </Fragment>
        );
    },

    save: ({ attributes }) => {
        const { title, tabs } = attributes;

        const blockProps = useBlockProps.save({
            className: 'nhsuk-tabs',
            'data-module': 'nhsuk-tabs',
        });

        return (
            <div {...blockProps}>
                <h2 className="nhsuk-tabs__title">{title}</h2>

                <ul className="nhsuk-tabs__list">
                    {(tabs || []).map((tab, index) => (
                        <li
                            key={tab?.id || `tab-${index}`}
                            className={
                                index === 0
                                    ? 'nhsuk-tabs__list-item nhsuk-tabs__list-item--selected'
                                    : 'nhsuk-tabs__list-item'
                            }
                        >
                            <a
                                className="nhsuk-tabs__tab"
                                href={tab?.id ? `#${tab.id}` : undefined}
                            >
                                {tab?.label || ''}
                            </a>

                        </li>
                    ))}
                </ul>

                <InnerBlocks.Content />
            </div>
        );
    },
});
