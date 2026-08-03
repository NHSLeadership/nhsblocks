/**
 * NHS Styled Tags
 *
 *  @reference: https://service-manual.nhs.uk/design-system/components/tag
 *  @author Tony Blacker, NHS Leadership Academy
 *  @version 1.0 29th January 2021
 */

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const {
    RichText,
    InspectorControls,
    BlockControls,
    BlockVerticalAlignmentToolbar,
    useBlockProps,
} = wp.blockEditor;


registerBlockType('nhsblocks/tags', {
	title: __('Tag', 'nhsblocks'),
	apiVersion: 3,
	description: __(
		'Tags are just used to indicate a status. Do not add links. Use adjectives rather than verbs for' +
			' the names of your tags. Using a verb might make a user think that clicking on them will do something',
		'nhsblocks'
	),
	category: 'nhsblocks',
	icon: 'admin-links',
	styles: [
		{
			name: 'blue',
			label: __('Standard (Blue)'),
			isDefault: true,
		},
		{
			name: 'white',
			label: __('White'),
		},
		{
			name: 'grey',
			label: __('Grey'),
		},
		{
			name: 'green',
			label: __('Green'),
		},
		{
			name: 'aqua-green',
			label: __('Aqua Green'),
		},
		{
			name: 'blue',
			label: __('Light Blue'),
		},
		{
			name: 'purple',
			label: __('Purple'),
		},
		{
			name: 'pink',
			label: __('Pink'),
		},
		{
			name: 'red',
			label: __('Red'),
		},
		{
			name: 'orange',
			label: __('Orange'),
		},
		{
			name: 'yellow',
			label: __('Yellow'),
		},
	],
	supports: {
		align: false,
	},
	example: {
		attributes: {
			tagLabel: 'New',
		},
	},
	attributes: {
		tagLabel: {
			type: 'string',
			source: 'html',
			selector: '.nhsuk-tag',
		},
	},

	// https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-edit-save/
	edit: (props) => {
		// Props parameter holds all the info.
		const blockProps = useBlockProps();

		const styleClasses =
			blockProps.className
				?.split(' ')
				.filter((c) => c.startsWith('is-style-'))
				.join(' ') || '';
		// Lift info from props and populate various constants.
		const {
			attributes: { tagLabel },
			className,
			setAttributes,
		} = props;

		// Grab newtagLabel, set the value of tagLabel to newtagLabel.
		const onChangetagLabel = (newtagLabel) => {
			setAttributes({ tagLabel: newtagLabel });
		};

		return (
			<strong {...blockProps}>
				<span className={`nhsuk-tag ${styleClasses}`}>
					<RichText
						value={tagLabel}
						onChange={onChangetagLabel}
						placeholder="Tag label"
					/>
				</span>
			</strong>
		);
	},
	save: (props) => {

		const blockProps = useBlockProps.save({
			className: 'nhsuk-tag',
		});

		const {
			attributes: { tagLabel },
		} = props;
		return (
			<strong {...blockProps}>
				<RichText.Content value={tagLabel} />
			</strong>
		);
	},
});
