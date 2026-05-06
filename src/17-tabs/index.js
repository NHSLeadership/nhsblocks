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

// You can tweak these limits safely
const MIN_TABS = 2;
const MAX_TABS = 6;

const DEFAULT_TABS = [
    { id: 'past-day', label: 'Past day' },
    { id: 'past-week', label: 'Past week' },
    { id: 'past-month', label: 'Past month' },
    { id: 'past-year', label: 'Past year' },
];

// Small helper: unique-ish, readable id
const slugify = (text) =>
    text.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
const makeTabId = (label, prefix) => `${slugify(label)}-${prefix}`;
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
        tabs: { type: 'array', default: DEFAULT_TABS },
        activeTab: { type: 'number', default: 0 }, // editor state
    },

    example: {
        attributes: {
            title: 'Contents',
            tabs: DEFAULT_TABS,
            activeTab: 0,
        },
    },

    edit: (props) => {
        const { attributes, setAttributes, clientId } = props;
        const { title, tabs, activeTab } = attributes;

        const selectBE = wp.data.select('core/block-editor');
        const dispatchBE = wp.data.dispatch('core/block-editor');

        // Sidebar UI store (so we can force block settings sidebar back to our Tabs block)
        const dispatchUI = wp.data.dispatch('core/edit-post');

        const blockProps = useBlockProps({
            className: 'nhsuk-tabs is-editor-preview',
            'data-module': 'nhsuk-tabs',
        });

        /**
         * Keep the Tabs block selected so the Inspector doesn't switch to the inner Group block.
         * This is the key fix for the "Group settings" issue after add/remove/tab count changes.
         */
        const keepTabsSelected = () => {
            // Select parent block.
            dispatchBE.selectBlock(clientId);

            // Ensure the "Block" settings panel is shown (not Document).
            if (dispatchUI && typeof dispatchUI.openGeneralSidebar === 'function') {
                dispatchUI.openGeneralSidebar('edit-post/block');
            }
        };

        /**
         * Ensure we always have at least MIN_TABS (in case old content / bad data)
         */
        useEffect(() => {

            const prefix = Date.now().toString().slice(-3);

            const slugify = (text) =>
                text.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

            const legacyBaseIds = ['past-day', 'past-week', 'past-month', 'past-year'];

            const isLegacy = (id) => {
                if (!id) return false;

                // Match:
                // past-week
                // past-week-bbbe
                // past-week-1234
                return legacyBaseIds.some(base => id === base || id.startsWith(`${base}-`));
            };

            // Initialise.
            if (!tabs || tabs.length < MIN_TABS) {

                const safeTabs = new Array(MIN_TABS).fill(null).map((_, i) => {
                    const label = makeDefaultLabel(i);
                    return {
                        id: `${slugify(label)}-${prefix}`,
                        label,
                    };
                });

                setAttributes({ tabs: safeTabs, activeTab: 0 });

                setTimeout(keepTabsSelected, 0);
                return;
            }

            // Fix ALL legacy formats (this is the key change)
            const needsFix = tabs.some(tab => isLegacy(tab.id));

            if (needsFix) {

                const updated = tabs.map((tab, i) => {
                    if (isLegacy(tab.id)) {

                        // extract base (past-week from past-week-bbbe)
                        const base = tab.id.split('-').slice(0, 2).join('-');

                        return {
                            ...tab,
                            id: `${base}-${prefix}`
                        };
                    }
                    return tab;
                });

                setAttributes({ tabs: updated });

                const innerBlocks = selectBE.getBlocks(clientId) || [];
                innerBlocks.forEach((block, idx) => {
                    if (block.name !== 'core/group') return;

                    const newId = updated[idx]?.id;
                    if (newId) {
                        dispatchBE.updateBlockAttributes(block.clientId, {
                            anchor: newId,
                        });
                    }
                });
            }

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

                dispatchBE.updateBlockAttributes(block.clientId, {
                    className: nextClasses,
                });
            });
        };

        /**
         * Any time activeTab or tab count changes, re-sync panel visibility.
         */
        useEffect(() => {
            syncPanelVisibility(activeTab);
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [activeTab, tabs?.length]);

        const setActive = (index) => {
            setAttributes({ activeTab: index });
            syncPanelVisibility(index);
            keepTabsSelected();
        };

        const updateTabLabel = (index, value) => {
            const updated = tabs.map((tab, i) => (i === index ? { ...tab, label: value } : tab));
            setAttributes({ tabs: updated });
        };

        /**
         * Create a new panel Group block (core/group) with the correct anchor + classes.
         */
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

        /**
         * Insert blocks but try NOT to move selection (WP versions vary).
         * We always re-select Tabs afterwards anyway.
         */
        const insertPanelBlock = (block) => {
            try {
                // Some WP versions support 4th arg "updateSelection" (false)
                dispatchBE.insertBlocks(block, undefined, clientId, false);
            } catch (e) {
                // Fallback signature
                dispatchBE.insertBlocks(block, undefined, clientId);
            }
        };

        /**
         * Add a tab + corresponding panel at the end.
         */
        const addTab = () => {
            if (tabs.length >= MAX_TABS) return;

            const newIndex = tabs.length;
            const newLabel = makeDefaultLabel(newIndex);

            const prefix = Date.now().toString().slice(-3);

            const newTab = {
                id: makeTabId(newLabel, prefix),
                label: newLabel,
            };

            setAttributes({ tabs: [...tabs, newTab], activeTab: newIndex });

            const panelBlock = createPanelBlock(newTab.id);
            insertPanelBlock(panelBlock);

            syncPanelVisibility(newIndex);

            setTimeout(keepTabsSelected, 0);
        };

        /**
         * Remove current tab (activeTab) + corresponding panel.
         */
        const removeCurrentTab = () => {
            if (tabs.length <= MIN_TABS) return;

            const removeIndex = activeTab;
            const nextTabs = tabs.filter((_, idx) => idx !== removeIndex);

            // Remove the matching inner group block at same index
            const innerBlocks = selectBE.getBlocks(clientId) || [];
            const toRemove = innerBlocks[removeIndex];
            if (toRemove) {
                dispatchBE.removeBlocks(toRemove.clientId);
            }

            // Clamp active tab to new length
            const nextActive = Math.max(0, Math.min(removeIndex, nextTabs.length - 1));
            setAttributes({ tabs: nextTabs, activeTab: nextActive });

            syncPanelVisibility(nextActive);

            // Keep Tabs selected after removal
            setTimeout(keepTabsSelected, 0);
        };

        /**
         * Adjust tab count to a specific number (RangeControl).
         * Adds/removes from the end to reach target.
         */
        const setTabCount = (target) => {
            // RangeControl can briefly send undefined/null
            if (typeof target !== 'number') return;

            const desired = Math.max(MIN_TABS, Math.min(MAX_TABS, target));

            let currentTabs = [...tabs];

            // Add until count matches
            while (currentTabs.length < desired) {
                const newIndex = currentTabs.length;
                const newLabel = makeDefaultLabel(newIndex);
                const prefix = Date.now().toString().slice(-3);

                const newTab = {
                    id: makeTabId(newLabel, prefix),
                    label: newLabel,
                };
                currentTabs.push(newTab);

                const panelBlock = createPanelBlock(newTab.id);
                insertPanelBlock(panelBlock);
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

            const nextActive = Math.max(0, Math.min(activeTab, currentTabs.length - 1));
            setAttributes({ tabs: currentTabs, activeTab: nextActive });
            syncPanelVisibility(nextActive);

            // Keep Tabs selected after bulk operations
            setTimeout(keepTabsSelected, 0);
        };

        /**
         * Template applies only on first insert.
         * After that, we manage add/remove via insertBlocks/removeBlocks.
         */
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

                    <InnerBlocks template={template} templateLock={false} />
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
                            key={tab.id}
                            className={
                                index === 0
                                    ? 'nhsuk-tabs__list-item nhsuk-tabs__list-item--selected'
                                    : 'nhsuk-tabs__list-item'
                            }
                        >
                            <a className="nhsuk-tabs__tab" href={`#${tab.id}`}>
                                {tab.label}
                            </a>
                        </li>
                    ))}
                </ul>

                <InnerBlocks.Content />
            </div>
        );
    },
});
