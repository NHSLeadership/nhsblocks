/**
 *  Back Link
 *
 *  @reference: https://nhsuk.github.io/nhsuk-frontend/components/back-link/index.html
 *  @author VeryTwisty, NHS Leadership Academy
 *  @version Feb 2020
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

const { URLInput, useBlockProps } = wp.blockEditor;
const { Fragment } = wp.element;
const { TextControl } = wp.components;

import arrows from './arrows';

registerBlockType('nhsblocks/backlink', {
	title: __('Back Link', 'nhsblocks'),
	apiVersion: 3,
	description:
		'Use back links to help users go back to the previous page in a multi-page transaction.',
	category: 'nhsblocks',
	icon: arrows.back,
	keywords: [
		__('Back Link previous question pages', 'nhsblocks'),
		__('transactional services multi-page forms', 'nhsblocks'),
	],
	example: {
		attributes: {
			backText: __('Go back'),
		},
	},
	attributes: {
		backText: {
			type: 'string',
			source: 'html',
			selector: 'a.nhsuk-back-link',
			default: 'Go back',
		},
	},
	edit: (props) => {
		const blockProps = useBlockProps();
		const {
			className,
			setAttributes,
			isSelected,
			attributes: { backText },
		} = props;

		return (
			<div {...blockProps}>
				<a className="nhsuk-back-link">{backText}</a>
				{isSelected ? (
					<TextControl
						__next40pxDefaultSize
						label={__('Action Link Text', 'nhsblocks')}
						value={backText}
						onChange={(backText) => setAttributes({ backText })}
					/>
				) : null}
			</div>
		);
	},
	save: (props) => {
		const blockProps = useBlockProps.save();

		const {
			attributes: { backText },
		} = props;

		return (
			<div {...blockProps}>
				<a
					className="nhsuk-back-link js-back-link"
					onClick="window.history.back()"
					href="#"
				>
					{backText}
				</a>
			</div>
		);
	},
	deprecated: [
		{
			// nhsuk-frontend 8.x/9.x markup: chevron SVG and nhsuk-back-link__link.
			apiVersion: 3,
			attributes: {
				backText: {
					type: 'string',
					source: 'html',
					selector: '.nhsuk-back-link span',
					default: 'Go back',
				},
			},
			save: (props) => {
				const blockProps = useBlockProps.save({
					className: 'nhsuk-back-link',
				});

				const {
					attributes: { backText },
				} = props;

				return (
					<div {...blockProps}>
						<a
							className="nhsuk-back-link__link js-back-link"
							onClick="window.history.back()"
							href="#"
						>
							{arrows.back}
							<span>{backText}</span>
						</a>
					</div>
				);
			},
		},
	],
});
