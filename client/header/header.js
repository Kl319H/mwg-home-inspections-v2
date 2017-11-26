$(document).on("scroll", function () {
    if ($(document).scrollTop() > 120) {
        $("nav").addClass("small");
    } else {
        $("nav").removeClass("small");
    }
  });

// main-menu-scroll

jQuery(window).scroll(function () {
    var top = jQuery(document).scrollTop();
    var height = 300;
    //alert(batas);

    if (top > height) {
        jQuery('.navbar-fixed-top').addClass('menu-scroll');
    } else {
        jQuery('.navbar-fixed-top').removeClass('menu-scroll');
    }
});

