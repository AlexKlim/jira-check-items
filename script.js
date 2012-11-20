//global section
var storage = chrome.storage.local;
var issue_numb_points = $('#issue-description li').size();
var need_red_color = false;

function main() {
	chrome.storage.local.get('red_color', function(items){
	  need_red_color = items.red_color;
	});

	$('#issue-description li').prepend(function(n){
	  return "<input class='mCheckbox' type=\"checkbox\" id=\"" + n + "\"/>";
	});

	storage.get(null, function (items) {

		showResults(0);

	  for (var i = 0; i < issue_numb_points; i++) {
	  	var key = window.location.pathname.split('/')[2] + "=" + i;

	  	var id = "#" + i;
		if(items[key] == 1) {
			$(id).attr('checked', true);
			upCount();

		} else {
			$(id).attr('checked', false);
		}

		setClass($("#issue-description li:eq(" + i + ")").find('input'));
	}

	});

	for (var i = 0; i < issue_numb_points; i++) {
	  var id = "#" + i;
	  $(id).on('click', function() {
	    var obj = {};
	    var key = window.location.pathname.split('/')[2];
	    var current_id = $(this).attr('id');
	    key = key + "=" + current_id;
	    var value = ($("#" + current_id).is(':checked') ? 1 : 0);

	    if(value == 1) {

	    	var inputs = $(this.parentNode).find('input');
		var counts = 1;
		for (var j = 0; j < inputs.length; j++) {
			var _id = inputs[j].id;
	    		key = window.location.pathname.split('/')[2] + "=" + _id;
	    		obj[key] = true;

			counts += inputs[j].checked ? 0 : 1;
		}

		inputs.attr('checked', true);
	    	upCount(counts);

	    } else {
	    	obj[key] = value;
	    	downCount();
	    }

	    var inputs = $(this.parentNode).find('input');
	    setClass(inputs);
	    storage.set(obj);
	  });
	}
}

function showResults(done_items) {

	var rez_text = 	"<div id='results'>Done Items / All Items:&nbsp;" +
				"<div id='done_items_count'>" +
					done_items +
				"</div>" + "&nbsp;/&nbsp;" +
				issue_numb_points +
			"</div>";

	$('#issue-description').append(rez_text);
}

function upCount(up) {
	up = (typeof(up) !== 'undefined' ? up : 1);

	var items = parseInt($('#done_items_count').text());

	if (items == (issue_numb_points - up)) {
		$('#results').text("All Done... Should work... Ohohohoho");
	} else {
		$('#done_items_count').text(items + up);
	}

}

function downCount() {
	var items = parseInt($('#done_items_count').text());

	if (!items) {
		$("#results").remove();
		showResults(issue_numb_points - 1);
	} else {
		$('#done_items_count').text(items - 1);
	}
}

function setClass(elements) {
	for (var i = 0; i < elements.length; i++) {

		var _id = elements[i].id;
		var parent = $("#" + _id)[0].parentNode;

		if(elements[i].checked) {
			parent.classList.remove('unchecked');
			parent.classList.remove('red_color');
			parent.classList.add('checked');

		} else {
			parent.classList.remove('checked');
			parent.classList.add('unchecked');

			if (need_red_color)
				parent.classList.add('red_color');
		}
  	}
}

main();
