/*
 * This file is part of the Fxp package.
 *
 * (c) François Pluchino <francois.pluchino@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import $ from 'jquery';

/**
 * Initialize the config.
 *
 * @param {Event} event
 */
export function onInitializedTable(event) {
    let ft = event.ft,
        $table,
        $columns,
        data,
        i;

    if (!ft.hasAnyBreakpointColumn()) {
        $table = $(event.target);
        $columns = $table.find(ft.options.columnDataSelector);

        for (i = 0; i < $columns.length; i += 1) {
            data = ft.getColumnData($columns.get(i));
            data.hasBreakpoint = true;

            ft.columns[data.index] = data;
        }

        ft.resize();
    }
}

/**
 * Restore all column.
 *
 * @param {Event} event
 */
export function onResizingTable(event) {
    let ft = event.ft,
        $table = $(event.target),
        $columns = $table.find(ft.options.columnDataSelector),
        data,
        i;

    for (i = 0; i < $columns.length; i += 1) {
        data = ft.getColumnData($columns.get(i));
        ft.columns[data.index] = data;
    }

    ft.redraw();
}

/**
 * Hides the columns in the scroll.
 *
 * @param {Event} event
 */
export function onResizedTable(event) {
    let ft = event.ft,
        $table = $(event.target),
        $columns = $table.find(ft.options.columnDataSelector),
        tableWidth = $table.parent().innerWidth(),
        contentWidth = 0,
        breakpointName = $table.data('breakpoint'),
        hasHiddenCol = false,
        $column,
        data,
        i;

    $table.addClass('breakpoint');

    for (i = 0; i < $columns.length; i += 1) {
        $column = $columns.eq(i);

        if ($column.is(":visible")) {
            contentWidth += $column.outerWidth();

            if (contentWidth > tableWidth) {
                data = ft.getColumnData($column.get(0));
                data.hide[breakpointName] = true;
                data.hasBreakpoint = true;

                ft.columns[data.index] = data;
                hasHiddenCol = true;
            }
        }
    }

    $table.removeClass('default breakpoint').removeClass(ft.breakpointNames);

    if (hasHiddenCol) {
        $table.addClass(breakpointName + ' breakpoint');
    }

    ft.redraw();
}
