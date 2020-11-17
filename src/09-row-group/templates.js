/**
 *  NHS Group Template definement
 *  @author Tony Blacker, NHS Leadership Academy
 *  @version 1.0 6th February 2020
 */

const { __ } = wp.i18n;

import * as Icons from '../icons.js';

export const GRID_OPTIONS = [
    {
        name: 'twocols',
        label: ('Two Columns Generic', 'nhsblocks'),
        isDefault: true,
        icon: Icons.twocolsIcon,
        innerBlocks: [
            [ 'nhsblocks/onehalf' ],
            [ 'nhsblocks/onehalf' ],
        ],
    },
    {
        name: 'threecols',
        label: __('Three Columns Generic', 'nhsblocks'),
        icon: Icons.threecolsIcon,
        innerBlocks: [
            [ 'nhsblocks/onethird' ],
            [ 'nhsblocks/onethird' ],
            [ 'nhsblocks/onethird' ],
        ],
    },
    {
        name: 'one3two3',
        label: __('One Third / Two Thirds Columns Generic', 'nhsblocks'),
        icon: Icons.twoleftthirdIcon,
        innerBlocks: [
            [ 'nhsblocks/onethird' ],
            [ 'nhsblocks/twothirds' ]
        ],
    },
    {
        name: 'two3one3',
        label: __('Two Thirds / One Third Columns Generic', 'nhsblocks'),
        icon: Icons.tworightthirdIcon,
        innerBlocks: [
            [ 'nhsblocks/twothirds' ],
            [ 'nhsblocks/onethird' ]
        ],
    },
    {
        name: 'one4one2one4',
        label: __('One Quarter / One Half / One Quarter Columns Generic', 'nhsblocks'),
        icon: Icons.fourtwofourIcon,
        innerBlocks: [
            [ 'nhsblocks/onequarter' ],
            [ 'nhsblocks/onehalf' ],
            [ 'nhsblocks/onequarter' ]
        ],
    },
    {
        name: 'one4one4one2',
        label: __('One Quarter / One Quarter / One Half Columns Generic', 'nhsblocks'),
        icon: Icons.fourfourtwoIcon,
        innerBlocks: [
            [ 'nhsblocks/onequarter' ],
            [ 'nhsblocks/onequarter' ],
            [ 'nhsblocks/onehalf' ]
        ],
    },
    {
        name: 'one2one4one4',
        label: __('One Half / One Quarter / One Quarter Columns Generic', 'nhsblocks'),
        icon: Icons.twofourfourIcon,
        innerBlocks: [
            [ 'nhsblocks/onehalf' ],
            [ 'nhsblocks/onequarter' ],
            [ 'nhsblocks/onequarter' ]
        ],
    },
];
