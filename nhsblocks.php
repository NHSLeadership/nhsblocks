<?php
/**
 * Plugin Name: NHS Blocks
 * Plugin URI: https://github.com/NHSLeadership/nhsblocks
 * Description: Gutenberg native custom blocks companion plugin for the NHS Nightingale theme (can also be standalone). Based on nhsuk frontend framework.
 * Author: Tony Blacker, NHS Leadership Academy
 * License: GPL v3
 * Requires at least: 5.0
 * Tested up to: 6.2
 *
 * Version: 1.3.16
 * Stable tag: 1.3.16
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
 * Set the domain to be used for translations.
 */
function nhsblocks_load_textdomain() {
	load_plugin_textdomain( 'nhsblocks', false, basename( __DIR__ ) . '/languages' );
}

/**
 * Add custom "nhsblocks" block category.
 *
 * @link https://wordpress.org/gutenberg/handbook/designers-developers/developers/filters/block-filters/#managing-block-categories
 */
add_filter( 'block_categories_all', 'nhsblocks_block_categories', 10, 2 );

/**
 * Create the category.
 *
 * @param array   $categories the details of added categories (in this case an array of 1 item).
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

	// Register the block editor script.
	wp_register_script(
		'nhsblocks-editor-script',                                            // label.
		plugins_url( '/build/index.js', __FILE__ ),                        // script file.
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'wp-data' ),        // dependencies.
		'20201202', // version.
		'in_footer' // where to load.
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
	register_block_type( 'nhsblocks/contentslist' );
	register_block_type( 'nhsblocks/contentslistitem' );
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


add_action( 'plugins_loaded', 'nhsblocks_register_dynamic_blocks' );


/**
 *
 * Taken / Inspired by https://johnblackbourn.com/gutenberg-block-template-part/
 *
 * Generic block rendering callback function to load a block from a theme template part.
 *
 * Loads a block from the `blocks` subdirectory according to the name of the block, and places the
 * block attributes and block content into namespaced query vars. If there's no corresponding block
 * template part, the block content is returned unaltered.
 *
 * A block named `foo/block1` looks for a template part named `blocks/foo/block1.php`.
 *
 * The block attributes and content can be accessed inside the template part via query vars:
 *
 * - `get_query_var( 'foo/block1/attribute1' )`
 * - `get_query_var( 'foo/block1/attribute2' )`
 * - `get_query_var( 'foo/block1/content' )`
 *
 * @param string $name       The full block name, for example 'foo/block1'.
 * @param array  $attributes Array of attributes saved on the block instance.
 * @param string $content    Optional user-entered block content. Can be null.
 * @return string The dynamic block content.
 */

function nhsblocks_register_dynamic_blocks() {

	// Only load if Gutenberg is available.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	$blocks = array(
		'nhsblocks/contentslistpage',
	);

	foreach ( $blocks as $block ) {

		register_block_type(
			$block,
			[
				// https://github.com/WordPress/gutenberg/issues/4671.
				'render_callback' => function( array $attributes, string $content = null ) use ( $block ) {

					return nhsblocks_block_renderer( $block, $attributes, $content );
				},
			]
		);

	}

}

/**
 * Undocumented function
 *
 * @param string $name name.
 * @param array  $attributes attributes.
 * @param string $content content.
 * @return string
 */
function nhsblocks_block_renderer( string $name, array $attributes, string $content = null ) {

	// change template name slash to scores.
	$template_name = str_replace( '/', '-', $name );

	// Set query vars so they are accessible to the template part.
	foreach ( $attributes as $attribute_name => $attribute_value ) {
		set_query_var( $name . '/' . $attribute_name, $attribute_value );
	}
	set_query_var( $name . '/content', $content );
	set_query_var( $name . '/class', 'wp-block-' . $template_name );

	// get template file directory
	$template_file = plugin_dir_path( __FILE__ ) . "/templates/{$template_name}.php";

	// Load the template part in an output buffer:.
	ob_start();
	load_template( $template_file );
	$output = ob_get_clean();

	// Fall back to just the block content if there's no template part:.
	if ( '' === $output ) {
		$output = (string) $content;
	}

	// Clear the query vars so they don't bleed into subsequent instances of the same block type.
	foreach ( $attributes as $attribute_name => $attribute_value ) {
		set_query_var( $name . '/' . $attribute_name, null );
	}
	set_query_var( $name . '/content', null );

	return $output;
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
function nhsblocks_gutenberg_editor_styles()
{
	wp_enqueue_style('nhsl-block-editor-styles', plugins_url('style-gutenburg.css', __FILE__), false, '1.1', 'all');
	$plugin_version = get_bloginfo('version'); // WP version by default.
	$plugin_data = get_plugin_data(plugin_dir_path(__FILE__) . 'nhsblocks.php');
	if (isset($plugin_data['Name']) && !empty($plugin_data['Version']) && 'NHS Blocks' === $plugin_data['Name']) {
		$plugin_version = $plugin_data['Version'];
	}
	wp_enqueue_style('nhsblocks-editor-styles', plugins_url('style.min.css', __FILE__), false, $plugin_version, 'all');
}

add_action( 'enqueue_block_editor_assets', 'nhsblocks_gutenberg_editor_styles' ); // Pulls the enqueued file in to standard wp process.

/**
 * Queues up the blocks styling for front end
 */
function nhsblocks_register_style() {
	$theme          = wp_get_theme(); // gets the current theme.
	$parent         = wp_get_theme( get_template() );
	$plugin_version = get_bloginfo( 'version' ); // WP version by default.
	if ( 'Nightingale' !== $theme->name && ( 'Nightingale' !== $parent->name ) ) {
		$plugin_data = get_plugin_data( plugin_dir_path( __FILE__ ) . 'nhsblocks.php' );
		if ( isset( $plugin_data['Name'] ) && ! empty( $plugin_data['Version'] ) && 'NHS Blocks' === $plugin_data['Name'] ) {
			$plugin_version = $plugin_data['Version'];
		}
		wp_register_style( 'nhsblocks', plugins_url( 'style.min.css', __FILE__ ), array(), $plugin_version, 'all' );
	}
}

add_action( 'init', 'nhsblocks_register_style' ); // Pulls front end styling to standard wp process.

/**
 * Nhsblocks enqueue style.
 *
 * @return void
 */
function nhsblocks_enqueue_style() {
	$theme = wp_get_theme(); // gets the current theme.
	if ( 'Nightingale' !== $theme->name ) {
		wp_enqueue_style( 'nhsblocks' );
	}
}

add_action( 'wp_enqueue_scripts', 'nhsblocks_enqueue_style' );

/**
 * Hero footer
 *
 * @return void
 */
function nhsblocks_hero_footer() {
	$theme     = wp_get_theme(); // gets the current theme.
	$scriptout = "<script>

	    const heroBlock = document.querySelector('.wp-block-nhsblocks-heroblock');
	    const tabbedTabs = document.querySelector( '.nhsuk-bordered-tabs-container' );
	    if ( ( heroBlock ) ) { 
	        matches = heroBlock.matches ? heroBlock.matches('.wp-block-nhsblocks-heroblock') : heroBlock.msMatchesSelector('.wp-block-nhsblocks-heroblock');
		    if ( matches === true ) { ";
	if ( 'Nightingale' === $theme->name || 'Nightingale' === $theme->parent_theme ) {
		$scriptout .= "
				const mainContent = document.querySelector( 'main' );
			    const contentInner = document.querySelector( '#contentinner' );
			    const wholeDoc = document.querySelector( 'body' );
			    const breadCrumb = document.querySelector( '.nhsuk-breadcrumb' );
			    const articleTitle = document.querySelector( '.entry-header' );
			    const sectionTitle = wholeDoc.querySelector( '#nhsuk-tabbed-title' );
			    const tabbedTabs = document.querySelector( '.nhsuk-bordered-tabs-container' );";
	} else {
		$scriptout .= "
			    const mainContent = document.querySelector( 'main' );
			    const contentInner = document.querySelector( 'article' );
			    const wholeDoc = document.querySelector( 'body' );
			    const articleTitle = document.querySelector( '.entry-header' );";
	}
	$scriptout .= "			    
			    mainContent.insertBefore( heroBlock, contentInner );
			    articleTitle.style.display = 'none';
			    mainContent.style.paddingTop = '0';
			    if ( tabbedTabs ) {
			    	mainContent.insertBefore( tabbedTabs, contentInner );
			    	heroBlock.style.borderBottom = '70px solid white';
			    	heroBlock.style.marginBottom = 'none';
			    } else {
			    	heroBlock.style.marginBottom = '70px';
			    }
			    if ( breadCrumb ) { 
			    	wholeDoc.removeChild( breadCrumb );
			    }
			    if ( sectionTitle ) { 
			    	removeElements( document.querySelectorAll('#nhsuk-tabbed-title') );
			    }
		    }
	    } else if ( tabbedTabs ) {";
	if ( 'Nightingale' === $theme->name || 'Nightingale' === $theme->parent_theme ) {
		$scriptout .= "
						const mainContent = document.querySelector( 'main' );
					    const contentInner = document.querySelector( '#contentinner' );
					    const wholeDoc = document.querySelector( 'body' );
					    const breadCrumb = document.querySelector( '.nhsuk-breadcrumb' );
					    const articleTitle = document.querySelector( '.entry-header' );
					    const sectionTitle = wholeDoc.querySelector( '#nhsuk-tabbed-title' );";

	} else {
		$scriptout .= "
					    const mainContent = document.querySelector( 'main' );
					    const contentInner = document.querySelector( 'article' );
					    const wholeDoc = document.querySelector( 'body' );
					    const articleTitle = document.querySelector( '.entry-header' );";
	}

			$scriptout .= "
	        mainContent.insertBefore( tabbedTabs, contentInner );
	        if ( breadCrumb ) {
			    	wholeDoc.removeChild( breadCrumb );
			    }
			    if ( sectionTitle ) {
			    	removeElements( document.querySelectorAll( '#nhsuk-tabbed-title' ) );
			}
			articleTitle.style.marginTop = '20px';
			mainContent.style.paddingTop = '0';
	    }		
	    // Page Link JS
	    const careCardWarning = document.querySelector('.nhsuk-care-card.is-style-warning-callout');
	    if ( ( careCardWarning ) ) {
	    	const visuallyHidden = careCardWarning.querySelector('.nhsuk-u-visually-hidden');
	    	jQuery(visuallyHidden).html('Warning advice: ');
	    }
	    const careCardUrgent = document.querySelector('.nhsuk-care-card.is-style-urgent');
	    if ( ( careCardUrgent ) ) {
	    	const visuallyHidden = careCardUrgent.querySelector('.nhsuk-u-visually-hidden');
	    	jQuery(visuallyHidden).html('Urgent advice: ');
	    }
	    const careCardImmediate = document.querySelector('.nhsuk-care-card.is-style-immediate');
	    if ( ( careCardImmediate ) ) {
	    	const visuallyHidden = careCardImmediate.querySelector('.nhsuk-u-visually-hidden');
	    	jQuery(visuallyHidden).html('Immediate action required: ');
	    }

	    ( function(){
	    	let url = window.location.href.split(/[?#]/)[0];
			let pageList = document.querySelectorAll('.nhsuk-contents-list li.nhsuk-contents-list__item');
			for (var i = pageList.length - 1; i >= 0; i--) {
				let nhsList = pageList[i];
				let link = pageList[i].children[0].href;
				if( link === url ){
					let txt = pageList[i].innerText;
					pageList[i].innerHTML = txt;
				}
			}
		})();
		// Smooth scroll to link
		jQuery( document ).ready(function( $ ) {
		    $('.js-scroll-to').on('click', function(e) {
		    	e.preventDefault();
		    	let link = $(this).attr('href');
			    $('html, body').animate({
			        scrollTop: $( link ).offset().top - 50
			    }, 200);
			});
		});		
		</script>";
	echo $scriptout;
}

add_action( 'wp_footer', 'nhsblocks_hero_footer' );
