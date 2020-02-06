/**
 *  NHS Dashboard Template definement
 *  @author Tony Blacker, NHS Leadership Academy
 *  @version 1.0 6th February 2020
 */

const { __ } = wp.i18n;

import * as Icons from '../icons.js';
export const GRID_OPTIONS = [
    {
        name: 'fullwidth',
        label: __('Full Width', 'nhsblocks'),
        icon: Icons.onecolsIcon,
        innerBlocks: [
            [ 'nhsblocks/dashpanel', { className: 'nhsuk-grid-column-full'} ],
        ],
    },{
        name: 'twocols',
        label: __('Two Columns', 'nhsblocks'),
        isDefault: true,
        icon: Icons.twocolsIcon,
        innerBlocks: [
            [ 'nhsblocks/dashpanel', { className: 'nhsuk-grid-column-one-half'} ],
            [ 'nhsblocks/dashpanel', { className: 'nhsuk-grid-column-one-half'} ],
        ],
    },
    {
        name: 'threecols',
        label: __('Three Columns', 'nhsblocks'),
        icon: Icons.threecolsIcon,
        innerBlocks: [
            [ 'nhsblocks/dashpanel', { className: 'nhsuk-grid-column-one-third'} ],
            [ 'nhsblocks/dashpanel', { className: 'nhsuk-grid-column-one-third'} ],
            [ 'nhsblocks/dashpanel', { className: 'nhsuk-grid-column-one-third'} ],
        ],
    },
    {
        name: 'twothreecols',
        label: __('Two Columns Then Three Columns', 'nhsblocks'),
        icon: Icons.twothreecolstworowsIcon,
        innerBlocks: [
            [ 'nhsblocks/dashpanel', { className: 'nhsuk-grid-column-one-half'} ],
            [ 'nhsblocks/dashpanel', { className: 'nhsuk-grid-column-one-half'} ],
            [ 'nhsblocks/dashpanel', { className: 'nhsuk-grid-column-one-third'} ],
            [ 'nhsblocks/dashpanel', { className: 'nhsuk-grid-column-one-third'} ],
            [ 'nhsblocks/dashpanel', { className: 'nhsuk-grid-column-one-third'} ],
        ],
    },
    {
        name: 'threetwocols',
        label: __('Three Columns then Two Columns', 'nhsblocks'),
        icon: Icons.threetwocolstworowsIcon,
        innerBlocks: [
            [ 'nhsblocks/dashpanel', { className: 'nhsuk-grid-column-one-third'} ],
            [ 'nhsblocks/dashpanel', { className: 'nhsuk-grid-column-one-third'} ],
            [ 'nhsblocks/dashpanel', { className: 'nhsuk-grid-column-one-third'} ],
            [ 'nhsblocks/dashpanel', { className: 'nhsuk-grid-column-one-half'} ],
            [ 'nhsblocks/dashpanel', { className: 'nhsuk-grid-column-one-half'} ],
        ],
    },
    {
        name: 'threethreecols',
        label: __('Three Columns on Two Rows', 'nhsblocks'),
        icon: Icons.threecolstworowsIcon,
        innerBlocks: [
            [ 'nhsblocks/dashpanel', { className: 'nhsuk-grid-column-one-third'} ],
            [ 'nhsblocks/dashpanel', { className: 'nhsuk-grid-column-one-third'} ],
            [ 'nhsblocks/dashpanel', { className: 'nhsuk-grid-column-one-third'} ],
            [ 'nhsblocks/dashpanel', { className: 'nhsuk-grid-column-one-third'} ],
            [ 'nhsblocks/dashpanel', { className: 'nhsuk-grid-column-one-third'} ],
            [ 'nhsblocks/dashpanel', { className: 'nhsuk-grid-column-one-third'} ],
        ],
    },
];
