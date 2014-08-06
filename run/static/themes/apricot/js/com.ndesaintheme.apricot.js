/* preloader.js */
$(window).load(function() { // makes sure the whole site is loaded
    $('#status').fadeOut(); // will first fade out the loading animation
    $('#preloader').fadeOut(); // will fade out the white DIV that covers the website.
    $('body').delay(350).css({
        'overflow': 'visible'
    });
})

/* app.js */

//BACKGROUND CHANGER

$(function() {
    $("#button-bg").click(function() {
        $("body").css({
            "background": "url('/static/themes/apricot/img/bg5.jpg')no-repeat center center fixed"
        });
    });
    $("#button-bg2").click(function() {
        $("body").css({
            "background": "url('/static/themes/apricot/img/bg2.jpg')no-repeat center center fixed"
        });
    });


    $("#button-bg3").click(function() {
        $("body").css({
            "background": "url('/static/themes/apricot/img/bg.jpg')no-repeat center center fixed"
        });


    });

    $("#button-bg5").click(function() {
        $("body").css({
            "background": "url('/static/themes/apricot/img/giftly.png')repeat"
        });

    });

    $("#button-bg6").click(function() {
        $("body").css({
            "background": "#2c3e50"
        });

    });

    $("#button-bg7").click(function() {
        $("body").css({
            "background": "url('/static/themes/apricot/img/bg3.png')repeat"
        });

    });
    $("#button-bg8").click(function() {
        $("body").css({
            "background": "url('/static/themes/apricot/img/bg8.jpg')no-repeat center center fixed"
        });
    });
    $("#button-bg9").click(function() {
        $("body").css({
            "background": "url('/static/themes/apricot/img/bg9.jpg')no-repeat center center fixed"
        });
    });

    $("#button-bg10").click(function() {
        $("body").css({
            "background": "url('/static/themes/apricot/img/bg10.jpg')no-repeat center center fixed"
        });
    });
    $("#button-bg11").click(function() {
        $("body").css({
            "background": "url('/static/themes/apricot/img/bg11.jpg')no-repeat center center fixed"
        });
    });
    $("#button-bg12").click(function() {
        $("body").css({
            "background": "url('/static/themes/apricot/img/bg12.jpg')no-repeat center center fixed"
        });
    });

    $("#button-bg13").click(function() {
        $("body").css({
            "background": "url('/static/themes/apricot/img/bg13.jpg')repeat"
        });

    });
    /**
     * Background Changer end
     */
});

//TOGGLE CLOSE
$('.nav-toggle').click(function() {
    //get collapse content selector
    var collapse_content_selector = $(this).attr('href');

    //make the collapse content to be shown or hide
    var toggle_switch = $(this);
    $(collapse_content_selector).slideToggle(function() {
        if ($(this).css('display') == 'block') {
            //change the button label to be 'Show'
            toggle_switch.html('<span class="entypo-minus-squared"></span>');
        } else {
            //change the button label to be 'Hide'
            toggle_switch.html('<span class="entypo-plus-squared"></span>');
        }
    });
});


$('.nav-toggle-alt').click(function() {
    //get collapse content selector
    var collapse_content_selector = $(this).attr('href');

    //make the collapse content to be shown or hide
    var toggle_switch = $(this);
    $(collapse_content_selector).slideToggle(function() {
        if ($(this).css('display') == 'block') {
            //change the button label to be 'Show'
            toggle_switch.html('<span class="entypo-up-open"></span>');
        } else {
            //change the button label to be 'Hide'
            toggle_switch.html('<span class="entypo-down-open"></span>');
        }
    });
    return false;
});
//CLOSE ELEMENT
$(".gone").click(function() {
    var collapse_content_close = $(this).attr('href');
    $(collapse_content_close).hide();



});

//tooltip
$('.tooltitle').tooltip();

//Sliding Effect Control
head.js("/static/themes/apricot/js/jquery-plugins/jquery.cookie.js");
head.js("/static/themes/apricot/js/skin-select/skin-select.js");

//Showing Date
head.js("/static/themes/apricot/js/clock/date.js");

//NEWS STICKER
head.js("/static/themes/apricot/js/jquery-plugins/jquery.newsTicker.js", function() {

    var nt_title = $('#nt-title').newsTicker({
        row_height: 18,
        max_rows: 1,
        duration: 5000,
        pauseOnHover: 0
    });


});

//-------------------------------------------------------------


////Acordion and Sliding menu

head.js("/static/themes/apricot/js/custom/scriptbreaker-multiple-accordion-1.js", function() {

    $(".topnav").accordionze({
        accordionze: true,
        speed: 500,
        closedSign: '<img src="/static/themes/apricot/img/plus.png">',
        openedSign: '<img src="/static/themes/apricot/img/minus.png">'
    });

});

////Right Sliding menu

head.js("/static/themes/apricot/js/slidebars/slidebars.js", "/static/themes/apricot/js/jquery-plugins/jquery.easing.js", function() {

    $(document).ready(function() {
        var mySlidebars = new $.slidebars();

        $('.toggle-left').on('click', function() {
            mySlidebars.toggle('right');
        });
    });
});

//-------------------------------------------------------------

//SEARCH MENU
head.js("/static/themes/apricot/js/jquery-plugins/jquery.quicksearch.js", function() {

    $('input.id_search').quicksearch('#menu-showhide li, .menu-left-nest li');



});
//-------------------------------------------------------------



//EASY PIE CHART
head.js("/static/themes/apricot/js/jquery-plugins/jquery.easypiechart.js", function() {

    $(function() {


        $('.chart').easyPieChart({
            easing: 'easeOutBounce',
            trackColor: '#ffffff',
            scaleColor: '#ffffff',
            barColor: '#FF0064',
            onStep: function(from, to, percent) {
                $(this.el).find('.percent').text(Math.round(percent));
            }
        });
        var chart = window.chart = $('.chart').data('easyPieChart');
        $('.js_update').on('click', function() {
            chart.update(Math.random() * 100);
        });

        $('.speed-car').easyPieChart({
            easing: 'easeOutBounce',
            trackColor: 'rgba(0,0,0,0.3)',
            scaleColor: 'transparent',
            barColor: '#0085DF',

            lineWidth: 8,
            onStep: function(from, to, percent) {
                $(this.el).find('.percent2').text(Math.round(percent));
            }
        });
        var chart = window.chart = $('.chart2').data('easyPieChart');
        $('.js_update').on('click', function() {
            chart.update(Math.random() * 100);
        });
        $('.overall').easyPieChart({
            easing: 'easeOutBounce',
            trackColor: 'rgba(0,0,0,0.3)',
            scaleColor: '#323A45',
            lineWidth: 35,
            lineCap: 'butt',
            barColor: '#FFB900',
            onStep: function(from, to, percent) {
                $(this.el).find('.percent3').text(Math.round(percent));
            }
        });
    });

});
//-------------------------------------------------------------

//TOOL TIP

head.js("/static/themes/apricot/js/jquery-plugins/jquery.tooltipster.js", function() {

    $('.tooltip-tip-x').tooltipster({
        position: 'right'

    });

    $('.tooltip-tip').tooltipster({
        position: 'right',
        animation: 'slide',
        theme: '.tooltipster-shadow',
        delay: 1,
        offsetX: '-12px',
        onlyOne: true

    });
    $('.tooltip-tip2').tooltipster({
        position: 'right',
        animation: 'slide',
        offsetX: '-12px',
        theme: '.tooltipster-shadow',
        onlyOne: true

    });
    $('.tooltip-top').tooltipster({
        position: 'top'
    });
    $('.tooltip-right').tooltipster({
        position: 'right'
    });
    $('.tooltip-left').tooltipster({
        position: 'left'
    });
    $('.tooltip-bottom').tooltipster({
        position: 'bottom'
    });
    $('.tooltip-reload').tooltipster({
        position: 'right',
        theme: '.tooltipster-white',
        animation: 'fade'
    });
    $('.tooltip-fullscreen').tooltipster({
        position: 'left',
        theme: '.tooltipster-white',
        animation: 'fade'
    });
    //For icon tooltip



});
//-------------------------------------------------------------

//NICE SCROLL

head.js("/static/themes/apricot/js/jquery-plugins/jquery.nanoscroller.js", function() {

    $(".nano").nanoScroller({
        //stop: true
        scroll: 'top',
        scrollTop: 0,
        sliderMinHeight: 40,
        preventPageScrolling: true
        //alwaysVisible: false

    });

});
//-------------------------------------------------------------






//-------------------------------------------------------------
//PAGE LOADER
head.js("/static/themes/apricot/js/pace/pace.js", function() {

    paceOptions = {
        ajax: false, // disabled
        document: false, // disabled
        eventLag: false, // disabled
        elements: {
            selectors: ['.my-page']
        }
    };

});

//-------------------------------------------------------------

//SPARKLINE CHART
head.js("/static/themes/apricot/js/jquery-plugins/jquery.sparkline.js", function() {

    $(function() {
        $('.inlinebar').sparkline('html', {
            type: 'bar',
            barWidth: '8px',
            height: '30px',
            barSpacing: '2px',
            barColor: '#A8BDCF'
        });
        $('.linebar').sparkline('html', {
            type: 'bar',
            barWidth: '5px',
            height: '30px',
            barSpacing: '2px',
            barColor: '#44BBC1'
        });
        $('.linebar2').sparkline('html', {
            type: 'bar',
            barWidth: '5px',
            height: '30px',
            barSpacing: '2px',
            barColor: '#AB6DB0'
        });
        $('.linebar3').sparkline('html', {
            type: 'bar',
            barWidth: '5px',
            height: '30px',
            barSpacing: '2px',
            barColor: '#19A1F9'
        });
    });

    $(function() {
        var sparklineLogin = function() {
            $('#sparkline').sparkline(
                [5, 6, 7, 9, 9, 5, 3, 2, 2, 4, 6, 7], {
                    type: 'line',
                    width: '100%',
                    height: '25',
                    lineColor: '#ffffff',
                    fillColor: '#0DB8DF',
                    lineWidth: 1,
                    spotColor: '#ffffff',
                    minSpotColor: '#ffffff',
                    maxSpotColor: '#ffffff',
                    highlightSpotColor: '#ffffff',
                    highlightLineColor: '#ffffff'
                }
            );
        }
        var sparkResize;
        $(window).resize(function(e) {
            clearTimeout(sparkResize);
            sparkResize = setTimeout(sparklineLogin, 500);
        });
        sparklineLogin();
    });


});

//-------------------------------------------------------------

//DIGITAL CLOCK
head.js("/static/themes/apricot/js/jquery-plugins/jquery.clock.js", function() {

    //clock
    $('#digital-clock').clock({
        offset: '+5',
        type: 'digital'
    });


});


//-------------------------------------------------------------

head.js("/static/themes/apricot/js/gage/raphael.js", "/static/themes/apricot/js/gage/justgage.js", function() {



    var g1;
    window.onload = function() {
        var g1 = new JustGage({
            id: "g1",
            value: getRandomInt(0, 1000),
            min: 0,
            max: 1000,
            relativeGaugeSize: true,
            gaugeColor: "rgba(0,0,0,0.4)",
            levelColors: "#0DB8DF",
            labelFontColor : "#ffffff",
            titleFontColor: "#ffffff",
            valueFontColor :"#ffffff",
            label: "VISITORS",
            gaugeWidthScale: 0.2,
            donut: true
        });
    };



});





