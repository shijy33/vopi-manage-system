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
head.js("/static/themes/apricot/js/skin-select/jquery.cookie.js");
head.js("/static/themes/apricot/js/skin-select/skin-select.js");

//Showing Date
head.js("/static/themes/apricot/js/clock/date.js");

//Bootstrap
//head.js("/static/themes/apricot/js/bootstrap.js");

//NEWS STICKER
head.js("/static/themes/apricot/js/newsticker/jquery.newsTicker.js", function() {

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

head.js("/static/themes/apricot/js/slidebars/slidebars.min.js", "http://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js", function() {

    $(document).ready(function() {
        var mySlidebars = new $.slidebars();

        $('.toggle-left').on('click', function() {
            mySlidebars.toggle('right');
        });
    });
});

//-------------------------------------------------------------

//SEARCH MENU
head.js("/static/themes/apricot/js/search/jquery.quicksearch.js", function() {

    $('input.id_search').quicksearch('#menu-showhide li, .menu-left-nest li');



});
//-------------------------------------------------------------



//EASY PIE CHART
head.js("/static/themes/apricot/js/gage/jquery.easypiechart.min.js", function() {

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

head.js("/static/themes/apricot/js/tip/jquery.tooltipster.js", function() {

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

head.js("/static/themes/apricot/js/nano/jquery.nanoscroller.js", function() {

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
head.js("/static/themes/apricot/js/chart/jquery.sparkline.js", function() {

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
head.js("/static/themes/apricot/js/clock/jquery.clock.js", function() {

    //clock
    $('#digital-clock').clock({
        offset: '+5',
        type: 'digital'
    });


});


//-------------------------------------------------------------

head.js("/static/themes/apricot/js/gage/raphael.2.1.0.min.js", "/static/themes/apricot/js/gage/justgage.js", function() {



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


(function(e,t){"use strict";function m(){}function g(e,t){if(!e){return}if(typeof e==="object"){e=[].slice.call(e)}for(var n=0,r=e.length;n<r;n++){t.call(e,e[n],n)}}function y(e,n){var r=Object.prototype.toString.call(n).slice(8,-1);return n!==t&&n!==null&&r===e}function b(e){return y("Function",e)}function w(e){return y("Array",e)}function E(e){var t=e.split("/"),n=t[t.length-1],r=n.indexOf("?");return r!==-1?n.substring(0,r):n}function S(e){e=e||m;if(e._done){return}e();e._done=1}function x(e,t,n,r){var i=typeof e==="object"?e:{test:e,success:!!t?w(t)?t:[t]:false,failure:!!n?w(n)?n:[n]:false,callback:r||m};var s=!!i.test;if(s&&!!i.success){i.success.push(i.callback);c.load.apply(null,i.success)}else if(!s&&!!i.failure){i.failure.push(i.callback);c.load.apply(null,i.failure)}else{r()}return c}function T(e){var t={};if(typeof e==="object"){for(var n in e){if(!!e[n]){t={name:n,url:e[n]}}}}else{t={name:E(e),url:e}}var r=o[t.name];if(r&&r.url===t.url){return r}o[t.name]=t;return t}function N(e){e=e||o;for(var t in e){if(e.hasOwnProperty(t)&&e[t].state!==v){return false}}return true}function C(e){e.state=p;g(e.onpreload,function(e){e.call()})}function k(e,n){if(e.state===t){e.state=h;e.onpreload=[];M({url:e.url,type:"cache"},function(){C(e)})}}function L(){var e=arguments,t=[].slice.call(e,1),n=t[0];if(!a){i.push(function(){c.load.apply(null,e)});return c}if(!!n){g(t,function(e){if(!b(e)&&!!e){k(T(e))}});O(T(e[0]),b(n)?n:function(){c.load.apply(null,t)})}else{O(T(e[0]))}return c}function A(){var e=arguments,t=e[e.length-1],n={};if(!b(t)){t=null}g(e,function(r,i){if(r!==t){r=T(r);n[r.name]=r;O(r,t&&i===e.length-2?function(){if(N(n)){S(t)}}:null)}});return c}function O(e,t){t=t||m;if(e.state===v){t();return}if(e.state===d){c.ready(e.name,t);return}if(e.state===h){e.onpreload.push(function(){O(e,t)});return}e.state=d;M(e,function(){e.state=v;t();g(s[e.name],function(e){S(e)});if(f&&N()){g(s.ALL,function(e){S(e)})}})}function M(t,r){function i(t){t=t||e.event;o.onload=o.onreadystatechange=o.onerror=null;r()}function s(t){t=t||e.event;if(t.type==="load"||/loaded|complete/.test(o.readyState)&&(!n.documentMode||n.documentMode<9)){o.onload=o.onreadystatechange=o.onerror=null;r()}}r=r||m;var o;if(/\.css[^\.]*$/.test(t.url)){o=n.createElement("link");o.type="text/"+(t.type||"css");o.rel="stylesheet";o.href=t.url}else{o=n.createElement("script");o.type="text/"+(t.type||"javascript");o.src=t.url}o.onload=o.onreadystatechange=s;o.onerror=i;o.async=false;o.defer=false;var u=n.head||n.getElementsByTagName("head")[0];u.insertBefore(o,u.lastChild)}function _(){var e=n.getElementsByTagName("script");for(var t=0,r=e.length;t<r;t++){var i=e[t].getAttribute("data-headjs-load");if(!!i){c.load(i);return}}}function D(e,t){if(e===n){if(f){S(t)}else{r.push(t)}return c}if(b(e)){t=e;e="ALL"}if(typeof e!=="string"||!b(t)){return c}var i=o[e];if(i&&i.state===v||e==="ALL"&&N()&&f){S(t);return c}var u=s[e];if(!u){u=s[e]=[t]}else{u.push(t)}return c}function P(){if(!n.body){e.clearTimeout(c.readyTimeout);c.readyTimeout=e.setTimeout(P,50);return}if(!f){f=true;_();g(r,function(e){S(e)})}}function H(){if(n.addEventListener){n.removeEventListener("DOMContentLoaded",H,false);P()}else if(n.readyState==="complete"){n.detachEvent("onreadystatechange",H);P()}}var n=e.document,r=[],i=[],s={},o={},u="async"in n.createElement("script")||"MozAppearance"in n.documentElement.style||e.opera,a,f,l=e.head_conf&&e.head_conf.head||"head",c=e[l]=e[l]||function(){c.ready.apply(null,arguments)},h=1,p=2,d=3,v=4;if(n.readyState==="complete"){P()}else if(n.addEventListener){n.addEventListener("DOMContentLoaded",H,false);e.addEventListener("load",P,false)}else{n.attachEvent("onreadystatechange",H);e.attachEvent("onload",P);var B=false;try{B=!e.frameElement&&n.documentElement}catch(j){}if(B&&B.doScroll){(function F(){if(!f){try{B.doScroll("left")}catch(t){e.clearTimeout(c.readyTimeout);c.readyTimeout=e.setTimeout(F,50);return}P()}})()}}c.load=c.js=u?A:L;c.test=x;c.ready=D;c.ready(n,function(){if(N()){g(s.ALL,function(e){S(e)})}if(c.feature){c.feature("domloaded",true)}});setTimeout(function(){a=true;g(i,function(e){e()})},300)})(window)



