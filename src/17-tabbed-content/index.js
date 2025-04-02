// const { registerBlockType } = wp.blocks;
// const { useBlockProps, RichText } = wp.blockEditor;
// const { Button, PanelBody, TextControl } = wp.components;
// const { Fragment } = wp.element;
// const { InspectorControls } = wp.blockEditor;

// registerBlockType('nhsblocks/tabbed-content', {
//     apiVersion: 2,
//     title: 'Tabbed Content',
//     icon: 'schedule',
//     category: 'layout',
//     attributes: {
//         title: {
//             type: 'string',
//             default: 'Contents',
//         },
//         tabs: {
//             type: 'array',
//             default: [
//                 { id: 1, label: 'Past Day', content: 'Content for Past day' },
//                 { id: 2, label: 'Past Week', content: 'Content for Past week' },
//                 { id: 3, label: 'Past Month', content: 'Content for Past month' },
//                 { id: 4, label: 'Past Year', content: 'Content for Past year' },
//             ],
//         },
//     },
//     edit: ({ attributes, setAttributes }) => {
//         const { title, tabs } = attributes;

//         const updateTabLabel = (index, newLabel) => {
//             const newTabs = [...tabs];
//             newTabs[index].label = newLabel;
//             setAttributes({ tabs: newTabs });
//         };

//         const updateTabContent = (index, newContent) => {
//             const newTabs = [...tabs];
//             newTabs[index].content = newContent;
//             setAttributes({ tabs: newTabs });
//         };

//         const addTab = () => {
//             const newTab = {
//                 id: tabs.length + 1, 
//                 label: `New Tab ${tabs.length + 1}`,
//                 content: `Content for New Tab ${tabs.length + 1}`
//             };
//             setAttributes({ tabs: [...tabs, newTab] });
//         };

//         const removeTab = (index) => {
//             if (tabs.length === 1) {
//                 return; // Prevent removing the last tab
//             }
//             const newTabs = tabs.filter((_, i) => i !== index);
//             setAttributes({ tabs: newTabs });
//         };

//         return (
//             <Fragment>
//                 <InspectorControls>
//                     <PanelBody title="Tab Settings">
//                         <TextControl
//                             label="Block Title"
//                             value={title}
//                             onChange={(value) => setAttributes({ title: value })}
//                         />
//                     </PanelBody>
//                 </InspectorControls>
//                 <div {...useBlockProps({ className: "nhsuk-tabs" })}>
//                     <h2 className="nhsuk-tabs__title">{title}</h2>
//                     <ul className="nhsuk-tabs__list" role="tablist">
//                         {tabs.map((tab, index) => (
//                             <li key={`tab-${tab.id}`} className={`nhsuk-tabs__list-item ${index === 0 ? 'nhsuk-tabs__list-item--selected' : ''}`} role="presentation">
//                                 <RichText
//                                     tagName="a"
//                                     className="nhsuk-tabs__tab"
//                                     href={`#tab_${tab.id}`}
//                                     id={`tab_${tab.id}`}
//                                     role="tab"
//                                     aria-controls={`tab_${tab.id}`}
//                                     aria-selected={index === 0 ? 'true' : 'false'}
//                                     tabIndex={index === 0 ? '0' : '-1'}
//                                     value={tab.label}
//                                     onChange={(newLabel) => updateTabLabel(index, newLabel)}
//                                 />
//                                 <Button
//                                     isSmall
//                                     isDestructive
//                                     onClick={() => removeTab(index)}
//                                     style={{ marginLeft: '10px' }}
//                                 >
//                                     Remove
//                                 </Button>
//                             </li>
//                         ))}
//                     </ul>
//                     <div className="nhsuk-tabs__content">
//                         {tabs.map((tab, index) => (
//                             <div key={`panel-${tab.id}`} className={`nhsuk-tabs__panel ${index === 0 ? '' : 'nhsuk-tabs__panel--hidden'}`} id={`tab_${tab.id}`} role="tabpanel" aria-labelledby={`tab_${tab.id}`}>
//                                 <RichText
//                                     tagName="p"
//                                     value={tab.content}
//                                     onChange={(newContent) => updateTabContent(index, newContent)}
//                                 />
//                             </div>
//                         ))}
//                     </div>
//                     <Button isPrimary onClick={addTab} style={{ marginTop: '10px' }}>
//                         Add Tab
//                     </Button>
//                 </div>
//             </Fragment>
//         );
//     },
//     save: ({ attributes }) => {
//         const { title, tabs } = attributes;

//         return (
//             <div className="wp-block-nhsblocks-tabbed-content nhsuk-tabs" data-module="nhsuk-tabs">
//                 <h2 className="nhsuk-tabs__title">{title}</h2>
//                 <ul className="nhsuk-tabs__list" role="tablist">
//                     {tabs.map((tab, index) => (
//                         <li key={`tab-${tab.id}`} className={`nhsuk-tabs__list-item ${index === 0 ? 'nhsuk-tabs__list-item--selected' : ''}`} role="presentation">
//                             <a className="nhsuk-tabs__tab" href={`#tab_${tab.id}`} id={`tab_${tab.id}`} role="tab" aria-controls={`tab_${tab.id}`} aria-selected={index === 0 ? 'true' : 'false'} tabIndex={index === 0 ? '0' : '-1'}>
//                                 {tab.label}
//                             </a>
//                         </li>
//                     ))}
//                 </ul>
//                 <div className="nhsuk-tabs__content">
//                     {tabs.map((tab, index) => (
//                         <div key={`panel-${tab.id}`} className={`nhsuk-tabs__panel ${index === 0 ? '' : 'nhsuk-tabs__panel--hidden'}`} id={`tab_${tab.id}`} role="tabpanel" aria-labelledby={`tab_${tab.id}`}>
//                             <p>{tab.content}</p>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         );
//     }
// });

const { useState } = wp.element;

const { registerBlockType } = wp.blocks;
const { useBlockProps, RichText } = wp.blockEditor;
const { Button, PanelBody, TextControl } = wp.components;
const { Fragment } = wp.element;
const { InspectorControls } = wp.blockEditor;

registerBlockType('nhsblocks/tabbed-content', {
    apiVersion: 2,
    title: 'Tabbed Content',
    icon: 'schedule',
    category: 'layout',
    attributes: {
        title: {
            type: 'string',
            default: 'Contents',
        },
        tabs: {
            type: 'array',
            default: [
                { id: 1, label: 'Tab 1', content: 'Tab1 content' },
                { id: 2, label: 'Tab 2', content: 'Tab2 content' },
                { id: 3, label: 'Tab 3', content: 'Tab3 content' },
                { id: 4, label: 'Tab 4', content: 'Tab4 content' },
            ],
        },
    },
    edit: ({ attributes, setAttributes }) => {
        const { title, tabs } = attributes;
        const [errorMessage, setErrorMessage] = useState('');

        const updateTabLabel = (index, newLabel) => {
            const newTabs = [...tabs];
            newTabs[index].label = newLabel;
            setAttributes({ tabs: newTabs });
        };

        const updateTabContent = (index, newContent) => {
            const newTabs = [...tabs];
            newTabs[index].content = newContent;
            setAttributes({ tabs: newTabs });
        };

        const addTab = () => {
            if (tabs.length >= 6) {
                setErrorMessage('You can only add up to 6 tabs.');
                return;
            }
            const newTab = {
                id: tabs.length + 1, 
                label: `New Tab ${tabs.length + 1}`,
                content: `Content for New Tab ${tabs.length + 1}`
            };
            setAttributes({ tabs: [...tabs, newTab] });
            setErrorMessage(''); // Reset error message after successful tab addition
        };

        const removeTab = (index) => {
            if (tabs.length === 1) {
                return; // Prevent removing the last tab
            }
            const newTabs = tabs.filter((_, i) => i !== index);
            setAttributes({ tabs: newTabs });
        };

        return (
            <Fragment>
                <InspectorControls>
                    <PanelBody title="Tab Settings">
                        <TextControl
                            label="Block Title"
                            value={title}
                            onChange={(value) => setAttributes({ title: value })}
                        />
                        {tabs.map((tab, index) => (
                            <PanelBody title={`Tab ${tab.id} Settings`} initialOpen={false} key={`tab-settings-${tab.id}`}>
                                <TextControl
                                    label={`Tab ${tab.id} Title`}
                                    value={tab.label}
                                    onChange={(newLabel) => updateTabLabel(index, newLabel)}
                                />
                                <RichText
                                    tagName="div"
                                    label={`Tab ${tab.id} Content`}
                                    value={tab.content}
                                    onChange={(newContent) => updateTabContent(index, newContent)}
                                />
                            </PanelBody>
                        ))}
                    </PanelBody>
                </InspectorControls>
                <div {...useBlockProps({ className: "nhsuk-tabs" })}>
                    <h2 className="nhsuk-tabs__title">{title}</h2>
                    <ul className="nhsuk-tabs__list" role="tablist">
                        {tabs.map((tab, index) => (
                            <li key={`tab-${tab.id}`} className={`nhsuk-tabs__list-item ${index === 0 ? 'nhsuk-tabs__list-item--selected' : ''}`} role="presentation">
                                <RichText
                                    tagName="a"
                                    className="nhsuk-tabs__tab"
                                    href={`#tab_${tab.id}`}
                                    id={`tab_${tab.id}`}
                                    role="tab"
                                    aria-controls={`tab_${tab.id}`}
                                    aria-selected={index === 0 ? 'true' : 'false'}
                                    tabIndex={index === 0 ? '0' : '-1'}
                                    value={tab.label}
                                    onChange={(newLabel) => updateTabLabel(index, newLabel)}
                                />
                                <Button
                                    isSmall
                                    isDestructive
                                    onClick={() => removeTab(index)}
                                    style={{ marginLeft: '10px' }}
                                >
                                    Remove
                                </Button>
                            </li>
                        ))}
                    </ul>
                    <div className="nhsuk-tabs__content">
                        {tabs.map((tab, index) => (
                            <div key={`panel-${tab.id}`} className={`nhsuk-tabs__panel ${index === 0 ? '' : 'nhsuk-tabs__panel--hidden'}`} id={`tab_${tab.id}`} role="tabpanel" aria-labelledby={`tab_${tab.id}`}>
                                <RichText
                                    tagName="p"
                                    value={tab.content}
                                    onChange={(newContent) => updateTabContent(index, newContent)}
                                />
                            </div>
                        ))}
                    </div>
                    <Button isPrimary onClick={addTab} style={{ marginTop: '10px' }}>
                        Add Tab
                    </Button>
                    {errorMessage && (
                        <div style={{ color: 'red', marginTop: '10px' }}>
                            {errorMessage}
                        </div>
                    )}
                </div>
            </Fragment>
        );
    },
    save: ({ attributes }) => {
        const { title, tabs } = attributes;

        return (
            <div className="wp-block-nhsblocks-tabbed-content nhsuk-tabs" data-module="nhsuk-tabs">
                <h2 className="nhsuk-tabs__title">{title}</h2>
                <ul className="nhsuk-tabs__list" role="tablist">
                    {tabs.map((tab, index) => (
                        <li key={`tab-${tab.id}`} className={`nhsuk-tabs__list-item ${index === 0 ? 'nhsuk-tabs__list-item--selected' : ''}`} role="presentation">
                            <a className="nhsuk-tabs__tab" href={`#tab_${tab.id}`} id={`tab_${tab.id}`} role="tab" aria-controls={`tab_${tab.id}`} aria-selected={index === 0 ? 'true' : 'false'} tabIndex={index === 0 ? '0' : '-1'}>
                                {tab.label}
                            </a>
                        </li>
                    ))}
                </ul>
                <div className="nhsuk-tabs__content">
                    {tabs.map((tab, index) => (
                        <div key={`panel-${tab.id}`} className={`nhsuk-tabs__panel ${index === 0 ? '' : 'nhsuk-tabs__panel--hidden'}`} id={`tab_${tab.id}`} role="tabpanel" aria-labelledby={`tab_${tab.id}`}>
                            <p>{tab.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
});
