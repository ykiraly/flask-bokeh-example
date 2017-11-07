global_state = {'views': {'model':{}}};

var get_filters = function(key) {
    return fetch('/get_filters/'+key).then(
        function(response) {
            return response.text();
        }
    );
}

var get_view = function(view, arguments) {
    return fetch("/get_view/"+view,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(arguments)
        }).then(function(response) {
            return response.text();
        });
}

var get_filter_values = function(view) {
    arguments = {}
    for (var filter in global_state.views[view].filters) {
        arguments[filter] = global_state.views[view].filters[filter].get_value();
    }
    return arguments;
}

var generate_filters = function(parent_element_id, view, filters) {
    global_state.views[view].filters = {};
    var placeholder = "Please make a selection...";
    for (var key in filters) {
        if (filters.hasOwnProperty(key)) {           
            if (filters[key]['type']=='single-choice') {
                id = key+"_selector";
                      
                el = "<select data-placeholder=\""+placeholder+"\" id=\""+id+"\" class=\"chosen-select\">"+
                                  "<option value=\"\"></option>"+
                        "</select>";
                 
                $("#"+parent_element_id).append(el);
                insertDropdownOptions(filters[key]['values'], id);
            }
        }
        global_state.views[view].filters[key] = {'element_id':id, 'get_value': function() {return $("#"+id).val()}};
    }
    $(".chosen-select").chosen();
}

var insertDropdownOptions = function(keys, parent_element_id, i) {
	i = i || 0;
	if (i < (keys.length - 1)) {
		$('#'+parent_element_id).append('<option value="'+keys[i]+'">'+keys[i]+'</option>');
		insertDropdownOptions(keys, parent_element_id, i+1);
	} else {
		$('#'+parent_element_id).append('<option value="'+keys[i]+'">'+keys[i]+'</option>');
		$('#'+parent_element_id).trigger("chosen:updated");
	}
}

$(document).ready(function() {
    get_filters('model').then(function(filters) {
        generate_filters('filters', 'model', JSON.parse(filters));
    });
});

$("#generate").click(function() {
    get_view('model', get_filter_values('model')).then(function(response) {
        $("#container").replaceWith(response);
    })
});