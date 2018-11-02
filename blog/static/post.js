document.addEventListener('DOMContentLoaded', function() {
    GetPosts();
    // setInterval(GetPosts,1000);

});
var post_id = 'post_id_'



function GetPosts() {

    $.ajax({
        url: 'http://127.0.0.1:8000/api/',
        data: {
            'format': 'json'
        },
        dataType: 'json',
        success: function(data) {
            if (data) {
                document.querySelector('#postfeed').innerHTML = ''
                $.each(data, function(index, element) {
                    console.log(element);
                    $('<div>', {id: post_id+element['id'], class: 'post'}).appendTo('#postfeed')
                    $('<div>', {text: element['title'], class: 'post_title'}).appendTo('.post:last')
                    $('<div>', {text: element['created'], class: 'post_date'}).appendTo('.post:last')
                    $('<div>', {text: element['text'], class: 'post_text'}).appendTo('.post:last')

                });
            }
        }
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function SendPost() {
    $.ajax({
        url: 'http://127.0.0.1:8000/api/create',
        data: {
            'title': $('#title').val(),
            'text': $('#text').val()
        },
        method: 'POST',
        statusCode: {
    400: function() {
      $(".alert").toggle();
      setTimeout(function()  {
          $(".alert").toggle();
      }, 5000);
      }
    },
        success: function(data) {
            $('#title').val('');
            $('#text').val('');
            setTimeout(function()  {
                GetPosts();
            }, 1000);

        }

    });
};



$("#btn_refresh").click(function() {
    console.log('refresh clicked');
    GetPosts()
});
$("#btn_submit").click(function() {
    console.log('submit clicked');
    SendPost()
    sleep(200)
    GetPosts()
    return false
});
