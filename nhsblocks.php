<?php
/*
 * Plugin Name: nhsblocks
 * Plugin URI: https://github.com/NHSLeadership/nhsblocks
 * Description: Gutenberg native custom blocks companion plugin for the NHS Nightingale theme (can also be standalone).
 * Author: Tony Blacker, NHS Leadership Academy
 * License: GPL v3
 * Requires at least: 5.0
 * Tested up to: 5.3.2
 * Version: 1.1.2
 *
 * @package nhsblocks
 */

defined( 'ABSPATH' ) || exit;

/**
 * Load translations (if any) for the plugin from the /languages/ folder.
 *
 * @link https://developer.wordpress.org/reference/functions/load_plugin_textdomain/
 */
add_action( 'init', 'nhsblocks_load_textdomain' );

/**
 * Set the domain to be used for translations
 */
function nhsblocks_load_textdomain() {
	load_plugin_textdomain( 'nhsblocks', false, basename( __DIR__ ) . '/languages' );
}

/**
 * Add custom "nhsblocks" block category
 *
 * @link https://wordpress.org/gutenberg/handbook/designers-developers/developers/filters/block-filters/#managing-block-categories
 */
add_filter( 'block_categories', 'nhsblocks_block_categories', 10, 2 );

/**
 * Create the category.
 *
 * @param array $categories the details of added categories (in this case an array of 1 item).
 * @param integer $post Unused variable, intended for future expansion of function.
 *
 * @return array
 */
function nhsblocks_block_categories( $categories, $post ) {

	return array_merge(
		$categories,
		array(
			array(
				'slug'  => 'nhsblocks',
				'title' => __( 'NHS Frontend Blocks', 'nhsblocks' ),
				'icon'  => 'screen',
			),
		)
	);
}

/**
 * Registers all block assets so that they can be enqueued through the Block Editor in
 * the corresponding context.
 *
 * @link https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-registration/
 */
add_action( 'init', 'nhsblocks_register_blocks' );

/**
 * Function to initiate the Gutenberg blocks in this theme.
 */
function nhsblocks_register_blocks() {

	// If Block Editor is not active, bail.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	// Retister the block editor script.
	wp_register_script(
		'nhsblocks-editor-script',                                            // label.
		plugins_url( '/build/index.js', __FILE__ ),                        // script file.
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'wp-data' ),        // dependencies.
		'20190828',
		'in_footer'
	);

	register_block_type(
		'nhsblocks/panel1',
		array(
			'editor_script' => 'nhsblocks-editor-script',
			// Calls registered script above. Registering one brings all. One block to rule them all.
		)
	);
	register_block_type( 'nhsblocks/dashboardnav' );
	register_block_type( 'nhsblocks/dodont' );
	register_block_type( 'nhsblocks/nhsbutton' );
	register_block_type( 'nhsblocks/reveal1' );
	register_block_type( 'nhsblocks/promo1' );
	register_block_type( 'nhsblocks/quote1' );
	register_block_type( 'nhsblocks/card1' );
	register_block_type( 'nhsblocks/rowgroup' );
	register_block_type( 'nhsblocks/heroblock' );
	register_block_type( 'nhsblocks/reviewdate' );
	register_block_type( 'nhsblocks/stripesblock' );

	register_block_type( 'nhsblocks/pagination' );

	if ( function_exists( 'wp_set_script_translations' ) ) {
		/**
		 * Adds internationalization support.
		 *
		 * @link https://wordpress.org/gutenberg/handbook/designers-developers/developers/internationalization/
		 * @link https://make.wordpress.org/core/2018/11/09/new-javascript-i18n-support-in-wordpress/
		 */
		wp_set_script_translations( 'nhsblocks-editor-script', 'nhsblocks', plugins_url( '/languages', __FILE__ ) );
	}

}

/**
 * Build classes based on block attributes.
 * Returns string of classes.
 *
 * @param array $attributes - Block attributes.
 *
 * @return array $classes - the finished array of classes to attach to blocks.
 */
function nhsblocks_block_classes( $attributes ) {
	$classes = null;
	if ( $attributes['align'] ) {
		$classes = 'align' . $attributes['align'] . ' ';
	}

	if ( $attributes['className'] ) {
		$classes .= $attributes['className'];
	}

	return $classes;
}

/**
 * Queues up the gutenberg editor style
 */
function nhsblocks_gutenberg_editor_styles() {
	wp_enqueue_style( 'nhsl-block-editor-styles', plugins_url( 'style-gutenburg.css', __FILE__ ), false, '1.1', 'all' );
}

add_action( 'enqueue_block_editor_assets', 'nhsblocks_gutenberg_editor_styles' ); // Pulls the enqueued file in to standard wp process.

/**
 * Queues up the blocks styling for front end
 */
function nhsblocks_register_style() {
	wp_register_style( 'nhsblocks', plugins_url( 'style.min.css', __FILE__ ) );
}

add_action( 'init', 'nhsblocks_register_style' ); // Pulls front end styling to standard wp process.

function nhsblocks_enqueue_style() {
	wp_enqueue_style( 'nhsblocks' );
}

add_action( 'wp_enqueue_scripts', 'nhsblocks_enqueue_style' );

/**
 * Checks if the Gutenberg plugin is activated
 *
 * If the Gutenberg plugin is not active, then don't allow the
 * activation of this plugin.
 *
 * @since 1.0.0
 */
function nhsblocks_activate() {
	if ( current_user_can( 'activate_plugins' ) && ! is_plugin_active( 'gutenberg/gutenberg.php' ) ) {
		// Deactivate the plugin.
		deactivate_plugins( plugin_basename( __FILE__ ) );
		// Throw an error in the WordPress admin console.
		$error_message = '<p style="font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',Roboto,Oxygen-Sans,Ubuntu,Cantarell,\'Helvetica Neue\',sans-serif;font-size: 13px;line-height: 1.5;color:#444;">' . esc_html__( 'This plugin requires ', 'nhsblocks' ) . '<a href="' . esc_url( 'https://en-gb.wordpress.org/plugins/gutenberg/' ) . '">Gutenberg</a>' . esc_html__( ' plugin to be installed and active.', 'nhsblocks' ) . '</p>';
		die( $error_message ); // WPCS: XSS ok.
	}
}

register_activation_hook( __FILE__, 'nhsblocks_activate' );

function nhsblocks_hero_footer() {
	echo "<script>
	    const heroBlock = document.querySelector('.wp-block-nhsblocks-heroblock');
	    if ( ( heroBlock ) ) { 
	        matches = heroBlock.matches ? heroBlock.matches('.wp-block-nhsblocks-heroblock') : heroBlock.msMatchesSelector('.wp-block-nhsblocks-heroblock');
		    if ( matches === true ) {
			    const mainContent = document.querySelector( '#maincontent' );
			    const contentInner = document.querySelector( '#contentinner' );
			    const wholeDoc = document.querySelector( 'body' );
			    const breadCrumb = document.querySelector( '.nhsuk-breadcrumb' );
			    const articleTitle = document.querySelector( '.entry-header' );
			    mainContent.insertBefore( heroBlock, contentInner );
			    articleTitle.style.display = 'none';
			    mainContent.style.paddingTop = '0';
			    heroBlock.style.marginBottom = '70px';
			    if ( breadCrumb ) { 
			    	wholeDoc.removeChild( breadCrumb );
			    }
		    }
	    }
	</script>";
}

add_action( 'wp_footer', 'nhsblocks_hero_footer' );

