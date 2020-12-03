/**
 *  Reveal / Expander Element
 *  @reference: https://nhsuk.github.io/nhsuk-frontend/components/details/expander.html
 *  @author Tony Blacker, NHS Leadership Academy
 *  @version 1.0 22nd July 2019
 */
const {__} = wp.i18n;
const {registerBlockType} = wp.blocks;
const { RichText, InnerBlocks, InspectorControls } = wp.blockEditor;
const { ToggleControl, PanelBody, PanelRow, RadioControl, clientId } = wp.components;


const TEMPLATE_OPTIONS = [
	['core/image', {align: 'right', width: 150}],
];

registerBlockType("nhsblocks/reveal1", {
	title: __("Simple Reveal", "nhsblocks"),
	category: "nhsblocks",
	icon: "plus-alt",
	styles: [
		{
			name: "downarrow",
			label: __("Down Arrow"),
			isDefault: true
		},
		{
			name: "expander",
			label: __("Plus Icon")
		}
	],
	example: {
		attributes: {
			revealTitle: 'Expandable Region',
			revealText: 'This is text inside an expandable region. It all shows up when this region is opened, but can also be minimised',
			className: 'is-style-expander',
		}
	},
	attributes: {
		revealTitle: {
			type: "string",
			source: "html",
			selector: ".nhsuk-details__summary-text"
		},
		revealText: {
			type: "string",
			source: "html",
			selector: ".nhsuk-details__text"
		},
		withImage: {
			type: 'boolean',
			default: false,
		},
	},

	edit: props => {

		// Lift info from props and populate various constants.
		const {
			attributes: {revealTitle, revealText, withImage},
			className,
			setAttributes,
		} = props;

		// Grab newRevealTitle, set the value of revealTitle to newRevealTitle.
		const onChangeRevealTitle = newRevealTitle => {
			setAttributes({revealTitle: newRevealTitle});
		};

		// Grab revealText, set the value of revealText to newRevealtext
		const onChangeRevealText = newRevealText => {
			setAttributes({revealText: newRevealText});
		};


		return ( [
			<InspectorControls>
				<PanelBody>
					<PanelRow>
						<ToggleControl
							label="Include an image?"
							checked={withImage}
							onChange={(newval) => setAttributes({ withImage: newval })}
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>,
			< details
		        className = {`${className} nhsuk-details newstyle`}
		open >
		< summary
		className = "nhsuk-details__summary"
		role = "button"
		aria-controls = "details-content-"
		aria-expanded = "true" >
			<span className="nhsuk-details__summary-text" >
			<RichText
                placeholder={__("Reveal Title", "nhsblocks")}
                value={revealTitle}
                onChange={onChangeRevealTitle}
            />
		< /span>
		< /summary>
		< div
		className="nhsuk-details__text"
		id="details-content-"
		aria-hidden="false" >
			{withImage === true && (
					<InnerBlocks
				template={TEMPLATE_OPTIONS}
				/>
			)}
			<RichText
                multiline="p"
                placeholder={__("Reveal Contents", "nhsblocks") }
                onChange={onChangeRevealText}
                value={revealText}
            />

		</div>
		</details>
	]);
	},
	save: props => {
		const {
			attributes: {revealTitle, revealText, withImage}
		} = props;

		return (
			<details className="nhsuk-details">
				<summary
				className="nhsuk-details__summary"
				role="button"
				aria-controls="details-content-"
				aria-expanded="false" >
					< span
						className="nhsuk-details__summary-text" >
						< RichText.Content
							value = {revealTitle}
							/>
					< /span>
				< /summary>
				<div
					className="nhsuk-details__text"
					id="details-content-"
					aria-hidden="false" >
						{withImage === true && (
							<InnerBlocks.Content />
						)}
						< RichText.Content
					multiline="p"
					value={revealText}
					/>
				< /div>
		</details>
	);
	},
	deprecated: [
		{
				attributes: {
					revealTitle: {
						type: "string",
						source: "html",
						selector: ".nhsuk-details__summary-text"
					},
					revealText: {
						type: "string",
						source: "html",
						selector: ".nhsuk-details__text"
					}
				},
			save: ( props ) =>
				<details className="nhsuk-details newstyle"	open>
					<summary className="nhsuk-details__summary"
					role="button"
					aria-controls="details-content-"
					aria-expanded="true" >
						<span className="nhsuk-details__summary-text" >
							<RichText
							placeholder={__("Reveal Title", "nhsblocks")}
							value={props.attributes.revealTitle}
							/>
						</span>
					</summary>
					<div
					className="nhsuk-details__text"
					id="details-content-"
					aria-hidden="false" >
						<RichText
							multiline="p"
							placeholder={__("Reveal Contents", "nhsblocks") }
							value={props.attributes.revealText}
							/>
					</div>
				</details>,
		}
	]
});

