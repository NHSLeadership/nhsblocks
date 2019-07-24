/**
 *  NHS Panel Element
 *  @reference: https://nhsuk.github.io/nhsuk-frontend/components/panel/index.html
 *  @author Tony Blacker, NHS Leadership Academy
 *  @version 1.0 22nd July 2019
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText } = wp.editor;
//@todo add in Panel class variations
//@todo add in width variations

registerBlockType("nhsblocks/panel1", {
  title: __("Panel Region", "nhsblocks"),
  category: "nhsblocks",
  attributes: {
    panelTitle: {
      type: "string",
      source: "html",
      selector: "h3"
    },
    panelText: {
      type: "array",
      source: "children",
      multiline: "p",
      selector: ".paneltext"
    }
  },

  edit: props => {

    // Lift info from props and populate various constants.
    const {
      attributes: {
        panelTitle,
        panelText
      },
      className,
      setAttributes
    } = props;

    // Grab newPanelTitle, set the value of panelTitle to newPanelTitle.
    const onChangePanelTitle = newPanelTitle => {
      setAttributes({ panelTitle: newPanelTitle });
    };


    // Grab newPanelText, set the value of panelText to newPanelText.
    const onChangePanelText = newPanelText => {
      setAttributes({ panelText: newPanelText });
    };

    return (
        <div className={`${className}`}>
          <div className="nhsuk-panel">
            <h3>
              <RichText
                placeholder={__("Panel Title", "nhsblocks")}
                value={panelTitle}
                onChange={onChangePanelTitle}
              />
            </h3>
            <div className="paneltext">
              <RichText
                multiline="p"
                placeholder={__("Panel Contents", "nhsblocks")}
                onChange={onChangePanelText}
                value={panelText}
              />
            </div>
          </div>
        </div>
  );
  },
  save: props => {
     // console.info(props);

      const {
      attributes: {
        panelTitle,
        panelText }
    } = props;

    return (
        <div className="nhsuk-grid-column-size">
          <div className="nhsuk-panel">
            <h3>
              <RichText.Content value={panelTitle} />
            </h3>
            <div className="paneltext">
            <RichText.Content
              multiline="p"
              value={panelText}
            />
            </div>
          </div>
        </div>
    );
  }
});
// button variations
wp.blocks.registerBlockStyle ('nhsblocks/panel1',
    {
        name: 'default',
        label: 'Plain white panel',
        isDefault: true
    }
);
wp.blocks.registerBlockStyle ('nhsblocks/panel1',
    {
        name: 'panel-grey',
        label: 'Grey'
    }
);
wp.blocks.registerBlockStyle ('nhsblocks/panel1',
    {
        name: 'panel-with-label',
        label: 'With Label'
    }
);
