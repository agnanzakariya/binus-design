(function($) {
    /**
     * Object to control component layout.
     * @since 1.0.0
     */
    var Component = {

        /**
         * Reset component.
         * @param {Object} object
         */
        reset: function(object) {
            // reset text
            object
                .find('.uploadbox__label')
                .text('No file chosen.');

            // remove value
            object
                .find('.uploadbox__component')
                .val('');

            // remove button
            object.find('.uploadbox__remove').remove();
        },

        /**
         * Update component.
         * @param {Object} object
         * @param {Object} attribute
         */
        update: function(object, attribute) {
            // remove input element
            object
                .find('.uploadbox__component')
                .remove();

            // append new input element
            object.append(Render.textbox(attribute));
        }
    };

    /**
     * Render object.
     * @var {Object}
     */
    var Render = {

        /**
         * Render textbox.
         * @param {Object} attribute
         * @return {Element}
         */
        textbox: function(attribute) {
            return (
                '<input type="file" class="uploadbox__component ' + attribute.class + '" name="' + attribute.name + '" id="' + attribute.id + '">'
            );
        },

        /**
         * Render label.
         * @param {Object} label
         * @return {Element}
         */
        label: function(label) {
            return (
                '<span class="uploadbox__label">' + label + '</span>'
            );
        },

        /**
         * Render textbox.
         * @return {Element}
         */
        toggleButton: function() {
            return (
                '<span class="uploadbox__indicator">\
                    <span class="U--table -full-height">\
                        <span class="table__cell -vertical-align--middle">\
                            <i class="material-icons">attach_file</i>\
                        </span>\
                    </span>\
                </span>'
            );
        },

        /**
         * Render remove button.
         * @return {Element}
         */
        removeButton: function() {
            return (
                '<span class="uploadbox__remove">\
                    <span class="U--table -full-height">\
                        <span class="table__cell -vertical-align--middle">\
                            <i class="material-icons">close</i>\
                        </span>\
                    </span>\
                </span>'
            );
        }
    };

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
            // define settings
            var settings = $.extend({
                onChangeFile: null,
            }, options);

            return this.each(function(index, element) {
                var object = $(element);

                // get data attribute
                var attribute = {
                    id: object.attr('data-id'),
                    name: object.attr('data-name'),
                    class: object.attr('data-class'),
                    label: 'No file chosen.'
                };

                // init element
                object.append(
                    Render.label(attribute.label) +
                    Render.toggleButton() +
                    Render.textbox(attribute)
                );

                // when change a file
                object.on('change', '.uploadbox__component', function(e) {
                    var file = $(this);

                    // get target
                    var target = e.target || e.srcElement;

                    // if not selected file
                    if (target.value.length == 0) {
                        // set selected file name
                        object
                            .find('.uploadbox__label')
                            .text(attribute.label);

                        return
                    }

                    // get file name
                    var fileName = file[0].files.length == 0 ?
                        attribute.label : file[0].files[0].name;

                    // set selected file name
                    object
                        .find('.uploadbox__label')
                        .text(fileName);

                    // show remove button
                    object.append(
                        Render.removeButton()
                    );

                    // add remove button action
                    object.on('click', '.uploadbox__remove', function(event) {
                        event.preventDefault();
                        Component.reset(object);
                    });

                    // when change file
                    if ($.isFunction(settings.onChangeFile)) {
                        settings.onChangeFile(object, file);
                    }
                });
            });
        },

        /**
         * Reset component.
         * @since 1.0.0
         */
        reset: function() {
            return this.each(function(index, element) {
                var object = $(element);

                // reset object
                Component.reset(object);
            });
        },

        /**
         * Destroy component.
         * @since 1.0.0
         */
        destroy: function() {
            return this.each(function(index, element) {
                var object = $(element);

                // reset object
                Component.reset(object);

                // unbind event
                object.off('click', '.uploadbox__component');

                // clear element
                object.html('');
            });
        }
    };

    /**
     * Build component as a plugin.
     * @package component: uploadbox: type-1
     * @version 1.0.0
     */
    $.fn.BINUS_Uploadbox_One = function(options) {
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
        $('.C--uploadbox.type--1.-autoload')
            .BINUS_Uploadbox_One();
    });
})(jQuery);