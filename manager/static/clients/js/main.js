
function send_message() {
    var chat_block = $(".chat-view-block")
    var chat_input_message = $(".chat-send-input").val()
    var message_block = $("<div>").addClass("message-block")
    var my_message = $("<h4>").addClass("my-message-text").text(chat_input_message)
    if ($.trim($(".chat-send-input").val()) === "") {
        $(".chat-send-input, .chat-submit-msg").css({
            "outline": ".5px solid red",
        })
        setTimeout(
            function()
            {
                $(".chat-send-input, .chat-submit-msg").css({
                    "outline": "0",
                })
            }, 500);
    } else {
        message_block.append(my_message);
        chat_block.append(message_block);
        $(".chat-send-input").val("")
        $(".chat-send-input, .chat-submit-msg").css({
            "outline": ".5px solid green",
        })
        setTimeout(
            function()
            {
                $(".chat-send-input, .chat-submit-msg").css({
                    "outline": "0",
                })
            }, 500);
    }
}

$('.chat-submit-msg').on("click", function() {
    send_message()
});

$('.chat-submit-msg').each(function() {
    $(this).find('.chat-send-input').keypress(function(e) {
        // Enter pressed?
        if(e.which == 10 || e.which == 13) {
            e.preventDefault();
            send_message()
        }
    });
});