/**
 *  Review Date
 *
 *  @reference: https://nhsuk.github.io/nhsuk-frontend/components/do-dont-list/index.html
 *  @author VeryTwisty, NHS Leadership Academy
 *  @version 1.0 Feb 2020
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { format } = wp.date;
const { useBlockProps } = wp.blockEditor;
const { useEffect } = wp.element;
const { useSelect } = wp.data;


registerBlockType('nhsblocks/reviewdate', {
	title: __('Review Date', 'nhsblocks'),
	apiVersion: 3,
	category: 'nhsblocks',
	icon: 'update',
	example: {
		attributes: {
			lastSaved: __('5 July 1948'),
		},
	},
	attributes: {
		lastSaved: {
			type: 'string',
			source: 'html',
			selector: '.last-saved-date',
		},
	},
	edit: (props) => {
		const {
			setAttributes,
			attributes: { lastSaved },
		} = props;

		const blockProps = useBlockProps({
			className: 'nhsuk-review-date',
		});

		const savedDate = useSelect(
			(select) => select('core/editor').getEditedPostAttribute('modified'),
			[]
		);

		const formattedDate = savedDate
			? format('d F Y', new Date(savedDate))
			: lastSaved;

		useEffect(() => {
			if (savedDate && lastSaved !== formattedDate) {
				setAttributes({ lastSaved: formattedDate });
			}
		}, [savedDate, formattedDate, lastSaved, setAttributes]);

		return (
			<div {...blockProps}>
				<p className="nhsuk-body-s">
					Page last reviewed:{' '}
					<span className="last-saved-date">
						{lastSaved || formattedDate}
					</span>
				</p>
			</div>
		);
	},
	save: (props) => {
		const blockProps = useBlockProps.save({
			className: 'nhsuk-review-date',
		});
		const {
			className,
			attributes: { lastSaved },
		} = props;

		return (
			<div {...blockProps}>
				<p className="nhsuk-body-s">
					Page last reviewed:{' '}
					<span className="last-saved-date">{lastSaved}</span>
				</p>
			</div>
		);
	},
});
