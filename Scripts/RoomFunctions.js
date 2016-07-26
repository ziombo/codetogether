/****************************************************************************
*																			*
*					JavaScript used for chatroom functionality				*
*																			*
****************************************************************************/






//username for later
var name = "";

//simulate msgSend button with enter press when textbox focused
$('#msgText').bind('keyup', function (e) {
	if (e.keyCode === 13) { // 13 is enter key
		$('#sendMsg').click();
	}
});

//simulate msgSend button with enter press when textbox focused
$('#txtName').bind('keyup', function (e) {
	if (e.keyCode === 13) { // 13 is enter key
		$('#btnName').click();
	}
});

//get chatroom parameter
var pathArray = window.location.pathname.split('/');
var roomId = pathArray[2];
//var roomId = GetURLParameter('chatroom');
var chat2 = $.connection.chatHub;



$('#nameForm').on('submit', function () {
	name = $('#txtName').val();
	$('#chatGetName').css('display', 'none');
	return false;
});

//connect to hub and test if group is full
$.connection.hub.start().done(function () {
	chat2.server.test(roomId);
});
//if group has space
chat2.client.accepted = function () {
	chat2.server.joinGroup(roomId);
	$('#loader').hide();
	$('#txtName').focus();
};
//if group is full
chat2.client.redirecting = function () {
	$('#loader').hide();
	var alertMsg = 'Room ' + roomId + ' is full!';
	$('#alertHeader').append(alertMsg);
	$('#roomFull').show();
	$('#txtJoin').focus();

	$('#btnJoin').click(function () {
		if ($('#txtJoin').css('visibility') == 'hidden') {
			$('#txtJoin').css('visibility', 'visible');
			$('#txtJoin').addClass('show-zoom')
		}
		else {
			$(this).attr({
				type: 'submit'
			})
		}
	});
	$('#btnCreate').click(function () {
		//explanation http://stackoverflow.com/a/19964557/5859562
		var randomValue2 = (Math.random().toString(36) + '00000000000000000').slice(2, 6 + 2);
		$('#txtJoin').attr({
			value: randomValue2.toString()
		})
	});
};

//change your editors mode
var changeMod = function () {
	$.connection.hub.start().done(function () {
		var mode = document.getElementById("modeSelect1");
		var strUser = mode.options[mode.selectedIndex].text;
		chat2.server.change(roomId, strUser);
	});
};

$(function () {
	// Declare a proxy to reference the hub. 
	var chat = $.connection.chatHub;
	
	// Create a function that the hub can call to broadcast messages.
	chat.client.broadcastMessage = function (name, message) {
		// Html encode display message. 
		var encodedMsg = $('<div />').text(message).html();
		// Html encode display name.
		var encodedName = $('<div />').text(name).html();
		// Add the message to the page and keep chatbox at the bottom
		var chatbox = $('#chatbox');
		chatbox.append('\n' + encodedName + ": " + encodedMsg);
		chatbox.scrollTop(chatbox[0].scrollHeight); 
	};

	//function that the hub can call to update 2nd users editor.
	chat.client.updateEditor = function (table) {
		var editor2 = ace.edit("editor2");
		editor2.setValue(table);
	};

	//function to change user2 mod
	chat.client.modChange = function (mode) {
		$('#othersMode').text(mode);
		editor2.getSession().setMode("ace/mode/" + mode);
	}

	// Start the connection.
	$.connection.hub.start().done(function () {
		$('#sendMsg').click(function () {
			// Call the Send method on the hub. 
			chat.server.send(roomId, name, $('#msgText').val());
			// Clear text box and reset focus for next comment. 
			$('#msgText').val('').focus();
		});

		$(window).on('beforeunload', function () {
			chat.server.decrement(roomId);
		});

		//update client2 > editor 2
		editor.getSession().on('change', function () {
				var code = editor.getValue();
				chat.server.update(roomId, code);
		});
	});
});
