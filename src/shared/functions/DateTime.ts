export default class DateTime {

    ConvertAPIDate(params: string): string {
        let date = new Date(params);
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = date.getMonth()
        const yyyy = date.getFullYear();
        return dd + '-' + Months[mm] + '-' + yyyy;
    }

    ConvertAPItoFieldDate(apiDate: string): string {
        let date = new Date(apiDate);
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0')
        const yyyy = date.getFullYear();
        return dd + '/' + mm + '/' + yyyy;
    }
    ConvertAPItoPaymentPageDate(apiDate: string): string {
        let date = new Date(apiDate);
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0')
        const yyyy = date.getFullYear();
        return mm + '-' + dd + '-' + yyyy;
    }
    ConvertDateToReportDate(apiDate: string): string {
        let date = new Date(apiDate);
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0')
        const yyyy = date.getFullYear();
        return dd + '-' + mm + '-' + yyyy;
    }

    ConvertDateToFieldDateAndTime(params: string): string {
        let date = new Date(params);
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = date.getFullYear();
        const hours = date.getHours();
        const min = date.getMinutes();
        return `${dd}-${mm}-${yyyy} ${hours.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`
        // return yyyy + '-' + mm + '-' + dd + ' ' + hours + ':' + min;
    }
    ConvertDateToAPIDateWithoutMilliSeconds(params:string) : string {
        let date = params.split('.')
        return date[0]
    }

    ConvertDateToAPIDate(params: string): string {
        let date = new Date(params);
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = date.getFullYear();
        const hours = date.getHours();
        const min = date.getMinutes();
        const sec = date.getSeconds();
        return yyyy + '-' + mm + '-' + dd + 'T' + hours + ':' + min + ':' + sec + '+01:00';
    }

}

const Months = ["JAN", "FEB", "March", "APR", "MAY", "JUN",
    "JUL", "AUG", "SEPT", "OCT", "NOV", "DEC"
];

