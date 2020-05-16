$(function(){

  function buildMessage(message){
    if (message.image){
      let html = `<div class="main_chat__middle__contents__user">
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
                  <img alt="画像だよ" src="${message.image}" width="300" height="300">`
      return html;
    } else {
      let html = `<div class="main_chat__middle__contents__user">
                    <div class="main_chat__middle__contents__user__name">
                      ${message.user_name}
                    </div>
                    <div class="main_chat__middle__contents__user__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="main_chat__middle__contents__message">
                    ${message.content}
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
      let html = buildMessage(data);
      $('.main_chat__middle__contents').append(html);
      $('.main_chat__middle').stop().animate({ scrollTop: $('.main_chat__middle')[0].scrollHeight }, 5000, 'swing'); //overflow: scrollが記述されている要素につけないと効かない
      $('#new_message')[0].reset();
      $('input[name = "commit"]').prop('disabled', false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
      $('input[name = "commit"]').prop('disabled', false);
    })
  });
});
