/**
 *  NHS Care Card Element
 *  @reference: https://nhsuk.github.io/nhsuk-frontend/components/care-card/care-card-non-urgent.html
 *  @author Tony Blacker, NHS Leadership Academy
 *  @version 1.0 22nd July 2019
 */

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { ToggleControl, PanelBody, PanelRow, RadioControl } = wp.components;
const { withState } = wp.compose;
 
//@todo add in Card class variations
//@todo add in width variations
const TEMPLATE_OPTIONS = [
    ['core/image', {align: 'right', width: 150}],
];
 
registerBlockType("nhsblocks/care-card", {
    title: __("Care Card", "nhsblocks"),
    category: "nhsblocks",
    icon: "category",

    example: {
        attributes: {
            cardTitle: 'This is a card',
            cardText: 'This is the content of the card',
        },
        innerBlocks: [
            {
                name: 'core/image',
                attributes: {
                    align: 'right',
                    width: 150,
                },
            },
        ],
    },
    
    attributes: {
        innerBlocks_length: {
            type: "number",
            default: 0
        },
        cardTitle: {
            type: "string",
            source: "html",
            selector: ".nhsuk-card--care__heading-text"
        },
        cardText: {
            type: "array",
            source: "children",
            multiline: "p",
            selector: ".nhsuk-card__content"
        },
        withImage: {
            type: 'boolean',
            default: false,
        },
    },
 
    edit: props => {
        const blockProps = useBlockProps();
        const {
            attributes: {
                cardTitle,
                cardText,
                withImage,
            },
            clientId,
            className,
            setAttributes
        } = props;

        const onChangeCardTitle = newCardTitle => {
            setAttributes({ cardTitle: newCardTitle });
        };

        const onChangeCardText = newCardText => {
            setAttributes({ cardText: newCardText });
        };

        return [
            <InspectorControls key={`inspector-controls-${clientId}`}>
                <PanelBody>
                    <PanelRow>
                        <ToggleControl
                            label="Include an image?"
                            checked={withImage}
                            onChange={(newval) => setAttributes({ withImage: newval })}
                        />
                    </PanelRow>
                </PanelBody>
            </InspectorControls>,
            <div key={`block-container-${clientId}`} className={`${className} nhsuk-card nhsuk-card--care`}>
                <div key={`heading-container-${clientId}`} className="nhsuk-card--care__heading-container">
                    <h2 className="nhsuk-card--care__heading">
                        <span role="text">
                            <span className="nhsuk-u-visually-hidden">Non-urgent advice: </span>
                            <span key={`heading-text-${clientId}`} className="nhsuk-card--care__heading-text">
                                <RichText
                                    placeholder={__("Card Title", "nhsblocks")}
                                    value={cardTitle}
                                    onChange={onChangeCardTitle}
                                    key={`card-title-${clientId}`}
                                />
                            </span>
                        </span>
                    </h2>
                    <span className="nhsuk-card--care__arrow" aria-hidden="true"></span>
                </div>
                <div key={`content-container-${clientId}`} className="nhsuk-card__content">
                    {withImage === true && (
                        <InnerBlocks
                            key={`inner-blocks-${clientId}`} 
                            template={TEMPLATE_OPTIONS}
                        />
                    )}
                    <RichText
                        {...blockProps}
                        placeholder={__("Card Contents", "nhsblocks")}
                        onChange={onChangeCardText}
                        value={cardText}
                        key={`card-text-${clientId}`} 
                    />
                </div>
            </div>
        ];
    },
    
    save: props => {
        const blockProps = useBlockProps.save(); 
        const {
            attributes: {
                cardTitle,
                cardText,
                withImage,
            }
        } = props;

        return (
            <div className="nhsuk-card nhsuk-card--care nhsuk-card--care--type">
                <div className="nhsuk-card--care__heading-container">
                    <h2 className="nhsuk-card--care__heading">
                        <span>
                            <span className="nhsuk-u-visually-hidden">Non-urgent advice: </span>
                            <span className="nhsuk-card--care__heading-text">
                                <RichText.Content value={cardTitle} />
                            </span>
                        </span>
                    </h2>
                    <span className="nhsuk-card--care__arrow" aria-hidden="true"></span>
                </div>
                <div className="nhsuk-card__content">
                    {withImage === true && (
                        <InnerBlocks.Content />
                    )}
                    <RichText.Content
                        {...blockProps}
                        value={cardText}
                    />
                </div>
            </div>
        );
    },
    deprecated: [
        {
            attributes: {
                cardTitle: {
                    type: "string",
                    source: "html",
                    selector: ".nhsuk-card--care__heading span"
                },
                cardText: {
                    type: "array",
                    source: "children",
                    multiline: "p",
                    selector: ".nhsuk-card__content"
                },
            },
            save: ({ attributes }) => 
                <div className="nhsuk-card nhsuk-card--care">
                    <div className="nhsuk-card--care__heading-container">
                        <h2 className="nhsuk-card--care__heading">
                            <span>
                                <span className="nhsuk-u-visually-hidden">Non-urgent advice: </span>
                                <span className="nhsuk-card--care__heading-text">
                                    <RichText.Content value={attributes.cardTitle} />
                                </span>
                            </span>
                        </h2>
                        <span className="nhsuk-card--care__arrow" aria-hidden="true"></span>
                    </div>
                    <div className="nhsuk-card__content">
                        <RichText.Content
                            multiline="p"
                            value={attributes.cardText}
                        />
                    </div>
                </div>
        },
    ],
});

wp.blocks.registerBlockStyle('nhsblocks/are-card', {
    name: 'default',
    label: 'Standard Blue',
    isDefault: true
});

wp.blocks.registerBlockStyle('nhsblocks/care-card', {
    name: 'urgent',
    label: 'Urgent (Red)'
});

wp.blocks.registerBlockStyle('nhsblocks/care-card', {
    name: 'immediate',
    label: 'Immediate (Red and Black)'
});

wp.blocks.registerBlockStyle('nhsblocks/care-card', {
    name: 'warning-callout',
    label: 'Warning Callout (Yellow)'
});
