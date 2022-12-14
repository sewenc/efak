$(document).ready(function () {

    $("#select2val").select2({
        placeholder: "Topic",
        theme: 'bootstrap4',
        ajax: {
            url: "/topic/mock/list/ajax",
            dataType: 'json',
            delay: 250,
            data: function (params) {
                params.offset = 10;
                params.page = params.page || 1;
                return {
                    name: params.term,
                    page: params.page,
                    offset: params.offset
                };
            },
            cache: true,
            processResults: function (data, params) {
                if (data.items.length > 0) {
                    var datas = new Array();
                    $.each(data.items, function (index, e) {
                        var s = {};
                        s.id = index + 1;
                        s.text = e.text;
                        datas[index] = s;
                    });
                    return {
                        results: datas,
                        pagination: {
                            more: (params.page * params.offset) < data.total
                        }
                    };
                } else {
                    return {
                        results: []
                    }
                }
            },
            escapeMarkup: function (markup) {
                return markup;
            },
            minimumInputLength: 1
        }
    });

    function errorNoti(errorMsg) {
        console.log(errorMsg)
        Lobibox.notify('error', {
            pauseDelayOnHover: true,
            continueDelayOnInactiveTab: false,
            position: 'top right',
            icon: 'bx bx-x-circle',
            msg: errorMsg
        });
    }

    function successNoti(successMsg) {
        Lobibox.notify('success', {
            pauseDelayOnHover: true,
            continueDelayOnInactiveTab: false,
            position: 'top right',
            icon: 'bx bx-check-circle',
            msg: successMsg
        });
    }

    $('#select2val').on('select2:select', function (evt) {
        var text = evt.params.data.text;
        $("#select2val").val(text);
        $("#ke_topic_mock").val(text);
    });

    $(document).on("click", "#btn_send", function () {
        var topic = $("#ke_topic_mock").val();
        var message = $("#ke_mock_content").val();
        if (topic.length == 0) {
            errorNoti("Topic select cannot be empty.");
        } else if (message.length == 0) {
            errorNoti("Send message to topic cannot be empty.");
        } else {
            $.ajax({
                type: 'post',
                dataType: 'json',
                contentType: 'application/json;charset=UTF-8',
                data: JSON.stringify({
                    "topic": topic,
                    "message": message
                }),
                url: '/topic/mock/send/message/topic/ajax',
                success: function (datas) {
                    if (datas != null) {
                        if (datas.status) {
                            successNoti("Send message to topic[" + topic + "] has succeeded.")
                        }
                    }
                }
            });
        }
    });

});