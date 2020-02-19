const { addFilter } = wp.hooks;
const { RichText, getColorClassName } = wp.editor;

import classnames from 'classnames';
import { isEmpty } from 'lodash';


addFilter(
	"blocks.getSaveElement",
	"NHS-blocks/filterImage",
	modifyImageSave
);

addFilter(
	"blocks.getSaveElement",
	"NHS-blocks/filterTable",
	modifyTableSave
);


function modifyImageSave( element, blockType, attributes  ) {

	if (blockType.name !== 'core/image') return element;

	const {
		url,
		alt,
		caption,
		align,
		href,
		rel,
		linkClass,
		width,
		height,
		id,
		linkTarget,
		sizeSlug,
		title,
	} = attributes;

	const newRel = isEmpty( rel ) ? undefined : rel;
	const nhsname = 'nhsuk-image';

	const classes = classnames( 'nhsuk-image', {
		[ `align${ align }` ]: align,
		[ `size-${ sizeSlug }` ]: sizeSlug,
		'is-resized': width || height
	} );

	const image = (
		<img
			src={ url }
			alt={ alt }
			className="nhsuk-image__img"
			width={ width }
			height={ height }
			title={ title }
		/>
	);

	const figure = (
		<>
			{ href ? (
				<a
					className={ linkClass }
					href={ href }
					target={ linkTarget }
					rel={ newRel }
				>
					{ image }
				</a>
			) : (
				image
			) }
			{ ! RichText.isEmpty( caption ) && (
				<RichText.Content tagName="figcaption" value={ caption } />
			) }
		</>
	);

	if ( 'left' === align || 'right' === align || 'center' === align ) {
		return (
			<div>
				<figure className={ classes }>{ figure }</figure>
			</div>
		);
	}

	return <figure className="nhsuk-image">{ figure }</figure>;

}

function modifyTableSave( element, blockType, attributes  ) {

	if (blockType.name !== 'core/table') return element;

	const {
		hasFixedLayout,
		head,
		body,
		foot,
		backgroundColor,
		caption,
	} = attributes;
	const isEmpty = ! head.length && ! body.length && ! foot.length;

	if ( isEmpty ) {
		return null;
	}

	const backgroundClass = getColorClassName(
		'background-color',
		backgroundColor
	);

	const classes = classnames( backgroundClass, 'nhsuk-table', {
		'has-fixed-layout': hasFixedLayout,
		'has-background': !! backgroundClass,
	} );

	const hasCaption = ! RichText.isEmpty( caption );

	const Section = ( { type, rows } ) => {
		if ( ! rows.length ) {
			return null;
		}

		const Tag = `t${ type }`;

		return (
			<Tag>
				{ rows.map( ( { cells }, rowIndex ) => (
					<tr key={ rowIndex }>
						{ cells.map(
							( { content, tag, scope, align }, cellIndex ) => {
								const cellClasses = classnames( {
									[ `has-text-align-${ align }` ]: align,
								} );

								return (
									<RichText.Content
										className={
											cellClasses
												? cellClasses
												: undefined
										}
										data-align={ align }
										tagName={ tag }
										value={ content }
										key={ cellIndex }
										scope={
											tag === 'th' ? scope : undefined
										}
									/>
								);
							}
						) }
					</tr>
				) ) }
			</Tag>
		);
	};

	return (
		<div className="nhsuk-table-responsive">
			<table className={ classes === '' ? undefined : classes }>
				{ hasCaption && (
					<RichText.Content tagName="figcaption" className="nhsuk-table__caption" value={ caption } />
				) }
				<Section type="head" rows={ head } />
				<Section type="body" rows={ body } />
				<Section type="foot" rows={ foot } />
			</table>
			
		</div>
	);

}