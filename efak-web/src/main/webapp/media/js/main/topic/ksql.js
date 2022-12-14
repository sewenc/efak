$(document).ready(function () {
    var mime = 'text/x-sql';
    // get mime type
    if (window.location.href.indexOf('mime=') > -1) {
        mime = window.location.href.substr(window.location.href.indexOf('mime=') + 5);
    }
    var sqlEditor = CodeMirror.fromTextArea(document.getElementById('efak_ksql_code'), {
        mode: mime,
        indentWithTabs: true,
        smartIndent: true,
        lineNumbers: true,
        matchBrackets: true,
        autofocus: true,
        theme: "blackboard",
        extraKeys: {
            "'a'": completeAfter,
            "'b'": completeAfter,
            "'c'": completeAfter,
            "'d'": completeAfter,
            "'e'": completeAfter,
            "'f'": completeAfter,
            "'g'": completeAfter,
            "'h'": completeAfter,
            "'i'": completeAfter,
            "'j'": completeAfter,
            "'k'": completeAfter,
            "'l'": completeAfter,
            "'m'": completeAfter,
            "'n'": completeAfter,
            "'o'": completeAfter,
            "'p'": completeAfter,
            "'q'": completeAfter,
            "'r'": completeAfter,
            "'s'": completeAfter,
            "'t'": completeAfter,
            "'u'": completeAfter,
            "'v'": completeAfter,
            "'w'": completeAfter,
            "'x'": completeAfter,
            "'y'": completeAfter,
            "'z'": completeAfter,
            "Alt-/": "autocomplete"
        }
    });

    function completeAfter(cm, pred) {
        if (!pred || pred()) {
            setTimeout(function () {
                if (!cm.state.completionActive) {
                    cm.showHint({
                        completeSingle: false
                    })
                }
            }, 100)
        }
        return CodeMirror.Pass
    }

    var logEditor = CodeMirror.fromTextArea(document.getElementById('job_info'), {
        mode: mime,
        indentWithTabs: true,
        smartIndent: true,
        lineNumbers: true,
        matchBrackets: true,
        autofocus: true,
        theme: "blackboard",
        readOnly: true
    });

    $('#result_tab li:eq(0) a').tab('show');

    var offset = 0;

    function viewerTopics(sql, dataSets, jobId) {
        var ret = JSON.parse(dataSets);
        var tabHeader = "<div class='panel-body table-responsive' id='div_children" + offset + "'><table id='result_children" + offset + "' class='table table-striped table-bordered' width='100%'><thead><tr>"
        var mData = [];
        var i = 0;
        for (var key in ret[0]) {
            tabHeader += "<th>" + key + "</th>";
            var obj = {
                mData: key
            };
            mData.push(obj);
        }

        tabHeader += "</tr></thead></table></div>";
        $("#efak_ksql_result_tab").append(tabHeader);
        if (offset > 0) {
            $("#div_children" + (offset - 1)).remove();
        }

        var result_table_id = "#result_children" + offset;
        var result_table = $(result_table_id).DataTable({
            "searching": false,
            "buttons": ['copy', 'excel', 'pdf', 'print'],
            "bSort": false,
            "retrieve": true,
            "bLengthChange": false,
            "bProcessing": true,
            "bServerSide": true,
            "fnServerData": retrieveData,
            "sAjaxSource": '/topic/physics/commit/?sql=' + sql + '&jobId=' + jobId,
            "aoColumns": mData
        });

        // todo export data
        // console.log(result_table);
        // result_table.buttons().container().appendTo(result_table_id + '_wrapper .col-md-6:eq(0)');

        function retrieveData(sSource, aoData, fnCallback) {
            $.ajax({
                "type": "get",
                "contentType": "application/json",
                "url": sSource,
                "dataType": "json",
                "data": {
                    aoData: JSON.stringify(aoData)
                },
                "success": function (data) {
                    fnCallback(data)
                }
            });
        }

        offset++;
    }

    $(document).on('click', 'button[id=ke_ksql_query]', function () {
        var sql = encodeURI(sqlEditor.getValue());
        logEditor.setValue("");
        var jobId = "job_id_" + new Date().getTime();
        $.ajax({
            type: 'get',
            dataType: 'json',
            url: '/topic/logical/commit/?sql=' + sql + '&jobId=' + jobId,
            success: function (datas) {
                if (datas != null) {
                    if (datas.error) {
                        logEditor.setValue(datas.msg);
                    } else {
                        logEditor.setValue(datas.status);
                        viewerTopics(sql, datas.msg, jobId);
                    }
                    viewerTopicSqlHistory();
                }
            }
        });
    });

    var historyOffset = 0;

    function viewerTopicSqlHistory() {
        var thList = [{
            th: "ID",
            column: "id"
        }, {
            th: "User",
            column: "username"
        }, {
            th: "Host",
            column: "host"
        }, {
            th: "KSQL",
            column: "ksql"
        }, {
            th: "Status",
            column: "status"
        }, {
            th: "Spent",
            column: "spendTime"
        }, {
            th: "Created",
            column: "created"
        }];
        var ksqlTabHeader = "<div class='panel-body table-responsive' id='div_ksql_children" + historyOffset + "'><table id='result_ksql_children" + historyOffset + "' class='table table-bordered table-hover' width='100%'><thead><tr>"
        var ksqlMData = [];
        var i = 0;
        for (var i = 0; i < thList.length; i++) {
            ksqlTabHeader += "<th>" + thList[i].th + "</th>";
            var obj = {
                mData: thList[i].column
            };
            ksqlMData.push(obj);
        }

        ksqlTabHeader += "</tr></thead></table></div>";
        $("#ksql_history_result_div").append(ksqlTabHeader);
        if (historyOffset > 0) {
            $("#div_ksql_children" + (historyOffset - 1)).remove();
        } else {
            $("#ksql_history_result0").remove("");
        }

        $("#result_ksql_children" + historyOffset).dataTable({
            "bSort": false,
            "retrieve": true,
            "bLengthChange": false,
            "bProcessing": true,
            "bServerSide": true,
            "fnServerData": retrieveData,
            "sAjaxSource": '/topic/sql/history/ajax',
            "aoColumns": ksqlMData
        });

        function retrieveData(sSource, aoData, fnCallback) {
            $.ajax({
                "type": "get",
                "contentType": "application/json",
                "url": sSource,
                "dataType": "json",
                "data": {
                    aoData: JSON.stringify(aoData)
                },
                "success": function (data) {
                    fnCallback(data)
                }
            });
        }

        historyOffset++;
    }
});