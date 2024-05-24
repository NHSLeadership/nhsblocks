/**
 *  NHS Testimonial / Quote Element
 *
 *  @reference: https://nhsuk.github.io/nhsuk-frontend/components/inset-text/index.html
 *  @author Tony Blacker, NHS Leadership Academy
 *  @version 1.0 22nd July 2019
 */

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText, useBlockProps } = wp.blockEditor;

registerBlockType('nhsblocks/quote1', {
	title: __('Simple Quote', 'nhsblocks'),
	category: 'nhsblocks',
	icon: 'format-quote',
	styles: [
		{
			name: 'standard',
			label: __('Standard'),
			isDefault: true,
		},
		{
			name: 'quote-reverse',
			label: __('Inverse'),
		},
	],
	example: {
		attributes: {
			quoteName: 'Tony Blacker',
			quoteText: 'Nightingale is an incredibly flexible theme. With NHSBlocks added in, it is amazing.',
		},
	},
	attributes: {
		quoteName: {
			type: 'string',
			source: 'html',
			selector: '.nhsuk-inset-text__quote-attribution',
		},
		quoteText: {
			type: 'string',
			source: 'html',
			selector: '.nhsuk-inset-text__quote',
		},
	},

	edit: (props) => {
		const blockProps = useBlockProps();
		const {
			attributes: { quoteName, quoteText },
			className,
			setAttributes,
		} = props;

		const onChangeQuoteName = (newQuoteName) => {
			setAttributes({ quoteName: newQuoteName });
		};

		const onChangeQuoteText = (newQuoteText) => {
			setAttributes({ quoteText: newQuoteText });
		};

		return (
			<div className={`${className} nhsuk-inset-text`}>
				<span className="nhsuk-u-visually-hidden">
					Quote / Testimonial:{' '}
				</span>
				<div className="nhsuk-inset-text__quote">
					<RichText
						{...blockProps}
						placeholder={__('Quote', 'nhsblocks')}
						onChange={onChangeQuoteText}
						value={quoteText}
					/>
				</div>
				<span className="nhsuk-inset-text__quote-attribution">
					<RichText
						placeholder={__('Quote Name', 'nhsblocks')}
						value={quoteName}
						onChange={onChangeQuoteName}
					/>
				</span>
			</div>
		);
	},

	save: (props) => {
		const blockProps = useBlockProps.save();
		const {
			attributes: { quoteName, quoteText },
		} = props;

		return (
			<div className="nhsuk-inset-text">
				<span className="nhsuk-u-visually-hidden">
					Quote / Testimonial:{' '}
				</span>
				<div className="nhsuk-inset-text__quote">
					<RichText.Content {...blockProps} value={quoteText} />
				</div>
				<span className="nhsuk-inset-text__quote-attribution">
					<RichText.Content value={quoteName} />
				</span>
			</div>
		);
	},
});
