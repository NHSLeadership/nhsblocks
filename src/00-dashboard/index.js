/**
 *  NHS Panel Group Element
 *
 *  @reference: https://nhsuk.github.io/nhsuk-frontend/components/panel/index.html
 *  @author Tony Blacker, NHS Leadership Academy
 *  @version 1.0 22nd July 2019
 */

const { __ } = wp.i18n;
const { registerBlockType, createBlock } = wp.blocks;
const {
	RichText,
	InspectorControls,
	URLInputButton,
	ColorPalette,
	MediaUpload,
	InnerBlocks,
	__experimentalBlockVariationPicker,
} = wp.blockEditor;
const { useDispatch, useSelect } = wp.data;
import { map } from 'lodash';
import * as Templates from './templates.js';

registerBlockType('nhsblocks/dashboardnav', {
	title: __('Dashboard Navigation', 'nhsblocks'),
	category: 'nhsblocks',
	icon: 'tagcloud',
	example: {},
	attributes: {
		template: {
			type: 'array',
		},
	},

	edit: (props) => {
		const { clientId, name } = props;
		const {
			attributes: { template },
			setAttributes,
		} = props;
		const { replaceInnerBlocks } = useDispatch('core/block-editor');

		const ALLOWED_BLOCKS = ['nhsblocks/dashpanel'];
		const { blockType, defaultVariation, hasInnerBlocks, variations } =
			useSelect(
				(select) => {
					const {
						getBlockVariations,
						getBlockType,
						getDefaultBlockVariation,
					} = select('core/blocks');

					return {
						blockType: getBlockType(name),
						defaultVariation: getDefaultBlockVariation(
							name,
							'block'
						),
						hasInnerBlocks:
							select('core/block-editor').getBlocks(clientId)
								.length > 0,
						variations: getBlockVariations(name, 'block'),
					};
				},
				[clientId, name]
			);
		const onChangeLayout = (nextVariation, registry) => {
			if (nextVariation.attributes) {
				props.setAttributes(nextVariation.attributes);
			}
			if (nextVariation.innerBlocks) {
				replaceInnerBlocks(
					props.clientId,
					createBlocksFromInnerBlocksTemplate(
						nextVariation.innerBlocks
					)
				);
			}
		};
		const createBlocksFromInnerBlocksTemplate = (innerBlocksTemplate) => {
			return map(
				innerBlocksTemplate,
				([name, attributes, innerBlocks = []]) =>
					createBlock(
						name,
						attributes,
						createBlocksFromInnerBlocksTemplate(innerBlocks)
					)
			);
		};
		if (hasInnerBlocks) {
			return (
				<div className="nhsuk-grid-row">
					<div className="nhsuk-panel-group nhsuk-grid-column-full nhsuk-dashboard">
						<InnerBlocks template={Templates.GRID_OPTIONS} />
					</div>
				</div>
			);
		}
		return (
			<div className="nhsuk-grid-row">
				<div className="nhsuk-panel-group nhsuk-grid-column-full nhsuk-dashboard">
					<__experimentalBlockVariationPicker
						variations={Templates.GRID_OPTIONS}
						onSelect={(nextVariation) => {
							if (nextVariation.attributes) {
								props.setAttributes(nextVariation.attributes);
							}
							if (nextVariation.innerBlocks) {
								replaceInnerBlocks(
									props.clientId,
									createBlocksFromInnerBlocksTemplate(
										nextVariation.innerBlocks
									)
								);
							}
						}}
					/>
				</div>
			</div>
		);
	},
	save: (props) => {
		const {
			attributes: { template },
		} = props;
		return (
			<div className="nhsuk-grid-row">
				<div className="nhsuk-panel-group nhsuk-dashboard">
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
});

registerBlockType('nhsblocks/dashpanel', {
	title: __('Dashboard Region', 'nhsblocks'),
	description: __(
		'Simple image background with text and link to give Dashboard navigation panel'
	),
	icon: 'feedback',
	category: 'nhsblocks',
	parent: ['nhsblocks/dashboardnav'],

	attributes: {
		panelTitle: {
			type: 'string',
			source: 'html',
			selector: 'h3',
		},
		panelLink: {
			type: 'string',
			source: 'attribute',
			selector: '.nhsuk-promo__link-wrapper',
			attribute: 'href',
		},
		backgroundImage: {
			type: 'string',
			default: '/wp-content/plugins/nhsblocks/assets/pixel_trans.png',
		},
		overlayColor: {
			type: 'string',
			default: '#ffffff',
		},
	},

	edit: (props) => {
		// Lift info from props and populate various constants.

		const { setAttributes, attributes, className } = props;
		const { overlayColor, backgroundImage, panelTitle, panelLink } =
			attributes;
		// Grab newPanelLink, set the value of panelLink to newPanelLink.
		const onChangePanelLink = (newPanelLink) => {
			setAttributes({ panelLink: newPanelLink });
		};

		function onOverlayColorChange(changes) {
			setAttributes({
				overlayColor: changes,
			});
		}
		function onImageSelect(imageObject) {
			setAttributes({
				backgroundImage: imageObject.sizes.full.url,
			});
		}

		// Grab newPanelTitle, set the value of panelTitle to newPanelTitle.
		const onChangePanelTitle = (newPanelTitle) => {
			setAttributes({ panelTitle: newPanelTitle });
		};

		return [
			<InspectorControls>
				<div>
					<strong>Add a link for this panel</strong>
					<URLInputButton
						className="nhsblocks-dropdown__input"
						label={__('Dashboard Link', 'nhsblocks')}
						onChange={onChangePanelLink}
						url={panelLink}
					/>
				</div>
				<div>
					<strong>Select a background image:</strong>
					<MediaUpload
						onSelect={onImageSelect}
						type="image"
						value={backgroundImage}
						render={({ open }) => (
							<button
								className="button button-primary button-hero"
								onClick={open}
							>
								Upload Image!
							</button>
						)}
					/>
				</div>
				<div>
					<strong>OR</strong> Select a background color: <br />
					<i>(this will be ignored if you choose an image above)</i>
					<ColorPalette
						value={overlayColor}
						onChange={onOverlayColorChange}
					/>
				</div>
			</InspectorControls>,
			<div className={`${className} nhsuk-panel-group__item`}>
				<div
					className="nhsuk-panel-with-label"
					style={{
						backgroundColor: `${overlayColor}`,
						backgroundImage: `url(${backgroundImage})`,
						backgroundSize: 'cover',
						backgroundPosition: 'center',
					}}
				>
					<h3 className="nhsuk-panel-with-label__label">
						<RichText
							placeholder={__('Panel Title', 'nhsblocks')}
							value={panelTitle}
							onChange={onChangePanelTitle}
						/>
					</h3>
					<img
						src="/wp-content/plugins/nhsblocks/assets/pixel_trans.png"
						className="nhsuk-dashboard__image"
						alt=""
					/>
				</div>
			</div>,
		];
	},
	save: (props) => {
		// console.info(props);

		const {
			attributes: {
				overlayColor,
				backgroundImage,
				panelTitle,
				panelLink,
			},
		} = props;

		return (
			<div className="nhsuk-panel-group__item">
				<a href={panelLink} className="nhsuk-promo__link-wrapper">
					<div
						className="nhsuk-panel-with-label"
						style={{
							backgroundImage: `url(${backgroundImage})`,
							backgroundSize: 'cover',
							backgroundPosition: 'center',
							backgroundColor: `${overlayColor}`,
						}}
					>
						<h3 className="nhsuk-panel-with-label__label">
							<RichText.Content value={panelTitle} />
						</h3>
						<img
							src="/wp-content/plugins/nhsblocks/assets/pixel_trans.png"
							className="nhsuk-dashboard__image"
							alt={panelTitle}
						/>
					</div>
				</a>
			</div>
		);
	},
	deprecated: [
		{
			attributes: {
				panelTitle: {
					type: 'string',
					source: 'html',
					selector: 'h3',
				},
				panelLink: {
					type: 'string',
					source: 'attribute',
					selector: '.nhsuk-promo__link-wrapper',
					attribute: 'href',
				},
				backgroundImage: {
					type: 'string',
					default:
						'/wp-content/plugins/nhsblocks/assets/pixel_trans.png',
				},
				overlayColor: {
					type: 'string',
					default: '#ffffff',
				},
			},
			save: ({ attributes }) => (
				<div className="nhsuk-panel-group__item">
					<a
						href={attributes.panelLink}
						className="nhsuk-promo__link-wrapper"
					>
						<div
							className="nhsuk-panel-with-label"
							style={{
								backgroundImage: `url(${attributes.backgroundImage})`,
								backgroundSize: 'cover',
								backgroundPosition: 'center',
								backgroundColor: `${attributes.overlayColor}`,
							}}
						>
							<h3 className="nhsuk-panel-with-label__label">
								`${attributes.panelTitle}`
							</h3>
							<img
								src="/wp-content/themes/nightingale-2-0/assets/pixel_trans.png"
								className="nhsuk-dashboard__image"
								alt=""
							/>
						</div>
					</a>
				</div>
			),
		},
	],
});
