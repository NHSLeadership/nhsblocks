/**
 *  Pagination
 *
 *  @reference: https://nhsuk.github.io/nhsuk-frontend/components/do-dont-list/index.html
 *  @author VeryTwisty, NHS Leadership Academy
 *  @version 1.0 Feb 2020
 */

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText, InnerBlocks } = wp.blockEditor;
const { Fragment } = wp.element;

const { URLInput } = wp.blockEditor;

const { TextControl } = wp.components;

import arrow from './arrow';

registerBlockType('nhsblocks/pagination', {
	title: __('Pagination', 'nhsblocks'),
	category: 'nhsblocks',
	icon: 'arrow-right-alt',
	example: {
		attributes: {
			prevText: __('Page Title'),
			nextText: __('Page Title'),
		},
	},
	attributes: {
		prevLink: {
			type: 'string',
			source: 'attribute',
			attribute: 'href',
			selector: 'a.nhsuk-pagination__link--prev',
		},
		nextLink: {
			type: 'string',
			source: 'attribute',
			attribute: 'href',
			selector: 'a.nhsuk-pagination__link--next',
		},
		prevText: {
			type: 'string',
			source: 'html',
			selector: '.prev-text',
			default: 'Page Title',
		},
		nextText: {
			type: 'string',
			source: 'html',
			selector: '.next-text',
			default: 'Page Title',
		},
	},
	edit: (props) => {
		const {
			className,
			isSelected,
			setAttributes,
			attributes: { prevLink, nextLink, prevText, nextText },
		} = props;

		return (
			<nav
				className="nhsuk-pagination"
				role="navigation"
				aria-label="Pagination"
			>
				<ul className="nhsuk-list nhsuk-pagination__list">
					<li className="nhsuk-pagination-item--previous">
						<a className="nhsuk-pagination__link nhsuk-pagination__link--prev">
							<span className="nhsuk-pagination__title">
								{__('Previous', 'nhsblocks')}
							</span>
							<span className="nhsuk-u-visually-hidden">:</span>
							<span className="nhsuk-pagination__page">
								{prevText}
							</span>
							{arrow.left}
						</a>
						{isSelected ? (
							<Fragment>
								<TextControl
									label={(__('Page Title'), 'nhsblocks')}
									value={prevText}
									hideLabelFromVision={true}
									onChange={(prevText) =>
										setAttributes({ prevText })
									}
								/>
								<URLInput
									className="url"
									value={prevLink}
									onChange={(prevLink) =>
										setAttributes({ prevLink })
									}
								/>
							</Fragment>
						) : null}
					</li>
					<li className="nhsuk-pagination-item--next">
						<a className="nhsuk-pagination__link nhsuk-pagination__link--next">
							<span className="nhsuk-pagination__title">
								{__('Next', 'nhsblocks')}
							</span>
							<span className="nhsuk-u-visually-hidden">:</span>
							<span className="nhsuk-pagination__page">
								{nextText}
							</span>
							{arrow.right}
						</a>
						{isSelected ? (
							<Fragment>
								<TextControl
									label={(__('Page Title'), 'nhsblocks')}
									value={nextText}
									hideLabelFromVision={true}
									onChange={(nextText) =>
										setAttributes({ nextText })
									}
								/>
								<URLInput
									className="url"
									value={nextLink}
									onChange={(nextLink) =>
										setAttributes({ nextLink })
									}
								/>
							</Fragment>
						) : null}
					</li>
				</ul>
			</nav>
		);
	},
	save: (props) => {
		const {
			className,
			attributes: { prevLink, nextLink, prevText, nextText },
		} = props;

		return (
			<nav
				className="nhsuk-pagination"
				role="navigation"
				aria-label="Pagination"
			>
				<ul className="nhsuk-list nhsuk-pagination__list">
					<li className="nhsuk-pagination-item--previous">
						<a
							className="nhsuk-pagination__link nhsuk-pagination__link--prev"
							href={prevLink}
						>
							<span className="nhsuk-pagination__title">
								{__('Previous', 'nhsblocks')}
							</span>
							<span className="nhsuk-u-visually-hidden">:</span>
							<span className="nhsuk-pagination__page prev-text">
								{prevText}
							</span>
							{arrow.left}
						</a>
					</li>
					<li className="nhsuk-pagination-item--next">
						<a
							className="nhsuk-pagination__link nhsuk-pagination__link--next"
							href={nextLink}
						>
							<span className="nhsuk-pagination__title">
								{__('Next', 'nhsblocks')}
							</span>
							<span className="nhsuk-u-visually-hidden">:</span>
							<span className="nhsuk-pagination__page next-text">
								{nextText}
							</span>
							{arrow.right}
						</a>
					</li>
				</ul>
			</nav>
		);
	},
});
