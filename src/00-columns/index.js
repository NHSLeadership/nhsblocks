/**
 * NHS Styled Buttons
 *  @reference: https://nhsuk.github.io/nhsuk-frontend/components/button/index.html
 *  @author Tony Blacker, NHS Leadership Academy
 *  @version 1.0 22nd July 2019
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText, InnerBlocks, InspectorControls } = wp.editor;
const { codeBlock } = wp.blocks.unregisterBlockType('core/columns');
const { OriginalBlockEdit } = codeBlock.edit;
const { OriginalBlockSave } = codeBlock.save;
codeBlock.edit: props => {

    return [
        el( OriginalBlockEdit, Object.assign( props, { key: 'original' } ) ),

        el( RichText, {
            key: 'caption',
            tagName: 'div',
            className: 'my-caption',
            value: props.attributes.caption,
            onChange: function( value ) {
                props.setAttributes( { caption: value } );
            },
        } ),

    ];
};
codeBlock.save = function( props ) {
    return [
        el( OriginalBlockSave, Object.assign( props, { key: 'original' } ) ),

        el( RichText.Content, {
            tagName: 'div',
            key: 'caption',
            className: 'my-caption',
            value: props.attributes.caption,
        } ),

    ];
};
registerBlockType( 'nhsblocks/columns', codeBlock );

//@todo align
//@todo extended classes
/*
registerBlockType("nhsblocks/grid-width", {
  title: __("Variable width columns", "nhsblocks"),
  category: "nhsblocks",

    // https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-edit-save/
    edit: props => {

    // Lift info from props and populate various constants.
        const {
            attributes: {
            },
            className,
            setAttributes
        } = props;
        const ALLOWED_BLOCKS = [ 'nhsblocks/panel1', 'nhsblocks/promo1', 'nhsblocks/dashboard' ];

    return (
        <div className={`${className} nhsuk-grid-column-size`}>
        <span>This is an inner column. Add Blocks as you like, and use the style tab to change the width</span>
            <InnerBlocks allowedBlocks={ ALLOWED_BLOCKS } />
        </div>
  )
  },
  save: props => {
      const {
          attributes: {
          },
          className,
          setAttributes
      } = props;
    return (
          <div className="nhsuk-grid-column-size">
            <InnerBlocks.Content />
          </div>
    )
  }
});
*/
// column width variations
wp.blocks.registerBlockStyle ('nhsblocks/grid-width',
    {
        name: 'full',
        label: 'Full Width',
        isDefault: true
    }
);
wp.blocks.registerBlockStyle ('nhsblocks/grid-width',
    {
        name: 'one-half',
        label: 'Half Width'
    }
);
wp.blocks.registerBlockStyle ('nhsblocks/grid-width',
    {
        name: 'two-thirds',
        label: 'Two Thirds'
    }
);
wp.blocks.registerBlockStyle ('nhsblocks/grid-width',
    {
        name: 'one-third',
        label: 'One Third'
    }
);
wp.blocks.registerBlockStyle ('nhsblocks/grid-width',
    {
        name: 'one-quarter',
        label: 'One Quarter (Only Use in Full Width layout)'
    }
);
