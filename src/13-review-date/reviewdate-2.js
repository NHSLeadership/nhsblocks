/**
 *  Review Date
 *  @reference: https://nhsuk.github.io/nhsuk-frontend/components/do-dont-list/index.html
 *  @author VeryTwisty, NHS Leadership Academy
 *  @version 1.0 Feb 2020
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { format } = wp.date;
const { RichText, InnerBlocks } = wp.blockEditor;
const { dispatch, subscribe, select, withSelect } = wp.data;


registerBlockType("nhsblocks/reviewdatetwo", {
    title: __("Review Date Two", "nhsblocks"),
    category: "nhsblocks",
    icon: "update",
    attributes: {
        lastSaved: {
            type: "string",
            source: "html",
            selector: ".last-saved-date"
        }
    },
    edit: withSelect( select => {
            return {
                savedDate: select( 'core/editor' ).getEditedPostAttribute( 'modified' )
            };
        } ) ( ( { savedDate, className, setAttributes, attributes: { lastSaved } } ) => {

			if( savedDate ){
				const postDate = new Date( savedDate );
				let formattedDate = format( 'd F Y', postDate );

				return (
					<div class="nhsuk-review-date">
					  <p class="nhsuk-body-s">
					    Page last reviewed: <span>{ formattedDate }</span>
					  </p>
					</div>
				);
			}
			
		}),
	save: withSelect( select => {
            return {
                savedDate: select( 'core/editor' ).getEditedPostAttribute( 'modified' )
            };
        } ) ( ( { savedDate, className} ) => {

			if( savedDate ){
				const postDate = new Date( savedDate );
				let formattedDate = format( 'd F Y', postDate );

				return (
					<div class="nhsuk-review-date">
					  <p class="nhsuk-body-s">
					    Page last reviewed: <span>{ formattedDate }</span>
					  </p>
					</div>
				);
			}
			
		}),
});