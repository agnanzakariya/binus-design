(function($) {
    /**
     * Define container.
     * 
     * @var {Element}
     */
    var container = $('.M--navigation.type--1');

    /**
     * When document is ready.
     */
    $(document).ready(function() {
        /**
         * Toggle dropdown menu.
         */
        container.on('click', '.button--toggle-dropdown', function(event) {
            event.preventDefault();

            var button = $(this);
            var parent = button.parent();

            if (parent.hasClass('-is-show')) {
                // hide dropdown
                parent.removeClass('-is-show');
            } else {
                // hide all dropdown
                container.find('.navigation__dropdown-wrapper').removeClass('-is-show');

                // show selected dropdown
                parent.addClass('-is-show');
            }
        });
    });

    /**
     * Hide dropdown when click outside element.
     */
    $(document).on('mouseup', function(event) {
        var wrapper = container.find('.navigation__dropdown-wrapper');

        if (!wrapper.is(event.target) && wrapper.has(event.target).length === 0) {
            wrapper.removeClass('-is-show');
        }
    });
})(jQuery);