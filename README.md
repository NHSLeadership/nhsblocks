# WordPress Blocks for NHS Theme

This repository houses the native Gutenberg blocks for the Nightingale 2.0 theme from NHS Leadership Academy. This is a standalone plugin, but is intended to be used in concert with the Nightingale 2.0 theme. The plugin and theme together complete the WordPress deployment of the NHSUK Frontend design.

## Deployment Instructions
Download the `nhsblocks.zip` from this repository. Install this to your wordpress via admin > plugins > add new > upload. Go to your wordpress admin, 
and activate the NHS Blocks plugin. Then edit your pages, your new blocks are all homed in a new category called `NHS
 Frontend Blocks` - select any of these and edit away. Variations of the blocks are found in the right hand panel 
 under `Styles` 
 
## Development Instructions
To develop your own modifications, you will need to download the full [repo from GitHub](https://github.com/NHSLeadership/nhsblocks) - ideally you should be in your `wp-content/plugins` folder.
Once you have this locally, you will need to change directory to `wp-content/plugins/nhsblocks`. Start by running `npm run install` to download and setup all the required node modules.
 - Any changes to styles can be made in the `assets/scss` folder. To regenerate the css, you will need to run `npm run build-scss`.
 - Any changes to the blocks themselves can be made in the `src` folder. Once changes are complete, you will need to regenerate the js by running `npm run build`. This will generate new files in the `build` folder.
 - If you then wish to export your changes to any other sites, you will need to run `npm run zip` to regenerate the nhsblocks.zip file.
 
Any improvements, bug fixes or amendments should also be submitted back as pull requests to our GitHub repo so that the whole community can benefit from the work.

## Credits
This plugin was written by Tony Blacker, NHS Leadership Academy Digital Delivery Team. It is based on the tutorial 
provided by [Morten Rand-Hendriksen](https://mor10.com/) and extended out to match the [NHSUK Frontend library 
components](https://nhsuk.github.io/nhsuk-frontend/components) 

## Progress
 - [x] Add in buttons
 - [x] Button variations (standard green, grey [secondary] and white [reverse])
 - [x] Add in Reveal
 - [x] Reveal variations (Expander)
 - [x] Care Cards
 - [x] Care Card Variations (non urgent [blue header], urgent [red header], immediate [red header, black body])
 - [x] Do / Dont List
 - [x] Panel
 - [x] Panel variations (standard [white], with label [white with blue masthead], grey)
 - [x] Testimonial / Quote
 - [x] Testimonial variant (standard [white background, blue left hand border], inverted [blue background, white left
  hand border] - inverted is non standard NHSUK Frontend component)
 - [x] Promo panel
 - [x] Promo panel variants (with and without image, with and without link)
 - [x] Dashboard element (non NHSUK frontend component)
 - [ ] Latest News
 - [x] Grouped Columns (one-third, one-qaurter, two-thirds, one-half, full to make full rows)
