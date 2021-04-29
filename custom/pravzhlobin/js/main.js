(function ($, Drupal, drupalSettings) {

    'use strict';
  
    Drupal.behaviors.navhover = {
      attach: function (context, settings) {
        
            // Toggles a B4 dropdown-menu to a given state.
            const toggleDropdownElement = ($dropdown, shouldOpen = false) => {
                const $dropdownToggle = $dropdown.children('[data-toggle="dropdown"], a');
                const $dropdownMenu = $dropdown.children('.dropdown-menu');
            
                // Change the dropdown menu. It's similar to B4 Dropdown.show()/.hide(), see /bootstrap/js/src/dropdown.js.
                if (shouldOpen) {
                $dropdown.trigger('show.bs.dropdown');
                $dropdownToggle.attr('aria-expanded', true).focus();
                $dropdownMenu.addClass('show');
                $dropdown.addClass('show').trigger($.Event('shown.bs.dropdown', $dropdownMenu[0]));
                } else {
                $dropdown.trigger('hide.bs.dropdown');
                $dropdownToggle.attr('aria-expanded', false);
                $dropdownMenu.removeClass('show');
                $dropdown.removeClass('show').trigger($.Event('hidden.bs.dropdown', $dropdownMenu[0]));
                }
            };
        
        // Toggles a B4 dropdown-menu with any nesting level.
        const toggleDropdown = (event) => {
            const $dropdown = $(event.target).closest('.dropdown');
            const $parentDropdownMenu = $dropdown.closest('.dropdown-menu');
            const shouldOpen = event.type !== 'click' && $dropdown.is(':hover');
        
            // If the dropdown was closed already, break the 'mouseleave' event cascade.
            if (!shouldOpen && !$dropdown.hasClass('show')) return;
        
            // Change the current dropdown menu (last nested).
            toggleDropdownElement($dropdown, shouldOpen);
        
            // We have to close the dropdown menu tree if it was a click or the menu was leave at all.
            if (event.type === 'click' || $parentDropdownMenu.length && !$parentDropdownMenu.is(':hover')) {
            $dropdown.parents('.dropdown').each((index, element) => {
                toggleDropdownElement($(element), false);
            });
            }
        };
        
        if (viewport && viewport.is('>=xl')) {
            $('body')
            .on('mouseenter mouseleave', '.dropdown', toggleDropdown)
            .on('click', '.dropdown-menu a', toggleDropdown);
        
            // Disable the default B4's click. Other words, change a dropdown-toggle to a normal nav link.
            $(document).off('click.bs.dropdown', '[data-toggle="dropdown"]');
            $(document).off('click.bs.dropdown.data-api', '[data-toggle="dropdown"]'); // Not sure about it.
        }
            }
            };
  
  })(jQuery, Drupal, drupalSettings);