const { registerBlockStyle, unregisterBlockStyle } = wp.blocks;

wp.domReady(() => {
	unregisterBlockStyle('core/image', ['default', 'rounded']);

	registerBlockStyle('core/image', [
		{
			name: 'nhsuk-image',
			label: 'NHS Image',
			isDefault: true,
		},
		{
			name: 'default',
			label: 'Default',
		},
	]);

	unregisterBlockStyle('core/table', ['regular']);

	registerBlockStyle('core/table', [
		{
			name: 'nhsuk-table-responsive',
			label: 'NHS Table',
			isDefault: true,
		},
		{
			name: 'default',
			label: 'Default',
		},
	]);
});
