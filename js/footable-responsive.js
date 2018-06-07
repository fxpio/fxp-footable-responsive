/*
 * This file is part of the Fxp package.
 *
 * (c) François Pluchino <francois.pluchino@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import {onInitializedTable, onResizedTable, onResizingTable} from "./utils/events";
import $ from "jquery";
import 'footable/js/footable';

/**
 * Footable Responsive class.
 */
export default class FootableResponsive
{
    /**
     * Constructor.
     */
    constructor() {
        this.name = "Fxp Footable Responsive";
    }

    /**
     *
     * @param {footable} ft
     */
    init(ft) {
        if (!ft.options.responsive.enabled) {
            return;
        }

        let $table = $(ft.table),
            $responsive = $table.parent('.table-responsive');

        if (1 === $responsive.length) {
            $table.on('footable_initialized.responsive', onInitializedTable);
            $table.on('footable_resizing.responsive', onResizingTable);
            $table.on('footable_resized.responsive', onResizedTable);
        }
    }
}

window.footable.plugins.register(FootableResponsive, {
    responsive: {
        enabled: true,
        minWidth: 90
    }
});
