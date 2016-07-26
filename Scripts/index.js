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
	var randomValue = Math.floor((Math.random() * 1000) + 1);
	var randomValue2 = (Math.random().toString(36) + '00000000000000000').slice(2, 6 + 2);
	$('#txtJoin').attr({
		value: randomValue2.toString()
	})
});



