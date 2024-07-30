=== NHS Blocks ===
Contributors: tblacker, maheshmuralip, nhsleadership
Tags: gutenberg, blocks, nhs
Plugin Name:: NHS Blocks
Plugin URI: https://digital.leadershipacademy.nhs.uk/digital-capabilities/websites/nhs-blocks-user-guide/
Requires at least: 5.3
Tested up to: 6.6
Stable tag: 1.3.16
Requires PHP: 5.6
License: GPLv3 or later
License URI: https://www.gnu.org/licenses/gpl-3.0.html

NHS styled blocks for WordPress as developed by the NHS Leadership Academy based on the NHS Digital Front-end library.

== Description ==

NHS styled blocks for WordPress using the Gutenberg editor, based on the excellent work from the NHSUK Front-end Library. These blocks mean your WordPress site can offer the latest care cards, site promos and info panels to your users, and that all of this content will be styled to match the NHS branding guidelines.

This plugin is designed principally for use by NHS organizations, but can be used by anybody.

This plugin previously required Gutenberg 7.9.1 (as a standalone plugin) to be installed and active. This requirement
has now been removed and it uses the native Gutenberg that ships with WordPress 5.3 and higher. If you also have the
Gutenberg plugin installed we strongly encourage you to deactivate the Gutenberg plugin as it may cause future conflicts
 with the nhsblocks plugin (at time of writing it doesn't, but Gutenberg updates every fortnight and we don't plan to do
  fortnightly releases of nhsblocks)

== Installation ==

This section describes how to install the plugin and get it working.

1. This plugin uses the core version of Gutenberg included in WordPress 5.2 and higher. If you also run the Gutenberg
plugin, you may encounter issues.
2. Upload the plugin files to the `/wp-content/plugins/plugin-name` directory, or install the plugin through the WordPress plugins screen directly.
3. Activate the plugin through the 'Plugins' screen in WordPress
4. Navigate to edit or create any page or post.
5. When you go to add a new block to your content, you will see a new section titled "NHS Front-end". In here are all of the new blocks this plugin provides. Experiment - almost all of the blocks have style variations available.

== Frequently Asked Questions ==

= Is this plugin restricted to only NHS Organizations =

This plugin has been built specifically for use in the NHS, but it is open source code and you are free to use it on any site.

== Screenshots ==
1. This plugin adds a new type of block to your WordPress - titled NHS Front-end - with 10 new blocks based on the NHS Digital Front-end Library
2. Dashboard Layout - a graphical nav panel for users to jump to sections of your site
3. Do / Don't lists - Simple lists in a display card with ticks and crosses to denote actions they should or should not take. Can also be used for status updates, projects etc
4. Buttons - Restyling of buttons to match NHS Digital layouts
5. Reveal Elements - Either simple arrow based expandable sections, or icon based with plus/minus icons
6. Panels - Text blocks with title sections to separate your content out cleanly
7. Promo Blocks - Clean blocks which are completely linked to inner content / external sources with title, text and optional images
8. Testimonial / Quote - Simple display device for highlighting user feedback, personal quotes or other text you would like to highlight
9. Grouped blocks - pre-defined layouts for displaying your content in more eye catching ways
10. Hero - a full screen width block, with optional single color or image background and optional block of text to anchor the page and set clear purpose

== Changelog ==

= 1.3.16 =
 * Security update
 * Fix for simple reveal block
 * Fix for card block
 * Fix for promo block

= 1.3.15 =
 * Stripe option for table block

= 1.3.14 =
 * Nhs frontend framework upgraded to 8
 * Replaced node-sass to dart sass

= 1.3.13 =
 * Fix for various blocks as part of our ongoing work to support wordpress 6.4
 
= 1.3.12 =
 * Fix for dashboard navigation block as part of our ongoing work to support wordpress 6.4
 * Fix for deprecated richText multiline prop in simple reveal block.

= 1.3.11 =
 * Package updates
 * Vulnerability fixes

= 1.3.10 =
 * Fix for deprecated block_categories
 * Fix for simple reveal content edit

= 1.3.9.1 =
 * Readme files translation to US English

= 1.3.9 =
 * Fixed issues with previous release

= 1.3.8 =
 * Accessibility improvement in card region block
 * Accessibility fix for NHS simple reveal block
 * Support for custom html in NHS simple reveal block

= 1.3.7 =
 * Fix for Bullet-points in admin screens

= 1.3.6 =
 * Removed composer requirement

= 1.3.5 =
 * nhsblocks preview pop-up style improvement in admin section

= 1.3.4 =
 * Changed composer settings to use nhsleadership/nhsblocks

= 1.3.3 =
 * Changes for deprecated wp.editor.URLInput
 * Version nhsblocks style.min.css

= 1.3.2 =
 * Updated tested up to WP 6.0

= 1.3.0 =
 * Security patch upgrade with npm version 7.19.1 and node version 16.0
 * Style fix for reveal block
 * Style fix for action and pagination link
 * Style fix and support for nhsblocks care card block
 * Partial style support for nhs front-end framework 6.1.0 components

= 1.2.4 =
 * Removed check for Nightingale theme so plugin css loads to editor view correctly, this is phase one of no longer
 needing to maintain plugin css within the theme itself.
 * Fixed pge contents list not checking inner block content (props to @danielknell)

= 1.2.3 =
 * Fixed fatal error (white screen of death) with edge cases of hero, reveal and dashboard blocks
 * added tag component https://service-manual.nhs.uk/design-system/components/tag
 * corrected IE10/11 javascript bug affecting hero placement
 * multiple accessibility improvements, particularly with screen reader and contrast issues
 * updated to NHSUK front-end library 4.1.0 https://github.com/nhsuk/nhsuk-frontend
 * N.B. if you are also using the Nightingale theme, tags will not display correctly unless you also update Nightingale
 to v2.3.1

= 1.2.2 =
 * Updated internal react and react-test-renderer to avoid conflict js error crashing editor
 * Updated reveal deprecated code to ensure continuity of all versions
 * Removed button block dependency on learndash install being present

= 1.2.1 =
Hotfix to remove react error whenever hero blocks or dashboard panels were triggered.

= 1.2 =
 * Upstream library changed to nhsuk v4
 * Promos and Panels amended to work with new nhsuk-card component
 * Improved theme check to see if Nightingale is active theme or parent theme
 * Reveal block rework
 * Improved jQuery checks for hero and tabbed elements

= 1.1.8 =
 * Added inner blocks to cards and reveals.
 * added toggle for these inner blocks to turn inner blocks on or off.

= 1.1.6 =
 * Removed requirement for separate Gutenberg plugin - instead use core WP version of Gutenberg. If you currently have
 the Gutenberg plugin purely for the NHSBlocks plugin to work, we actively encourage you to remove the Gutenberg plugin
 from your deployment to improve stability and performance.
 * visually hidden messages modified on care cards so status is reflected to screen readers
 * removed php7.4 declaration types for backwards compatibility
 * updated dependencies in composer
 * Ensured default values added to all text fields to make it easier to edit, improved UX
 * Added preview styling to block chooser so you can see what each block does before selecting it.
 * Modified logic on action link to make it more stable (and reduce incidence of "Resolve block" notifications)

= 1.1.4 =
* Removed a lot of excess styling in the css
* Ensured compatible with Gutenberg 7.9.1
* Tested fully on non NHS themes
* Targeted styling in editor to only editor view and style preview panel.

= 1.1.3 =
Addition of multiple new blocks:
* Section Stripes - full width alternating white and grey stripes that can have inner blocks within. Great for full
width homepages and landing pages.
* Contents list - 2 options:
   * Page contents - will autodetect all h2 tags on the page and show anchor links to them
   * Other pages - you can manually add links to other pages (or external resources) in an easy to use list.
* Review Date  - add the block and an area will be added to your page showing the date of when it was last reviewed (i.e
. now)
* Pagination - want a prev and next button. Add this block, and manually configure your previous and next links. Great
for process flows or user guides.
* Action link - want to suggest a user follows a link, but don't want a button. Use an action link
* Back link - let users step back a page. (This uses javascript -1, so if users land on the page from another site and
click this they will go back where they came from....)
Additions of style options to pre-existing blocks:
* Core table block can now be styled like nhsuk front-end, with fully responsive tables
* Images can now be amended to nhusk styling
* Addition of warning call-out option to cards. Particularly useful for Covid-19 alerts
Thanks to @verytwisty for all the pull requests and support, 90% of this update is her work.
(Also some remedial work to ensure inner block compatibility with Gutenberg 7.6 and some minor housekeeping with file
structures)

= 1.1.2 =
* Added examples to show in block selector region for all blocks.
* Amended Dashboard and Groups to be Gutenberg 7.5 compatible
* Updated upstream NPM libraries - principle change being NHSUK Front-end library

= 1.1.1 =
* Minor update for stable tag update.

= 1.1.0 =
* Updated for Gutenberg 7.4 - you will need to update Gutenberg for this plugin to continue functioning
* Dashboard block and grouped block changed from __experimentalTemplateOptions to __experimentalBlockVariationPicker
  * This is technical debt and will need revisiting when this feature moves out of experimental phase
* Button default text added for better UX
* Button link moved to right hand Inspector area for improved UX
* Incorrect image name on dashboard block. _appears to be a breaking change - it isn't!_ Any previously created
dashboard, when edited will come up as invalid content due to this fix. You will need to click the three dots on the
block editor and click "resolve" to repair.
* Corrected some funky and unusual css bugs

= 1.0.5 =
* IE10/11 compatibility with Hero Block
* Additional css filters for buttons, panels and promos

= 1.0.4 =
* Reworked js filters to position hero at head of page

= 1.0.3 =
* Moved css and js from theme in to the blocks to enable standalone functionality
* Added css to avoid conflicts with LearnDash (Conflicts triggered by Gutenberg plugin, but not in our gift)

= 1.0.1 =
* Added Base language (English) and ensured full internationalization. Translations welcome :)
* Registered all blocks so they show correctly on plugin page
* Improved Screenshot library for clearer understanding of plugin functionality from within WordPress.org listing / wp-admin search function

= 1.0 =
* First stable public release of the plugin.
* Included modules:
    * Dashboard links - designed for your home page or a section home. You can add graphical sections with text overlays linking to your inner pages.
    * Do / Don't Lists - simple panels with lists of items with either a tick or a cross next to them.
    * Button - NHS styled buttons, available as primary (green), secondary (blue) or reverse (white)
    * Reveal - expandable areas of the screen. Available either as standard reveal (down arrow) or expander (plus icon)
    * Panels - Text areas with titles, text and buttons for call to action. Available as standard white panel, grey panel or white panel with coloured header.
    * Promo - Linked boxes with text and optional images. Available in standard or smaller text variants.
    * Testimonial - quotes or testimonials can be included with this block. Available as standard (blue text with blue left hand border) or inverted (white text with blue background and white left hand border)
    * Cards - Information cards. Coloured headers with an arrow pointing to text content. Available as standard care card, warnings (red header) or alerts (red header, black body)
    * Grouped Items - pre configured layouts of elements, with either testimonials, panels or promos inside each field.
    * Hero Banner - a full screen width hero image, with optional text overlay box including title and tagline. Ideal for graphically anchoring your website sections.

== Development / Contributing ==

Contributions to development of this work are welcome at [our GitHub repository](https://github.com/NHSLeadership/nhsblocks "NHSBlocks GitHub repo").
