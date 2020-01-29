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
                onChangeItem: null,
            }, options);

            // init each component
            return this.each(function(index, element) {
                // create element object
                var object = $(element);

                // get first/selected option
                var option = object.find('.combobox__component option:selected');

                // setup element
                object.append('<span class="combobox__label">' + option.text() + '</span>\
                    <span class="combobox__dropdown">\
                        <span class="U--table -full-height">\
                            <span class="table__cell -vertical-align--middle">\
                                <i class="material-icons">keyboard_arrow_down</i>\
                            </span>\
                        </span>\
                    </span>');

                // when click option
                object.find('.combobox__component').focusin(function() {
                    // add focus class
                    object.addClass('-is-open');
                }).blur(function() {
                    // remove focus class
                    object.removeClass('-is-open');
                });

                // when change option
                object.on('change', '.combobox__component', function(e) {
                    // get selected option
                    var selectedOption = object.find('.combobox__component option:selected');

                    // set selected option
                    object.find('.combobox__label').text(selectedOption.text());

                    // remove focus class
                    object.removeClass('-is-open');

                    // when change item
                    if ($.isFunction(settings.onChangeItem)) {
                        settings.onChangeItem(object, selectedOption);
                    }
                });
            })
        },

        /**
         * Reset component.
         * @var {Object}
         */
        reset: function() {
            return this.each(function(index, element) {
                // create element object
                var object = $(element);

                // reset layout
                object.removeClass('-is-open');

                // reset value
                object
                    .find('.combobox__component')
                    .val('')
                    .find('option')
                    .removeAttr('selected');

                // get first/selected option
                var option = object
                    .find('.combobox__component option')
                    .first()
                    .attr('selected', 'selected');

                // set default value
                object
                    .find('.combobox__label')
                    .html(option.text());
            })
        },

        /**
         * Destroy component.
         * @var {Object}
         */
        destroy: function() {
            return this.each(function(index, element) {
                // create element object
                var object = $(element);

                // reset layout
                object.removeClass('-is-open');

                // reset value
                object
                    .find('.combobox__component')
                    .val('')
                    .find('option')
                    .removeAttr('selected');

                // unbind event
                object.off('change focusin blur', '.combobox__component');

                // remove element
                object
                    .find('.combobox__label')
                    .remove();
                object
                    .find('.combobox__dropdown')
                    .remove();
            });
        }
    }

    /**
     * Build component as a plugin.
     * @package component: combobox: type-1
     * @version 1.0.0
     */
    $.fn.BINUS_Combobox_One = function(options) {
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
        $('.C--combobox.type--1.-autoload')
            .BINUS_Combobox_One();
    });
})(jQuery);