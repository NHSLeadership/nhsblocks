const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const {  InnerBlocks } = wp.blockEditor;

console.log('test');

registerBlockType("nhsblocks/stripesblock", {

	title: __("Stripes Block", "nhsblocks"),
    description: __("Outer block that allows alternate grey stripes. To be used with the Full Width for Stripes template ", "nhsblocks"),
    category: "nhsblocks",
    icon: "menu-alt",
    attributes: {
    },
    example: {
        innerBlocks: [
            {
                name: 'nhsblocks/stripeblock',
                innerBlocks: [
                    {
                        name: 'core/paragraph',
                        attributes: {
                            /* translators: example text. */
                            content: __(
                                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et eros eu felis.'
                            ),
                        },
                    },
                    {
                        name: 'core/paragraph',
                        attributes: {
                            /* translators: example text. */
                            content: __(
                                'Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.'
                            ),
                        },
                    },
                ],
            },
            {
                name: 'nhsblocks/stripeblock',
                innerBlocks: [
                    {
                        name: 'core/paragraph',
                        attributes: {
                            /* translators: example text. */
                            content: __(
                                'Etiam et egestas lorem. Vivamus sagittis sit amet dolor quis lobortis. Integer sed fermentum arcu, id vulputate lacus. Etiam fermentum sem eu quam hendrerit.'
                            ),
                        },
                    },
                    {
                        name: 'core/paragraph',
                        attributes: {
                            /* translators: example text. */
                            content: __(
                                'Nam risus massa, ullamcorper consectetur eros fermentum, porta aliquet ligula. Sed vel mauris nec enim.'
                            ),
                        },
                    },
                ],
            },
        ],
    },
    getEditWrapperProps(){
		return { 'data-align': 'full' };
	},
    edit: props => {

    	// const ALLOWED_BLOCKS = wp.blocks.getBlockTypes().map( block => block.name ).filter( blockName => blockName !== 'nhsblocks/stripesblock' );

    	const TEMPLATE_OPTIONS = [
            [ 'nhsblocks/stripeblock', {  } ]
        ];
        const ALLOWED_BLOCKS = [ 'nhsblocks/stripeblock' ];

    	return(
    		<div class="nhsuk-striped-blocks">
				<InnerBlocks 
					template={ TEMPLATE_OPTIONS }
					allowedBlocks={ ALLOWED_BLOCKS }
				/>
			</div>
    	);

    },
    save: props =>{
    	return (
			<InnerBlocks.Content />
    	);
    }

});

registerBlockType("nhsblocks/stripeblock", {

	title: __("Stripe Block", "nhsblocks"),
    description: __("Inner block that allows alternate grey stripes", "nhsblocks"),
    category: "nhsblocks",
    parent: ["nhsblocks/heroblock"],
    icon: "menu-alt",

    getEditWrapperProps(){
		return { 'data-align': 'full' };
	},
    edit: props => {

    	const ALLOWED_BLOCKS = wp.blocks.getBlockTypes().map( block => block.name ).filter( blockName => blockName !== 'nhsblocks/stripeblock' );

    	return(
			<div class="nhsuk-width-container">
				<InnerBlocks 
					allowedBlocks={ ALLOWED_BLOCKS }
				/>
			</div>
    	);

    },
    save: props =>{
    	return (
    		<section className="nhsuk-section">
    			<div class="nhsuk-width-container">
    				<InnerBlocks.Content />
    			</div>
    		</section>
    	);
    }

});