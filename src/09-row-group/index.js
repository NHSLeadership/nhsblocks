/**
 *  NHS Panel Group Element
 *  @reference: https://nhsuk.github.io/nhsuk-frontend/components/panel/index.html
 *  @author Tony Blacker, NHS Leadership Academy
 *  @version 1.0 22nd July 2019
 */

const { useState, setState } = wp.element;
const { __ } = wp.i18n;
const { registerBlockType, createBlock } = wp.blocks;
const { InnerBlocks, BlockControls, __experimentalBlockVariationPicker } = wp.blockEditor;
const { useDispatch, useSelect } = wp.data;
import { get, map, times } from 'lodash';

//@todo add in Panel class variations
//@todo add in width variations

import * as Templates from './templates.js';



registerBlockType("nhsblocks/rowgroup", {
    title: __("Grouped Items", "nhsblocks"),
    category: "nhsblocks",
    icon: 'layout',
    attributes: {
        template: {
            type: "array"
        }
    },

    edit: props => {
        const { clientId, name } = props;
        const {
            attributes: {
                template
            },
            setAttributes,
        } = props;
        const { replaceInnerBlocks } = useDispatch( 'core/block-editor' );

        const {
            blockType,
            defaultVariation,
            hasInnerBlocks,
            variations,
        } = useSelect(
            ( select ) => {
                const {
                    __experimentalGetBlockVariations,
                    getBlockType,
                    __experimentalGetDefaultBlockVariation,
                } = select( 'core/blocks' );

                return {
                    blockType: getBlockType( name ),
                    defaultVariation: __experimentalGetDefaultBlockVariation(
                        name,
                        'block'
                    ),
                    hasInnerBlocks:
                        select( 'core/block-editor' ).getBlocks( clientId ).length >
                        0,
                    variations: __experimentalGetBlockVariations( name, 'block' ),
                };
            },
            [ clientId, name ]
        );
        const onChangeLayout = (nextVariation, registry) => {
            if ( nextVariation.attributes ) {
                props.setAttributes( nextVariation.attributes );
            }
            if ( nextVariation.innerBlocks ) {
                replaceInnerBlocks(
                    props.clientId,
                    createBlocksFromInnerBlocksTemplate(
                        nextVariation.innerBlocks
                    )
                );
            }
        };
        const createBlocksFromInnerBlocksTemplate = ( innerBlocksTemplate ) => {
            return map(
                innerBlocksTemplate,
                ( [ name, attributes, innerBlocks = [] ] ) =>
                    createBlock(
                        name,
                        attributes,
                        createBlocksFromInnerBlocksTemplate( innerBlocks )
                    )
            );
        };
        if ( hasInnerBlocks ) {
            return (
                <div className="nhsuk-grid-row">
                <div className="nhsuk-panel-group nhsuk-grid-column-full">

                <InnerBlocks template={ Templates.GRID_OPTIONS } />
            </div>
            </div>
        );
        }
        return (
            <div className="nhsuk-grid-row">
            <div className="nhsuk-panel-group nhsuk-grid-column-full">
            <__experimentalBlockVariationPicker
                variations = { Templates.GRID_OPTIONS }
                onSelect={ nextVariation => {
                    if ( nextVariation.attributes ) {
                        props.setAttributes( nextVariation.attributes );
                    }
                    if ( nextVariation.innerBlocks ) {
                        replaceInnerBlocks(
                            props.clientId,
                            createBlocksFromInnerBlocksTemplate(
                                nextVariation.innerBlocks
                            )
                        );
                    }
                } }
            />
        </div>
        </div>
    );
    },
    save: props => {
        const {
            attributes:
            {
                template
            }
        } = props;
        return (
            <div className="nhsuk-grid-row">
            <div className="nhsuk-panel-group nhsuk-grid-column-full">
            <InnerBlocks.Content />
            </div>
            </div>
    );
    }
});

registerBlockType("nhsblocks/onehalf", {
    title: __("One Half Width", "nhsblocks"),
    category: "nhsblocks",
    parent: ["nhsblocks/rowgroup"],
    attributes: {
        template: {
            type: "array"
        }
    },

    edit: props => {
        const {
            attributes: {
                template
            },
            setAttributes,
        } = props;
        const onChangetemplate = newTemplate => {
            setAttributes({ template: newTemplate });
        };
        const showTemplateSelector = ( template === null ) || ! template;
        return (
            <div className="nhsuk-grid-column-one-half">
            <InnerBlocks
        template={ showTemplateSelector ? null : template }
        />
        </div>
    );
    },
    save: props => {
        const {
            attributes:
                {
                    template
                }
        } = props;
        return (
            <div className="nhsuk-grid-column-one-half">
            <InnerBlocks.Content />
            </div>
    );
    }
});
registerBlockType("nhsblocks/onethird", {
    title: __("One Third Width", "nhsblocks"),
    category: "nhsblocks",
    parent: ["nhsblocks/rowgroup"],
    attributes: {
        template: {
            type: "array"
        }
    },

    edit: props => {
        const {
            attributes: {
                template
            },
            setAttributes,
        } = props;
        const onChangetemplate = newTemplate => {
            setAttributes({ template: newTemplate });
        };
        const showTemplateSelector = ( template === null ) || ! template;
        return (
            <div className="nhsuk-grid-column-one-third">
            <InnerBlocks
        template={ showTemplateSelector ? null : template }
        />
        </div>
    );
    },
    save: props => {
        const {
            attributes:
                {
                    template
                }
        } = props;
        return (
            <div className="nhsuk-grid-column-one-third">
            <InnerBlocks.Content />
            </div>
    );
    }
});

registerBlockType("nhsblocks/onequarter", {
    title: __("One Quarter Width", "nhsblocks"),
    category: "nhsblocks",
    parent: ["nhsblocks/rowgroup"],
    attributes: {
        template: {
            type: "array"
        }
    },

    edit: props => {
        const {
            attributes: {
                template
            },
            setAttributes,
        } = props;
        const onChangetemplate = newTemplate => {
            setAttributes({ template: newTemplate });
        };
        const showTemplateSelector = ( template === null ) || ! template;
        return (
            <div className="nhsuk-grid-column-one-quarter">
            <InnerBlocks
        template={ showTemplateSelector ? null : template }
        />
        </div>
    );
    },
    save: props => {
        const {
            attributes:
                {
                    template
                }
        } = props;
        return (
            <div className="nhsuk-grid-column-one-quarter">
            <InnerBlocks.Content />
            </div>
    );
    }
});

registerBlockType("nhsblocks/twothirds", {
    title: __("Two Thirds Width", "nhsblocks"),
    category: "nhsblocks",
    parent: ["nhsblocks/rowgroup"],
    attributes: {
        template: {
            type: "array"
        }
    },

    edit: props => {
        const {
            attributes: {
                template
            },
            setAttributes,
        } = props;
        const onChangetemplate = newTemplate => {
            setAttributes({ template: newTemplate });
        };
        const showTemplateSelector = ( template === null ) || ! template;
        return (
            <div className="nhsuk-grid-column-two-thirds">
            <InnerBlocks
        template={ showTemplateSelector ? null : template }
        />
        </div>
    );
    },
    save: props => {
        const {
            attributes:
                {
                    template
                }
        } = props;
        return (
            <div className="nhsuk-grid-column-two-thirds">
            <InnerBlocks.Content />
            </div>
    );
    }
});

registerBlockType("nhsblocks/threequarters", {
    title: __("Three Quarter Width", "nhsblocks"),
    category: "nhsblocks",
    parent: ["nhsblocks/rowgroup"],
    attributes: {
        template: {
            type: "array"
        }
    },

    edit: props => {
        const {
            attributes: {
                template
            },
            setAttributes,
        } = props;
        const onChangetemplate = newTemplate => {
            setAttributes({ template: newTemplate });
        };
        const showTemplateSelector = ( template === null ) || ! template;
        return (
            <div className="nhsuk-grid-column-three-quarters">
            <InnerBlocks
        template={ showTemplateSelector ? null : template }
        />
        </div>
    );
    },
    save: props => {
        const {
            attributes:
                {
                    template
                }
        } = props;
        return (
            <div className="nhsuk-grid-column-three-quarters">
            <InnerBlocks.Content />
            </div>
    );
    }
});
