function showOpts(editor) {
	var opts = document.getElementById(editor);
	if (opts.style.display == "block") {
		opts.style.display = "none";
	} else {
		opts.style.display = "block";
	}
}

document.getElementById("nameForm").onsubmit = function () {
	document.getElementById("chatGetName").style.display = "none";
	document.getElementById("chat2Show").style.display = "initial";
	return false;
};

$("#showChat").click(function () {
	$("#chat").toggle();
	$("#firstEditor, #secondEditor").toggle();
});

$("#openNav").click(function () {
	$("#mobileNav").css('right', '0');
	$("#mobileNav").css('width', '130px');
	$("#openNav").css('display', 'none');
});

$('html').click(function () {
	ClearAttributes();
});

$('#mobileNav, #opts1, #opts2, #selectOptions1 ,#selectOptions2').click(function (event) {
	event.stopPropagation();
});

$(window).resize(function () {
	ClearAttributes();
	if ($(window).width() > 1200) {
		$('#chat, #firstEditor, #secondEditor').removeAttr('style');
	}
});

function ClearAttributes() {
	$("#mobileNav, #openNav, #selectOptions1 ,#selectOptions2").removeAttr('style');
};

function ShowHiddenPart(showWhat) {
	switch (showWhat) {
		case "settings1":
			$("#selectOptions1").toggle();
			break;
		case "settings2":
			$("#selectOptions2").toggle();
			break;
		case "viewChat":
			$("#chat, #firstEditor, #secondEditor, #viewChat, #viewEditors").toggle();
			ClearAttributes();
			break;
	}
};