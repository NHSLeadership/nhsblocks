/**
 *  Pagination
 *
 *  @reference: https://nhsuk.github.io/nhsuk-frontend/components/do-dont-list/index.html
 *  @author VeryTwisty, NHS Leadership Academy
 *  @version 1.0 Feb 2020
 */

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText, InnerBlocks, URLInput, useBlockProps } = wp.blockEditor;
const { Fragment } = wp.element;

const { TextControl } = wp.components;

import arrow from './arrow';

registerBlockType('nhsblocks/pagination', {
	title: __('Pagination', 'nhsblocks'),
	apiVersion: 3,
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
		const blockProps = useBlockProps({
			className: 'nhsuk-pagination',
		});
		const {
			className,
			isSelected,
			setAttributes,
			attributes: { prevLink, nextLink, prevText, nextText },
		} = props;

		return (
			<nav
				{...blockProps}
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
		const blockProps = useBlockProps.save({
			className: 'nhsuk-pagination',
		});
		const {
			className,
			attributes: { prevLink, nextLink, prevText, nextText },
		} = props;

		return (
			<nav
				{...blockProps}
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
	deprecated: [
		{
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
			save: (props) => {
				const blockProps = useBlockProps.save({
					className: 'nhsuk-pagination',
				});
				const {
					className,
					attributes: { prevLink, nextLink, prevText, nextText },
				} = props;

				return (
					<nav
						{...blockProps}
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
									<svg
										xmlns="http://www.w3.org/2000/svg"
										ariaHidden="true"
										className="nhsuk-icon nhsuk-icon__arrow-left"
										viewBox="0 0 24 24"
									>
										<path d="M4.1 12.3l2.7 3c.2.2.5.2.7 0 .1-.1.1-.2.1-.3v-2h11c.6 0 1-.4 1-1s-.4-1-1-1h-11V9c0-.2-.1-.4-.3-.5h-.2c-.1 0-.3.1-.4.2l-2.7 3c0 .2 0 .4.1.6z"></path>
									</svg>
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
									<svg
										xmlns="http://www.w3.org/2000/svg"
										ariaHidden="true"
										className="nhsuk-icon nhsuk-icon__arrow-right"
										viewBox="0 0 24 24"
									>
										<path d="M19.6 11.66l-2.73-3A.51.51 0 0016 9v2H5a1 1 0 000 2h11v2a.5.5 0 00.32.46.39.39 0 00.18 0 .52.52 0 00.37-.16l2.73-3a.5.5 0 000-.64z"></path>
									</svg>
								</a>
							</li>
						</ul>
					</nav>
				);
			},
		},
	],

});
