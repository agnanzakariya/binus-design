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
                onHideAlert: null
            }, options);

            // init each component
            return this.each(function(index, element) {
                var object = $(element);

                // when button close clicked
                object.on('click', '.button--hide-alert', function(e) {
                    e.preventDefault();

                    // add event when alert is close
                    if ($.isFunction(settings.onHideAlert)) {
                        settings.onHideAlert(object);
                    }

                    // remove alert
                    object.remove();
                });
            });
        },

        /**
         * Destroy component.
         * @var {Function}
         */
        destroy: function() {
            return this.each(function(index, element) {
                var object = $(element);

                // unbind event
                object.off('click', '.button--hide-alert');
            });
        }
    };

    /**
     * Build component as a plugin.
     * @package component: alert: type-1
     * @version 1.0.0
     */
    $.fn.BINUS_Alert_One = function(options) {
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
        $('.C--alert.type--1.-autoload')
            .BINUS_Alert_One();
    });
})(jQuery);