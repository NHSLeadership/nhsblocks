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
const { RichText, InnerBlocks } = wp.blockEditor;
const { dispatch, subscribe, select, withSelect } = wp.data;

registerBlockType('nhsblocks/reviewdate', {
	title: __('Review Date', 'nhsblocks'),
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
	edit: withSelect((select) => {
		return {
			savedDate: select('core/editor').getEditedPostAttribute('modified'),
		};
	})(({ savedDate, className, setAttributes, attributes: { lastSaved } }) => {
		if (savedDate) {
			const postDate = new Date(savedDate);
			const formattedDate = format('d F Y', postDate);

			if (lastSaved !== formattedDate) {
				if (typeof lastSaved === 'undefined') {
					setAttributes({ lastSaved: formattedDate });
					dispatch('core/editor').savePost();
				} else {
					setAttributes({ lastSaved: formattedDate });
				}
			}

			return (
				<div className="nhsuk-review-date">
					<p className="nhsuk-body-s">
						Page last reviewed:{' '}
						<span className="last-saved-date">{lastSaved}</span>
					</p>
				</div>
			);
		}
	}),
	save: (props) => {
		const {
			className,
			attributes: { lastSaved },
		} = props;

		return (
			<div className="nhsuk-review-date">
				<p className="nhsuk-body-s">
					Page last reviewed:{' '}
					<span className="last-saved-date">{lastSaved}</span>
				</p>
			</div>
		);
	},
});
