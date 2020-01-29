(function($) {
    /**
     * Object to control component layout.
     * @var {Object}
     */
    var Component = {

        /**
         * Reset component.
         * @param {Object} object
         */
        reset: function(object) {
            // remove all active class
            object
                .find('.radio-button__item')
                .removeClass('-is-selected');

            // remove checked item
            object
                .find('.radio-button__component')
                .removeAttr('checked')
                .prop('checked', false);
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
             * Plugins options.
             * @var {Object}
             */
            var settings = $.extend({
                onClickItem: null,
            }, options);

            // init each component
            return this.each(function(index, element) {
                // create element object
                var object = $(element);

                // on click item
                object.on('click', '.radio-button__component', function(e) {
                    // get item
                    var item = $(this);

                    // get parent
                    var parent = item.parents('.radio-button__item');

                    // if disabled
                    if (parent.hasClass('-is-disabled')) {
                        e.preventDefault();
                        return;
                    }

                    // reset component
                    Component.reset(object);

                    // set selected item
                    parent.addClass('-is-selected');

                    // do when choose item
                    if ($.isFunction(settings.onClickItem)) {
                        settings.onClickItem(object, item);
                    }
                })
            })
        },

        /**
         * Reset component.
         * @var {Function}
         */
        reset: function() {
            return this.each(function(index, element) {
                // create element object
                var object = $(element);

                // reset component
                Component.reset(object);
            })
        },

        /**
         * Destroy component.
         * @var {Function}
         */
        destroy: function() {
            return this.each(function(index, element) {
                var object = $(element);

                // reset component
                Component.reset(object);

                // remove event
                object.off('click', '.radio-button__component');
            })
        }
    }

    /**
     * Build component as a plugin.
     * @package component: radio-button: type-1
     * @version 1.0.0
     */
    $.fn.BINUS_RadioButton_One = function(options) {
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
        $('.C--radio-button.type--1.-autoload')
            .BINUS_RadioButton_One();
    });
})(jQuery);