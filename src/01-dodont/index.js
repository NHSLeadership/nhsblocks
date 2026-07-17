/**
 * Do / Dont listing
 *
 *  @reference: https://nhsuk.github.io/nhsuk-frontend/components/do-dont-list/index.html
 *  @author Tony Blacker, NHS Leadership Academy
 *  @version 1.0 22nd July 2019
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText, InnerBlocks, useBlockProps } = wp.blockEditor;

registerBlockType('nhsblocks/dodont', {
	title: __("Do and Don't List", 'nhsblocks'),
	apiVersion: 3,
	category: 'nhsblocks',
	icon: 'yes-alt',
	example: {
		attributes: {
			panelTitle: 'Do and Dont List',
		},
		innerBlocks: [
			{
				name: 'nhsblocks/doitem',
				attributes: {
					panelText: 'This is an item to definitely do',
				},
			},
			{
				name: 'nhsblocks/dontitem',
				attributes: {
					panelText: 'This is an item to definitely NOT do',
				},
			},
		],
	},
	attributes: {
		panelTitle: {
			type: 'string',
			source: 'html',
			selector: 'h3',
		},
	},

	edit: (props) => {
		const {
			attributes: { panelTitle },
			setAttributes,
		} = props;

		const blockProps = useBlockProps({
			className: 'nhsuk-do-dont-list',
		});

		const onChangePanelTitle = (newPanelTitle) => {
			setAttributes({ panelTitle: newPanelTitle });
		};

		const ALLOWED_BLOCKS = [];

		return (
			<div {...blockProps}>
				<h3 className="nhsuk-do-dont-list__label">
					<RichText
						placeholder={__('Panel Title', 'nhsblocks')}
						value={panelTitle}
						onChange={onChangePanelTitle}
					/>
				</h3>
				<ul className="nhsuk-list nhsuk-list--cross">
					<InnerBlocks allowedBlocks={ALLOWED_BLOCKS} />
				</ul>
			</div>
		);
	},
	save: (props) => {
		const {
			attributes: { panelTitle },
		} = props;

		const blockProps = useBlockProps.save({
			className: 'nhsuk-do-dont-list',
		});

		return (
			<div {...blockProps}>
				<h3 className="nhsuk-do-dont-list__label">
					<RichText.Content value={panelTitle} />
				</h3>
				<ul className="nhsuk-list nhsuk-list--cross">
					<InnerBlocks.Content />
				</ul>
			</div>
		);
	},
});

registerBlockType('nhsblocks/doitem', {
	title: __('List Item with Tick', 'nhsblocks'),
	apiVersion: 3,
	category: 'nhsblocks',
	icon: 'yes',
	parent: ['nhsblocks/dodont'],
	attributes: {
		panelText: {
			type: 'string',
			source: 'html',
			selector: 'span',
		},
	},

	edit: (props) => {

		const blockProps = useBlockProps();

		// Lift info from props and populate various constants.
		const {
			attributes: { panelText },
			setAttributes,
		} = props;

		// Grab newPanelText, set the value of panelText to newPanelText.
		const onChangePanelText = (newPanelText) => {
			setAttributes({ panelText: newPanelText });
		};

		return (
			<li {...blockProps}>
				<svg
					className="nhsuk-icon nhsuk-icon__tick"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					aria-hidden="true"
				>
					<path
						strokeWidth="4"
						strokeLinecap="round"
						d="M18.4 7.8l-8.5 8.4L5.6 12"
					></path>
				</svg>
				<span>
					<RichText
						placeholder={__('Text', 'nhsblocks')}
						value={panelText}
						onChange={onChangePanelText}
					/>
				</span>
			</li>
		);
	},
	save: (props) => {
		// console.info(props);
		const blockProps = useBlockProps.save();

		const {
			attributes: { panelText },
		} = props;

		return (
			<li {...blockProps}>
				<svg
					className="nhsuk-icon nhsuk-icon__tick"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					aria-hidden="true"
				>
					<path
						strokeWidth="4"
						strokeLinecap="round"
						d="M18.4 7.8l-8.5 8.4L5.6 12"
					></path>
				</svg>
				<span>
					<RichText.Content value={panelText} />
				</span>
			</li>
		);
	},
});

registerBlockType('nhsblocks/dontitem', {
	title: __('List Item with Cross', 'nhsblocks'),
	apiVersion: 3,
	category: 'nhsblocks',
	icon: 'no-alt',
	parent: ['nhsblocks/dodont'],
	attributes: {
		panelText: {
			type: 'string',
			source: 'html',
			selector: 'span',
		},
	},

	edit: (props) => {
		const blockProps = useBlockProps();
		// Lift info from props and populate various constants.
		const {
			attributes: { panelText },
			setAttributes,
		} = props;

		// Grab newPanelText, set the value of panelText to newPanelText.
		const onChangePanelText = (newPanelText) => {
			setAttributes({ panelText: newPanelText });
		};

		return (
			<li {...blockProps}	>
				<svg
					className="nhsuk-icon nhsuk-icon__cross"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					aria-hidden="true"
				>
					<path d="M17 18.5c-.4 0-.8-.1-1.1-.4l-10-10c-.6-.6-.6-1.6 0-2.1.6-.6 1.5-.6 2.1 0l10 10c.6.6.6 1.5 0 2.1-.3.3-.6.4-1 .4z"></path>
					<path d="M7 18.5c-.4 0-.8-.1-1.1-.4-.6-.6-.6-1.5 0-2.1l10-10c.6-.6 1.5-.6 2.1 0 .6.6.6 1.5 0 2.1l-10 10c-.3.3-.6.4-1 .4z"></path>
				</svg>
				<span>
					<RichText
						placeholder={__('Text', 'nhsblocks')}
						value={panelText}
						onChange={onChangePanelText}
					/>
				</span>
			</li>
		);
	},
	save: (props) => {
		// console.info(props);
   		const blockProps = useBlockProps.save();

		const {
			attributes: { panelText },
		} = props;

		return (
			<li {...blockProps}>
				<svg
					className="nhsuk-icon nhsuk-icon__cross"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					aria-hidden="true"
				>
					<path d="M17 18.5c-.4 0-.8-.1-1.1-.4l-10-10c-.6-.6-.6-1.6 0-2.1.6-.6 1.5-.6 2.1 0l10 10c.6.6.6 1.5 0 2.1-.3.3-.6.4-1 .4z"></path>
					<path d="M7 18.5c-.4 0-.8-.1-1.1-.4-.6-.6-.6-1.5 0-2.1l10-10c.6-.6 1.5-.6 2.1 0 .6.6.6 1.5 0 2.1l-10 10c-.3.3-.6.4-1 .4z"></path>
				</svg>
				<span>
					<RichText.Content value={panelText} />
				</span>
			</li>
		);
	},
});
