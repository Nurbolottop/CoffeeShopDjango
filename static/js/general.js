jQuery(document).ready(function() {
    "use strict";

    var $ = jQuery,
        screenRes = $(window).width(),
        screenHeight = $(window).height(),
        html = $('html');


    // Set height for body when page is load, but page is load if set the height:auto;
    $("body").css('height', screenHeight);

    jQuery(window).resize(function() {
        screenRes = $(window).width();
        screenHeight = $(window).height();
    });

    // IE<8 Warning
    if (html.hasClass("ie8")) {
        $("body").empty().html('Please, Update your Browser to at least IE9');
    }

    // Disable Empty Links
    $("[href=#]").on("click", function(event){
        event.preventDefault();
    });

    // Remove outline in IE
    jQuery("a, input, textarea").attr("hideFocus", "true").css("outline", "none");


    if (jQuery(".input-styled").length) {
        jQuery(".input-styled input").customInput();
    }

    // Selectize js call
    if(jQuery(".field-select").length){
        jQuery('.field-select select').selectize({
            create: true,
            sortField: 'text'
        });
    }

    //Iframe Serponsive
    function adjustIframes()
    {
        jQuery('iframe').each(function(){
            var
                $this       = $(this),
                proportion  = $this.data( 'proportion' ),
                w           = $this.attr('width'),
                actual_w    = $this.width();

            if ( ! proportion )
            {
                proportion = $this.attr('height') / w;
                $this.data( 'proportion', proportion );
            }

            if ( actual_w != w )
            {
                $this.css( 'height', Math.round( actual_w * proportion ) + 'px' );
            }
        });
    }
    $(window).on('resize load',adjustIframes);

    //Scroll To Top
    jQuery(".fly-btn-to-top").on("click", function(){
        var selected = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(selected).offset().top-135
        }, 800);
        return false;
    });

    // send contact data with ajax
    jQuery('.fly-form-contact').on("submit", function(){
        var name      = jQuery(this).find('#name').val();
        var last_name = jQuery(this).find('#last-name').val();
        var phone     = jQuery(this).find('#phone').val();
        var email     = jQuery(this).find('#email').val();
        var message   = jQuery(this).find('#message').val();
        var data      = 'name='+ name  +'&last_name='+ last_name +'&phone='+ phone +'&email='+ email +'&message='+ message;

        var form_parent = jQuery(this).parents('.fly-contact-form');
        $.ajax({
            type: "POST",
            cache: false,
            url: "ajax_send_contact.php",
            data: data,    // multiple data sent using ajax
            success: function (html) {
                console.log('success');
                form_parent.find('form').hide();
                form_parent.find('.fly-contact-title').hide();
                form_parent.append('<h3>Your message has been sent!</h3><div class="confirm"><p class="textconfirm">Thank you for contacting us.<br/>We will get back to you as soon as possible.</p></div>');
            },
            fail: function () {
                console.log('fail');
                form_parent.find('form').hide();
                form_parent.find('.fly-contact-title').hide();
                form_parent.append('<h3>Oops!</h3><div class="confirm"><p class="texterror">Due to an unknown error, your form was not submitted, please resubmit it or try later.</p></div>');
            }
        });
        return false;
    });

    // send reservation data with ajax
    jQuery('.fly-form-reservation').on("submit", function(){
        var date      = jQuery(this).find('#reservation-date').val();
        var pers      = jQuery(this).find('#persone').val();
        var phone     = jQuery(this).find('#phone').val();
        var time      = jQuery(this).find('#reservation-time').val();
        var name      = jQuery(this).find('#name').val();
        var email     = jQuery(this).find('#email').val();
        var message   = jQuery(this).find('#notice').val();
        var data      = 'name='+ name  +'&date='+ date +'&pers='+ pers +'&phone='+ phone +'&email='+ email+'&time='+ time +'&message='+ message;

        var form_parent = jQuery(this).parents('.fly-reservation-form');
        $.ajax({
            type: "POST",
            cache: false,
            url: "ajax_send_reservation.php",
            data: data,    // multiple data sent using ajax
            success: function (html) {
                console.log('success send RF');
                form_parent.find('form').hide();
                form_parent.find('.fly-contact-title').hide();
                form_parent.append('<h3>Your reservation has been sent!</h3><div class="confirm"><p class="textconfirm">Thank you for contacting us.<br/>We will get back to you as soon as possible.</p></div>');
            },
            fail: function () {
                console.log('fail send RF');
                form_parent.find('form').hide();
                form_parent.find('.fly-contact-title').hide();
                form_parent.append('<h3>Oops!</h3><div class="confirm"><p class="texterror">Due to an unknown error, your form was not submitted, please resubmit it or try later.</p></div>');
            }
        });
        return false;
    });

    // prettyPhoto lightbox, check if <a> has atrr data-rel and hide for Mobiles
    if($('a').is('[data-rel]') && screenRes > 600) {
        $('a[data-rel]').each(function() {
            $(this).attr('rel', $(this).data('rel'));
        });
        $("a[rel^='prettyPhoto']").prettyPhoto({
            social_tools: false,
            theme: 'dark_square',
            horizontal_padding: 100,
            overlay_gallery: false,
            changepicturecallback: function() {
                var $holder = jQuery('.pp_nav .currentTextHolder'),
                    splitted = $holder.text().split('/');

                $holder.html(splitted.join('<span class="pp_text_devider">/</span>'));
            }
        });
    }

    // Home Slider
    //jQuery('.main-carousel').prepend('<img src="images/Home-Slider/slide-1.jpg" alt="" class="testimage hidden">');


    // set height for item in slider
    jQuery(window).load(function(){
        if(screenRes > 768 ) {
            jQuery('.fly-slider-full .item').css('height', screenHeight);
        }
    });

    // set height for item in slider (resize image)
    jQuery(window).resize(function(){
        if(screenRes > 768 ) {
            jQuery('.fly-slider-full .item').css('height', screenHeight);
        }
    });

    $('#myCarousel').carousel({
        interval: 7500
    });

    if (Modernizr.touch) {
        $('#myCarousel').find('.carousel-inner').swipe( {
            swipeLeft: function() {
                $(this).parent().carousel('next');
            },
            swipeRight: function() {
                $(this).parent().carousel('prev');
            },
            threshold: 30
        })
    }

    // Special Offers Slider
    start_special_offers_slider();
    $(window).on('resize', function(){
        start_special_offers_slider();
    });

    // Testimonials Slider
    if(jQuery('#fly-testimonials-slider').length > 0) {
        setTimeout(function () {
            jQuery('#fly-testimonials-slider').carouFredSel({
                swipe: {
                    onTouch: true
                },
                pagination: "#fly-testimonials-slider-controls",
                auto: {
                    play: true,
                    timeoutDuration: 10000
                },
                circular: true,
                infinite: true,
                width: '100%',
                scroll: {
                    items: 1,
                    fx: "crossfade",
                    easing: "linear",
                    duration: 300
                }
            });
        },0);
    }

    //** Home Menu
    // DropDown Offset calculate
    jQuery(".fly-nav-menu li.menu-item-has-children").on("hover", function(){
        var $this = $(this);
        if($this.find('.sub-menu')) {
            var dropdown = $this.children('ul'),
                dropdownWidth = dropdown.outerWidth(),
                dropdownOffset = parseInt(dropdown.offset().left, 10);

            if (dropdownWidth + dropdownOffset > screenRes) {
                dropdown.addClass('left');
            }
            else {
                dropdown.removeClass('left');
            }
        }
    });

    sticky_menu();
    jQuery(window).resize(function() {
        if(screenRes <= 992){
            Mobile_Menu();
        }

        sticky_menu();
    });

    // Home Menu Restaurant (Image Changes if mouse over)
    function swapImages(){
        var active_image = $('.fly-menu-block-hover .fly-menu-image-array .active-image');
        var next_active_image = ($('.fly-menu-block-hover .fly-menu-image-array .active-image').next().length > 0) ? $('.fly-menu-block-hover .fly-menu-image-array .active-image').next() : $('.fly-menu-block-hover .fly-menu-image-array img:first');
            active_image.removeClass('active-image');
            next_active_image.addClass('active-image');
    }
    var timer;
    jQuery('.fly-menu-category').hover(function(){
        $(this).addClass('fly-menu-block-hover');
        timer = setInterval(swapImages, 250);
    },function(){
        clearInterval(timer);
        $(this).removeClass('fly-menu-block-hover');
        $(this).find('img').removeClass("active-image").first().addClass("active-image")
    });

    // Google Maps (Initialise & Customise)
    function init() {
        var myLatLong = new google.maps.LatLng(51.590814, 0.0339111);  // Set coordinates for map
        var mapOptions = {                                             // Map Option & Styling
            zoom: 14,
            center: myLatLong,
            scrollwheel: false,
            styles:[
                {
                    "featureType": "administrative",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#444444"
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "all",
                    "stylers": [
                        {
                            "color": "#f2f2f2"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "all",
                    "stylers": [
                        {
                            "saturation": -100
                        },
                        {
                            "lightness": 45
                        },
                        {
                            "hue": "#ff0000"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "color": "#c6a05e"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#e0e0e0"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "simplified"
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "all",
                    "stylers": [
                        {
                            "color": "#cdcdcd"
                        },
                        {
                            "visibility": "on"
                        }
                    ]
                }
            ]
        };
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);  // Get options to map
        var image_marker = 'images/map-pin.png';                                    // Url for image marker
        var marker = new google.maps.Marker({                                       // Create and set the marker
            position: myLatLong,
            map: map,
            title: 'Restaurant FlyCoffee',
            popup: true,
            icon: image_marker
        });
        var contentString =  '<div class="map-popup-info-wrap"><strong>Restaurant FlyCoffee</strong><br><span>' +   // Create html content for popup info
            '49 Chigwell Road  - South Woodford, London E18 1NG - United Kingdom' +
            '<br>Tel.: (020) 8989 3831 </span></div>';

        var infowindow = new google.maps.InfoWindow({                               // Get content to map
            content: contentString
        });
        google.maps.event.addListener(marker, 'click', function() {                 // Event: open popup but click the marker
            infowindow.open(map, marker);
        });
    };
    if(jQuery('.google-maps').length > 0){
        google.maps.event.addDomListener(window, 'load', init);
    }

    // DateTime Picker (script for reservation form)
    if(jQuery('.fly-form-reservation').length > 0){
        jQuery('#reservation-date').datetimepicker({
            timepicker:false,
            format:'d.m.Y',
            minDate:0
        });
        jQuery('#reservation-time').datetimepicker({
            datepicker: false,
            format:'H:i'
        });
    }

    // Photo Gallery
    function photo_gallery(){
        // Masonry script
        var $gallerycontainer = jQuery('.fly-photo-list-item').masonry();
        $gallerycontainer.masonry({
            itemSelector : '.photo'
        });
        // Sortable gallery
        jQuery('.fly-photo-gallery-nav li a').on('click',function(){
            jQuery('.fly-photo-gallery-nav li').removeClass('active-category');
            jQuery(this).parent().addClass('active-category');

            var category = jQuery(this).attr('data-category');

            //if not all checked
            if(category !== 'all') {
                jQuery('.fly-photo-list-item .photo').each(function () {
                    var photo_cats = jQuery(this).attr('data-category').split(",");
                    if (in_array(category, photo_cats))
                        jQuery(this).addClass('active');
                    else
                        jQuery(this).removeClass('active');
                });
            }
            else {
                jQuery('.fly-photo-list-item .photo').each(function () {
                    jQuery(this).addClass('active');
                });
            }
        });
    }
    jQuery(window).load(function(){
        if(jQuery('.fly-photo-gallery').length > 0){
            setTimeout(function () {
                photo_gallery();
            },2);
        }

    });

    // Parallax Effect

    //.parallax(xPosition, speedFactor, outerHeight) options:
    //xPosition - Horizontal position of the element.
    //inertia - speed to move relative to vertical scroll. Example: 0.1 is one tenth the speed of scrolling, 2 is twice the speed of scrolling.
    //outerHeight (true/false) - Whether or not jQuery should use it's outerHeight option to determine when a section is in the viewport.

    var parallaxFunction = function(){
      jQuery('section.parallax, .fly-slider-full .item.parallax').each(function(){
        $(this).removeClass('parallax');
      });
    };
    if(screenRes > 800){
        jQuery('.parallax').parallax("50%", 0.1);
    }
    else if(screenRes < 700){
        parallaxFunction();
    }

    // for forms validation
    forms_validation('.fly-form-reservation');
    forms_validation('.fly-form-contact');
});

// validation of contact and reservation form
function forms_validation(selector){
    jQuery(selector).on('click', 'input[type="submit"]', function(e){
        e.preventDefault();
        var _form  = jQuery(this).parents(selector);
        var count = 0;
        _form.find('.field-text input, .field-text textarea').each(function(){
            if( jQuery(this).val() == ''){
                jQuery(this).css('border-color', 'red');
                count++;
            }
            else{
                jQuery(this).css('border-color', '#999999');
            }
        });

        if(count == 0){
            _form.submit();
        }
        else{
            return;
        }
    });
}

// Loading Page Spinner
$(window).load(function(){
    var $ = jQuery;
    $("body .spinner").remove();
    $("body").css('height', 'auto');
    $(".site").removeClass('invisible').addClass('animated fadeIn');
});

function in_array(needle, haystack, strict) {	// Checks if a value exists in an array
    //
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)

    var found = false, key, strict = !!strict;

    for (key in haystack) {
        if ((strict && haystack[key] === needle) || (!strict && haystack[key] == needle)) {
            found = true;
            break;
        }
    }

    return found;
}

function start_special_offers_slider(){
    if(jQuery('#fly-slider-special-offers').length > 0){
        jQuery('#fly-slider-special-offers').carouFredSel({
            swipe : {
                onTouch: true
            },
            next : "#special-offers-slider-next",
            prev : "#special-offers-slider-prev",
            auto: {
                play: true,
                timeoutDuration: 3000
            },
            circular: true,
            infinite: true,
            width: '100%',
            scroll: {
                items : 1,
                easing: "swing"
            }
        });
    }
}

// Responsive Menu (Mobile Menu)
function Mobile_Menu() {
    "use strict";

    $('.mm-page').addClass('mm-slideout');

    if( jQuery('#mobile-menu').length > 0 ) return;

    var mob_menu1 = jQuery(".fly-site-navigation#fly-menu-primary .fly-nav-menu").clone();
    jQuery('<nav id="mobile-menu"></nav>').appendTo('.fly-header-site .fly-nav-wrap');
    var mob_menu = jQuery('#mobile-menu');
    mob_menu.append(mob_menu1);
    if (jQuery('.fly-site-navigation#fly-menu-secondary').length > 0) {
        var mob_menu2 = jQuery(".fly-site-navigation#fly-menu-secondary .fly-nav-menu").clone();
        jQuery('#mobile-menu > ul > li:last-child').after(mob_menu2);
    }

    if(jQuery('.fly-header-site.fly-header-type-2').length > 0){
        jQuery('<a href="#mobile-menu" class="mmenu-link"><i class="fa fa-navicon"></i></a>').prependTo(".fly-header-site .container");
    }
    else{
        jQuery('<a href="#mobile-menu" class="mmenu-link"><i class="fa fa-navicon"></i></a>').prependTo(".fly-header-site");
    }

    mob_menu.mmenu({
        counters: true,
        searchfield: true,
        onClick: {
            preventDefault: false,
            close: true
        },
        offCanvas: {
            position  : "left"
        }
    }, {
        classNames: {
            selected: "current-menu-item"
        }
    });

};

jQuery(window).resize(function() {
	var screenRes = $(window).width();
	var screenHeight = $(window).height();

	if(screenRes < 992){
		Mobile_Menu();
	}
	else{
		$('.fly-nav-wrap nav#mobile-menu').remove();
		$('.mm-page').removeClass('mm-slideout');
	}
});

if($(window).width() < 992){
	Mobile_Menu();
}

//Sticky Menu
function sticky_menu(){
    "use strict";

    if( jQuery('.fly-header-site.fly-sticky-header-on').length > 0) {
        var header_height = jQuery('.fly-header-site').outerHeight(),
            sticky_open = header_height * 2;

        jQuery(window).on('scroll', function () {
            if (jQuery(window).scrollTop() > header_height + 5) {
                jQuery('.fly-header-site').addClass('sticky-menu').css('top', -header_height);
            } else {
                jQuery('.fly-header-site').removeClass('sticky-menu').css('top', 0);
            }

            if (jQuery(window).scrollTop() > sticky_open) {
                jQuery('.fly-header-site.sticky-menu').addClass('sticky-open');
                jQuery('html').addClass('sticky-menu-opened');
            } else {
                jQuery('.fly-header-site.sticky-menu').removeClass('sticky-open');
                jQuery('html').removeClass('sticky-menu-opened');
            }
        });
    }
};