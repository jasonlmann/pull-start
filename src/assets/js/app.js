$(document).foundation();
// Auto close off-canvas menu
$('.off-canvas-absolute a').on('click', function() {
  $('.off-canvas-absolute').foundation('close');
});
$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});

//SUBMIT contact form to Slack channel

$(document)
.bind("submit", function(e) {
  e.preventDefault();
  console.log("submit intercepted");
})
.bind("formvalid.zf.abide", function(e,$form) {
  // ajax submit
  var name = $("input#name").val();
  var email = $("input#email").val();
  var message = $("textarea#message").val();

  //slack options
  var formData = '*Name:* ' + name + '\n*Email:* ' + email + '\n*Message:* ' + message;

  $.ajax({
    url: 'https://hooks.slack.com/services/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',
    type: 'POST',
    data: JSON.stringify({
      text: formData,
      username: name,
      icon_emoji: ':ghost:'
    }),
    success: function() {
                    // Enable button & show success message
                    $("#thankyou_message").css("display", "block");
                    //clear all fields
                    $('#gform').trigger("reset");
    },
    error: function() {
                    // Fail message

                    //clear all fields
                    // $('#contactForm').trigger("reset");
    },
    dataType: "text"
  });

});
