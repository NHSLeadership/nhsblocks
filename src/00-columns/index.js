/**
 *  NHS Section Element (Placeholder - either full width or column width)
 *  @author Tony Blacker, NHS Leadership Academy
 *  @version 1.0 15th August 2019
 */

const { registerBlockType } = wp.blocks;
/*
import classnames from 'classnames';
import Section from '../../components/section';*/

const { Fragment } = wp.element;
const {
    PanelBody,
    SelectControl,
    BaseControl,
    IconButton,
} = wp.components;
const {
    InspectorControls,
    MediaUpload,
    InnerBlocks,
} = wp.editor;
const { __, _x } = wp.i18n;


registerBlockType("nhsblocks/section", {
    title: __( 'Section', 'nhsblocks' ),
    description: __( 'Add a section that separates content, and put any other block into it.', 'nhsblocks' ),
    category: 'nhsblocks',
    icon: 'welcome-widgets-menus',
    supports: {
        align: [ 'wide', 'full' ],
        anchor: true,
    },
    attributes: {
        colorScheme: {
            type: 'string',
            default: 'default',
        },
        contentMaxWidth: {
            type: 'string',
            default: 'site',
        },
        attachmentId: {
            type: 'number',
        },
        attachmentUrl: {
            type: 'string',
        },
    },
    edit: props => {
        const { attributes, setAttributes } = props;
        const { colorScheme, contentMaxWidth, attachmentId, attachmentUrl } = attributes;
        const onSelectImage = media => {
            if ( ! media || ! media.id || ! media.url ) {
                setAttributes( { attachmentId: undefined, attachmentUrl: undefined } );
                return;
            }
            setAttributes( { attachmentId: media.id, attachmentUrl: media.url } );
        };

        return (
            <Fragment>
            <InspectorControls>
            <PanelBody title={ __( 'Section Settings', 'nhsblocks' ) }>
    <SelectControl
        label={ __( 'Color Scheme', 'nhsblocks' ) }
        value={ colorScheme || 'default' }
        onChange={ value => setAttributes( { colorScheme: ( 'default' !== value ) ? value : undefined } ) }
        options={ [
                { value: 'default', label: __( 'Default', 'nhsblocks' ) },
        { value: 'alternate', label: __( 'Alternate', 'nhsblocks' ) },
        { value: 'highlight', label: __( 'Highlight', 'nhsblocks' ) },
    ] }
        />
        <SelectControl
        label={ __( 'Maximum Content Width', 'nhsblocks' ) }
        value={ contentMaxWidth || 'site' }
        onChange={ value => setAttributes( { contentMaxWidth: ( 'site' !== value ) ? value : undefined } ) }
        options={ [
                { value: 'content', label: __( 'Content Width', 'nhsblocks' ) },
        { value: 'site', label: __( 'Site Width', 'nhsblocks' ) },
        { value: 'full', label: __( 'Full Width', 'nhsblocks' ) },
    ] }
        />
        <BaseControl
        label={ __( 'Background Image', 'nhsblocks' ) }
    >
    <MediaUpload
        onSelect={ onSelectImage }
        type="image"
        value={ attachmentId }
        render={ ( { open } ) => (
        <IconButton
        icon="admin-media"
        onClick={ open }
            >
            { attachmentId ? __( 'Edit Image', 'nhsblocks' ) : __( 'Add Image', 'nhsblocks' ) }
            </IconButton>
    ) }
        />
        </BaseControl>
        </PanelBody>
        </InspectorControls>
        <Section
        colorScheme={ colorScheme }
        contentMaxWidth={ contentMaxWidth }
        className={ classnames(
                attachmentId && `has-background-image-${ attachmentId }`
    ) }
        style={ attachmentUrl ? { backgroundImage: `url('${ attachmentUrl }')` } : undefined }
            >
            <InnerBlocks />
            </Section>
            </Fragment>
    );
    },
    save: props => {
        const { attributes } = props;
        const { colorScheme, contentMaxWidth, attachmentId } = attributes;

        return (
            <Section
        colorScheme={ colorScheme }
        contentMaxWidth={ contentMaxWidth }
        className={ classnames(
                attachmentId && `has-background-image-${ attachmentId }`
    ) }
    >
    <InnerBlocks.Content />
        </Section>
    );
    },
});
