var isBrowserAction = false;
//初始時加入一個style
$('<style>.ipushsHideBlock{display:none !important;}</style>').prependTo('html');
$('<style id="ipushsReadStyle"></style>').prependTo('html');
$('<style id="ipushsCustomFont"></style>').prependTo('html');


$(function(){
    document.addEventListener("contextmenu", function (e) {
        $(".ipushsRightTarget").removeClass("ipushsRightTarget");
        e.srcElement.classList.add("ipushsRightTarget");
    });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    var readStatus = false;

    if(request.actionType == 'browserAction')
        readStatus = browserAction(request.options, request.url)

    if (request.actionType == "toBlock")
        readStatus = toBlock(request.options);

    if (request.actionType == "hideBlock")
        readStatus = hideBlock('hide');

    // if (request.actionType == "selectRead")
    //     readStatus = selectRead(request.selectionText);

    sendResponse({readStatus:readStatus});
});


/*動作function*/
function removeAllClass(){
    $('.ipushsReadClass').removeClass('ipushsReadClass');
    $('.ipushsToBlockClass').removeClass('ipushsToBlockClass');
}

function hideImages(Status){
    if(Status === 'hide')
        $("img").hide();

    if(Status === 'show')
        $("img").show();

    return true;
}

function hideBlock(Status){
    if(Status === 'hide'){
        $('.ipushsRightTarget').addClass('ipushsHideBlock');
        return true;
    }

    if(Status === 'show'){
        $('.ipushsHideBlock').removeClass('ipushsHideBlock')
        return false;
    }
}

function toBlock(options){
    $('.ipushsReadClass').removeClass('ipushsReadClass');
    isBrowserAction = false;

    var $Element         = $('.ipushsRightTarget'),
        $ipushsReadStyle = $('#ipushsReadStyle');
        styletext        = '',
        linkColorStyle   = '',
        filterStyle      = '',
        regex            = '';

    $Element.addClass('ipushsToBlockClass');

    if(options.background != '')
        styletext += 'background:#'+options.background+' !important;';

    if(options.color != '')
        styletext += 'color:#'+options.color+' !important;';

    if(options.saturate != '')
        filterStyle += 'saturate('+options.saturate/100+') ';

    if(options.contrast != '')
        filterStyle += 'contrast('+options.contrast/100+') ';

    if(options.brightness != '')
        filterStyle += 'brightness('+options.brightness/100+') ';

    if(options.linkColor != '')
        linkColorStyle = 'color:#'+options.linkColor+' !important;';

    if(options.lineHeight != '')
        styletext += 'line-height:'+options.lineHeight+' !important;';

    if(options.letterSpacing != '')
        styletext += 'letter-spacing:'+options.letterSpacing+' !important;';

    if(options.fontSize != ''){
        regex = /\%$/;
        if(!options.fontSize.match(regex)){
            styletext += 'font-size:'+options.fontSize+' !important;';
        }
    }

        if(options.fontFamily != '') {
            var fontFamilyValue = injectCustomFont(options);
            styletext += 'font-family:'+fontFamilyValue+' !important;';
        }

        if(options.textShadow != '')
            styletext += 'text-shadow:'+options.textShadow+' !important;';

        $ipushsReadStyle.html('.ipushsToBlockClass, .ipushsToBlockClass *{'+styletext+'}');
    $ipushsReadStyle.append('.ipushsToBlockClass{font-size:'+options.fontSize+'!important;}');
    $ipushsReadStyle.append('.ipushsToBlockClass a{'+linkColorStyle+'}');

    if(options.saturate != '100' || options.contrast != '100' || options.brightness != '100'){
        $ipushsReadStyle.append('.ipushsToBlockClass{-webkit-filter:'+filterStyle+';}');
    }

    return true;
}

// function selectRead(Text){
//     $('body').html(Text);
//     return true;
// }

function browserAction(options,url){

    var location_href     = location.href,
        location_hostname = location.hostname,
        styletext         = '',
        linkColorStyle    = '',
        filterStyle       = '',
        regex             = '',
        hStyle            = '',
        $ipushsReadStyle  = $('#ipushsReadStyle');
   
    if(isBrowserAction === false && location_hostname !== 'www.youtube.com' ){

        $ipushsReadStyle.html('');

        $('.ipushsToBlockClass').removeClass('ipushsToBlockClass');

        if(options.isSmartRead !== false) SmartRead();
        if(options.isImagesRemove !== false) hideImages('hide');
        if(options.isFullscreen !== false && location_href == url) launchFullscreen();


        if(options.background != '')
            styletext += 'background:#'+options.background+' !important;';

        if(options.color != '')
            styletext += 'color:#'+options.color+' !important;';

        if(options.saturate != '')
            filterStyle += 'saturate('+options.saturate/100+') ';

        if(options.contrast != '')
            filterStyle += 'contrast('+options.contrast/100+') ';

        if(options.brightness != '')
            filterStyle += 'brightness('+options.brightness/100+') ';

        if(options.linkColor != '')
            linkColorStyle = 'color:#'+options.linkColor+' !important;';

        if(options.lineHeight != '')
            styletext += 'line-height:'+options.lineHeight+' !important;';

        if(options.letterSpacing != '')
            styletext += 'letter-spacing:'+options.letterSpacing+' !important;';

        if(options.fontSize != ''){
            regex = /\%$/;
            if(!options.fontSize.match(regex)){
                styletext += 'font-size:'+options.fontSize+' !important;';
            }else{
                styletext += 'font-size:100% !important;';
                hStyle = 'h1{font-size:160%!important;}h2{font-size:150%!important;}h3{font-size:140%!important;}h4{font-size:130%!important;}h5{font-size:120%!important;}h6{font-size:110%!important;}'
            }
        }

        if(options.fontFamily != '') {
            var fontFamilyValue = injectCustomFont(options);
            styletext += 'font-family:'+fontFamilyValue+' !important;';
        }

        if(options.textShadow != '')
            styletext += 'text-shadow:'+options.textShadow+' !important;';

        if(options.transition != ''){
            styletext += 'transition:background '+options.transition+'s,color '+options.transition+'s;';
        }

        $ipushsReadStyle.append('*{'+styletext+'}');
        $ipushsReadStyle.append('a{'+linkColorStyle+'}');
        $ipushsReadStyle.append('html{font-size:'+options.fontSize+'!important;}');
        $ipushsReadStyle.append(hStyle);

        if(options.saturate != '100' || options.contrast != '100' || options.brightness != '100'){
            $ipushsReadStyle.append('html{-webkit-filter:'+filterStyle+';}');
        }

        if (!options.hasOwnProperty("loading") || options.loading === false) {
            isBrowserAction = true;
        }

        return true;
    }

    if(isBrowserAction === true){
        hideBlock('show');
        hideImages('show');
        $ipushsReadStyle.html('');
        $('#ipushsCustomFont').html('');
        isBrowserAction = false;
        return false
    }

}



/*公用function*/
function SmartRead(){

    var $title    = false;
    var $body     = false;
    var domain    = getDomainUrl();
    var max_width = 0;

    if(domain.match("blogspot")){
        $body = $('.post');
        $body.find('#related-posts').remove();
    }

    if(domain.match("pixnet")){
        $body = $('.article-content-inner');
        $body.find('.article-keyword').remove();
        $body.find('.fb-comments').remove();
    }

    switch(domain){
        case 'blog.xuite.net':
            $body = $('.ArticleContent');
            $body = $body.find('.title, .blogbody');
            $body.find('.articleExt').remove();
            $body.find('.posted').remove();
            $body.find('.selectbar').remove();
            break;
        case 'medium.com':
            $body = $('.post-page-wrapper-full');
            $('html').css({'overflow':'initial'});
            $('body').css({'overflow':'initial'});
            break;
        case 'www.techbang.com':
            $body = $('.main-content');
            $body.find('.content-top').remove();
            $body.find('.advertise').remove();
            $body.find('#post-additional').remove();
            $body.find('.comments').remove();
            break;
        case 'tw.news.yahoo.com':
            $body = $('#mediaarticlehead, #mediaarticlebody');
            break;
        case 'www.mobile01.com':
            $body = $('.forum-content');
            $body.find('.single-post-author').css({'margin-bottom':'20px'});
            break;
        case 'www.ettoday.net':
            $body = $('.subjcet_news .title, header .title, .story');
            break;
        default:
    }

    if(!$body || $body.length<=0){
        if($('article').length > 0)
            $body = $('article')
        else if($('.post').length > 0)
            $body = $('.post');
        else if($('.blogbody').length > 0)
            $body = $('.blogbody');
        else if($('.forum-content').length > 0)
            $body = $('.forum-content');
        else if($('#content').length > 0)
            $body = $('#content');
        else if($('.content').length > 0)
            $body = $('.content');
        else if($('#main').length > 0)
            $body = $('#main');
        else if($('.main').length > 0)
            $body = $('.main');
    }

    if($body && $body.length>0){
        $body.find('iframe').remove();
        $body.find('script').remove();

        max_width = $body.width();

        $body.css({'margin':'5% auto','max-width':max_width})

        $('body').html($body).css({'margin':'5% auto','max-width':max_width});
    }

    return true;
}


function getDomainUrl(url){
     var host = "null";
     if(typeof url == "undefined" || null == url)
          url = window.location.href;

     var regex = /.*\:\/\/([^\/]*).*/;
     var match = url.match(regex);
     if(typeof match != "undefined" && null != match)
          host = match[1];
     return host;
}
function launchFullscreen() {
    var element = document.documentElement;

    if(element.requestFullscreen) {
        element.requestFullscreen();
    } else if(element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if(element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if(element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}

function injectCustomFont(options) {
    var $customFontStyle = $('#ipushsCustomFont');
    $customFontStyle.html('');
    
    if(options.fontFamily === '__custom__') {
        // 上傳的字體
        if(options.customFontData && options.customFontName && options.customFontType && options.customFontType !== 'local') {
            var format = options.customFontType === 'ttf' ? 'truetype' :
                         options.customFontType === 'otf' ? 'opentype' :
                         options.customFontType === 'woff2' ? 'woff2' : 'woff';
            
            $customFontStyle.html(
                '@font-face { font-family: "CustomUploadedFont"; ' +
                'src: url("' + options.customFontData + '") format("' + format + '"); }'
            );
            return '"CustomUploadedFont"';
        }
        // 本地字體
        if(options.customFontName) {
            return '"' + options.customFontName + '"';
        }
        return '';  // 沒有設定自定義字體
    }
    return options.fontFamily;
}
