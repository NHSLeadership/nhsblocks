/**
 *  NHS Promo / Call out  Element
 *
 *  @reference: https://nhsuk.github.io/nhsuk-frontend/components/promo/index.html
 *  @author Tony Blacker, Mahesh Murali P - NHS Leadership Academy
 *  @version 1.1 30 Sep 2025
 */


const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const {
	URLInputButton,
	RichText,
	InnerBlocks,
	MediaUpload,
	InspectorControls,
	useBlockProps
} = wp.blockEditor;
//@todo add in Promo class variations
//@todo add in width variations

registerBlockType('nhsblocks/promo1', {
	title: __('Promo Region', 'nhsblocks'),
	category: 'nhsblocks',
	icon: 'megaphone',
	styles: [
		{
			name: 'default',
			label: __('Standard'),
			isDefault: true,
		},
		{
			name: 'promo-small',
			label: __('Smaller Text'),
		},
	],
	example: {
		attributes: {
			promoTitle: 'Promo Box',
			promoText:
				'This is the content of the box to send users to your promoted page',
			promoLink: 'https://www.nhs.uk',
			align: 'center',
		},
		innerBlocks: [
			{
				name: 'core/image',
				attributes: {
					url: 'https://assets.nhs.uk/prod/images/A_0218_healthy-eating-main_BATM01_copy.width-690.jpg',
				},
			},
		],
	},
	attributes: {
		promoTitle: {
			type: 'string',
			source: 'html',
			selector: '.wp-block-nhsblocks-promo1 .nhsuk-card__link',
		},
		promoText: {
			type: 'string',
			source: 'html',
			selector: '.wp-block-nhsblocks-promo1 .nhsuk-card__description',
		},
		promoLink: {
			type: 'string',
			source: 'attribute',
			selector: '.wp-block-nhsblocks-promo1 a.nhsuk-card__link',
			attribute: 'href',
		},
		showChevron: {
			type: 'boolean',
			default: false,
		},
	},

	edit: (props) => {
		const blockProps = useBlockProps();
		// Lift info from props and populate various constants.
		const {
			attributes: { promoTitle, promoText, promoLink },
			className,
			setAttributes,
		} = props;

		// Grab newPromoTitle, set the value of promoTitle to newPromoTitle.
		const onChangePromoTitle = (newPromoTitle) => {
			setAttributes({ promoTitle: newPromoTitle });
		};

		// Grab newPromoText, set the value of promoText to newPromoText.
		// const onChangePromoText = (newPromoText) => {
		// 	setAttributes({ promoText: newPromoText });
		// };
		// Grab newPromoLink, set the value of promoLink to newPromoLink.
		const onChangePromoLink = (newPromoLink) => {
			setAttributes({ promoLink: newPromoLink });
		};
		const onChangeColumnWidth = (newColumnWidth) => {
			setAttributes({ columnWidth: newColumnWidth });
		};
		const onImageSelect = (imageObject) => {
			setAttributes({ promoImg: imageObject.sizes.podkitFeatImg.url });
		};
		const sanitizePromoText = (text) => text.replace(/<svg[\s\S]*?<\/svg>/gi, '');

		const onChangePromoText = (newPromoText) => {
			setAttributes({ promoText: sanitizePromoText(newPromoText) });
		};
				const ALLOWED_BLOCKS = ['core/image'];

		return ([
			
			<InspectorControls key="inspector-controls">
				<PanelBody title={__('Promo Settings', 'nhsblocks')} initialOpen={true}>
					<ToggleControl
						label={__('Show Chevron Icon', 'nhsblocks')}
						checked={!!props.attributes.showChevron}
						onChange={(value) => setAttributes({ showChevron: value })}
					/>
				</PanelBody>
			</InspectorControls>,

			<ul key="promo-markup" className="nhsuk-grid-row nhsuk-card-group">
				<li key={`promo-${props.clientId}`} className="nhsuk-grid-column-two-thirds nhsuk-card-group__item">
					<div className={`${className} nhsuk-card nhsuk-card--clickable`}>
						<InnerBlocks allowedBlocks={ALLOWED_BLOCKS} />
						<div className="nhsuk-card__content nhsuk-card__content--primary">
							<h2 className="nhsuk-card__heading nhsuk-heading-m">
								<URLInputButton
									className="nhsblocks-dropdown__input"
									label={__('Panel Link', 'nhsblocks')}
									onChange={onChangePromoLink}
									url={promoLink}
								/>
								<RichText
									placeholder={__('Promo Title', 'nhsblocks')}
									value={promoTitle}
									onChange={onChangePromoTitle}
								/>
							</h2>
							<div className="nhsuk-card__description">
								<RichText
									{...blockProps}
									placeholder={__('Promo Contents', 'nhsblocks')}
									onChange={onChangePromoText}
									value={promoText}
								/>
								{props.attributes.showChevron && (
									<svg className="nhsuk-icon" xmlns="http://www.w3.org/2000/svg" width="27" height="27" aria-hidden="true" focusable="false">
										<circle cx="13.333" cy="13.333" r="13.333" fill="" />
										<g data-name="Group 1" fill="none" stroke="#fff" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2.667">
											<path d="M15.438 13l-3.771 3.771" />
											<path data-name="Path" d="M11.667 9.229L15.438 13" />
										</g>
									</svg>
								)}
							</div>
						</div>
					</div>
				</li>
			</ul>
		]);
	},
	save: (props) => {
		const blockProps = useBlockProps.save();
		const {
			attributes: { promoTitle, promoText, promoLink },
		} = props;

		return (
			<ul {...blockProps} className="nhsuk-grid-row nhsuk-card-group">
				<li key={`promo-${props.clientId}`} className="nhsuk-grid-column-two-thirds nhsuk-card-group__item">
					<div className="nhsuk-card nhsuk-card--clickable">
						<InnerBlocks.Content />
						<div className="nhsuk-card__content nhsuk-card__content--primary">
							<h2 className="nhsuk-card__heading nhsuk-heading-m">
								<a href={promoLink} className="nhsuk-card__link">
									<RichText.Content value={promoTitle} />
								</a>
							</h2>
							<div className="nhsuk-card__description">
								<RichText.Content value={promoText} />
								{props.attributes.showChevron && (
									<svg className="nhsuk-icon" xmlns="http://www.w3.org/2000/svg" width="27" height="27" aria-hidden="true" focusable="false">
										<circle cx="13.333" cy="13.333" r="13.333" fill="" />
										<g data-name="Group 1" fill="none" stroke="#fff" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2.667">
											<path d="M15.438 13l-3.771 3.771" />
											<path data-name="Path" d="M11.667 9.229L15.438 13" />
										</g>
									</svg>
								)}
							</div>
						</div>
					</div>
				</li>
			</ul>
		);
	},
	deprecated: [
		{
			attributes: {
				promoTitle: {
					type: 'string',
					source: 'html',
					selector: '.wp-block-nhsblocks-promo1 .nhsuk-card__content .nhsuk-card__heading',
				},
				promoText: {
					type: 'string',
					source: 'html',
					selector: '.wp-block-nhsblocks-promo1 .nhsuk-card__description',
				},
				promoLink: {
					type: 'string',
					source: 'attribute',
					selector: '.wp-block-nhsblocks-promo1 a.nhsuk-card__link',
					attribute: 'href',
				},
			},
			save: (props) => {
				const blockProps = useBlockProps.save();
				const {
					attributes: { promoTitle, promoText, promoLink },
				} = props;
				var updatedTitle = promoTitle.replace("</a>", "").replace("</a>", "</a></a>");
				return (
					<div className="nhsuk-card nhsuk-card--clickable">
						<InnerBlocks.Content />
						<div className="nhsuk-card__content">
							<h2 className="nhsuk-card__heading nhsuk-heading-m">
								<RichText.Content {...blockProps} value={updatedTitle} />
							</h2>
							<div className="nhsuk-card__description">
								<RichText.Content {...blockProps} value={promoText} />
							</div>
						</div>
					</div>
				);
			},
		},
		{
			attributes: {
				promoTitle: {
					type: 'string',
					source: 'html',
					selector: '.nhsuk-promo__heading',
				},
				promoText: {
					type: 'string',
					source: 'html',
					selector: '.nhsuk-promo__description',
				},
				promoLink: {
					type: 'string',
					source: 'attribute',
					selector: '.nhsuk-promo a',
					attribute: 'href',
				},
			},
			save: ({ attributes }) => (
				<div className="nhsuk-promo">
					<a
						href={attributes.promoLink}
						className="nhsuk-promo__link-wrapper"
					>
						<div className="nhsuk-promo__content">
							<InnerBlocks.Content />
							<h3 className="nhsuk-promo__heading">
								{attributes.promoTitle}
							</h3>
							<div className="nhsuk-promo__description">
								{attributes.promoText}
							</div>
						</div>
					</a>
				</div>
			),
		},
		{
			attributes: {
				promoTitle: {
					type: 'string',
					source: 'html',
					selector: '.wp-block-nhsblocks-promo1 .nhsuk-card__link',
				},
				promoText: {
					type: 'string',
					source: 'html',
					selector: '.wp-block-nhsblocks-promo1 .nhsuk-card__description',
				},
				promoLink: {
					type: 'string',
					source: 'attribute',
					selector: '.wp-block-nhsblocks-promo1 a.nhsuk-card__link',
					attribute: 'href',
				},
			},
			save: (props) => {
				const blockProps = useBlockProps.save();
				const {
					attributes: { promoTitle, promoText, promoLink },
				} = props;

				return (
					<div className="nhsuk-card nhsuk-card--clickable">
						<InnerBlocks.Content />
						<div className="nhsuk-card__content">
							<h2 className="nhsuk-card__heading nhsuk-heading-m">
								<a href={promoLink} className="nhsuk-card__link">
									<RichText.Content value={promoTitle} />
								</a>
							</h2>
							<div className="nhsuk-card__description">
								<RichText.Content {...blockProps} value={promoText} />
							</div>
						</div>
					</div>
				);
			},
		},

		{
			attributes: {
				promoTitle: {
					type: 'string',
					source: 'html',
					selector: '.wp-block-nhsblocks-promo1 .nhsuk-card__link',
				},
				promoText: {
					type: 'string',
					source: 'html',
					selector: '.wp-block-nhsblocks-promo1 .nhsuk-card__description',
				},
				promoLink: {
					type: 'string',
					source: 'attribute',
					selector: '.wp-block-nhsblocks-promo1 a.nhsuk-card__link',
					attribute: 'href',
				},
				showChevron: {
					type: 'boolean',
					default: false,
				},
			},
			save: (props) => {
				const blockProps = useBlockProps.save();
				const {
					attributes: { promoTitle, promoText, promoLink },
				} = props;

				return (
					<ul className="nhsuk-grid-row nhsuk-card-group">
						<li className="nhsuk-grid-column-two-thirds nhsuk-card-group__item">
							<div className="nhsuk-card nhsuk-card--clickable">
								<InnerBlocks.Content />
								<div className="nhsuk-card__content nhsuk-card__content--primary">
									<h2 className="nhsuk-card__heading nhsuk-heading-m">
										<a href={promoLink} className="nhsuk-card__link">
											<RichText.Content value={promoTitle} />
										</a>
									</h2>
									<div className="nhsuk-card__description">
										<RichText.Content {...blockProps} value={promoText} />
									</div>
								</div>
							</div>
						</li>
					</ul>
				);
			},
		}
	],
});
