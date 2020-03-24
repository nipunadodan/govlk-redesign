const debug = true;

var validate = [];
var before_function = [];
var dyn_function = [];

function ajaxJS(url, serialized,  func, silent='No', method='post'){
    if(debug === true)
        console.log('ajax-init~'+url);
    if(silent==='No'){
        var spinner = ' <i class="la la-circle-o-notch la-spin spinner"></i>';
        $('.loading').after(spinner);
        $('button, input[type="submit"]').attr('disabled','true');
    }

    $.ajax({
        data: serialized,
        type: method,
        url: url,
        success: function (response) {
            if(debug === true)
                console.log(response);
            if(typeof response !== 'object')
                var json = JSON.parse(response);
            else
                var json = response;
            //console.log(json);
            dyn_function[func](json);
            if(silent === 'No'){
                $('button, input[type="submit"]').prop("disabled", false);
                $('.spinner, .ajax-error').remove();
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            //console.log('AJAX call failed.');
            //console.log(textStatus + ': ' + errorThrown);
            $('.spinner, .ajax-error').remove();
            var error = ' <span class="ajax-error"><i class="la la-warning"></i> Error</span>';
            $('.loading').after(spinner);
        },
        complete: function () {
            //console.log('AJAX call completed');
            //$('.spinner, .ajax-error').remove();
        }
    });

    return false;
}



dyn_function['page-load'] = function (filename) {
    $.ajax({
        url:'pages/'+filename+'.html',
        type:'GET',
        error: function(xhr, textStatus, error){
            console.log(xhr.status+" "+textStatus+" "+error);
            $.get( "pages/404.html", function( data ) {
                $( "#content" ).html( data );
                //alert( "Load was performed." );
            });
        },
        success: function(data, textStatus, xhr){
            if(xhr.status == 200){
                $('#content').html(data);
            }
        }
    });
};

/*===================================================*/
let searchParams = new URLSearchParams(window.location.search);
$(document).ready(function (e) {
    if(searchParams.has('page'))
        dyn_function['page-load'](searchParams.get('page'));
    else
        dyn_function['page-load']('home');
});

before_function['covid'] = function () {
    ajaxJS('https://hpb.health.gov.lk/api/get-current-statistical', {}, 'covid', 'No', 'get');
};

dyn_function['covid'] = function (json) {
    console.log(json);
    if(json.message == 'Success' && json.success == true){
        $('#total').html(json.data.local_total_cases);
        $('#new').html(json.data.local_new_cases);
        $('#observation').html(json.data.local_total_number_of_individuals_in_hospitals);
        $('#deaths').html(json.data.local_deaths);
        $('#recovered').html(json.data.local_recovered);
    }
};