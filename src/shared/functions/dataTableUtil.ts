
export class DataTableUtil {
  
    static SetColumn(column: Array<string>): [] {
        let columns: any = [];
        column.forEach(function (element: string) {
            if (element === "key") {
                columns.push({
                    title: "S/N",
                    dataIndex: element,
                })
            } else {
                let value = element.replace(/ /g,'');
                    value = value.charAt(0).toLowerCase() + value.slice(1);
                columns.push({
                    title: element,
                    dataIndex: value,
                })
            }
        })
        return columns;
    }
    static setRow() {

    }

    static SetExcelColumn(column: Array<string>){
        let columns: any = [];
        column.forEach(function (element: string) {
            columns.push({
                title: element,
                width: { wpx: 160 },
            })
        });
        return columns;
    }

}