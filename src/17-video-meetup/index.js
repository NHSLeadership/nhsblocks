/**
 *  Jitsi Meetup Block
 *  @reference: https://nhsuk.github.io/nhsuk-frontend/components/details/jitsi_meetup.html
 *  @author Marcin Calka, NHS Leadership Academy
 *  @version 1.0
 */
const {__} = wp.i18n;
const {registerBlockType} = wp.blocks;
const {RichText, InspectorControls} = wp.blockEditor;
var userFulName = wp.data.select("core").getEntityRecords('user', 'user');

var _wp$element = wp.element;
var Component = _wp$element.Component;
var Fragment = _wp$element.Fragment;

var _wp$components = wp.components;
var PanelBody = _wp$components.PanelBody;
var TextControl = _wp$components.TextControl;
var RangeControl = _wp$components.RangeControl;
var defaultName = Math.random().toString(36).substring(2, 15);
var defaultPassword = Math.random().toString(36).substring(2, 15);

registerBlockType("nhsblocks/videomeetup", {
    title: __("Video Meetup", "nhsblocks"),
    category: "nhsblocks",
    icon: "video-alt",
    styles: [],
    keywords: [__('jitsi', 'video-meetup'), __('jitsi', 'video-meetup')],
    example: {
        attributes: {
            roomname: defaultName,
            password: '',
            domainname: "meet.jit.si",
            width: 700,
            height: 500,
        }
    },
    attributes: {
        domainname: {
            type: "string",
            default: "meet.jit.si"
        },
        roomname: {
            type: 'string',
            default: defaultName
        },
        password: {
            type: 'string',
            default: defaultPassword
        },
        width: {
            type: 'number',
            default: 700
        },
        height: {
            type: 'number',
            default: 500
        }
    },
    supports: {
        html: true
    },
    edit: function edit(props) {
        const {
            setAttributes
        } = props;
        var _props$attributes = props.attributes,
            domainname = _props$attributes.domainname,
            roomname = _props$attributes.roomname,
            password = _props$attributes.password,
            width = _props$attributes.width,
            height = _props$attributes.height;

        return wp.element.createElement(Fragment, null, wp.element.createElement(InspectorControls, null, wp.element.createElement(PanelBody, {
                title: __('Settings'),
                initialOpen: true
            },
            wp.element.createElement(TextControl, {
                label: __('Jitsi Domain Name'),
                value: domainname,
                onChange: function onChange(val) {
                    return setAttributes({
                        domainname: val
                    });
                }
            }),
            wp.element.createElement(TextControl, {
                label: __('Room Name'),
                value: roomname,
                onChange: function onChange(val) {
                    return setAttributes({
                        roomname: val
                    });
                }
            }),
            wp.element.createElement(TextControl, {
                label: __('Password'),
                value: password,
                onChange: function onChange(val) {
                    return setAttributes({
                        password: val
                    });
                }
            }),
            wp.element.createElement(RangeControl, {
                label: __('Screen Width'),
                value: width,
                onChange: function onChange(val) {
                    return setAttributes({
                        width: val
                    });
                },
                min: 50,
                max: 2048,
                step: 50
            }),
            wp.element.createElement(RangeControl, {
                label: __('Screen Height'),
                value: height,
                onChange: function onChange(val) {
                    return setAttributes({
                        height: val
                    });
                },
                min: 50,
                max: 2048,
                step: 50
            }))), wp.element.createElement("div", {
            className: "jitsi-wrapper",
            "data-domain": domainname,
            "data-room": roomname,
            "data-pass": password,
            "data-width": width,
            "data-height": height,
            "data-user": 'Presenter'
        }, (domainname + '/').concat(roomname)));
    },
    save: function save(props) {
        var _props$attributes = props.attributes,
            username = _props$attributes.username,
            roomname = _props$attributes.roomname,
            password = _props$attributes.password,
            width = _props$attributes.width,
            height = _props$attributes.height,
            domainname = _props$attributes.domainname;

        return wp.element.createElement("div", {
            className: "jitsi-wrapper",
            "data-domain": domainname,
            "data-room": roomname,
            "data-pass": password,
            "data-width": width,
            "data-height": height,
            "data-user": username,
        });
    }
});
