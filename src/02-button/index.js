const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const {
    RichText,
    URLInputButton } = wp.editor;
//@todo align
//@todo extended classes

registerBlockType("nhsblocks/nhsbutton", {
  title: __("Button", "nhsblocks"),
  category: "nhsblocks",
  attributes: {
      buttonLabel: {
          type: "string",
          source: "html",
          selector: ".nhsuk-button"
      },
      buttonLink: {
          type: "string",
          source: "attribute",
          selector: ".wp-block-nhsblocks-nhsbutton a",
          attribute: "href"
      },
  },

    // https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-edit-save/
    edit: props => {
    // Props parameter holds all the info.
    //console.info(props);

    // Lift info from props and populate various constants.
    const {
      attributes: {
        buttonLabel,
        buttonLink
      },
      className,
      setAttributes
    } = props;

    // Grab newButtonLabel, set the value of buttonLabel to newButtonLabel.
    const onChangeButtonLabel = newButtonLabel => {
      setAttributes({ buttonLabel: newButtonLabel});
    };
    // Grab newButtonLink, set the value of buttonLink to newButtonLink.
    const onChangeButtonLink = newButtonLink => {
      setAttributes({ buttonLink: newButtonLink });
    };

    return (
        <div className={`${className} something`}>
            <a href="#0" className="nhsuk-button">
            <RichText
              placeholder={__("Button Label", "nhsblocks")}
              value={buttonLabel}
              onChange={onChangeButtonLabel}
            />
            </a>
            <URLInputButton
              className="nhsblocks-dropdown__input"
              label={__("Button URL", "nhsblocks")}
              onChange={onChangeButtonLink}
              url={buttonLink}
            />
        </div>
  )
  },
  save: props => {
    const {
      attributes: {
          buttonLabel, buttonLink
      }
    } = props;
     // console.info(props);
    return (
        <div className="wp-block-nhsblocks-nhsbutton">
          <a href={buttonLink} className="nhsuk-button">
            <RichText.Content value={buttonLabel} />
          </a>
        </div>
    )
  }
});
