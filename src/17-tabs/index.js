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

const makeDefaultLabel = (index) => sprintf(__('Tab %d', 'nhsblocks'), index + 1);

/**
 * Collision-proof rebuild of tab IDs from labels.
 * Format:
 *   <slug>-<prefix>            (first occurrence)
 *   <slug>-2-<prefix>          (duplicate label)
 *   <slug>-3-<prefix>          (third duplicate)
 */
const rebuildTabsWithLabelIds = (tabs = [], prefix, fallbackLabelFn) => {
    const counts = new Map();

    return tabs.map((t, i) => {
        const label = (t?.label || '').trim() || fallbackLabelFn(i);
        const base0 = slugify(label) || 'tab';

        const nextCount = (counts.get(base0) || 0) + 1;
        counts.set(base0, nextCount);

        const base = nextCount === 1 ? base0 : `${base0}-${nextCount}`;
        return { ...t, label, id: `${base}-${prefix}` };
    });
};

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

        // Defaults must exist for preview. IDs will be normalised on mount.
        tabs: {
            type: 'array',
            default: new Array(DEFAULT_TAB_COUNT).fill(null).map((_, i) => ({
                id: `tab-${i + 1}`,
                label: makeDefaultLabel(i),
            })),
        },

        activeTab: { type: 'number', default: 0 },

        // Stable per-block suffix, e.g. "001"
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
         * Ensure a stable tabsPrefix and normalise IDs once on mount.
         */
        useEffect(() => {
            let prefix = tabsPrefix;

            if (!prefix) {
                prefix = make3DigitPrefix();
            }

            // Avoid prefix clash with other nhstabs blocks in same editor session (still 3 digits)
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
                    prefix = pad3((Number(prefix) + 1) % 1000);
                    guard++;
                }
            } catch (e) {
                // ignore
            }

            if (prefix !== tabsPrefix) {
                setAttributes({ tabsPrefix: prefix });
            }

            const legacy = (id) =>
                typeof id === 'string' &&
                (id === 'past-day' ||
                    id === 'past-week' ||
                    id === 'past-month' ||
                    id === 'past-year' ||
                    id.startsWith('past-'));

            const needsNormalise =
                !Array.isArray(tabs) ||
                tabs.length === 0 ||
                tabs.some((t) => !t?.id) ||
                tabs.some((t) => legacy(t.id)) ||
                // also normalise "tab-1" style ids (not ending with prefix)
                tabs.some((t) => typeof t?.id === 'string' && !t.id.endsWith(`-${prefix}`));

            if (needsNormalise) {
                const baseTabs =
                    Array.isArray(tabs) && tabs.length >= MIN_TABS
                        ? tabs
                        : new Array(Math.max(MIN_TABS, DEFAULT_TAB_COUNT)).fill(null).map((_, i) => ({
                              id: '',
                              label: makeDefaultLabel(i),
                          }));

                const normalised = rebuildTabsWithLabelIds(baseTabs, prefix, makeDefaultLabel);

                setAttributes({
                    tabs: normalised,
                    activeTab: Math.max(0, Math.min(activeTab || 0, normalised.length - 1)),
                });

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

        /**
         * While typing: update ONLY label (do NOT change ids) -> prevents focus loss.
         */
        const updateTabLabelLive = (index, value) => {
            const updated = (tabs || []).map((tab, i) =>
                i === index ? { ...tab, label: value } : tab
            );
            setAttributes({ tabs: updated });
        };

        /**
         * After user finishes editing (onBlur): rebuild collision-proof IDs and sync panel anchors.
         */
        const commitLabelBasedIds = () => {
            const prefix = tabsPrefix || make3DigitPrefix();

            if (!tabsPrefix) {
                setAttributes({ tabsPrefix: prefix });
            }

            const rebuilt = rebuildTabsWithLabelIds(tabs || [], prefix, makeDefaultLabel);

            setAttributes({ tabs: rebuilt });

            const innerBlocks = selectBE.getBlocks(clientId) || [];
            innerBlocks.forEach((block, idx) => {
                if (block.name !== 'core/group') return;
                const newId = rebuilt[idx]?.id;
                if (!newId) return;
                dispatchBE.updateBlockAttributes(block.clientId, { anchor: newId });
            });

            setTimeout(keepTabsSelected, 0);
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

            const prefix = tabsPrefix || make3DigitPrefix();
            if (!tabsPrefix) setAttributes({ tabsPrefix: prefix });

            const newIndex = (tabs || []).length;
            const newLabel = makeDefaultLabel(newIndex);

            const nextTabs = [...(tabs || []), { id: '', label: newLabel }];
            const rebuilt = rebuildTabsWithLabelIds(nextTabs, prefix, makeDefaultLabel);

            setAttributes({ tabs: rebuilt, activeTab: newIndex });

            const panelBlock = createPanelBlock(rebuilt[newIndex].id);
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
            if (!tabsPrefix) setAttributes({ tabsPrefix: prefix });

            let currentTabs = [...(tabs || [])];

            // Add until count matches
            while (currentTabs.length < desired) {
                const newIndex = currentTabs.length;
                const newLabel = makeDefaultLabel(newIndex);

                currentTabs.push({ id: '', label: newLabel });
                currentTabs = rebuildTabsWithLabelIds(currentTabs, prefix, makeDefaultLabel);

                insertPanelBlock(createPanelBlock(currentTabs[newIndex].id));
            }

            // Remove from end until count matches
            while (currentTabs.length > desired) {
                const removeIndex = currentTabs.length - 1;
                currentTabs.pop();

                const innerBlocks = selectBE.getBlocks(clientId) || [];
                const toRemove = innerBlocks[removeIndex];
                if (toRemove) {
                    dispatchBE.removeBlocks(toRemove.clientId);
                }
            }

            currentTabs = rebuildTabsWithLabelIds(currentTabs, prefix, makeDefaultLabel);

            const nextActive = Math.max(0, Math.min(activeTab, currentTabs.length - 1));
            setAttributes({ tabs: currentTabs, activeTab: nextActive });

            // Ensure anchors match after bulk changes
            const innerBlocks = selectBE.getBlocks(clientId) || [];
            innerBlocks.forEach((block, idx) => {
                if (block.name !== 'core/group') return;
                const newId = currentTabs[idx]?.id;
                if (!newId) return;
                dispatchBE.updateBlockAttributes(block.clientId, { anchor: newId });
            });

            syncPanelVisibility(nextActive);
            setTimeout(keepTabsSelected, 0);
        };

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
                            value={(tabs || []).length}
                            onChange={(val) => setTabCount(val)}
                            min={MIN_TABS}
                            max={MAX_TABS}
                        />

                        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                            <Button
                                variant="secondary"
                                onClick={addTab}
                                disabled={(tabs || []).length >= MAX_TABS}
                            >
                                {__('Add tab', 'nhsblocks')}
                            </Button>

                            <Button
                                variant="secondary"
                                onClick={removeCurrentTab}
                                disabled={(tabs || []).length <= MIN_TABS}
                            >
                                {__('Remove current tab', 'nhsblocks')}
                            </Button>
                        </div>

                        {(tabs || []).map((tab, index) => (
                            <TextControl
                                __nextHasNoMarginBottom
                                key={`tab-label-${index}`} // Stable key prevents focus loss
                                label={sprintf(__('Tab %d label', 'nhsblocks'), index + 1)}
                                value={tab.label}
                                onChange={(value) => updateTabLabelLive(index, value)}
                                onBlur={commitLabelBasedIds} // Rebuild IDs once user finishes
                            />
                        ))}
                    </PanelBody>
                </InspectorControls>

                <div {...blockProps}>
                    <h2 className="nhsuk-tabs__title">{title}</h2>

                    <ul className="nhsuk-tabs__list">
                        {(tabs || []).map((tab, index) => {
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
