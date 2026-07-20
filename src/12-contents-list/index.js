/**
 *  NHS Contents List  Element
 *
 *  @reference: https://nhsuk.github.io/nhsuk-frontend/components/contents-list/index.html
 *  @author Tony Blacker, NHS Leadership Academy
 *  @version 1.0 22nd July 2019
 */

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

const { RichText, URLInput, InnerBlocks, useBlockProps } = wp.blockEditor;

const { Fragment } = wp.element;

const { TextControl } = wp.components;

// Register Block

registerBlockType('nhsblocks/contentslist', {
	title: __('Contents List', 'nhsblocks'),
	apiVersion: 3,
	description: __(
		'Use contents lists to allow users to navigate between related pages, for example about a single condition.',
		'nhsblocks'
	),
	category: 'nhsblocks',
	icon: 'editor-ul',
	keywords: [
		__('Contents List', 'nhsblocks'),
		__('Navigation', 'nhsblocks'),
		__('Related pages', 'nhsblocks'),
	],
	example: {
		innerBlocks: [
			{
				name: 'nhsblocks/contentslistitem',
				attributes: {
					text: 'About',
					url: '#',
				},
			},
			{
				name: 'nhsblocks/contentslistitem',
				attributes: {
					text: 'Symptoms',
					url: '#',
				},
			},
			{
				name: 'nhsblocks/contentslistitem',
				attributes: {
					text: 'When to see a doctor',
					url: '#',
				},
			},
		],
	},
	edit: (props) => {
		const blockProps = useBlockProps({
			className: 'nhsuk-contents-list',
		});
		const {
			className,
			setAttributes,
			attributes: { title },
		} = props;
		const TEMPLATE_OPTIONS = [['nhsblocks/contentslistitem', {}]];
		const ALLOWED_BLOCKS = ['nhsblocks/contentslistitem'];

		return (
			<nav
				{...blockProps}
				role="navigation"
				aria-label="Pages in this guide"
			>
				<h2 className="nhsuk-u-visually-hidden">
					{__('Contents', 'nhsblocks')}
				</h2>
				<ol className="nhsuk-contents-list__list">
					<InnerBlocks
						template={TEMPLATE_OPTIONS}
						allowedBlocks={ALLOWED_BLOCKS}
					/>
				</ol>
			</nav>
		);
	},
	save: (props) => {
		const blockProps = useBlockProps.save({
			className: 'nhsuk-contents-list',
		});
		return (
			<nav
				{...blockProps}
				role="navigation"
				aria-label="Pages in this guide"
			>
				<h2 className="nhsuk-u-visually-hidden">
					{__('Contents', 'nhsblocks')}
				</h2>
				<ol className="nhsuk-contents-list__list">
					<InnerBlocks.Content />
				</ol>
			</nav>
		);
	},
});

registerBlockType('nhsblocks/contentslistitem', {
	title: __('Contents List Item', 'nhsblocks'),
	apiVersion: 3,
	description: __('List Item to go into the contents list', 'nhsblocks'),
	category: 'nhsblocks',
	icon: 'editor-ul',
	parent: ['nhsblocks/contentslist'],
	attributes: {
		text: {
			type: 'string',
			source: 'html',
			selector: '.pagename',
		},
		url: {
			type: 'string',
			source: 'attribute',
			attribute: 'href',
			selector: 'a',
		},
	},
	edit: (props) => {
		const blockProps = useBlockProps({
			className: 'nhsuk-contents-list__item',
		});
		const {
			className,
			setAttributes,
			isSelected,
			attributes: { text, url },
		} = props;
		return (
			<li {...blockProps}>
				{isSelected ? (
					<div>
						<TextControl
							id="example-input-field"
							label={(__('Link Text'), 'nhsblocks')}
							value={text}
							onChange={(text) => setAttributes({ text })}
						/>

						<URLInput
							className="nhsuk-contents-list__link"
							value={url}
							onChange={(url) => setAttributes({ url })}
							placeholder="Page Link (start typing to choose link)"
						/>
					</div>
				) : (
					<Fragment>
						{url ? (
							<a
								className="nhsuk-contents-list__link"
								href={url}
							>
								{text}
							</a>
						) : (
							<span className="nhsuk-contents-list__current">
								{text}
							</span>
						)}
					</Fragment>
				)}
			</li>
		);
	},
	save: (props) => {
		const {
			attributes: { text, url },
		} = props;

		return (
			<Fragment>
				{url ? (
					<li className="nhsuk-contents-list__item">
						<a
							className="pagename nhsuk-contents-list__link"
							href={url}
						>
							{text}
						</a>
					</li>
				) : (
					<li
						className="nhsuk-contents-list__item"
						aria-current="page"
					>
						<span className="pagename nhsuk-contents-list__current">
							{text}
						</span>
					</li>
				)}
			</Fragment>
		);
	},
});
