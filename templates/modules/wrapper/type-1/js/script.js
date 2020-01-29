(function($) {
    /**
     * Define container.
     * 
     * @var {Element}
     */
    var container = $('.M--wrapper.type--1');

    /**
     * When document is ready.
     */
    $(document).ready(function() {
        /**
         * Toggle sidebar.
         */
        container.on('click', '.button--toggle-sidebar', function(event) {
            event.preventDefault();
            container.find('.wrapper__sidebar').addClass('-is-show');
        }).on('click', '.sidebar__overlay', function(event) {
            event.preventDefault();
            container.find('.wrapper__sidebar').removeClass('-is-show');
        });
    });
})(jQuery);