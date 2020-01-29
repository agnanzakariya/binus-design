(function($) {
    /**
     * Render object.
     * @var {Object}
     */
    var Render = {

        /**
         * Render textbox.
         * @return {Element}
         */
        textbox: function(attribute) {
            return (
                '<input ' + (attribute.isDisabled ? 'readonly="readonly"' : '') + ' type="' + attribute.inputType + '" class="passbox__input ' + attribute.class + '" name="' + attribute.name + '" id="' + attribute.id + '" value="' + attribute.value + '" placeholder="' + attribute.placeholder + '">'
            );
        },

        /**
         * Render toggle button.
         * @return {Element}
         */
        toggleButton: function() {
            return (
                '<span class="passbox__key">\
                    <span class="U--table -full-height">\
                        <span class="table__cell -vertical-align--middle U--text-align--center">\
                            <i class="visibility__on material-icons">visibility</i>\
                            <i class="visibility__off material-icons">visibility_off</i>\
                        </span>\
                    </span>\
                </span>'
            );
        }
    }

    /**
     * Object to control component layout.
     * @var {Object}
     */
    var Component = {

        /**
         * Toggle visibility.
         * @param {Object} object
         * @param {Object} attribute
         */
        toggle: function(object, attribute) {
            // remove input element
            object
                .find('.passbox__input')
                .remove();

            // append new input element
            object.append(Render.textbox(attribute));
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
         */
        init: function(options) {
            /**
             * Plugin options.
             * @var {Object}
             */
            var settings = $.extend({
                isDisabled: false,
                onShow: null,
                onHide: null
            }, options);

            // init each component
            return this.each(function(index, element) {
                // create element object
                var object = $(element);

                // get data attribute
                var attribute = {
                    id: object.attr('data-id'),
                    name: object.attr('data-name'),
                    class: object.attr('data-class'),
                    value: object.attr('data-value'),
                    placeholder: object.attr('data-placeholder') === undefined ? '' : object.attr('data-placeholder'),
                    inputType: 'password',
                    isDisabled: settings.isDisabled
                };

                // if disabled
                if (settings.isDisabled) {
                    object.addClass('-is-disabled');
                }

                // init element
                object.append(
                    Render.toggleButton() + Render.textbox(attribute)
                );

                // when click visibility
                object.on('click', '.passbox__key', function(e) {
                    e.preventDefault();

                    // get value
                    attribute.value = object
                        .find('.passbox__input')
                        .val();

                    if (object.hasClass('-is-show')) {
                        // hide password
                        object.removeClass('-is-show');

                        // set input type
                        attribute.inputType = 'password';

                        // do when hide password
                        if ($.isFunction(settings.onHide)) {
                            settings.onHide(object, Component, attribute);
                        }
                    } else {
                        // show password
                        object.addClass('-is-show');

                        // set input type
                        attribute.inputType = 'text';

                        // do when show password
                        if ($.isFunction(settings.onShow)) {
                            settings.onShow(object, Component, attribute);
                        }
                    }

                    // change visibility
                    Component.toggle(object, attribute);
                });
            });
        },

        /**
         * Reset component.
         * @var {Function}
         */
        reset: function() {
            return this.each(function(index, element) {
                // create element object
                var object = $(element);

                // clear layout
                object
                    .removeClass('-is-show')
                    .find('passbox__input')
                    .val('');
            })
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
                object.off('click', '.passbox__key');

                // clear element
                object.html('');
            });
        },

        /**
         * Enabled component.
         * @var {Function}
         */
        enabled: function() {
            return this.each(function(index, element) {
                // create element object
                var object = $(element);

                // enabled textbox
                object
                    .removeClass('-is-disabled')
                    .find('.passbox__input')
                    .removeAttr('readonly');
            });
        },

        /**
         * Disabled component.
         * @var {Function}
         */
        disabled: function() {
            return this.each(function(index, element) {
                // create element object
                var object = $(element);

                // disabled textbox
                object
                    .addClass('-is-disabled')
                    .find('.passbox__input')
                    .attr('readonly', 'readonly');
            });
        }
    }

    /**
     * Build component as a plugin.
     * @package component: passbox: type-1
     * @version 1.0.0
     */
    $.fn.BINUS_Passbox_One = function(options) {
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
        $('.C--passbox.type--1.-autoload')
            .BINUS_Passbox_One();
    });
})(jQuery);