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
const { dispatch, subscribe, select } = wp.data;


registerBlockType("nhsblocks/reviewdate", {
    title: __("Review Date", "nhsblocks"),
    category: "nhsblocks",
    icon: "update",
    attributes: {
        lastSaved: {
            type: "array",
            source: "children",
            selector: "span"
        }
    },
    edit: props => {
			const { className, setAttributes, attributes:{ lastSaved } } = props;

			const postDate = new Date( select( 'core/editor' ).getEditedPostAttribute( 'modified' ) );
			let formattedDate = format( 'd F Y', postDate );
			let locked = false;

			subscribe( function () {

			  let isSavingPost = select('core/editor').isSavingPost();
			  let isAutosavingPost = select('core/editor').isAutosavingPost();


			  console.log( lastSaved );

			  // Alot of jiggery pokery to avoid infinate loop

				if ( isSavingPost && !isAutosavingPost ) {

					  if ( lastSaved !== formattedDate ) {
		                if ( ! locked ) {
		                    locked = true;
		                    dispatch( 'core/editor' ).lockPostSaving( 'futurelock' );
		                    setAttributes( { lastSaved: formattedDate } );
		                    dispatch( 'core/editor' ).unlockPostSaving( 'futurelock' );
		                    locked = false;
		                	dispatch( 'core/editor' ).savePost();		                    
		                }
		            }
		        }

			});

			let savedDate = lastSaved ? lastSaved : formattedDate;

			return (
				<div class="nhsuk-review-date">
				  <p class="nhsuk-body-s">
				    Page last reviewed: <span>{ lastSaved }</span>
				  </p>
				</div>
			);
		},
	save: props => {

		const { className, attributes:{ lastSaved } } = props;

		return (
			<div class="nhsuk-review-date">
			  <p class="nhsuk-body-s">
			    Page last reviewed: <span>{ lastSaved }</span>
			  </p>
			</div>
		);
	},
});