/**
 *  NHS Panel Group Element
 *  @reference: https://nhsuk.github.io/nhsuk-frontend/components/panel/index.html
 *  @author Tony Blacker, NHS Leadership Academy
 *  @version 1.0 22nd July 2019
 */

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText, InnerBlocks } = wp.editor;

//@todo add in Panel class variations
//@todo add in width variations

registerBlockType("nhsblocks/panelgroup", {
  title: __("Panel Group", "nhsblocks"),
  category: "nhsblocks",


  edit: props => {
    return (
        <div className="nhsuk-grid-row">
          <div className="nhsuk-panel-group nhsuk-grid-column-full">
              <InnerBlocks
                allowedBlocks={['nhsblocks/panel1', 'nhsblocks/grid-width']}
              />
          </div>
        </div>
  );
  },
  save: props => {
    return (
          <div className="nhsuk-grid-row">
            <div className="nhsuk-panel-group nhsuk-grid-column-full">
                <InnerBlocks.Content />
            </div>
          </div>
    );
  }
});
