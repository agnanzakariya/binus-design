(function($) {
    /**
     * Object to control component.
     * @var {Object}
     */
    var Component = {

        /**
         * Component init.
         * @param {Object} object
         * @param {Object} settings
         */
        init: function(object, settings) {
            // on click item
            object.on('click', '.checkbox__component', function(e) {
                // get item
                var item = $(this);

                // get parent
                var parent = item.parents('.checkbox__item');

                // if disabled
                if (parent.hasClass('-is-disabled')) {
                    e.preventDefault();
                    return;
                }

                // set/unset active class
                if (parent.hasClass('-is-selected')) {
                    // reset component
                    Component.reset.item(parent);
                } else {
                    // set selected item
                    parent.addClass('-is-selected');
                }

                // do when choose item
                if ($.isFunction(settings.onClickItem)) {
                    settings.onClickItem(object, item);
                }
            })
        },

        /**
         * Reset component.
         * @var {Object}
         */
        reset: {
            /**
             * Reset all items.
             * @param {Object} object
             */
            items: function(object) {
                // remove all active class
                object
                    .find('.checkbox__item')
                    .removeClass('-is-selected');

                // remove checked item
                object
                    .find('.checkbox__component')
                    .removeAttr('checked')
                    .prop('checked', false);
            },

            /**
             * Reset single item.
             * @param {Object} object
             */
            item: function(object) {
                // remove item active class
                object.removeClass('-is-selected');

                // remove checked item
                object
                    .find('.checkbox__component')
                    .removeAttr('checked')
                    .prop('checked', false);
            }
        }
    }

    /**
     * List of methods.
     * @var {Object}
     */
    var Methods = {

        /**
         * Init component.
         * @param {Object} options
         * @since 1.0.0
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

                // init component
                Component.init(object, settings);
            })
        },

        /**
         * Reset component.
         * @since 1.0.0
         */
        reset: function() {
            return this.each(function(index, element) {
                // create element object
                var object = $(element);

                // reset component
                Component.reset.items(object);
            })
        },

        /**
         * Destroy component.
         * @since 1.0.0
         */
        destroy: function() {
            return this.each(function(index, elemnt) {
                var object = $(elemnt);

                // reset component
                Component.reset.items(object);

                // remove event
                object.off('click', '.checkbox__item');
            })
        }
    }

    /**
     * Build component as a plugin.
     * @package component: checkbox: type-1
     * @version 1.0.0
     */
    $.fn.BINUS_Checkbox_One = function(options) {
        if (Methods[options]) {
            return Methods[options].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof options === 'object' || !options) {
            // default to "init"
            return Methods.init.apply(this, arguments);
        } else {
            $.error('Method ' +  options + ' does not exist.');
        }
    }

    /**
     * Create component autoloading.
     */
    $(document).ready(function() {
        $('.C--checkbox.type--1.-autoload')
            .BINUS_Checkbox_One();
    });
})(jQuery);