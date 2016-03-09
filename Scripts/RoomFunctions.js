/****************************************************************************
*																			*
*					JavaScript used for chatroom functionality				*
*																			*
****************************************************************************/






//get username from client
var name = "";


//simulate msgSend button with enter press when textbox focused
$('#message').bind('keyup', function (e) {
	if (e.keyCode === 13) { // 13 is enter key
		$('#msgSend').click();
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

//if group has space
chat2.client.accepted = function () {
	chat2.server.joinGroup(roomId);
	$('#id01').show();
	$('#txtName').focus();
	$('#btnName').on('click', function () {
		name = $('#txtName').val();
		$('#id01').css('display', 'none');
		$('#toTurn').show();
	});
};
//if group is full
chat2.client.redirecting = function () {
	var alertMsg = 'Room ' + roomId + ' is full!';
	$('#alertHeader').append(alertMsg);
	$('#id02').show();
	$('#txtJoin').focus();

	$('#btnJoin').click(function () {
		if ($('#txtJoin').css('visibility') == 'hidden') {
			$('#txtJoin').css('visibility', 'visible');
			$('#txtJoin').addClass('w3-animate-zoom')
		}
		else {
			$(this).attr({
				type: 'submit'
			})
		}
	});
	$('#btnCreate').click(function () {
		var randomValue = Math.floor((Math.random() * 1000) + 1);
		var randomValue2 = (Math.random().toString(36) + '00000000000000000').slice(2, 6 + 2);
		$('#txtJoin').attr({
			value: randomValue2.toString()
		})
	});
};
//connect to hub and test if group is full
$.connection.hub.start().done(function () {
	chat2.server.test(roomId);
});
//change you editors mode
var changeMod = function () {
	$.connection.hub.start().done(function () {
		var mode = document.getElementById("modeSelect");
		var strUser = mode.options[mode.selectedIndex].text;
		chat2.server.change(roomId, strUser);
	});
};

//Get username for chat
/*$("#selectors").hide();
$("#editors").hide();
$("#doPokazania").show();
$("body").css("background-color", "grey");
$("#txtName").focus();
var name = "";

$('#btnName').on('click', function () {
	name = $('#txtName').val();
	$('#doPokazania').hide();
	$("#selectors").show();
	$("#editors").show();
	$("body").css("background-color", "Highlight");
	$("#message").focus();
})*/


$(function () {
	// Declare a proxy to reference the hub. 
	var chat = $.connection.chatHub;
	
	// Create a function that the hub can call to broadcast messages.
	chat.client.broadcastMessage = function (name, message) {
		// Html encode display message. 
		var encodedMsg = $('<div />').text(message).html();
		// Add the message to the page. 
		$('#chatBox').append('\n' + name + ": " + encodedMsg);
	};

	//function that the hub can call to update 2nd users editor.
	chat.client.updateEditor = function (table) {
		var editor2 = ace.edit("third");
		editor2.setValue(table);
	};
	//function to decrement group user count


	//function to change user2 mod
	chat.client.modChange = function (mode) {
		$('#modeSelect2').text(mode);
		editor2.getSession().setMode("ace/mode/" + mode);
	}

	// Start the connection.
	$.connection.hub.start().done(function () {
		$('#msgSend').click(function () {
			// Call the Send method on the hub. 
			chat.server.send(roomId, name, $('#message').val());
			// Clear text box and reset focus for next comment. 
			$('#message').val('').focus();		
		});

		$(window).on('beforeunload', function () {
			chat.server.decrement(roomId);
		});


		//update client2 > editor 2
		editor.getSession().on('change', function () {
				var editor = ace.edit("first");
				var code = editor.getValue();
				chat.server.update(roomId, code);
		});

	});

});
