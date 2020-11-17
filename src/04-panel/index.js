/**
 *  NHS Panel Element
 *  @reference: https://nhsuk.github.io/nhsuk-frontend/components/panel/index.html
 *  @author Tony Blacker, NHS Leadership Academy
 *  @version 1.0 22nd July 2019
 */
const { __ } = wp.i18n
const { registerBlockType } = wp.blocks
const { RichText, InnerBlocks } = wp.blockEditor
//@todo add in Panel class variations
//@todo add in width variations
const TEMPLATE_OPTIONS = [
  ['core/paragraph', { placeholder: 'Panel Text' }],
  ['nhsblocks/nhsbutton', { align: 'right' }],
]
registerBlockType('nhsblocks/panel1', {
  title: __('Panel Region', 'nhsblocks'),
  description: __('By default this block includes a title, block of text and button link. You can remove the button' +
    ' if you wish by clicking it then clicking three dots on the navigation bar at the top of the page then the' +
    ' bin', 'nhsblocks'),
  icon: 'feedback',
  category: 'nhsblocks',
  styles: [
    {
      name: 'default',
      label: __('Plain white panel'),
      isDefault: true
    },
    {
      name: 'panel-grey',
      label: __('Grey')
    },
    {
      name: 'panel-with-label',
      label: __('With Label')
    }
  ],
  example: {
    attributes: {
      panelTitle: 'Example Panel',
      className: 'is-style-panel-grey',
    },
    innerBlocks: [
      {
        name: 'core/paragraph',
        attributes: {
          content: __('This is the content of a panel block, and it has lots of useful information'),
        },
      },
      {
        name: 'nhsblocks/nhsbutton',
        attributes: {
          buttonLabel: 'NHS styled button',
          buttonLink: 'https://www.nhs.uk',
          className: 'is-style-secondary',
          align: 'right',
        },
      },
    ],
  },
  attributes: {
    panelTitle: {
      type: 'string',
      source: 'html',
      selector: '.wp-block-nhsblocks-panel1 h2'
    }
  },

  edit: props => {

    // Lift info from props and populate various constants.
    const {
      attributes: {
        panelTitle
      },
      className,
      setAttributes
    } = props

    // Grab newPanelTitle, set the value of panelTitle to newPanelTitle.
    const onChangePanelTitle = newPanelTitle => {
      setAttributes({ panelTitle: newPanelTitle })
    }

    return (
      <div className = {`${className} nhsuk-card`}>
       <div class='nhsuk-card__content'>
        <h2 >
          < RichText placeholder = { __ ('Panel Title', 'nhsblocks')  } value = { panelTitle } onChange = { onChangePanelTitle } />
        </h2>
        <div className = 'nhsuk-card__description' >
          <InnerBlocks template = { TEMPLATE_OPTIONS } />
        </div>
      </div>
      </div>
    );
  },
  save: props => {
    const {
      attributes: {
        panelTitle, className
      }
    } = props;

    return (
      < div className = {`${className} nhsuk-card`} >
	      < div class='nhsuk-card__content'>
		      < h2 >
		      < RichText.Content value = { panelTitle } />
		      < /h2>
		      < div className = 'nhsuk-card__description' >
		        < InnerBlocks.Content / >
		      < /div>
	      < /div>
	    </div>
    );

  },
  deprecated: [
    {
      attributes: {
        panelTitle: {
          type: "string",
          source: "html",
          selector: "h3"
        }
      },
      save: ( {attributes} ) =>
          <div className = "nhsuk-panel" >
            <h3>
              < RichText.Content value = { attributes.panelTitle } />
            </h3>
            <div className = "paneltext" >
              <InnerBlocks.Content />
            </div>
          </div>,
    }
	]
});
