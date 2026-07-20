/**
 *  Action Link
 *
 *  @reference: https://nhsuk.github.io/nhsuk-frontend/components/action-link/index.html
 *  @author VeryTwisty, NHS Leadership Academy
 *  @version Feb 2020
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

const { URLInput, useBlockProps } = wp.blockEditor;
const { Fragment } = wp.element;
const { TextControl } = wp.components;

import arrows from './arrows';

registerBlockType('nhsblocks/actionlink', {
	title: __('Action Link', 'nhsblocks'),
	apiVersion: 3,
	description:
		'Use action links to help users get to the next stage of a journey quickly by signposting the start of a digital service.',
	category: 'nhsblocks',
	icon: arrows.action,
	keywords: [
		__('signpost start', 'nhsblocks'),
		__('transactional services multi-page forms', 'nhsblocks'),
	],
	example: {
		attributes: {
			actionText: __('Call to Action'),
		},
	},
	attributes: {
		actionText: {
			type: 'string',
			source: 'html',
			selector: '.nhsuk-action-link__text',
			default: '',
		},
		actionLink: {
			type: 'string',
			source: 'attribute',
			attribute: 'href',
			selector: 'a.nhsuk-action-link__link',
			default: '',
		},
		arrowsvgs: {
			type: 'string',
			source: 'html',
			selector: 'svg',
			default: arrows.action,
		},
	},
	edit: (props) => {
		const blockProps = useBlockProps({
			className: 'nhsuk-action-link',
		});
		const {
			className,
			setAttributes,
			isSelected,
			
			attributes: {
				actionText = '',
				actionLink = '',
			},
		} = props;

		return (
			<div {...blockProps}>
				<a className="nhsuk-action-link__link">
					{arrows.action}
					<span className="nhsuk-action-link__text">
						{actionText}
					</span>
				</a>
				{isSelected ? (
					<div>
						<TextControl
							__next40pxDefaultSize
							label={__(' ', 'nhsblocks')}
							placeholder={__('Call to Action', 'nhsblocks')}
							value={actionText}
							onChange={(actionText) =>
								setAttributes({ actionText })
							}
						/>
						<URLInput
							value={actionLink || ''}
							placeholder={__(
								'Add a link (type to search or paste a whole url)',
								'nhsblocks'
							)}
							onChange={(actionLink) =>
								setAttributes({ actionLink })
							}
						/>
					</div>
				) : null}
			</div>
		);
	},
	save: (props) => {
		const blockProps = useBlockProps.save({
			className: 'nhsuk-action-link',
		});
		const {
			className,
			attributes: { actionText, actionLink, arrowssvgs },
		} = props;

		return (
			<div {...blockProps}>
				<a className="nhsuk-action-link__link" href={actionLink}>
					{arrows.action}
					<span className="nhsuk-action-link__text">
						{actionText}
					</span>
				</a>
			</div>
		);
	},
});
