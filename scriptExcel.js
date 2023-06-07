// function tableToExcel() {
//   // var table2excel = new Table2Excel()
//   // table2excel.export(document.querySelectorAll('table.table'))
// }

function exportTableToExcel(tableID, filename =''){
    var downloadLink
    // var dataType = 'aplication/vnd.ms-excel'
    var dataType = 'aplication/excel'
    var tableSelect = document.getElementById(tableID)
    var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20')

    filename = filename?filename+'.xls':'excel_data.xls'

    downloadLink = document.createElement('a');

    document.body.appendChild(downloadLink)

    if(navigator.msSaveOrOpenBlob){
        var blob = new Blob(['\ufeff', tableHTML], {
            type: dataType
        })
        navigator.msSaveOrOpenBlob( blob, filename)
    } else {
        downloadLink.href = 'data:' + dataType + ', ' + tableHTML

        downloadLink.download = filename

        downloadLink.click()
    }
}
