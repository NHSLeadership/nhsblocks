<?php
/**
 * Plugin Name: nhsblocks
 * Plugin URI: to follow
 * Description: Gutenberg native custom blocks for the NHS Nightingale 2.0 theme.
 * Version: 1.0.0
 * Author: Tony Blacker, NHS Leadership Academy
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
			'editor_script' => 'nhsblocks-editor-script',                    // Calls registered script above.
		)
	);

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

function nhsblocks_gutenberg_editor_styles() {
	wp_enqueue_style( 'nhsl-block-editor-styles', plugins_url( 'style-gutenburg.css', __FILE__ ), false, '1.0', 'all' );
}

add_action( 'enqueue_block_editor_assets', 'nhsblocks_gutenberg_editor_styles' );

function nhsblocks_register_style() {
	wp_register_style( 'nhsblocks', plugins_url( 'style.css', __FILE__ ) );
}

add_action( 'init', 'nhsblocks_register_style' );

function nhsblocks_enqueue_style() {
	wp_enqueue_style( 'nhsblocks' );
}

add_action( 'wp_enqueue_scripts', 'nhsblocks_enqueue_style' );
