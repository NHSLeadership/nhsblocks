import logoWhiteURL from "../../../podkit/src/bv-logo-white.svg";

/**
 *  NHS Promo / Call out  Element
 *  @reference: https://nhsuk.github.io/nhsuk-frontend/components/promo/index.html
 *  @author Tony Blacker, NHS Leadership Academy
 *  @version 1.0 22nd July 2019
 */

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const {  URLInputButton, RichText, InnerBlocks, MediaUpload, InspectorControls, BlockControls } = wp.editor;
const { SelectControl, PanelBody } = wp.components;
//@todo add in Promo class variations
//@todo add in width variations

registerBlockType("nhsblocks/promogroup", {
    title: __("Promo Group", "nhsblocks"),
    description: __("Add your promo items in here - as many as you like. Just remember if you set widths on them, the total of each row should add up to a full width", "nhsblocks"),
    category: "nhsblocks",

    edit: props => {
        const ALLOWED_BLOCKS_OUTER = [];
        return (
            <div className="nhsuk-grid-row">
                <div className="nhsuk-grid-column-full">
                    <div className="nhsuk-grid-row nhsuk-promo-group">
                        <InnerBlocks allowedBlocks={ ALLOWED_BLOCKS_OUTER } />
                    </div>
                </div>
            </div>
        )

    },
    save: props => {
        return (
        <div className="nhsuk-grid-row">
            <div className="nhsuk-grid-column-full">
                <div className="nhsuk-grid-row nhsuk-promo-group">
                     <InnerBlocks.Content />
                </div>
            </div>
        </div>
    )
    }
})

registerBlockType("nhsblocks/promo2", {
  title: __("Promo Region", "nhsblocks"),
  category: "nhsblocks",
    parent: ['nhsblocks/promogroup'],
  attributes: {
    promoTitle: {
      type: "string",
      source: "html",
      selector: ".nhsuk-promo__heading"
    },
    promoText: {
      type: "string",
      source: "html",
      selector: ".nhsuk-promo__description"
    },
      promoLink: {
          type: "string",
          source: "attribute",
          selector: ".nhsuk-promo a",
          attribute: "href"
      },
      promoImg: {
        type: "string",
        source: "html",
        selector: ".nhsuk-promo-img"
      },
      columnWidth: {
        type: "string",
        default: 'nhsuk-grid-column-full nhsuk-promo-group__item'
      }
  },

  edit: props => {

    // Lift info from props and populate various constants.
    const {
      attributes: {
        promoTitle,
        promoText,
        promoLink,
        columnWidth,
      },
      className,
      setAttributes
    } = props;

    // Grab newPromoTitle, set the value of promoTitle to newPromoTitle.
    const onChangePromoTitle = newPromoTitle => {
      setAttributes({ promoTitle: newPromoTitle });
    };

    // Grab newPromoText, set the value of promoText to newPromoText.
    const onChangePromoText = newPromoText => {
      setAttributes({ promoText: newPromoText });
    };

      // Grab newPromoLink, set the value of promoLink to newPromoLink.
      const onChangePromoLink = newPromoLink => {
          setAttributes({ promoLink: newPromoLink });
      };
      const onChangeColumnWidth = newColumnWidth => {
          setAttributes({ columnWidth: newColumnWidth });
      };

      const ALLOWED_BLOCKS = [];
      const wrapStyle = {
          float: 'inherit',
          display: 'inline-block'
      }

    return [
        <InspectorControls>
          <PanelBody title="Column Width"
              icon="welcome-widgets-menus"
              initialOpen={ true }
          >
            <SelectControl
              label="Column Width"
              value={ columnWidth }
              options={ [
                  { label: 'Full Width', value: 'nhsuk-grid-column-full nhsuk-promo-group__item' },
                  { label: 'Half Width', value: 'nhsuk-grid-column-one-half nhsuk-promo-group__item' },
                  { label: 'One Third Width', value: 'nhsuk-grid-column-one-third nhsuk-promo-group__item' },
                  { label: 'Two Thirds Width', value: 'nhsuk-grid-column-two-thirds nhsuk-promo-group__item' },
                ] }
                onChange={ onChangeColumnWidth }
            />
          </PanelBody>
        </InspectorControls>,
        <div  className={`${className} ${columnWidth}`} style={wrapStyle}>
          <div className="nhsuk-promo">
            <div class="nhsuk-promo__content">
              <URLInputButton
                  className="nhsblocks-dropdown__input"
                  label={__("Panel Link", "nhsblocks")}
                  onChange={onChangePromoLink}
                  url={promoLink}
              />
              <InnerBlocks allowedBlocks={ ALLOWED_BLOCKS} />
                <h3 class="nhsuk-promo__heading">
                  <RichText
                      placeholder={__("Promo Title", "nhsblocks")}
                      value={promoTitle}
                      onChange={onChangePromoTitle}
                  />
                </h3>
                <div className="nhsuk-promo__description">
                  <RichText
                      multiline="p"
                      placeholder={__("Promo Contents", "nhsblocks")}
                      onChange={onChangePromoText}
                      value={promoText}
                  />

                </div>
            </div>
          </div>
      </div>
  ];
  },
  save: props => {
    const {
      attributes: {
        promoTitle,
        promoText,
        promoLink,
        columnWidth},
      className,
      setAttributes
    } = props;


    return (
        <div className={`${className} ${columnWidth}`}>
          <div className="nhsuk-promo">
          <a href={promoLink} className="nhsuk-promo__link-wrapper">
            <div class="nhsuk-promo__content">
          <InnerBlocks.Content />
              <h3 className="nhsuk-promo__heading">
                <RichText.Content value={promoTitle} />
              </h3>
              <div className="nhsuk-promo__description">
                  <RichText.Content
                      multiline="p"
                      value={promoText}
                  />
              </div>
            </div>
                      </a>
          </div>
        </div>
    );
  }
});

registerBlockType("nhsblocks/promoimage2", {
    title: __("Promo Image", "nhsblocks"),
    parent: ['nhsblocks/promo2'],
    category: "nhsblocks", // this is an inner block, we dont want it available by itself
    attributes: {
        imgUrl: {
            type: 'string',
            default: null,
        }
    },
    edit: props => {
        const {
            attributes: {
                imgUrl
            },
            className,
            setAttributes
        } = props;
        function onImageSelect(imageObject) {
            setAttributes({
                imgUrl: imageObject.sizes.full.url
            })
        }

        return [
            <InspectorControls>
                <div>
                <strong>Select a panel image:</strong><br />
                    <MediaUpload
                        onSelect={onImageSelect}
                        type="image"
                        value={imgUrl}
                        render={({ open }) => (
                            <button className="nhsuk-button" onClick={open}>
                                Upload Image!
                            </button>
                        )}
                    />
                </div>
            </InspectorControls>,
                        <div className="imagewrapper">
                    <img className="nhsuk-promo__img" src={imgUrl} />
        </div>
        ];
    },
    save(props) {
        const {
            attributes: {
                imgUrl
            },
            className,
            setAttributes
        } = props;

        return (
            <img className="nhsuk-promo__img" src={imgUrl} />
    );
    },
});
