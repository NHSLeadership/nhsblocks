const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText, InnerBlocks, MediaUpload, InspectorControls } = wp.editor;
//@todo add in Promo class variations
//@todo add in width variations

registerBlockType("nhsblocks/promo1", {
  title: __("Promo Region", "nhsblocks"),
  category: "nhsblocks",
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
    }
  },

  edit: props => {

    // Lift info from props and populate various constants.
    const {
      attributes: {
        promoTitle,
        promoText
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
      const ALLOWED_BLOCKS = [];
    return (
        <div className="nhsuk-grid-column-size nhsuk-promo-group__item">
          <div className="nhsuk-promo">
            <div class="nhsuk-promo__content">
              <InnerBlocks allowedBlocks={ ALLOWED_BLOCKS } />
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
  );
  },
  save: props => {
    const {
      attributes: {
        promoTitle,
        promoText }
    } = props;

    return (
        <div className="nhsuk-grid-column-size nhsuk-promo-group__item">
          <div className="nhsuk-promo">
            <div class="nhsuk-promo__content">
          <InnerBlocks.Content />
              <h3 class="nhsuk-promo__heading">
                <RichText.Content value={promoTitle} />
              </h3>
              <div className="nhsuk-promo__description">
                  <RichText.Content
                      multiline="p"
                      value={promoText}
                  />
              </div>
            </div>
          </div>
        </div>
    );
  }
});

registerBlockType("nhsblocks/promoimage", {
    title: __("Promo Image", "nhsblocks"),
    parent: ['nhsblocks/promo1'],
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
                <strong>Select a panel image:</strong>
                    <MediaUpload
                        onSelect={onImageSelect}
                        type="image"
                        value={imgUrl}
                        render={({ open }) => (
                            <button onClick={open}>
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
