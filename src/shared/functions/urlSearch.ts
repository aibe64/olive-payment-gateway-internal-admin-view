/* eslint-disable no-useless-escape */
export class  UrlSearch{
      
    static getParameterByName(name : string, url = window.location.href) : string {
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return "";
        if (!results[2]) return '';//.replace(/\=/g, ' ')
        return decodeURIComponent(results[2].replace(/\s/g, ""));  
    }

    static getPagmentReference(): string | null {
        const url: string = window.location.href;
        const domains: string[] = url.split('/');
        if (domains.length > 3) {
            return domains[4]
        } else {
            return null;
        }
    }
}