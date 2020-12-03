/**
 *  NHS Group Template definement
 *  @author Tony Blacker, NHS Leadership Academy
 *  @version 1.0 6th February 2020
 */

const { __ } = wp.i18n;

import * as Icons from '../icons.js';
export const TEMPLATE_OPTIONS_PRO = [
    ['nhsblocks/promo1' ],
];
export const GRID_OPTIONS = [
    {
        name: 'twocolspro',
        label: ('Two Columns Promos', 'nhsblocks'),
        isDefault: true,
        icon: Icons.twocolsIcon,
        innerBlocks: [
            [ 'nhsblocks/onehalfpro' ],
            [ 'nhsblocks/onehalfpro' ],
        ],
    },
    {
        name: 'threecolspro',
        label: __('Three Columns Promos', 'nhsblocks'),
        icon: Icons.threecolsIcon,
        innerBlocks: [
            [ 'nhsblocks/onethirdpro' ],
            [ 'nhsblocks/onethirdpro' ],
            [ 'nhsblocks/onethirdpro' ],
        ],
    },
    {
        name: 'one3two3pro',
        label: __('One Third / Two Thirds Columns Promos', 'nhsblocks'),
        icon: Icons.twoleftthirdIcon,
        innerBlocks: [
            [ 'nhsblocks/onethirdpro' ],
            [ 'nhsblocks/twothirdspro' ],
        ],
    },
    {
        name: 'two3one3pro',
        label: __('Two Thirds / One Third Columns Promos', 'nhsblocks'),
        icon: Icons.tworightthirdIcon,
        innerBlocks: [
            [ 'nhsblocks/twothirdspro' ],
            [ 'nhsblocks/onethirdpro' ],
        ],
    },
    {
        name: 'one4one2one4pro',
        label: __('One Quarter / One Half / One Quarter Columns Promos', 'nhsblocks'),
        icon: Icons.fourtwofourIcon,
        innerBlocks: [
            [ 'nhsblocks/onequarterpro' ],
            [ 'nhsblocks/onehalfpro' ],
            [ 'nhsblocks/onequarterpro' ],
        ],
    },
    {
        name: 'one4one4one2pro',
        label: __('One Quarter / One Quarter / One Half Columns Promos', 'nhsblocks'),
        icon: Icons.fourfourtwoIcon,
        innerBlocks: [
            [ 'nhsblocks/onequarterpro' ],
            [ 'nhsblocks/onequarterpro' ],
            [ 'nhsblocks/onehalfpro' ],
        ],
    },
    {
        name: 'one2one4one4',
        label: __('One Half / One Quarter / One Quarter Columns Promos', 'nhsblocks'),
        icon: Icons.twofourfourIcon,
        innerBlocks: [
            [ 'nhsblocks/onehalfpro' ],
            [ 'nhsblocks/onequarterpro' ],
            [ 'nhsblocks/onequarterpro' ],
        ],
    },
];
