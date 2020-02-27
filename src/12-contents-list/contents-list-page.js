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
		example: {
			attributes: {
				h2titles: [
					{
						text: "Heading number one",
						url: "#1",
						id: "11111"
					},
					{
						text: "Heading number two",
						url: "#2",
						id: "22222"
					},
					{
						text: "Heading number three",
						url: "#3",
						id: "33333"
					}
				]
			}
		},
		"attributes": {
			"h2titles": {
				"type": "array",
				"default": []
			}
		},
		keywords: [
			__( 'Contents List Page', 'nhsblocks' ),
			__( 'Navigation', 'nhsblocks' ),
			__( 'Related sections on page', 'nhsblocks' ),
		],
		edit: withSelect( ( select ) => {
        return {
            blocks: select('core/block-editor').getBlocks()
	        };
	    } )( ( { blocks, className, setAttributes, attributes: { h2titles } } ) => {


	    	let dynamicArray = [];

	    	blocks.map( ( block, i ) => {			

				if( ( block.name === "core/heading" ) && ( block.attributes.level === 2 ) ){

					let anchor = 'nhs-block-anchor-' + i;

					dynamicArray.push( { text: block.attributes.content, url: anchor, id: block.clientId } );
					
				}

			});

			let updateHeading = ()=>{

				setAttributes({ h2titles: dynamicArray });

				for (var i = dynamicArray.length - 1; i >= 0; i--) {

					let block = select('core/block-editor').getBlock( dynamicArray[i].id );
					block.attributes.anchor = dynamicArray[i].url;
				}
			}



			let is_same = h2titles.length == dynamicArray.length && h2titles.every( function( element, index ) {

				return ( dynamicArray[index].text === element.text &&  dynamicArray[index].url === element.url );

			});


	        return (
	        	<div>
	        	<nav className="{ className } nhsuk-contents-list" role="navigation" aria-label="Pages in this guide">
				  <h2 className="nhsuk-u-visually-hidden">{ __('Contents', 'nhsblocks') }</h2>
				  <ol className="nhsuk-contents-list__list">

				  	{  h2titles ?

		             h2titles.map( block => {

		            	return(

		            		<li className="nhsuk-contents-list__item" key={ block.url }>

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
						onClick={ updateHeading  }
						className="is-primary"
						disabled={ is_same }
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

