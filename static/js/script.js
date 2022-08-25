(function ($) {

    "use strict";

    // Preloder
    setTimeout(function(){
        $('.preloder').fadeOut();
        $('.loder-center').delay(150).fadeOut('slow');
    }, 5000);
    // Navbar Fixed Top On Scroll
    var affixElement = $('#navbar-main');

    $(affixElement).affix({
        offset: {
            // Distance of between element and top page
            top: function () {
                return (this.top = $(affixElement).offset().top)
            }
        }
    });

    // Counter / Funfact
    var startCount = $('.start-count');
    if (startCount.length) {
        startCount.each(function () {
            var $this = $(this);
            $this.data('target', parseInt($this.html(), 10));
            $this.data('counted', false);
            $this.html('0');
        });

        $(window).on('scroll', function () {
            var speed = 4000;
            $('.start-count').each(function () {
                var $this = $(this);
                if (!$this.data('counted') && $(window).scrollTop() + $(window).height() >= $this.offset().top) {
                    $this.data('counted', true);
                    $this.animate({
                        dummy: 1
                    }, {
                        duration: speed,
                        step: function (now) {
                            var $this = $(this);
                            var val = Math.round($this.data('target') * now);
                            $this.html(val);
                            if (0 < $this.parent('.value').length) {
                                $this.parent('.value').css('width', val + '%');
                            }
                        }
                    });
                }
            });
        })
            .triggerHandler('scroll');
    }

    // Bootstrap Slider Caption Animation
    //Function to animate slider captions
    function doAnimations( elems ) {
        //Cache the animationend event in a variable
        var animEndEv = 'webkitAnimationEnd animationend';

        elems.each(function () {
            var $this = $(this),
                $animationType = $this.data('animation');
            $this.addClass($animationType).one(animEndEv, function () {
                $this.removeClass($animationType);
            });
        });
    }

    //Variables on page load
    var $myCarousel = $('#carousel-example-generic'),
        $firstAnimatingElems = $myCarousel.find('.item:first').find("[data-animation ^= 'animated']");

    //Initialize carousel
    $myCarousel.carousel({
        interval: 5000
    });

    //Animate captions in first slide on page load
    doAnimations($firstAnimatingElems);

    //Other slides to be animated on carousel slide event
    $myCarousel.on('slide.bs.carousel', function (e) {
        var $animatingElems = $(e.relatedTarget).find("[data-animation ^= 'animated']");
        doAnimations($animatingElems);
    });

    $myCarousel.on('mouseover', function (e) {
         $myCarousel.carousel();
    });


    // Scroll To Top
    $(window).scroll(function () {
        if ($(this).scrollTop() > 150) {
            $('.scrollup').fadeIn();
        } else {
            $('.scrollup').fadeOut();
        }
    });

    $('.scrollup').on('click', function () {
        $("html, body").animate({
            scrollTop: 0
        }, 1500);
        return false;
    });

    // slider Carousel Three
    $('.slider-three').owlCarousel({
        loop:true,
        margin:30,
        dots: false,
        nav:true,
        autoplayHoverPause:false,
        autoplay: true,
        smartSpeed: 1500,
        navText: [
          '<i class="fa fa-angle-left" aria-hidden="true"></i>',
          '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0: {
                items: 1,
                center: false
            },
            480:{
                items:1,
                center: false
            },
            600: {
                items: 1,
                center: false
            },
            768: {
                items: 3
            },
            992: {
                items: 3
            },
            1200: {
                items: 3
            }
        }
    });

    // owl-carousel for Testimonial
    $('.testimonial-carousel').owlCarousel({
        loop: false,
        margin: 10,
        nav: false,
        dots: true,
        autoplay: false,
        autoplayTimeout: 2000,
        autoplayHoverPause: false,
        autoplaySpeed: 2000,
        animateOut: '',
        animateIn: 'zoomIn',
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    });

    // owl-carousel for slider-one
    $('.slider-one').owlCarousel({
        loop: false,
        margin: 10,
        nav: false,
        dots: false,
        autoplay: false,
        autoplayTimeout: 2000,
        autoplayHoverPause: false,
        autoplaySpeed: 2000,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    });

    // owl-carousel for partners
    $('.partenr').owlCarousel({
        loop: true,
        margin: 20,
        nav: false,
        dots: false,
        autoplay: true,
        autoplayTimeout: 4000,
        autoplayHoverPause: false,
        autoplaySpeed: 1000,
        navText: [
            '<i class="fa fa-long-arrow-left" aria-hidden="true"></i>',
            '<i class="fa fa-long-arrow-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0: {
                items: 1,
                center: false
            },
            480: {
                items: 2,
                center: false
            },
            600: {
                items: 2,
                center: false
            },
            768: {
                items: 4
            },
            992: {
                items: 4
            },
            1200: {
                items: 5
            }
        }
    });

    // Parallax
    $('.parallax').jarallax({
        // parallax effect speed. 0.0 - 1.0
        speed: 0.5
    });

    // Fancybox
        $('.fancybox').fancybox();

    // Gallery filter
    var galleryFilterLi = $('.gallery-filter li');
    var galleryFilter = $('.gallery-filter');

    if (galleryFilterLi.length) {
        galleryFilterLi.on("click", function (event) {
            $(this).siblings('.active').removeClass('active');
            $(this).addClass('active');
            event.preventDefault();
        });
    }

    if (galleryFilter.length) {
        galleryFilter.on('click', 'a', function () {
            $('#filters button').removeClass('current');
            $(this).addClass('current');
            var filterValue = $(this).attr('data-filter');
            $(this).parents(".gallery-filter-item").next().isotope({filter: filterValue});
        });
    }

    // isotope | init Isotope
    if ($.fn.imagesLoaded && $(".gallery:not(.gallery-masonry)").length > 0) {
        var $container = $(".gallery:not(.gallery-masonry)");
            imagesLoaded($container, function () {
            setTimeout(function () {
                $container.isotope({
                    itemSelector: '.gallery-item',
                    layoutMode: 'fitRows',
                    filter: '*'
                });

                $(window).trigger("resize");
                // filter items on button click
            }, 500);

        });
    }

    //LightBox / Fancybox
    $('.lightbox-image').fancybox();

    // Video popup
    jQuery("a.demo").YouTubePopUp();

})(window.jQuery);