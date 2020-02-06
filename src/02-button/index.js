/**
 * NHS Styled Buttons
 *  @reference: https://nhsuk.github.io/nhsuk-frontend/components/button/index.html
 *  @author Tony Blacker, NHS Leadership Academy
 *  @version 1.0 22nd July 2019
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const {
    RichText,
    InspectorControls,
    URLInputButton } = wp.blockEditor;
//@todo align
//@todo extended classes

registerBlockType("nhsblocks/nhsbutton", {
  title: __("Button", "nhsblocks"),
  category: "nhsblocks",
  icon: "admin-links",
  styles: [
    {
      name: "green",
      label: __("Standard (Green)"),
      isDefault: true
    },
    {
      name: "secondary",
      label: __("Secondary (Grey)")
    },
      {
          name: "reverse",
          label: __("Reverse (White)")
      }
  ],
  supports: {
      align: true,
  },
  attributes: {
      buttonLabel: {
          type: "string",
          source: "html",
          selector: ".nhsuk-button",
          default: __( 'Button title', 'nhsblocks' )
      },
      buttonLink: {
          type: "string",
          source: "attribute",
          selector: "a.nhsuk-button",
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

        return ([
            <InspectorControls>
            <div>
            <strong>Add a link for this button</strong>
        <URLInputButton
        className="nhsblocks-dropdown__input"
        label={__("Button URL", "nhsblocks")}
        onChange={onChangeButtonLink}
        url={buttonLink}
        />
        </div>
        </InspectorControls>,
            <div className={`${className} nhsuk-button`}>
            <RichText
              value={buttonLabel}
              onChange={onChangeButtonLabel}
            />
            </div>
  ]);
  },
  save: props => {
    const {
      attributes: {
          buttonLabel, buttonLink
      }
    } = props;
     // console.info(props);
    return (
          <a href={buttonLink} className="nhsuk-button">
            <RichText.Content value={buttonLabel} />
          </a>
    )
  }
});
