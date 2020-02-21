/**
 *  Back Link
 *  @reference: https://nhsuk.github.io/nhsuk-frontend/components/back-link/index.html
 *  @author VeryTwisty, NHS Leadership Academy
 *  @version Feb 2020
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

const { URLInput } = wp.editor;
const { Fragment } = wp.element;
const{ TextControl } = wp.components;

import arrows from './arrows';


registerBlockType("nhsblocks/backlink", {
    title: __("Back Link", "nhsblocks"),
    description: "Use back links to help users go back to the previous page in a multi-page transaction.",
    category: "nhsblocks",
    icon: arrows.back,
    keywords: [
        __( 'Back Link previous question pages', 'nhsblocks' ),
        __( 'transactional services multi-page forms', 'nhsblocks' ),
    ],
    attributes: {
        backText: {
            type: "string",
            source: "html",
            selector: ".nhsuk-back-link span",
            default: "Go back"
        }
    },
    edit: props => {

            const { className, setAttributes, isSelected, attributes: { backText } } = props;

            return (
                <div className="nhsuk-back-link">
                  <a className="nhsuk-back-link__link js-back-link">
                    { arrows.back }
                    { backText }
                    </a>
                    {
                        isSelected ? (

                            <TextControl
                                label={ __('Action Link Text', 'nhsblocks' ) }
                                value={ backText }
                                onChange={ backText => setAttributes({ backText }) }
                            />

                        ) : null
                    }
                </div>
            );
        },
    save: props => {

        const { attributes: { backText } } = props;

        return(
            <div className="nhsuk-back-link">
              <a className="nhsuk-back-link__link js-back-link" onclick="window.history.back()">
                { arrows.back }
                <span>{ backText }</span></a>
            </div>
        );
    }

});