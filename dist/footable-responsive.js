var FxpFootableResponsive = (function (exports, $) {
  'use strict';

  $ = $ && $.hasOwnProperty('default') ? $['default'] : $;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  /*
   * This file is part of the Fxp package.
   *
   * (c) François Pluchino <francois.pluchino@gmail.com>
   *
   * For the full copyright and license information, please view the LICENSE
   * file that was distributed with this source code.
   */
  /**
   * Initialize the config.
   *
   * @param {Event} event
   */

  function onInitializedTable(event) {
    var ft = event.ft,
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

  function onResizingTable(event) {
    var ft = event.ft,
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

  function onResizedTable(event) {
    var ft = event.ft,
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

  /**
   * Footable Responsive class.
   */

  var FootableResponsive =
  /*#__PURE__*/
  function () {
    /**
     * Constructor.
     */
    function FootableResponsive() {
      _classCallCheck(this, FootableResponsive);

      this.name = "Fxp Footable Responsive";
    }
    /**
     *
     * @param {footable} ft
     */


    _createClass(FootableResponsive, [{
      key: "init",
      value: function init(ft) {
        if (!ft.options.responsive.enabled) {
          return;
        }

        var $table = $(ft.table),
            $responsive = $table.parent('.table-responsive');

        if (1 === $responsive.length) {
          $table.on('footable_initialized.responsive', onInitializedTable);
          $table.on('footable_resizing.responsive', onResizingTable);
          $table.on('footable_resized.responsive', onResizedTable);
        }
      }
    }]);

    return FootableResponsive;
  }();
  window.footable.plugins.register(FootableResponsive, {
    responsive: {
      enabled: true,
      minWidth: 90
    }
  });

  exports.default = FootableResponsive;

  return exports;

}({}, jQuery));
