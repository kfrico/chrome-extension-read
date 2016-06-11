$(function(){
    var $matchcolors    = $('.matchcolors'),
        $background     = $('#background'),
        $color          = $('#color'),
        $linkColor      = $('#linkColor'),
        $lineHeight     = $('#lineHeight'),
        $letterSpacing  = $('#letterSpacing'),
        $fontSize       = $('#fontSize'),
        $fontFamily     = $('#fontFamily'),
        $transition     = $('#transition'),
        $isImagesRemove = $('#isImagesRemove'),
        $isSmartRead    = $('#isSmartRead'),
        $isAutoRead     = $('#isAutoRead'),
        $isFullscreen   = $('#isFullscreen'),
        $fontModel      = $('#fontModel'),
        $link           = $('#link'),
        $saturate       = $('#saturate'),
        $contrast       = $('#contrast'),
        $brightness     = $('#brightness'),
        $whiteList      = $('#whiteList'),
        $blackList      = $('#blackList');

    var options = {
        matchcolors    : 'option8',
        background     : '081010',
        color          : 'b58931',
        saturate       : '100',
        contrast       : '100',
        brightness     : '100',
        linkColor      : '',
        lineHeight     : '',
        letterSpacing  : '',
        fontSize       : '',
        fontFamily     : '',
        transition     : '',
        whiteList      : '',
        blackList      : '',
        isImagesRemove : false,
        isSmartRead    : false,
        isAutoRead     : false,
        isFullscreen   : false
    }

    //matchcolors
    $matchcolors.click(function(){
        var $this       = $(this),
            $background = $('#background'),
            $color      = $('#color');

        switch($this.val())
        {
        case 'option1':
            $background.val('777');
            $color.val('222');
            $fontModel.css({background:'#777',color:'#222'});
            break;
        case 'option2':
            $background.val('415062');
            $color.val('fff6e6');
            $fontModel.css({background:'#415062',color:'#fff6e6'});
            break;
        case 'option3':
            $background.val('414441');
            $color.val('d5cecd');
            $fontModel.css({background:'#414441',color:'#d5cecd'});
            break;
        case 'option4':
            $background.val('6a7962');
            $color.val('081408');
            $fontModel.css({background:'#6a7962',color:'#081408'});
            break;
        case 'option5':
            $background.val('c5a562');
            $color.val('101020');
            $fontModel.css({background:'#c5a562',color:'#101020'});
            break;
        case 'option6':
            $background.val('d5c6ac');
            $color.val('494c49');
            $fontModel.css({background:'#d5c6ac',color:'#494c49'});
            break;
        case 'option7':
            $background.val('b5eecd');
            $color.val('414c41');
            $fontModel.css({background:'#b5eecd',color:'#414c41'});
            break;
        case 'option8':
            $background.val('081010');
            $color.val('b58931');
            $fontModel.css({background:'#081010',color:'#b58931'});
            break;
        case 'option9':
            $background.val('000');
            $color.val('fff');
            $fontModel.css({background:'#000',color:'#fff'});
            break;
        default:
            break;
        }
    });

    //background
    $background.ColorPicker({
        onSubmit: function(hsb, hex, rgb, el) {
            $(el).val(hex);
            $(el).ColorPickerHide();
            $(el).change();
        },
        onBeforeShow: function () {
            $(this).ColorPickerSetColor(this.value);
        }
    })
    .bind('keyup', function(){
        $(this).ColorPickerSetColor(this.value);
    })
    .change(function(){
        $fontModel.css({background:'#'+$(this).val()});
    });

    //color
    $color.ColorPicker({
        onSubmit: function(hsb, hex, rgb, el) {
            $(el).val(hex);
            $(el).ColorPickerHide();
            $(el).change();
        },
        onBeforeShow: function () {
            $(this).ColorPickerSetColor(this.value);
        }
    })
    .bind('keyup', function(){
        $(this).ColorPickerSetColor(this.value);
    })
    .change(function(){
        $fontModel.css({color:'#'+$(this).val()});
    });

    //linkColor
    $linkColor.ColorPicker({
        onSubmit: function(hsb, hex, rgb, el) {
            $(el).val(hex);
            $(el).ColorPickerHide();
            $(el).change();
        },
        onBeforeShow: function () {
            $(this).ColorPickerSetColor(this.value);
        }
    })
    .bind('keyup', function(){
        $(this).ColorPickerSetColor(this.value);
    })
    .change(function(){
        $link.css({color:'#'+$(this).val()});
    });

    //saturate
    $saturate.bind('input change',function(){
        $fontModel.css({'webkitFilter':'saturate('+$saturate.val()/100+') contrast('+$contrast.val()/100+') brightness('+$brightness.val()/100+')'});
    });

    //contrast
    $contrast.bind('input change',function(){
        $fontModel.css({'webkitFilter':'saturate('+$saturate.val()/100+') contrast('+$contrast.val()/100+') brightness('+$brightness.val()/100+')'});
    });

    //brightness
    $brightness.bind('input change',function(){
        $fontModel.css({'webkitFilter':'saturate('+$saturate.val()/100+') contrast('+$contrast.val()/100+') brightness('+$brightness.val()/100+')'});
    });

    //lineHeight
    $lineHeight.bind('input change',function(){
        var val = $(this).val();
        $fontModel.css({lineHeight:$(this).val()});
    });

    //letterSpacing
    $letterSpacing.bind('input change',function(){
        var val = $(this).val();
        $fontModel.css({letterSpacing:$(this).val()});
    });

    //fontSize
    $fontSize.bind('input change',function(){
        var val = $(this).val();
        $fontModel.css({fontSize:$(this).val()});
    });

    //fontFamily
    $fontFamily.change(function(){
        var val = $(this).val();
        $fontModel.css({fontFamily:$(this).val()});
    });

    //transition
    $transition.bind('input change',function(){
        var val = $(this).val();
        $fontModel.css({transition:'background '+$(this).val()+'s,color '+$(this).val()+'s'});
    });

    //save_btn
    $('#save_btn').click(function(){
        var options = {
            actionType     : 'optionUpdate',
            background     : $background.val(),
            color          : $color.val(),
            linkColor      : $linkColor.val(),
            saturate       : $saturate.val(),
            contrast       : $contrast.val(),
            brightness     : $brightness.val(),
            lineHeight     : $lineHeight.val(),
            letterSpacing  : $letterSpacing.val(),
            fontSize       : $fontSize.val(),
            fontFamily     : $fontFamily.val(),
            transition     : $transition.val(),
            textShadow     : 'none',
            isImagesRemove : $isImagesRemove.is(":checked"),
            isSmartRead    : $isSmartRead.is(":checked"),
            isAutoRead     : $isAutoRead.is(":checked"),
            isFullscreen   : $isFullscreen.is(":checked"),
            whiteList      : $whiteList.val(),
            blackList      : $blackList.val(),
            matchcolors    : $("input[name='matchcolors']:checked").val()
        }

        chrome.storage.local.set({'options': options});
        chrome.runtime.sendMessage(options, function(response) {});
    });


    chrome.storage.local.get([
        "options"
    ], function(items) {
        $.extend(options, items.options);

        $background.val(options.background).change();
        $color.val(options.color).change();
        $linkColor.val(options.linkColor).change();
        $saturate.val(options.saturate).change();
        $contrast.val(options.contrast).change();
        $brightness.val(options.brightness).change();
        $lineHeight.val(options.lineHeight).change();
        $letterSpacing.val(options.letterSpacing).change();
        $fontSize.val(options.fontSize).change();
        $fontFamily.val(options.fontFamily).change();
        $transition.val(options.transition).change();
        $whiteList.val(options.whiteList);
        $blackList.val(options.blackList);
        $isImagesRemove.prop("checked", options.isImagesRemove);
        $isSmartRead.prop("checked", options.isSmartRead);
        $isAutoRead.prop("checked", options.isAutoRead);
        $isFullscreen.prop("checked", options.isFullscreen);

        $("input[name=matchcolors][value='"+options.matchcolors+"']").attr('checked',true);

        $( "#saturateSlider" ).slider({
            range: "min",
            value: options.saturate,
            min: 1,
            max: 200,
            slide: function( event, ui ) {
                $saturate.val( ui.value ).change();
            }
        });

        $( "#contrastSlider" ).slider({
            range: "min",
            value: options.contrast,
            min: 1,
            max: 200,
            slide: function( event, ui ) {
                $contrast.val( ui.value ).change();
            }
        });
        $contrast.val( $( "#contrastSlider" ).slider( "value" ) );

        $( "#brightnessSlider" ).slider({
            range: "min",
            value: options.brightness,
            min: 1,
            max: 200,
            slide: function( event, ui ) {
                $brightness.val( ui.value ).change();
            }
        });
        $brightness.val( $( "#brightnessSlider" ).slider( "value" ) );
    });
});