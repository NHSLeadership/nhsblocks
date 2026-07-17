/**
 *  NHS Care Card Element
 *  @reference: https://nhsuk.github.io/nhsuk-frontend/components/care-card/care-card-non-urgent.html
 *  @author Tony Blacker, NHS Leadership Academy
 *  @version 1.0 22nd July 2019
 */

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { ToggleControl, PanelBody, PanelRow, RadioControl } = wp.components;
const { withState } = wp.compose;

// @todo add in Card class variations
// @todo add in width variations
const TEMPLATE_OPTIONS = [["core/image", { align: "right", width: 150 }]];

registerBlockType("nhsblocks/card1", {
	apiVersion: 3,
	title: __("Card Region", "nhsblocks"),
	category: "nhsblocks",
	icon: "category",

	example: {
		attributes: {
			cardTitle: "This is a card",
			cardText: "This is the content of the card",
		},
		innerBlocks: [
			{
				name: "core/image",
				attributes: {
					align: "right",
					width: 150,
				},
			},
		],
	},

	styles: [
		{
			name: "default",
			label: __("Standard Blue", "nhsblocks"),
			isDefault: true,
		},
		{
			name: "urgent",
			label: __("Urgent (Red)", "nhsblocks"),
		},
		{
			name: "immediate",
			label: __("Immediate (Red and Black)", "nhsblocks"),
		},
		{
			name: "warning-callout",
			label: __("Warning Callout (Yellow)", "nhsblocks"),
		},
	],
	attributes: {
		innerBlocks_length: {
			type: "number",
			default: 0,
		},
		cardTitle: {
			type: "string",
			source: "html",
			selector: ".nhsuk-care-card__heading-text",
		},
		cardText: {
			type: "array",
			source: "children",
			multiline: "p",
			selector: ".nhsuk-care-card__content",
		},
		withImage: {
			type: "boolean",
			default: false,
		},
	},

	edit: (props) => {
		const {
			attributes: { cardTitle, cardText, withImage, className },
			setAttributes,
		} = props;

		const blockProps = useBlockProps({
			className: ["nhsuk-care-card", className].filter(Boolean).join(" "),
		});

		const onChangeCardTitle = (newCardTitle) => {
			setAttributes({ cardTitle: newCardTitle });
		};

		const onChangeCardText = (newCardText) => {
			setAttributes({ cardText: newCardText });
		};

		return [
			<InspectorControls key="inspector">
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

			<div key="card" {...blockProps}>
				<div className="nhsuk-care-card__heading-container">
					<h2 className="nhsuk-care-card__heading">
						<span role="text">
							<span className="nhsuk-u-visually-hidden">
								Non-urgent advice:{" "}
							</span>
							<span className="nhsuk-care-card__heading-text">
								<RichText
									placeholder={__("Card Title", "nhsblocks")}
									value={cardTitle}
									onChange={onChangeCardTitle}
								/>
							</span>
						</span>
					</h2>
					<span className="nhsuk-care-card__arrow" aria-hidden="true"></span>
				</div>

				<div className="nhsuk-care-card__content">
					{withImage === true && <InnerBlocks template={TEMPLATE_OPTIONS} />}

					<RichText
						placeholder={__("Card Contents", "nhsblocks")}
						onChange={onChangeCardText}
						value={cardText}
					/>
				</div>
			</div>,
		];
	},
	save: (props) => {
		const {
			attributes: { cardTitle, cardText, withImage, className },
		} = props;

		const blockProps = useBlockProps.save({
			className: [
				"nhsuk-grid-column-width nhsuk-care-card nhsuk-care-card--type",
				className,
			]
				.filter(Boolean)
				.join(" "),
		});

		return (
			<div {...blockProps}>
				<div className="nhsuk-care-card__heading-container">
					<h2 className="nhsuk-care-card__heading">
						<span>
							<span className="nhsuk-u-visually-hidden">
								Non-urgent advice:{" "}
							</span>
							<span className="nhsuk-care-card__heading-text">
								<RichText.Content value={cardTitle} />
							</span>
						</span>
					</h2>
					<span className="nhsuk-care-card__arrow" aria-hidden="true"></span>
				</div>

				<div className="nhsuk-care-card__content">
					{withImage === true && <InnerBlocks.Content />}

					<RichText.Content value={cardText} />
				</div>
			</div>
		);
	},
	deprecated: [
		{
			attributes: {
				cardTitle: {
					type: "string",
					source: "html",
					selector: ".nhsuk-care-card__heading-text",
				},
				cardText: {
					type: "array",
					source: "children",
					multiline: "p",
					selector: ".nhsuk-care-card__content",
				},
			},
			save: ({ attributes }) => (
				<div className="nhsuk-grid-column-width nhsuk-care-card nhsuk-care-card--type">
					<div className="nhsuk-care-card__heading-container">
						<h3 className="nhsuk-care-card__heading">
							<span role="heading" aria-level="3">
								<span className="nhsuk-u-visually-hidden">
									Non-urgent advice:{" "}
								</span>
								<span className="nhsuk-care-card__heading-text">
									<RichText.Content value={attributes.cardTitle} />
								</span>
							</span>
						</h3>
						<span className="nhsuk-care-card__arrow" aria-hidden="true"></span>
					</div>
					<div className="nhsuk-care-card__content">
						<RichText.Content multiline="p" value={attributes.cardText} />
					</div>
				</div>
			),
		},
		{
			attributes: {
				cardTitle: {
					type: "string",
					source: "html",
					selector: ".nhsuk-care-card__heading-text",
				},
				cardText: {
					type: "array",
					source: "children",
					multiline: "p",
					selector: ".nhsuk-care-card__content",
				},
			},
			save: ({ attributes }) => (
				<div className="nhsuk-grid-column-width nhsuk-care-card nhsuk-care-card--type">
					<div className="nhsuk-care-card__heading-container">
						<h3 className="nhsuk-care-card__heading">
							<span role="text">
								<span className="nhsuk-u-visually-hidden">
									Non-urgent advice:{" "}
								</span>
								<span className="nhsuk-care-card__heading-text">
									<RichText.Content value={attributes.cardTitle} />
								</span>
							</span>
						</h3>
						<span className="nhsuk-care-card__arrow" aria-hidden="true"></span>
					</div>
					<div className="nhsuk-care-card__content">
						<RichText.Content multiline="p" value={attributes.cardText} />
					</div>
				</div>
			),
		},

		{
			attributes: {
				cardTitle: {
					type: "string",
					source: "html",
					selector: ".nhsuk-care-card__heading-text",
				},
				cardText: {
					type: "array",
					source: "children",
					multiline: "p",
					selector: ".nhsuk-care-card__content",
				},
			},
			save: ({ attributes }) => (
				<div className="nhsuk-grid-column-width nhsuk-care-card nhsuk-care-card--type">
					<div className="nhsuk-care-card__heading-container">
						<h3 className="nhsuk-care-card__heading">
							<span role="heading">
								<span className="nhsuk-u-visually-hidden">
									Non-urgent advice:{" "}
								</span>
								<span className="nhsuk-care-card__heading-text">
									<RichText.Content value={attributes.cardTitle} />
								</span>
							</span>
						</h3>
						<span className="nhsuk-care-card__arrow" aria-hidden="true"></span>
					</div>
					<div className="nhsuk-care-card__content">
						<RichText.Content multiline="p" value={attributes.cardText} />
					</div>
				</div>
			),
		},

		{
			attributes: {
				cardTitle: {
					type: "string",
					source: "html",
					selector: ".nhsuk-care-card__heading-text",
				},
				cardText: {
					type: "array",
					source: "children",
					multiline: "p",
					selector: ".nhsuk-card__content",
				},
			},
			save: ({ attributes }) => (
				<div className="nhsuk-card nhsuk-card--care">
					<div className="nhsuk-card--care__heading-container">
						<h2 className="nhsuk-card--care__heading">
							<span role="text" className="nhsuk-care-card__heading-text">
								<RichText.Content value={attributes.cardTitle} />
							</span>
						</h2>
						<span className="nhsuk-card--care__arrow" aria-hidden="true"></span>
					</div>
					<div className="nhsuk-card__content">
						<RichText.Content
							{...useBlockProps.save()}
							multiline="p"
							value={attributes.cardText}
						/>
					</div>
				</div>
			),
		},

		{
			attributes: {
				cardTitle: {
					type: "string",
					source: "html",
					selector: ".nhsuk-card--care__heading strong",
				},
				cardText: {
					type: "array",
					source: "children",
					multiline: "p",
					selector: ".nhsuk-card__content",
				},
			},

			save: ({ attributes }) => (
				<div className="wp-block-nhsblocks-card1 nhsuk-grid-column-width nhsuk-card nhsuk-card--care nhsuk-card--care--type">
					<div className="nhsuk-card--care__heading-container">
						<h2 className="nhsuk-card--care__heading">
							<span>
								<span className="nhsuk-u-visually-hidden">
									Non-urgent advice:
								</span>
								<strong>
									<RichText.Content value={attributes.cardTitle} />
								</strong>
							</span>
						</h2>
						<span className="nhsuk-card--care__arrow" aria-hidden="true"></span>
					</div>

					<div className="nhsuk-card__content">
						<RichText.Content multiline="p" value={attributes.cardText} />
					</div>
				</div>
			),
		},
		{
			attributes: {
				// Capture the entire span markup, including the visually-hidden span + text
				cardTitle: {
					type: "string",
					source: "html",
					selector: ".nhsuk-card--care__heading > span",
				},
				// Capture whatever is inside content div (plain text OR HTML)

				cardText: {
					type: "array",
					source: "children",
					selector: ".nhsuk-card__content",
				},
			},

			save: ({ attributes }) => (
				<div className="wp-block-nhsblocks-card1 nhsuk-grid-column-width nhsuk-card nhsuk-card--care nhsuk-card--care--type">
					<div className="nhsuk-card--care__heading-container">
						<h2 className="nhsuk-card--care__heading">
							{/* Output the exact legacy span markup we captured */}
							<RichText.Content tagName="span" value={attributes.cardTitle} />
						</h2>
						<span className="nhsuk-card--care__arrow" aria-hidden="true"></span>
					</div>

					<div className="nhsuk-card__content">
						<RichText.Content
							tagName="div"
							className="nhsuk-card__content"
							value={attributes.cardText}
						/>
					</div>
				</div>
			),
		},
		{
			attributes: {
				cardTitle: {
					type: "string",
					source: "html",
					selector: ".nhsuk-care-card__heading-text",
				},
				cardText: {
					type: "array",
					source: "children",
					multiline: "p",
					selector: ".nhsuk-care-card__content",
				},
			},

			save: ({ attributes }) => (
				<div className="wp-block-nhsblocks-card1 nhsuk-grid-column-width nhsuk-care-card nhsuk-care-card--type">
					<div className="nhsuk-care-card__heading-container">
						{/* OLD HEADING LEVEL */}
						<h3 className="nhsuk-care-card__heading">
							<span>
								<span className="nhsuk-u-visually-hidden">
									Non-urgent advice:
								</span>
								<span className="nhsuk-care-card__heading-text">
									<RichText.Content value={attributes.cardTitle} />
								</span>
							</span>
						</h3>
						<span className="nhsuk-care-card__arrow" aria-hidden="true"></span>
					</div>

					<div className="nhsuk-care-card__content">
						<RichText.Content multiline="p" value={attributes.cardText} />
					</div>
				</div>
			),
		},
		{
			attributes: {
				// Grab inner HTML of the span inside the legacy h2
				// This yields: <span class="nhsuk-u-visually-hidden">Non-urgent advice: </span>New Test
				cardTitle: {
					type: "string",
					source: "html",
					selector: ".nhsuk-card--care__heading > span",
				},

				// Grab inner HTML of legacy content div (plain text or inline markup)
				cardText: {
					type: "string",
					source: "html",
					selector: ".nhsuk-card__content",
				},
			},

			save: ({ attributes }) => (
				<div className="wp-block-nhsblocks-card1 nhsuk-grid-column-width nhsuk-card nhsuk-card--care nhsuk-card--care--type">
					<div className="nhsuk-card--care__heading-container">
						<h2 className="nhsuk-card--care__heading">
							{/* Recreate the legacy <span> wrapper exactly */}
							<RichText.Content tagName="span" value={attributes.cardTitle} />
						</h2>
						<span className="nhsuk-card--care__arrow" aria-hidden="true"></span>
					</div>

					{/* Recreate the legacy content div exactly (no extra wrapper) */}
					<RichText.Content
						tagName="div"
						className="nhsuk-card__content"
						value={attributes.cardText}
					/>
				</div>
			),
		},
	],
});
