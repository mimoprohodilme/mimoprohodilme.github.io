function redrawStyles()
{
 if (typeof $0USERS == "undefined") return;
 $.each($0USERS, function(k, v) {
  $(".userlist_item span:last-of-type").filter(function(){
    return (this.innerText === v);
  }).addClass(v+"_nick");
  $(".chat-msg-"+v+" span:last-of-type").addClass(v+"_chat");
  $(".chat-msg-"+v+" .username").addClass(v+"_nick_chat");
 });
}

function reloadAliases()
{
  if (typeof $0ALIASES == "undefined") return;
  $.each($0ALIASES, function(k, v) {
    $(".userlist_item span:last-of-type").filter(function(){
      return (this.innerText === k);
    }).html(v);
    $(".chat-msg-"+k+" .username").html(v+": ");
  });
}


MOTDAutoLogo_Array = [
];

MOTDTabs_Array = [

]

/* -- HTML/CSS -- */

MOTDTabs_CSS = {
'padding':			'3px',
'text-align':		'center',
'margin':			'auto',
'color':			'white',
};

// set MOTD

function changeMOTD() {
	if (UI_MOTDTabs=="1" && MOTDTabs_Array.length>0) {
		// adding tabs application

		motdtabswrap = $('<center id="motdtabswrap" />')
		  .appendTo("#motd");
		for (var i in MOTDTabs_Array) {
			btn = $('<button class="btn btn-default motdtabs-btn" tab="'+i+'">')
			  .text(MOTDTabs_Array[i][0])
			  .appendTo(motdtabswrap)
			  .on("click", function() {
				$(".motdtabs-btn").removeClass('btn-success');
				$(this).addClass('btn-success');
				nr=$(this).attr('tab');
				motdtabscontent.html(MOTDTabs_Array[nr][1]);
			  });
		}
		motdtabscontent = $('<div id="motdtabscontent">'+MOTDTabs_Array[0][1]+'</div>')
		  .css(MOTDTabs_CSS)
		  .appendTo("#motd");
		$(".motdtabs-btn:nth-child(1)").addClass('btn-success');
	}
	if (UI_MOTDAutoLogo=="1") {

		// adding logo

		var logo = 0;
		var len = MOTDAutoLogo_Array.length;
		if (len<1) {
			MOTDAutoLogo_Array=['https://dl.dropboxusercontent.com/s/7mrz85gl29eiiks/logo.png'];
			len=1;
		}
		if (MOTDAutoLogo_Mode=="2" || MOTDAutoLogo_Mode=="3") {
			logo=Math.floor(Math.random()*len);
		} else if (MOTDAutoLogo_Mode=="7") {
			logo=new Date().getDay();
			typeof MOTDAutoLogo_Array[logo]==="undefined" ? logo=0 : '';
		}
		$('<center><img id="motdlogo" src="'+MOTDAutoLogo_Array[logo]+'" /></center>').prependTo("#motd");
	}
}

// setting MOTD

if (UI_MOTDAutoLogo=="1" || (UI_MOTDTabs=="1" && MOTDTabs_Array.length>0)) {
	socket.on("setMotd", changeMOTD);
	changeMOTD();
}



//======Nano_lib v0.12.28
//======Author: JAlB (2014)
//======License: Beerware

function $id(ID){
if(ID == '@body'){
return document.body;
}else{
return document.getElementById(ID);
}
}

function $Selector(SELECTOR){
return document.querySelectorAll(SELECTOR);
}

function $Class(CLASS) {
return document.getElementsByClassName(CLASS);
};

function $Random(MIN, MAX) {
    return Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
};

//Добавление элементов и удаление элементов.
function $Create(TYPE, ID, CLASS, OBJTYPE){
if ($id(ID) == null){
 var result = document.createElement(TYPE);
 result.id = ID;
 result.className = CLASS;
 if (OBJTYPE != null) {
 	result.type = OBJTYPE;
 }
 return result;
 } else {
console.error('$Create: Элемент '+ID+' уже существует');
return null;
}
}

function $Add(TYPE, ID, CLASS, ToID){
if($id(ToID) != null){
 result = $Create(TYPE, ID, CLASS);
 if (result != null){
  $id(ToID).appendChild(result);
 } else {
  console.warn('$Add: Элемент '+ID+' не создан.');
 }
 return result;
} else {
 console.error('$Add: Элемент '+ToID+' не найден.');
 }
}

function $RemoveID(ID){
var element = $id(ID);
element.parentNode.removeChild(element);
}

function $Remove(OBJ){
OBJ.parentNode.removeChild(OBJ);
}
//Конец

//Локальное хранилище
function $LSGet(PROPERTY){
return window.localStorage.getItem(PROPERTY);
}

function $LSSet(PROPERTY, VALUE){
window.localStorage.setItem(PROPERTY, VALUE);
}

//JSON
function $JsonEncode(OBJ){
return JSON.stringify(OBJ);
}

function $JsonDecode(STR){
return JSON.parse(STR);
}

//Конец Nano_lib


//======Synchtube API v 0.15.724
//======Author: JAlB (2014)
//======License: Beerware


// INTERFACE FUNCTIONS
/***** add_button *****/
$0BUTTONS = [];
function API_ADDBUTTON(ID, CAPTION, ONCLICK, POSTFIX){
	if ($id(ID) == null) {
		$0BUTTONS[$0BUTTONS.length] = $Add('button', ID, 'btn btn-sm btn-default', 'leftcontrols');
		}
		var BTN = $id(ID)
		BTN.innerHTML = CAPTION;
		BTN.onclick = ONCLICK;
		if (POSTFIX != null) {
			POSTFIX(BTN);
		}
}
/***** END add_button *****/
/***** Add well frame *****/
$0WELLS = [];
function API_ADDWELL(ID, POSTFIX) {
	if ($id(ID) == null) {
		$0WELLS[$0WELLS.length] = $Add('div', ID, 'well', 'pollwrap');
		}
		var WELL = $id(ID)
		if (POSTFIX != null) {
			POSTFIX(WELL);
		}
}
/***** END add well frame *****/
/***** imgur ajax *****/
var $0IMGURONFILESET = [];
function API_IMGURONFILESET(FUNCTION) {
	$0IMGURONFILESET[$0IMGURONFILESET.length] = FUNCTION;
}
var $0IMGURONLOAD = [];
function API_IMGURONLOAD(FUNCTION) {
	$0IMGURONLOAD[$0IMGURONLOAD.length] = FUNCTION;
}
var $0IMGURONPROGRESS = [];
function API_IMGURONPROGRESS(FUNCTION) {
	$0IMGURONPROGRESS[$0IMGURONPROGRESS.length] = FUNCTION;
}
function API_IMGURUPLOAD(file) {
	if (!file || !file.type.match(/image.*/)) return;
	var DATA = new FormData();
	DATA.append("image", file);
	DATA.append("key", "6528448c258cff474ca9701c5bab6927");
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "https://api.imgur.com/3/image");
	xhr.setRequestHeader('Authorization', 'Client-ID a11c2b9fbdd104a');
	xhr.onload = function() {
		result = JSON.parse(xhr.responseText).data.link;
		for (var i = 0; i < $0IMGURONLOAD.length; i++) {
			$0IMGURONLOAD[i](result);
		}
	}
	xhr.onerror = function(){
		alert('Во времязагрузки файла произошла ошибка: ' + xhr.status);
	};
	xhr.upload.onprogress = function(EVENT){
		for (var i = 0; i < $0IMGURONPROGRESS.length; i++) {
			$0IMGURONPROGRESS[i](EVENT);
		}
	};
	xhr.send(DATA);
	$id('imgur_fileinput').value = '';
 }
/***** END imgur ajax *****/
/***** imgur upload *****/
function API_CREATEIMGURUPLOADWELL() {
	API_ADDWELL('imgur_upload_well', function (OBJ) {OBJ.style.display = 'none';});
	FILEINPUT = $Create('input', 'imgur_fileinput', '', 'file');
	FILEINPUT.style.display = 'none';
	$id('imgur_upload_well').appendChild(FILEINPUT);
	window.ondragover = function(e) {e.preventDefault()}
	window.ondrop = function(e) {
		e.preventDefault();
		if(e.dataTransfer.files[0].type.match(/image.*/)){
			for (var i = 0; i < $0IMGURONFILESET.length; i++) {
				$0IMGURONFILESET[i]();
			}
			API_IMGURUPLOAD(e.dataTransfer.files[0]);
		} else {
			alert('Можно загружать только изображения.');
			this.value = '';
		}
	}
	IMGUR_FILEINPUTBTN = $Add('button', 'imgur_fileinputbtn', 'btn btn-sm btn-default', 'imgur_upload_well');
	IMGUR_FILEINPUTBTN.innerHTML = 'Загрузить изображение';
	IMGUR_FILEINPUTBTN.onclick = function () {FILEINPUT.click()};
	FILEINPUT.onchange = function(){
		if(this.files[0].type.match(/image.*/)){
			for (var i = 0; i < $0IMGURONFILESET.length; i++) {
				$0IMGURONFILESET[i]();
			}
			API_IMGURUPLOAD(this.files[0]);
		} else {
			alert('Можно загружать только изображения.');
			this.value = '';
		}
	}
}
/***** END imgur upload *****/
/***** CLASS CLICK EVENTS *****/
$0CLASSCLICKEVENTS = [];
function API_CLASSCLICKEVENTADD(FUNCTION){
	$0CLASSCLICKEVENTS[$0CLASSCLICKEVENTS.length] = FUNCTION;
}
function API_CLASSCLICKEVENT(TARGET){
	try{
		var CLS = TARGET.target.className;
	} catch(e){
		var CLS = null;
	}
	for (var i = 0; i < $0CLASSCLICKEVENTS.length; i++) {
		$0CLASSCLICKEVENTS[i](TARGET, CLS);
	}
}
$id('@body').onclick = function(TARGET){
	API_CLASSCLICKEVENT(TARGET);
	try{
		var ID = TARGET.target.id;
	} catch(e){
		var ID = null;
	}

	if (ID != 'image-viewer' && $id('image-viewer').style.display == 'block' && TARGET.target.className != 'chat-image') {
		$id('image-viewer').style.display = 'none';
	}
};
/***** END CLASS CLICK EVENTS *****/
/***** IMAGE VIEWER INIT *****/
$0THISIMAGEVIEW = {
"NATURALHEIGHT": 0,
"NATURALWIDTH": 0,
"scale": 100,
"width": 0,
"height": 0,
"move": false,
"startX": 0,
"startY": 0,
"x": 0,
"y": 0,
"setScale": function(SCALE){
	if(SCALE != null){
		if(SCALE < 1){SCALE = 1};
		this.scale = SCALE;
		this.width = Math.floor((this.NATURALWIDTH/100)*SCALE);
		this.height = Math.floor((this.NATURALHEIGHT/100)*SCALE);
	} else {
		var hScale = Math.floor((window.innerHeight/(this.NATURALHEIGHT + 150))*100);
		var wScale = Math.floor((window.innerWidth/this.NATURALWIDTH)*100);
		var scale = (hScale < wScale) ? hScale : wScale;
		if (scale > 100){scale = 100};
		this.scale = scale;
		this.width = Math.floor((this.NATURALWIDTH/100)*this.scale);
		this.height = Math.floor((this.NATURALHEIGHT/100)*this.scale);
	}
}
};
function API_IMAGESHOW(IMG, NATURALHEIGHT, NATURALWIDTH){
	var OBJ = $id('image-viewer');
	OBJ.style.display = 'block';
	OBJ.style.backgroundImage ='url('+IMG+')';
	$0THISIMAGEVIEW.NATURALHEIGHT = NATURALHEIGHT;
	$0THISIMAGEVIEW.NATURALWIDTH = NATURALWIDTH;
	$0THISIMAGEVIEW.setScale();
	OBJ.style.height = $0THISIMAGEVIEW.height + 'px';
	OBJ.style.width = $0THISIMAGEVIEW.width + 'px';
	OBJ.style.right = '5px';
	OBJ.style.top = '50px';
};
function API_IMAGEVIEWERINIT(){
	API_ADDWELL('image-viewer', function(OBJ){
		OBJ.style.display = 'none';
		OBJ.style.position = 'fixed';
		OBJ.style.backgroundPosition = 'center';
		OBJ.style.backgroundSize = 'contain';
		OBJ.style.backgroundRepeat = 'no-repeat';
		OBJ.style.backgroundAttachment = 'local';
		OBJ.style.padding = '5px';
		OBJ.style.top = '50px';
		OBJ.style.right = '5px';
		OBJ.style.zIndex = '1100';
		OBJ.style.cursor = 'move';
		OBJ.innerHTML = '<button data-dismiss="modal" aria-hidden="true" class="close" onclick="this.parentNode.style.display = \'none\'">?</button>';
		OBJ.onmousewheel = function(DELTA){
			DELTA.preventDefault()
			if(DELTA.wheelDelta > 0){
				$0THISIMAGEVIEW.setScale($0THISIMAGEVIEW.scale+3);
			} else {
				$0THISIMAGEVIEW.setScale($0THISIMAGEVIEW.scale-3);
			}
			this.style.height = $0THISIMAGEVIEW.height + 'px';
			this.style.width = $0THISIMAGEVIEW.width + 'px';
		};
		OBJ.onmousedown = function(EVENT){
			$0THISIMAGEVIEW.move = true;
			$0THISIMAGEVIEW.startX = EVENT.x;
			$0THISIMAGEVIEW.startY = EVENT.y;
			$0THISIMAGEVIEW.x = parseInt(this.style.right.replace('px', ''));
			$0THISIMAGEVIEW.y = parseInt(this.style.top.replace('px', ''));
			$id('@body').onmousemove = function(EVENT){
				if($0THISIMAGEVIEW.move){
					$id('image-viewer').style.right = ($0THISIMAGEVIEW.x + ($0THISIMAGEVIEW.startX - EVENT.x)) + 'px';
					$id('image-viewer').style.top = ($0THISIMAGEVIEW.y - ($0THISIMAGEVIEW.startY - EVENT.y)) + 'px';
				};
			};
		};
		$id('@body').onmouseup = function(){
			$0THISIMAGEVIEW.move = false;
			$id('@body').onmousemove = undefined;
		};
	});
};
/***** END IMAGE VIEWER INIT *****/
// END INTERFACE FUNCTIONS


// OVERRIDE FUNCTIONS
/****** formatChatMessage *******/
// API_PREFIXMESSAGE
var $0PREFIXMESSAGE = [];
function API_PREFIXMESSAGE(FUNCTION) {
	$0PREFIXMESSAGE[$0PREFIXMESSAGE.length] = FUNCTION;
}
// API_POSFIXMESSAGE
var $0POSTFIXMESSAGE = [];
function API_POSTFIXMESSAGE(FUNCTION) {
	$0POSTFIXMESSAGE[$0PREFIXMESSAGE.length] = FUNCTION;
}

function formatChatMessage(data, last) {

	//PREFIX
	for (var i = 0; i < $0PREFIXMESSAGE.length; i++) {
		$0PREFIXMESSAGE[i](data, last);
	}
	//END PREFIX
	
    // Backwards compat
    if (!data.meta || data.msgclass) {
        data.meta = {
            addClass: data.msgclass,
            // And the award for "variable name most like Java source code" goes to...
            addClassToNameAndTimestamp: data.msgclass
        };
    }
    // Phase 1: Determine whether to show the username or not
    var skip = data.username === last.name;
    if(data.meta.addClass === "server-whisper")
        skip = true;
    // Prevent impersonation by abuse of the bold filter
    if(data.msg.match(/^\s*<strong>\w+\s*:\s*<\/strong>\s*/))
        skip = false;
    if (data.meta.forceShowName)
        skip = false;

    data.msg = execEmotes(data.msg);

    last.name = data.username;
    var div = $("<div/>");
    /* drink is a special case because the entire container gets the class, not
       just the message */
    if (data.meta.addClass === "drink") {
        div.addClass("drink");
        data.meta.addClass = "";
    }

    // Add timestamps (unless disabled)
    if (USEROPTS.show_timestamps) {
        var time = $("<span/>").addClass("timestamp").appendTo(div);
        var timestamp = new Date(data.time).toTimeString().split(" ")[0];
        time.text("["+timestamp+"] ");
        if (data.meta.addClass && data.meta.addClassToNameAndTimestamp) {
            time.addClass(data.meta.addClass);
        }
    }

    // Add username
    var name = $("<span/>");
    if (!skip) {
        name.appendTo(div);
    }
    $("<strong/>").addClass("username").html(data.username + ": ").appendTo(name);
    if (data.meta.modflair) {
        name.addClass(getNameColor(data.meta.modflair));
    }
    if (data.meta.addClass && data.meta.addClassToNameAndTimestamp) {
        name.addClass(data.meta.addClass);
    }
    if (data.meta.superadminflair) {
        name.addClass("label")
            .addClass(data.meta.superadminflair.labelclass);
        $("<span/>").addClass(data.meta.superadminflair.icon)
            .addClass("glyphicon")
            .css("margin-right", "3px")
            .prependTo(name);
    }

    // Add the message itself
    var message = $("<span/>").appendTo(div);
    message[0].innerHTML = data.msg;

    // For /me the username is part of the message
    if (data.meta.action) {
        name.remove();
        message[0].innerHTML = data.username + " " + data.msg;
    }
    if (data.meta.addClass) {
        message.addClass(data.meta.addClass);
    }
    if (data.meta.shadow) {
        div.addClass("chat-shadow");
    }

    div.find("img").load(function () {
        if (SCROLLCHAT) {
            scrollChat();
        }
    });
    
	//POSTFIX
	for (var i = 0; i < $0POSTFIXMESSAGE.length; i++) {
		$0POSTFIXMESSAGE[i](name, message);
	}
	//END POSTFIX
	
    return div;
} 
/***** END formatChatMessage *****/
/***** chatline keydown *****/
// CLEAR chatline jquery keydown
$('#chatline').unbind('keydown');
// API_PREFIXBEFORESEND
var $0PREFIXBEFORESEND = [];
function API_PREFIXBEFORESEND(FUNCTION) {
	$0PREFIXBEFORESEND[$0PREFIXBEFORESEND.length] = FUNCTION;
}
$id('chatline').onkeydown = function(ev){
    if(ev.keyCode == 13) {
        if (CHATTHROTTLE) {
            return;
        }
		// FIX FUNCTIONS
		for (var i = 0; i < $0PREFIXBEFORESEND.length; i++) {
			$0PREFIXBEFORESEND[i]($id('chatline'));
		}
		// END FIX FUNCTIONS
        var msg = $id('chatline').value;
        if(msg.trim()) {
            var meta = {};
            if (USEROPTS.adminhat && CLIENT.rank >= 255) {
                msg = "/a " + msg;
            } else if (USEROPTS.modhat && CLIENT.rank >= Rank.Moderator) {
                meta.modflair = CLIENT.rank;
            }

            // The /m command no longer exists, so emulate it clientside
            if (CLIENT.rank >= 2 && msg.indexOf("/m ") === 0) {
                meta.modflair = CLIENT.rank;
                msg = msg.substring(3);
            }
            socket.emit("chatMsg", {
                msg: msg,
                meta: meta
            });
            CHATHIST.push($("#chatline").val());
            CHATHISTIDX = CHATHIST.length;
            $id('chatline').value = '';;
        }
        return;
    }
    else if(ev.keyCode == 9) { // Tab completion
        chatTabComplete();
        ev.preventDefault();
        return false;
    }
    else if(ev.keyCode == 38) { // Up arrow (input history)
        if(CHATHISTIDX == CHATHIST.length) {
            CHATHIST.push($("#chatline").val());
        }
        if(CHATHISTIDX > 0) {
            CHATHISTIDX--;
            $id('chatline').value = CHATHIST[CHATHISTIDX];
        }

        ev.preventDefault();
        return false;
    }
    else if(ev.keyCode == 40) { // Down arrow (input history)
        if(CHATHISTIDX < CHATHIST.length - 1) {
            CHATHISTIDX++;
            $id('chatline').value = CHATHIST[CHATHISTIDX];
        }

        ev.preventDefault();
        return false;
    }
}
/***** END chatline keydown *****/
/***** addChatMessage *****/
function addChatMessage(data) {
	if(IGNORED.indexOf(data.username) !== -1) {
		return;
	}
	if (data.meta.shadow && !USEROPTS.show_shadowchat) {
		return;
	}
    var safeUsername = data.username.replace(/[^\w-]/g, '$');
    var div = formatChatMessage(data, LASTCHAT);
    // Incoming: a bunch of crap for the feature where if you hover over
    // a message, it highlights messages from that user
    div.addClass("chat-msg-" + safeUsername);
    div.appendTo($("#messagebuffer"));
    div.mouseover(function() {
        $(".chat-msg-" + safeUsername).addClass("nick-hover");
    });
    div.mouseleave(function() {
        $(".nick-hover").removeClass("nick-hover");
    });
    // Cap chatbox at most recent 100 messages
    if($("#messagebuffer").children().length > 100) {
        $($("#messagebuffer").children()[0]).remove();
    }
    if(SCROLLCHAT)
        scrollChat();

    var isHighlight = false;
    if (CLIENT.name && data.username != CLIENT.name) {
        if (data.msg.toLowerCase().indexOf(CLIENT.name.toLowerCase()) != -1) {
            div.addClass("nick-highlight");
            isHighlight = true;
        }
    }

    pingMessage(isHighlight);
        
        reloadAliases();
	redrawStyles();
        

}
/***** END addChatMessage *****/
// END OVERRIDE FUNCTIONS


// ON LOAD
/***** FIX CHATLOAD *****/
API_CHATLOADFIX = function () {
	var CHAT = $Selector('#messagebuffer div');
	for (var i = 1; i < CHAT.length; i++) {
		var data = {};
		var msg = CHAT[i].children;
		if (msg.length != 0) {
			data.msg = (msg[msg.length-1].innerHTML);
		}
		if (msg.length != 0) {
			if (msg[msg.length-2].className != 'timestamp') {
				data.username = msg[msg.length-2].getElementsByTagName('strong')[0].innerHTML.replace(': ', '');
			}
		}
		//PREFIX
		for (var j = 0; j < $0PREFIXMESSAGE.length; j++) {
			$0PREFIXMESSAGE[j](data);
		}
		//END PREFIX
		if (msg.length != 0) {
			msg[msg.length-1].innerHTML = data.msg;
		}
		if (msg.length != 0) {
			if (msg[msg.length-2].class != 'timestamp') {
				if (msg[msg.length-2].getElementsByTagName('strong').length != 0) {
					msg[msg.length-2].getElementsByTagName('strong')[0].innerHTML = data.username+': ';
				}
			}
		}
	}
        reloadAliases();
	redrawStyles();

};
/***** END FIX CHATLOAD *****/
// ON LOAD

/******************** test ******************/
function ShowHideID(ID){
	var FRAME = $id(ID);
	if (FRAME.style.display == 'none') {
		FRAME.style.display = 'block';
	}	else {
		FRAME.style.display = 'none';
	}
}
// ОФОРМЛЕНИЕ
STYLE = $Add('style', 'API_STYLE', '', '@body');
STYLE.innerHTML += '.chat-image{max-width: 100px; max-height:100px; cursor: pointer;}';
STYLE.innerHTML += '.smile, #plmeta{cursor: pointer;}';
STYLE.innerHTML += '#help-btn, #image-btn, #smiles-btn{margin-right: 5px;}';
STYLE.innerHTML += '#smiles-btn{cursor: pointer; position: absolute; font-size: 25px; right: 10px;}';
STYLE.innerHTML += '#chatwrap{overflow: auto;}';
STYLE.innerHTML += '#footer{bottom: 0; position: fixed; width: 100%; opacity: 0.9;}';

// Обработка сообщений перед оправкой
API_PREFIXBEFORESEND(function(OBJ){
	var msg = OBJ.value;
	msg = msg.replace(/http:\/\/cdn\.syn-ch\.com\/thumb\/.*\/.*\/.*\/(.*?((\.jpg)|(\.jpeg)|(\.png)|(\.gif)))(\s|$|\/)/g, '$$is$1is$$');
	msg = msg.replace(/http:\/\/cdn\.syn-ch\.com\/src\/.*\/.*\/.*\/(.*?((\.jpg)|(\.jpeg)|(\.png)|(\.gif)))(\s|$|\/)/g, '$$iS$1iS$$');
	msg = msg.replace(/http:\/\/i.imgur.com\/(.*?)(\s|$)/g, '$$ii$1ii$$');
	msg = msg.replace(/http:\/\/(.*?((\.jpg)|(\.jpeg)|(\.png)|(\.gif)))(\s|$)/g, '$$i1$1i1$$');
	msg = msg.replace(/https:\/\/(.*?((\.jpg)|(\.jpeg)|(\.png)|(\.gif)))(\s|$)/g, '$$i2$1i2$$');
	if(msg != OBJ.value){OBJ.value = msg;}
});
// Обработка новых сообщений.
API_PREFIXMESSAGE(function(data, last){
	data.msg = data.msg.replace(/\$i1(.*?)i1\$/g, '<img class="chat-image" src="http://$1">');
	data.msg = data.msg.replace(/\$i2(.*?)i2\$/g, '<img class="chat-image" src="https://$1">');
	data.msg = data.msg.replace(/\$ii(.*?)ii\$/g, '<img class="chat-image" src="http://i.imgur.com/$1">');
	data.msg = data.msg.replace(/\$is(.{3}?)(.{2}?)(.{2}?)(.*?)is\$/g, '<img class="chat-image" src="http://cdn.syn-ch.com/thumb/$1/$2/$3/$1$2$3$4">');
	data.msg = data.msg.replace(/\$iS(.{3}?)(.{2}?)(.{2}?)(.*?)iS\$/g, '<img class="chat-image" src="http://cdn.syn-ch.com/src/$1/$2/$3/$1$2$3$4">');
});
// инициализация смотрелки картинок.
API_IMAGEVIEWERINIT();
// Обработка клика по классу объектов.
API_CLASSCLICKEVENTADD(function(TARGET, CLS){
	if(CLS == 'chat-image'){
		API_IMAGESHOW(TARGET.target.src, TARGET.target.naturalHeight, TARGET.target.naturalWidth);
	}
});

// обработка сообщений в строке ввода во время печати.
$id('chatline').onkeyup = function(e){
	for (var i = 0; i < $0PREFIXBEFORESEND.length; i++) {
		$0PREFIXBEFORESEND[i](this);
	}
}
// Аватарки
AVATARS = [];

function addAvatar(name, image){
	var ava = {"name": name, "image": image};
	AVATARS[AVATARS.length] = ava;
}

addAvatar('iskanrad','http://i.imgur.com/RgcRoSn.png');

API_PREFIXMESSAGE(function(data, last){
	for (var i = 0; i < AVATARS.length; i++){
		if(data.username == AVATARS[i].name){
			data.username = '<img height="50" src="' + AVATARS[i].image + '" title="'+ AVATARS[i].name +'" class="ava">';
		}
	}
});

$(document).off("click", ".username");

API_CLASSCLICKEVENTADD(function(TARGET, CLS){
	if(CLS.indexOf('username') > -1){
		$id('chatline').value = TARGET.target.textContent + $id('chatline').value;
		$id('chatline').focus;
	}
	if(CLS == 'ava'){
		$id('chatline').value = TARGET.target.title + ': ' + $id('chatline').value;
		$id('chatline').focus;
	}
});


// Прячем плейлист
playlist = $Add('div', 'playlist', '', 'rightpane');
playlist.appendChild($id('queue'));
playlist.style.overflow = 'hidden';

$id('plmeta').onclick = function(){
	ShowHideID('playlist');
}

ShowHideID('footer');

API_CHATLOADFIX();

 $(".navbar-header").html("<img src=https://i.imgur.com/nGaJ16N.png style='position: relative; top: 7px;'>");
 $("#usertheme").attr("href","/css/themes/holo.css");
// additional chat functions

chatflair = $('<span id="chatflair" class="label label-success pull-right pointer"></span>')
  .insertAfter("#adminflair")
  .on("click", function() {
	if(!CHATFUNC) {
		$("#sounds-dropdown").remove();
		SOUNDSPANEL = false;
		showChatFunctions();
		CHATFUNC = true;
	} else {
		$("#chatfunc-dropdown").remove();
		CHATFUNC = false;
	}
  });
  
 clearbtn = $('<span id="clear-btn" class="label label-default pull-right pointer">Clear Chat</span>')
		  .insertAfter("#adminflair")
		  .on("click", function() {
				socket.emit("chatMsg", {msg: '/clear'});	
  }); 
afkbtn = $('<span id="afk-btn" class="label label-default pull-left pointer">AFK</span>')
		  .insertAfter("#adminflair")
		  .on("click", function() {
			socket.emit("chatMsg", {msg: '/afk'});
  });	  

toggleChatFunctions = function(){}

socket.on("rank", toggleChatFunctions);

toggleChatFunctions();

<head>
 <link rel="shortcut icon" href="https://i.imgur.com/0FzECll.png" type="image/png">
</head>
