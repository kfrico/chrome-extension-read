var options = {
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
    textShadow     : 'none',
    transition     : '',
    isImagesRemove : false,
    isSmartRead    : false,
    isAutoRead     : false,
    isFullscreen   : false,
    selectText     : ''
}

//初始值
chrome.storage.local.get([
    "background",
    "color",
    "saturate",
    "contrast",
    "brightness",
    "linkColor",
    "lineHeight",
    "letterSpacing",
    "fontSize",
    "fontFamily",
    "transition",
    "isImagesRemove",
    "isSmartRead",
    "isAutoRead",
    "isFullscreen",
    "whiteList"
], function(items) {
    if(items["background"])
        options.background = items["background"];

    if(items["color"])
        options.color = items["color"];

    if(items["saturate"])
        options.saturate = items["saturate"];

    if(items["contrast"])
        options.contrast = items["contrast"];

    if(items["brightness"])
        options.brightness = items["brightness"];

    if(items["linkColor"])
        options.linkColor = items["linkColor"];

    if(items["lineHeight"])
        options.lineHeight = items["lineHeight"];

    if(items["letterSpacing"])
        options.letterSpacing = items["letterSpacing"];

    if(items["fontSize"])
        options.fontSize = items["fontSize"];

    if(items["fontFamily"])
        options.fontFamily = items["fontFamily"];

    if(items["transition"])
        options.transition = items["transition"];

    if(items["isImagesRemove"])
        options.isImagesRemove = items["isImagesRemove"];

    if(items["isSmartRead"])
        options.isSmartRead = items["isSmartRead"];

    if(items["isAutoRead"])
        options.isAutoRead = items["isAutoRead"];

    if(items["isFullscreen"])
        options.isFullscreen = items["isFullscreen"];

    if(items["whiteList"])
        options.whiteList = items["whiteList"];

});

//接收訊息
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.actionType == 'optionUpdate')
        options = request;

    if (request.actionType == "getOptions")
        sendResponse(options);
});


//監聽安裝or更新事件
// chrome.runtime.onInstalled.addListener(function(details) {
//     window.open('http://blog.ipushs.com/chrome-extension-%E8%88%92%E9%81%A9%E9%96%B1%E8%AE%80/');
// });
//監聽新頁面開啟or重新整理事件
chrome.tabs.onUpdated.addListener(function(tabId, info, tab) {
    if (info.status == "complete") {
        if(options.isAutoRead === true){
            var whiteListArray = [];
            whiteListArray = options.whiteList.split('\n');
            
            for(var i in whiteListArray) {

                if (whiteListArray[i] == '') {
                    continue;
                }

                var regexp = whiteListArray[i].replace(/\//g, '\/');

                regexp = regexp.replace(/\./g, '\.');
                regexp = regexp.replace(/\:/g, '\:');

                if (tab.url.match(regexp)) {
                    return false;
                };
            }

            var data = {
                options:options,
                url:tab.url,
                actionType:'browserAction'
            }
            chrome.tabs.sendMessage(tab.id, data, function(request){
                if(request.readStatus === false)
                    chrome.browserAction.setIcon({path:"icon48-off.png",tabId:tab.id});
                if(request.readStatus === true)
                    chrome.browserAction.setIcon({path:"icon48.png",tabId:tab.id});
            });
        }
    }
});

//監聽browser按鈕事件
chrome.browserAction.onClicked.addListener(function(tab) {
    var data = {
        options:options,
        url:tab.url,
        actionType:'browserAction'
    }
    chrome.tabs.sendMessage(tab.id, data, function(request){
        if(request.readStatus === false)
            chrome.browserAction.setIcon({path:"icon48-off.png",tabId:tab.id});
        if(request.readStatus === true)
            chrome.browserAction.setIcon({path:"icon48.png",tabId:tab.id});
    });
});



chrome.contextMenus.create({"title": "舒適閱讀", "id": "parent","contexts": ["all"]});
chrome.contextMenus.create({
    "title"   : "區塊舒適",
    "parentId": "parent",
    "id"      : "toBlock",
    "contexts": ["page", "frame", "link", "editable", "image", "video", "audio"],
    "onclick" : function(info, tab){
        var data = {
            options:options,
            actionType:'toBlock'
        }
        chrome.tabs.sendMessage(tab.id, data, function(request){
            if(request.readStatus === true)
                chrome.browserAction.setIcon({path:"icon48.png",tabId:tab.id});
        });
    }
})
chrome.contextMenus.create({
    "title"   : "區塊隱藏",
    "parentId": "parent",
    "id"      : "hideBlock",
    "contexts": ["page", "frame", "link", "editable", "image", "video", "audio"],
    "onclick" : function(info, tab){
        var data = {
            options:options,
            actionType:'hideBlock'
        }
        chrome.tabs.sendMessage(tab.id, data, function(request){
            if(request.readStatus === false)
                chrome.browserAction.setIcon({path:"icon48-off.png",tabId:tab.id});
            if(request.readStatus === true)
                chrome.browserAction.setIcon({path:"icon48.png",tabId:tab.id});
        });
    }
})
// chrome.contextMenus.create({
//     "title"   : "選擇閱讀",
//     "parentId": "parent",
//     "id"      : "toBlockS",
//     "contexts": ["selection"],
//     "onclick" : function(info, tab){
//         var data = {
//             options:options,
//             selectionText:info.selectionText,
//             actionType:'selectRead'
//         }
//         chrome.tabs.sendMessage(tab.id, data, function(){});
//     }
// })