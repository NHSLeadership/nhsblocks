/**
 *  NHS Promo / Call out  Element
 *
 *  @reference: https://nhsuk.github.io/nhsuk-frontend/components/promo/index.html
 *  @author Tony Blacker, NHS Leadership Academy
 *  @version 1.0 22nd July 2019
 */

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const {
	URLInputButton,
	RichText,
	InnerBlocks,
	MediaUpload,
	InspectorControls,
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
	},

	edit: (props) => {
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
		const onChangePromoText = (newPromoText) => {
			setAttributes({ promoText: newPromoText });
		};
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
		const ALLOWED_BLOCKS = ['core/image'];

		return (
			<div className={`${className} nhsuk-card nhsuk-card--clickable`}>
				<InnerBlocks allowedBlocks={ALLOWED_BLOCKS} />
				<div className="nhsuk-card__content">
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
							multiline="p"
							placeholder={__('Promo Contents', 'nhsblocks')}
							onChange={onChangePromoText}
							value={promoText}
						/>
					</div>
				</div>
			</div>
		);
	},
	save: (props) => {
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
						<RichText.Content multiline="p" value={promoText} />
					</div>
				</div>
			</div>
		);
	},
	deprecated: [
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
	],
});
