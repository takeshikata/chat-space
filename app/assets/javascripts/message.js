$(function(){

  function buildHTML(message){
    if (message.image){
      var html = `<div class="main_chat__middle__contents" data-message-id=${message.id}>
                    <div class="main_chat__middle__contents__user">
                      <div class="main_chat__middle__contents__user__name">
                        ${message.user_name}
                      </div>
                      <div class="main_chat__middle__contents__user__date">
                        ${message.create_at}
                      </div>
                    </div>
                    <div class="main_chat__middle__contents__message">
                      ${message.content}
                    </div>
                    <img alt="画像だよ" src="${message.image}" width="300" height="300">
                  </div>`
      return html;
    } else {
      var html = `<div class="main_chat__middle__contents" data-message-id=${message.id}>
                    <div class="main_chat__middle__contents__user">
                      <div class="main_chat__middle__contents__user__name">
                        ${message.user_name}
                      </div>
                      <div class="main_chat__middle__contents__user__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="main_chat__middle__contents__message">
                      ${message.content}
                    </div>
                  </div>`
      return html;
    };
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();

    let formData = new FormData(this);
    let url = $(this).attr('action')
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.main_chat__middle').append(html);
      $('.main_chat__middle').animate({ scrollTop: $('.main_chat__middle')[0].scrollHeight });
      $('#new_message')[0].reset();
      $('input[name = "commit"]').prop('disabled', false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
      $('input[name = "commit"]').prop('disabled', false);
    })
  });

  var reloadMessages = function() {
    var last_message_id = $('.main_chat__middle__contents:last').data("message-id");

    $.ajax({
      url: "api/messages",
      type: 'GET',
      dataType: 'json',
      data: { id: last_message_id }
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.main_chat__middle').append(insertHTML);
        $('.main_chat__middle').animate({ scrollTop: $('.main_chat__middle')[0].scrollHeight });
      }
    })
    .fail(function() {
      alert('error');
    });
  }
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});
