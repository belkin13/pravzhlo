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

  jQuery(document).ready(function ($) {

    var sync1 = $(".block-views-blockmain-slider-block-1 .view-content").first().addClass('owl-carousel');// This is the ID of the block with the single item/big image. It's possible to use ID's of multiple slideshows, separated by a comma <- Make sure this is the ID of the div that also has the class "owl-carousel"
        sync2 = $(".block-views-blockmain-slider-block-1 .view-main-slider .view-main-slider .view-content").addClass('owl-carousel'), // This is the ID of the attachment with multiple items. It's possible to use ID's of multiple carousels, separated by a comma <- Make sure this is the ID of the div that also has the class "owl-carousel"
        flag = false,
        duration = 300;

    sync1.owlCarousel({
          dots:false,
          mouseDrag:false,
          touchDrag:true,
          pullDrag:false,
          margin:0,
          lazyLoad:true,
          nav:true,
          navText: ["назад","вперёд"],
          items:1,
          // these group settings are configured with Owl's UI in Drupal, although "item:1" may be required to work on Android's native browser
        })
        .on('changed.owl.carousel', function (e) {
          if (!flag) {
            flag = true;
            sync2.trigger('to.owl.carousel', [e.item.index, duration, true]);
            flag = false;
          }
        });
      sync2
        .owlCarousel({
          dots:false,
          mouseDrag:false,
          touchDrag:true,
          pullDrag:false,
          margin:0,
          lazyLoad:true,
          nav:true,
          items:3,
          // these group settings are configured with Owl's UI in Drupal
        })
        .on('mouseenter', '.owl-item', function () {
          sync1.trigger('to.owl.carousel', [$(this).index(), duration, true]);
          this.items().removeClass('active');
          $(this).addClass('active');
          console.log($(this));
        })
        .on('changed.owl.carousel', function (e) {
          if (!flag) {
            flag = true;
            sync1.trigger('to.owl.carousel', [e.item.index, duration, true]);
            
            flag = false;

          }
        });

    /*var owl = jQuery('.owl-carousel');
    owl.owlCarousel({
      loop: true,
      items: 1,
      thumbs: true,
      thumbImage: true,
      thumbContainerClass: 'owl-thumbs',
      thumbItemClass: 'views-row'
    });*/
   
  });