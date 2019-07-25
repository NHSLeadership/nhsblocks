/**
 * Do / Dont listing
 *  @reference: https://nhsuk.github.io/nhsuk-frontend/components/do-dont-list/index.html
 *  @author Tony Blacker, NHS Leadership Academy
 *  @version 1.0 22nd July 2019
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText, InnerBlocks } = wp.editor;
//@todo add in Panel class variations
//@todo add in width variations

registerBlockType("nhsblocks/dodont", {
    title: __("Do and Don't List", "nhsblocks"),
    category: "nhsblocks",
    attributes: {
        panelTitle: {
            type: "string",
            source: "html",
            selector: "h3"
        }
    },

    edit: props => {

        // Lift info from props and populate various constants.
        const {
            attributes: {
                panelTitle
            },
            className,
            setAttributes
        } = props;

        // Grab newPanelTitle, set the value of panelTitle to newPanelTitle.
        const onChangePanelTitle = newPanelTitle => {
            setAttributes({ panelTitle: newPanelTitle });
        };
        const ALLOWED_BLOCKS = [];



        return (
            <div className="nhsuk-do-dont-list">
                <h3 className="nhsuk-do-dont-list__label">
                    <RichText
                        placeholder={__("Panel Title", "nhsblocks")}
                        value={panelTitle}
                        onChange={onChangePanelTitle}
                    />
                </h3>
                <ul className="nhsuk-list">
                    <InnerBlocks allowedBlocks={ ALLOWED_BLOCKS } />
                </ul>
            </div>
    );
    },
    save: props => {
        // console.info(props);

        const {
            attributes: {
                panelTitle,
                panelText }
        } = props;

        return (
            <div className="nhsuk-do-dont-list">
                <h3 className="nhsuk-do-dont-list__label">
                    <RichText.Content value={panelTitle} />
                </h3>
                <ul className="nhsuk-list">
                    <InnerBlocks.Content />
                </ul>
            </div>
    );
    }
});


registerBlockType("nhsblocks/dodontitem", {
    title: __("List Item", "nhsblocks"),
    category: "nhsblocks",
    parent: ["nhsblocks/dodont"],
    attributes: {
        panelText: {
            type: "string",
            source: "html",
            selector: "h3"
        }
    },

    edit: props => {

        // Lift info from props and populate various constants.
        const {
            attributes: {
                panelText
            },
            className,
            setAttributes
        } = props;

        // Grab newPanelText, set the value of panelText to newPanelText.
        const onChangePanelText = newPanelText => {
            setAttributes({ panelText: newPanelText });
        };



        return (
            <li className={`${className}`}>
                <svg class="nhsuk-icon nhsuk-icon__" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
        fill="none" aria-hidden="true">
                </svg>
            <RichText
                    placeholder={__("Text", "nhsblocks")}
                    value={panelText}
                    onChange={onChangePanelText}
                    />
            </li>
    );
    },
    save: props => {
        // console.info(props);

        const {
            attributes: {
                panelTitle,
                panelText }
        } = props;

        return (
            <li className="">
            <svg class="nhsuk-icon nhsuk-icon__" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
        fill="none" aria-hidden="true">
            </svg><RichText.Content value={panelText} />
            </li>
    );
    }
});




// button variations
wp.blocks.registerBlockStyle ('nhsblocks/dodontitem',
    {
        name: 'default',
        label: 'do',
        isDefault: true
    }
);
wp.blocks.registerBlockStyle ('nhsblocks/dodontitem',
    {
        name: 'dont',
        label: 'Cross'
    }
);
