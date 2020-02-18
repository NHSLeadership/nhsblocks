/**
 *  NHS Contents List  Element
 *  @reference: https://nhsuk.github.io/nhsuk-frontend/components/contents-list/index.html
 *  @author Tony Blacker, NHS Leadership Academy
 *  @version 1.0 22nd July 2019
 */

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

const { 
	RichText, 
	URLInput, 
	InnerBlocks 
} = wp.blockEditor;

const { withSelect, subscribe, select } = wp.data;

const { Fragment } = wp.element;

const{
	Button,
	TextControl
} = wp.components;


// Register Block

registerBlockType(
	'nhsblocks/contentslistpage',
	{
		title: __('Contents List within a page', 'nhsblocks' ),
		description: __('Use contents lists to allow users to navigate sections within a page. This will automatically add all h2 tags on this page to a scrollable list ', 'nhsblocks' ),
		category: 'nhsblocks',
		icon: 'editor-ul',
		"attributes": {
			"h2titles": {
				"type": "array"
			}
		},
		keywords: [
			__( 'Contents List Page', 'nhsblocks' ),
			__( 'Navigation', 'nhsblocks' ),
			__( 'Related sections on page', 'nhsblocks' ),
		],
		edit: withSelect( ( select ) => {
        return {
            blocks: select('core/block-editor').getBlocks(),
	        };
	    } )( ( { blocks, className, setAttributes, attributes: { h2titles } } ) => {


	    	let dynamicArray = [];

	    	blocks.map( ( block, i ) => {			

				if( ( block.name === "core/heading" ) && ( block.attributes.level === 2 ) ){

					let anchor = 'nhs-block-anchor-' + i;

					dynamicArray.push( { text: block.attributes.content, url: anchor } );
					block.attributes.anchor = anchor;
					
				}

			})

	        return (
	        	<div>
	        	<nav className="{ className } nhsuk-contents-list" role="navigation" aria-label="Pages in this guide">
				  <h2 className="nhsuk-u-visually-hidden">{ __('Contents', 'nhsblocks') }</h2>
				  <ol className="nhsuk-contents-list__list">

				  	{  h2titles ?

		             h2titles.map( block => {

		            	return(

		            		<li className="nhsuk-contents-list__item">

			        			<a className="nhsuk-contents-list__link" href={ '#' + block.url }>
			            			{ block.text }
			            		</a>
			                    		
							</li>

		            	)

					}) : (
						<p>Press the button below to make a table of contents for this page</p>
					) 


					}


					<p>		            
		        	<Button 
						onClick={ ()=> setAttributes({ h2titles: dynamicArray }) }
						className="is-primary"
					>Update Heading Block
					</Button></p>
					</ol>
					</nav>
		        </div>
	        );
	    } ),
		save: props => {
			const {
		      attributes: {
		          h2titles
		      }
		    } = props;

			return null;
		},
	}
);

