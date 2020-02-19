/**
 *  Pagination
 *  @reference: https://nhsuk.github.io/nhsuk-frontend/components/do-dont-list/index.html
 *  @author VeryTwisty, NHS Leadership Academy
 *  @version 1.0 Feb 2020
 */

 const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText, InnerBlocks } = wp.blockEditor;


registerBlockType("nhsblocks/dodont", {
    title: __("Do and Don't List", "nhsblocks"),
    category: "nhsblocks",
    icon: "yes-alt",
    attributes: {
        panelTitle: {
            type: "string",
            source: "html",
            selector: "h3"
        }
    },
});