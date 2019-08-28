$(function () {
    $("#agentname").textbox({
        label: '用户名称：',
        required: true,
        prompt: '请填写名称',
        width: '100%',
        validType: ["myremote['/agent/check/name','agentname']"],
        validateOnCreate: false
    });
    $("#agentphone").numberbox({
        label: '用户手机：',
        required: true,
        prompt: '请填写手机',
        validType: ["phone", "myremote['/agent/check/phone','phone']"],
        width: '100%',
        validateOnCreate: false
    });
    $("#agentparent").numberbox({
        label: '推荐人：',
        required: true,
        prompt: '请填写推荐的代理',
        width: '100%',
        validType: ["myremote['/agent/check/agent','pid']"],
        validateOnCreate: false
    });
    $("#agentstatus").combobox({
        label: '用户级别：',
        required: true,
        prompt: '请选择用户级别',
        width: '100%',
        panelHeight: 50,
        editable: false,
        validateOnCreate: false,
        valueField: 'value',
        textField: 'label',
        data: [{
            label: '普通用户',
            value: '0'
        }, {
            label: '代理用户',
            value: '1'
        }]
    });
    $("#btnSubmit").linkbutton({
        text: "添加",
        iconCls: 'icon-add'
    }).on("click", function () {
        $("form").submit();
    });
    $("#ff").form({
        url: '/agent/save',
        onSubmit: function () {
            return $(this).form('validate');
        },
        success: function (data) {
            var result = checkJson.check(data);
            if (result) {
                $.messager.alert('提示', result, 'info');
            }
            $(this).form("reset");
            $(".form_table .result").remove();
        }
    });
    $.extend($.fn.validatebox.defaults.rules, {
        phone: {
            validator: function (value) {
                return /^1(3[0-9]|4[57]|5[0-35-9]|7[0135678]|8[0-9])\d{8}$/.test(value);
            },
            message: '请填写正确的手机号码！'
        },
        myremote: {
            validator: function (_46, _47) {
                if (_47[1] === "pid") {
                    $(".form_table .result").remove();
                }
                var _48 = {};
                _48[_47[1]] = _46;
                var result = $.ajax({
                    url: _47[0],
                    dataType: "json",
                    data: _48,
                    async: false,
                    cache: false,
                    type: "post"
                }).responseText;
                result = checkJson.check(result, true);
                if (result && result.success) {
                    if (_47[1] === "pid") {
                        $(".form_table:eq(2)").append($("<div class='result'>").text("(" + result.data.agentname + ":" + result.data.agentphone + ")"));
                    }
                    return true;
                } else {
                    $.fn.validatebox.defaults.rules.myremote.message = result.data;
                    return false;
                }
            },
            message: "请填写正确的数据!"
        }
    })
    ;
});