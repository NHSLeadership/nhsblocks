const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText } = wp.editor;
//@todo add in Expander class option
//console.info(wp.components);

registerBlockType("nhsblocks/quote1", {
  title: __("Simple Quote", "nhsblocks"),
  category: "nhsblocks",
  attributes: {
    quoteName: {
      type: "string",
      source: "html",
      selector: ".nhsuk-inset-text__quote-attribution"
    },
    quoteText: {
        type: "array",
        source: "children",
        multiline: "p",
      selector: ".nhsuk-inset-text__quote"
    },
  },

  edit: props => {

    // Lift info from props and populate various constants.
    const {
      attributes: { quoteName, quoteText },
      className,
      setAttributes
    } = props;

    // Grab newQuoteName, set the value of quoteName to newQuoteName.
    const onChangeQuoteName = newQuoteName => {
      setAttributes({ quoteName: newQuoteName});
    };

    // Grab quoteText, set the value of quoteText to newQuotetext
    const onChangeQuoteText = newQuoteText => {
      setAttributes({ quoteText: newQuoteText });
    };

    return (
        <div className="nhsuk-grid-column-size nhsuk-promo-group__item">
          <div className="nhsuk-inset-text">
              <span className="nhsuk-u-visually-hidden">Quote / Testimonial: </span>
              <div className="nhsuk-inset-text__quote">
                <RichText
                    multiline="p"
                    placeholder={__("Quote", "nhsblocks")}
                    onChange={onChangeQuoteText}
                    value={quoteText}
                />
              </div>
              <span className="nhsuk-inset-text__quote-attribution">
                  <RichText
                      placeholder={__("Quote Name", "nhsblocks")}
                      value={quoteName}
                      onChange={onChangeQuoteName}
                  />
              </span>
          </div>
        </div>
  );
  },
  save: props => {
    const {
      attributes: { quoteName, quoteText }
    } = props;

    return (
        <div className="nhsuk-grid-column-size nhsuk-promo-group__item">
              <div className="nhsuk-inset-text">
                  <span className="nhsuk-u-visually-hidden">Quote / Testimonial: </span>
                  <div className="nhsuk-inset-text__quote">
                      <RichText.Content
                          multiline="p"
                          value={quoteText}
                      />
                  </div>
                  <span className="nhsuk-inset-text__quote-attribution">
                    <RichText.Content value={quoteName} />
                  </span>
              </div>
         </div>
    );
  }
});
