/**
 *  NHS Panel Group Element
 *  @reference: https://nhsuk.github.io/nhsuk-frontend/components/panel/index.html
 *  @author Tony Blacker, NHS Leadership Academy
 *  @version 1.0 22nd July 2019
 */

//const { useState, setState } = wp.element;
const { __ } = wp.i18n;
const { registerBlockType, createBlock } = wp.blocks;
const { InnerBlocks, __experimentalBlockVariationPicker } = wp.blockEditor;
const { useDispatch, useSelect } = wp.data;

import { map } from 'lodash';

import * as Templates from './templates.js';

registerBlockType("nhsblocks/promogroup", {
    title: __("Grouped Promos", "nhsblocks"),
    category: "nhsblocks",
    icon: 'layout',
    example: {

    },
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
                    getBlockVariations,
                    getBlockType,
                    getDefaultBlockVariation,
                } = select( 'core/blocks' );

                return {
                    blockType: getBlockType( name ),
                    defaultVariation: getDefaultBlockVariation(
                        name,
                        'block'
                    ),
                    hasInnerBlocks:
                        select( 'core/block-editor' ).getBlocks( clientId ).length >
                        0,
                    variations: getBlockVariations( name, 'block' ),
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
                <div className="nhsuk-grid-row nhsuk-card-group">

                <InnerBlocks template={ Templates.GRID_OPTIONS } />
            </div>
        );
        }
        return (
            <div className="nhsuk-grid-row nhsuk-card-group">
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
            <div className="nhsuk-grid-row nhsuk-card-group">
            <InnerBlocks.Content />
            </div>
    );
    }
});

registerBlockType("nhsblocks/onehalfpro", {
    title: __("One Half Promo", "nhsblocks"),
    category: "nhsblocks",
    parent: ["nhsblocks/promogroup"],
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
        } = props;
        return (
            <div className="nhsuk-grid-column-one-half  nhsuk-card-group__item">

          <InnerBlocks template = { Templates.TEMPLATE_OPTIONS_PRO } templateLock="all" />
        </div>
    );
    },
    save: props => {
        return (
            <div className="nhsuk-grid-column-one-half nhsuk-card-group__item">
            <InnerBlocks.Content />
            </div>
    );
    }
});
registerBlockType("nhsblocks/onethirdpro", {
    title: __("One Third Promo", "nhsblocks"),
    category: "nhsblocks",
    parent: ["nhsblocks/promogroup"],
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
        return (
            <div className="nhsuk-grid-column-one-third nhsuk-card-group__item">
          <InnerBlocks template = { Templates.TEMPLATE_OPTIONS_PRO } templateLock="all" />
        </div>
    );
    },
    save: props => {
        return (
            <div className="nhsuk-grid-column-one-third nhsuk-card-group__item">
            <InnerBlocks.Content />
            </div>
    );
    }
});

registerBlockType("nhsblocks/onequarterpro", {
    title: __("One Quarter Promo", "nhsblocks"),
    category: "nhsblocks",
    parent: ["nhsblocks/promogroup"],
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
        return (
            <div className="nhsuk-grid-column-one-quarter nhsuk-card-group__item">
          <InnerBlocks template = { Templates.TEMPLATE_OPTIONS_PRO } templateLock="all" />
        </div>
    );
    },
    save: props => {
        return (
            <div className="nhsuk-grid-column-one-quarter nhsuk-card-group__item">
            <InnerBlocks.Content />
            </div>
    );
    }
});

registerBlockType("nhsblocks/twothirdspro", {
    title: __("Two Thirds Promo", "nhsblocks"),
    category: "nhsblocks",
    parent: ["nhsblocks/promogroup"],
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
        return (
            <div className="nhsuk-grid-column-two-thirds nhsuk-card-group__item">
          <InnerBlocks template = { Templates.TEMPLATE_OPTIONS_PRO } templateLock="all" />
        </div>
    );
    },
    save: props => {
        return (
            <div className="nhsuk-grid-column-two-thirds nhsuk-card-group__item">
            <InnerBlocks.Content />
            </div>
    );
    }
});

registerBlockType("nhsblocks/threequarterspro", {
    title: __("Three Quarter Promo", "nhsblocks"),
    category: "nhsblocks",
    parent: ["nhsblocks/promogroup"],
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
        return (
            <div className="nhsuk-grid-column-three-quarters nhsuk-card-group__item">
          <InnerBlocks template = { Templates.TEMPLATE_OPTIONS_PRO } templateLock="all" />
        </div>
    );
    },
    save: props => {
        return (
            <div className="nhsuk-grid-column-three-quarters nhsuk-card-group__item">
            <InnerBlocks.Content />
            </div>
    );
    }
});
