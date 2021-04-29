(function ($, Drupal, drupalSettings) {

    'use strict';
  
    Drupal.behaviors.navhover = {
      attach: function (context, settings) {
        $(".navbar-nav .dropdown").hover(
            function(){
                $(this).addClass("show");
                $("ul.dropdown-menu", this).addClass("show");
            },function(){
                $(this).removeClass("show");
                $("ul.dropdown-menu", this).removeClass("show");
            });
      }
    } 
  
  })(jQuery, Drupal, drupalSettings);