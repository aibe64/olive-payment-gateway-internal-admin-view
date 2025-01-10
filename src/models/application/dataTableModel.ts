export namespace DataTableModel{
  
    export class Column {
        label?: string;
        field?: string;
        width?: number;
        attributes: any;
        constructor(label: string, field:string,width:number){
            this.label = label;
            this.field = field;
            this.width = width;
        }
    }

    export class Data{
        columns?: Column[]
        column?:string[]
        rows?: Array<any>
        objectKeys?:string[]
        constructor(columns: string[],objectKeys:string[], rows:Array<any>, widths: number[]){
            let dataColumns : Array<Column> = new Array<Column>();
            let column : Column = new Column("S/N","sn",50);
            dataColumns.push(column);
            // let objectKeysIndex= 0;
            // let widthIndex = 0;
            // columns.forEach(function (element:any) {
            //     column = new Column(element, objectKeys[objectKeysIndex++],widths[widthIndex++])
            //     dataColumns.push(column);
            // })
            this.columns = dataColumns;
            this.objectKeys = objectKeys;
            this.column = columns
            this.rows = rows;
        }
    }

} 