(function($) {
    /**
     * List of methods.
     * @var {Object}
     */
    var Methods = {

        /**
         * Init component.
         * @param {Object} options
         */
        init: function(options) {
            /**
             * Plugin options.
             * @var {Object}
             */
            var settings = $.extend({
                onClickItem: null
            }, options);

            // init each component
            return this.each(function(index, element) {
                // create element object
                var object = $(element);

                // when click item
                object.on('click', '.list__item a', function(e) {
                    e.preventDefault();

                    // get item object
                    var item = $(this);

                    // define parent
                    var parent = item.parents('.C--tab.type--1').first();

                    // get target
                    var target = item.attr('href');

                    // hide all tab
                    parent
                        .find('> .tab__body > .body__item')
                        .removeClass('-current-item');

                    // show selected item
                    $(target).addClass('-current-item');

                    // remove current class
                    parent
                        .find('> .tab__header .list__item')
                        .removeClass('-current-item');

                    // add selected item active class
                    item.parent().addClass('-current-item');

                    // do action when click item
                    if ($.isFunction(settings.onClickItem)) {
                        settings.onClickItem(item);
                    }
                });
            });
        },

        /**
         * Destroy component.
         * @var {Function}
         */
        destroy: function() {
            return this.each(function(index, element) {
                // create element object
                var object = $(element);

                // unbind event
                object.off('click', '.list__item a');
            });
        }
    }

    /**
     * Build component as a plugin.
     * @package component: tab: type-1
     * @version 1.0.0
     */
    $.fn.BINUS_Tab_One = function(options) {
        if (Methods[options]) {
            return Methods[options].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof options === 'object' || !options) {
            // default to "init"
            return Methods.init.apply(this, arguments);
        } else {
            $.error('Method ' +  options + ' does not exist.');
        }
    };

    /**
     * Create component autoloading.
     */
    $(document).ready(function() {
        $('.C--tab.type--1.-autoload')
            .BINUS_Tab_One();
    });
})(jQuery);