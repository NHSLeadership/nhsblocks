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

function nhsblocks_load_textdomain() {
	load_plugin_textdomain( 'nhsblocks', false, basename( __DIR__ ) . '/languages' );
}

/**
 * Add custom "nhsblocks" block category
 *
 * @link https://wordpress.org/gutenberg/handbook/designers-developers/developers/filters/block-filters/#managing-block-categories
 */
add_filter( 'block_categories', 'nhsblocks_block_categories', 10, 2 );

function nhsblocks_block_categories( $categories, $post ) {

	return array_merge(
		$categories,
		array(
			array(
				'slug' => 'nhsblocks',
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

function nhsblocks_register_blocks() {

	// If Block Editor is not active, bail.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	// Retister the block editor script.
	wp_register_script(
		'nhsblocks-editor-script',											// label
		plugins_url( 'build/index.js', __FILE__ ),						// script file
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', "wp-data" ),		// dependencies
		filemtime( plugin_dir_path( __FILE__ ) . 'build/index.js' )		// set version as file last modified time
	);

	// Register the block editor stylesheet.
	wp_register_style(
		'nhsblocks-editor-styles',											// label
		plugins_url( 'build/editor.css', __FILE__ ),					// CSS file
		array( 'wp-edit-blocks' ),										// dependencies
		filemtime( plugin_dir_path( __FILE__ ) . 'build/editor.css' )	// set version as file last modified time
	);

	// Register the front-end stylesheet.
	wp_register_style(
		'nhsblocks-front-end-styles',										// label
		plugins_url( 'build/style.css', __FILE__ ),						// CSS file
		array( ),														// dependencies
		filemtime( plugin_dir_path( __FILE__ ) . 'build/style.css' )	// set version as file last modified time
	);

	// Array of block created in this plugin.
	$blocks = [
        'nhsblocks/dodont',
        'nhsblocks/button',
        'nhsblocks/reveal1',
        'nhsblocks/panel1',
        'nhsblocks/promo1',
        'nhsblocks/quote1',
        'nhsblocks/card',

	];

	// Loop through $blocks and register each block with the same script and styles.
	foreach( $blocks as $block ) {
		register_block_type( $block, array(
			'editor_script' => 'nhsblocks-editor-script',					// Calls registered script above
			'editor_style' => 'nhsblocks-editor-styles',					// Calls registered stylesheet above
			'style' => 'nhsblocks-front-end-styles',						// Calls registered stylesheet above
		) );
	}

	// Register dynamic block.
	register_block_type( 'nhsblocks/dynamic', array(
		'editor_script' => 'nhsblocks-editor-script',
		'editor_style' => 'nhsblocks-editor-styles',
		'style' => 'nhsblocks-front-end-styles',
		'render_callback' => 'nhsblocks_dynamic_render_callback'
	) );

	if ( function_exists( 'wp_set_script_translations' ) ) {
	/**
	 * Adds internationalization support.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/designers-developers/developers/internationalization/
	 * @link https://make.wordpress.org/core/2018/11/09/new-javascript-i18n-support-in-wordpress/
	 */
	wp_set_script_translations( 'nhsblocks-editor-script', 'nhsblocks', plugin_dir_path( __FILE__ ) . '/languages' );
	}

}

/**
 * Build classes based on block attributes.
 * Returns string of classes.
 *
 * $attributes - array - Block attributes.
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

