const { registerBlockStyle, unregisterBlockStyle } = wp.blocks;



wp.domReady( () => {
	unregisterBlockStyle(
		'core/image',
		[ 'default', 'rounded' ]
	);

	registerBlockStyle(
		'core/image',
		[
			{
				name: 'default',
				label: 'Default',
				
			},
			{
				name: 'nhsuk-image',
				label: 'NHS Image',
				isDefault: true,
			}
		]
	);

	unregisterBlockStyle(
		'core/table',
		[ 'regular', 'stripes' ]
	);

	registerBlockStyle(
		'core/table',
		[
			{
				name: 'nhsuk-table-responsive',
				label: 'NHS Table',
				isDefault: true,
			}
		]
	);
} );