/**
 * Created by Zml on 2017/3/25.
 */
$(function () {
    var easyuiTheme = "default";
    var cookieTheme = getCookie("easyuitheme");//这里呢 我们可以将想要更换的主题名称存到cookie中，每次加载时JS操作读取下，这样就可以达到个性化更换主题的目的了，这里我就不详细阐述了
    if (cookieTheme !== "") {
        var $easyuiThemesContent = $("#easyui_themes_content");
        var href = $easyuiThemesContent.attr("href").replace(easyuiTheme, cookieTheme);
        $easyuiThemesContent.attr("href", href);
    }

    Date.prototype.Format = function (fmt) { //author: meizz
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "H+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };


});
var loading_panel = "<div id='loadingDiv' style='position: absolute; z-index: 1000; top: 0px; left: 0px;width: 100%; height: 100%; background: white; text-align: center;'><p style='top: 48%; position: relative;'><span  class='panel-loading' style='color:#15428B'>努力加载中···</span></p></div>";
document.write(loading_panel);

function CloseMask() {
    $('#loadingDiv').fadeOut('fast', function () {
        $(this).remove();
    });
}

var loadComplete;
$.parser.onComplete = function () {
    if (loadComplete)
        clearTimeout(loadComplete);
    loadComplete = setTimeout(CloseMask, 1000);
};

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        var c_start = document.cookie.indexOf(c_name + "=");
        if (c_start !== -1) {
            c_start = c_start + c_name.length + 1;
            var c_end = document.cookie.indexOf(";", c_start);
            if (c_end === -1) c_end = document.cookie.length;
            return decodeURI(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

function setCookie(c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + encodeURI(value) +
        ((expiredays === null) ? "" : "; expires=" + exdate.toUTCString());
}

var checkJson = {
    check: function (data, stop) {
        if (data) {
            if (typeof data !== "object") {
                data = JSON.parse(data);
            }
            if (stop) { //不做处理
                return data;
            }
            if (data.success && data.code === "200") {
                return data.data;
            }
            $.messager.alert('提示', data.data, 'error');
        } else {
            $.messager.alert('提示', data.data, '网络异常');
            return false;
        }
    },
    check1: function (value, datagrid) {
        var result = JSON.parse(value);
        if (result.success && result.code === '200') {
            var data = {};
            if ($.isArray(result.data)) {    // is array
                data = {
                    total: result.data.length,
                    rows: result.data
                }
            }
            datagrid.datagrid("loadData", data);
        } else {
            $.messager.alert('提示', result.data, 'error');
        }
    },
    treeFilter: function (data, parent_id) {
        var result = this.check(data);
        if (result) {
            var values = [];
            for (var i in result) {
                var o = result[i];
                if (o.areaLevel !== 3) {
                    o.state = 'closed';
                }
                values.push(o);
            }
            return values;
        }
    },
    pagerFilter: function (data, datagrid) {
        var dg = datagrid;
        var opts = dg.datagrid('options');
        var pager = dg.datagrid('getPager');
        pager.pagination({
            onSelectPage: function (pageNum, pageSize) {
                opts.pageNumber = pageNum;
                opts.pageSize = pageSize;
                pager.pagination('refresh', {
                    pageNumber: pageNum,
                    pageSize: pageSize
                });
                dg.datagrid('loadData', data);
            }
        });
        if (!data.originalRows) {
            data.originalRows = (data.rows);
        }
        var start = (opts.pageNumber - 1) * parseInt(opts.pageSize);
        var end = start + parseInt(opts.pageSize);
        data.rows = (data.originalRows.slice(start, end));
        return data;
    }
};
var formatter = {
    date: function (value, row, index) {
        if (value == "" || value == undefined || !value) {
            return '无';
        }
        return new Date(value).Format("yyyy-MM-dd HH:mm:ss");
    },
    usertype: function (value, row, index) {
        switch (value) {
            case '0':
                return '普通用户';
            case '1':
                return '<span style="color: orange">代理用户</span>';
            default:
                return '<span style="color: red">异常数据</span>';
        }
    }
};

var createWindow = {
    createModalWindow: function (params) {
        $("<div>").css({padding: "5px"}).window({
            width: params.width ? params.width : "80%",
            height: params.height ? params.height : "80%",
            modal: true,
            title: params.title ? params.title : " ",
            href: params.url,
            onClose: function () {
                $(this).window("destroy");
            },
            onLoad: function () {
                if (params.onLoad) {
                    params.onLoad.call(this);
                }
            }
        })//.window("open");
    }
};