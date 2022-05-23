"use strict";

// $(window).on("load",function(){
$(document).ready(function(){

    $(".loader-backdrop").fadeOut();            // Pre Loader
    
});

/* Function Calls */

$(document).ready(function(){

    linkScroll();           // Scroll to link on click

    if($("header").length){
        fixedHeader();          // Call to Fixed Headwr
    }

	if($(".testimonial-slider").length){
        testimonialSlider();			// Call to Testimonial Slider
    }

    if($(".hero-slider").length){
        heroSlider();            // Call to Testimonial Slider
    }

    if($(".youtube").length){    
        $(".youtube").each(function(){
            youtubeVideo(this);         // Style each video found on page
        });        
    }

    if($(".count").length){
        $(".count").each(function(){
            $(this).appear(function() {        // Call to function countTo() only when the Element is in viewport
                countToNumber(this);
            });
        });
    }

    if($("#backHome").length){              // Back To Top Icon
        backToHome();
    }

});

/* Function Definitions */

function fixedHeader(){
    window.addEventListener('scroll', function(e){
        var distanceY = window.pageYOffset || document.documentElement.scrollTop,
            shrinkOn = 300,
            header = document.querySelector("header");
        if (distanceY > shrinkOn) {
            classie.add(header,"fixed");
        } else {
            if (classie.has(header,"fixed")) {
                classie.remove(header,"fixed");
            }
        }
    });
}

function linkScroll(){
    $('.scroll-link').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') || location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
               if (target.length) {
                 $('html,body').animate({
                     scrollTop: target.offset().top-60
                }, 1000);
                return false;
            }
        }
    });
}

function testimonialSlider(){
    
    var testimonialSliderVar= $('.testimonial-slider .slider-items');
    
    $('.testimonial-slider .left').click(function() {
        testimonialSliderVar.trigger('prev.owl.carousel');
    })
    
    $('.testimonial-slider .right').click(function() {
        testimonialSliderVar.trigger('next.owl.carousel');
    })
    
    testimonialSliderVar.owlCarousel({
        items:"1",
        loop: "true",
        autoplay: "true",
        autoplayTimeout: "3000",
        autoplaySpeed: "1000",
        smartSpeed: "1500",
        margin: 30,
        center: "true"
    });
}

function heroSlider(){
    
    var heroSliderVar= $('.hero-slider .slider-items');
    
    heroSliderVar.owlCarousel({
        items:"1",
        baseClass: "hero-slider",
        dots: "true",
        dotsContainer: ".hero-dots",
        loop: "true",
        autoplay: "true",
        autoplayTimeout: "4500",
        autoplaySpeed: "1000",
        smartSpeed: "1500",
        margin: 30,
        center: "true"
    });
}

function youtubeVideo(currentVideo)
{    
    var videoId = $(currentVideo).attr("data-video-id");                                    // Get Video ID from data attributes
    
    var thumbnail = 'url(https://img.youtube.com/vi/'+ videoId + '/sddefault.jpg)';         // Get Thumbail image of the video
    
    $(currentVideo).css("background-image", thumbnail);                                     // Set thmbnail image as the background
    
    var videoUrl= "https://www.youtube.com/embed/" + videoId + "?autoplay=1&autohide=1";    // Framing Video URL from video ID
    
    $(currentVideo).find(".btn-play").click(function(){                                     // If play button is clicked, load Video within IFrame
        $(currentVideo).find(".btn-play").fadeOut();
        var videoFrame = $('<iframe/>', {
            'frameborder': '0',
            'src': videoUrl,
            'width': "100%",
            'height': "400px"
        });
        $(currentVideo).append(videoFrame);                                            // Finally replace the div with IFrame
    });    
}

function countToNumber(thisCounter){
    $(thisCounter).countTo({
        speed: 3500,
        formatter: function (value, options) {
            value = value.toFixed(options.decimals);
            value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            return value;
          }
    });                    
}

function backToHome()
{
    var offset = 250;                          // Offset after which Back To Top button will be visible 
    var duration = 1500;                       // Time duration in which the page scrolls back up.
    
    jQuery(window).scroll(function() {
        if (jQuery(this).scrollTop() > offset) {
            $('#backHome').fadeIn(500);
        } else {
            $('#backHome').fadeOut(500);
        }
    });  
}