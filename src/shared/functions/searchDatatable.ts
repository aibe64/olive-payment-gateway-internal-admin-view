export default class SearchDatatable {

    static async Search(array: Array<any>, value: string) {
        let newArray = new Array<any>()
        if (array) {
            let object = array[0];
            if (object || object != null) {
                await array.forEach(function (element) {
                    let values: string[] = Object.values(element);
                    let exist = false
                    values.forEach(function (element2) {
                        if (element2 !== null && element2) {
                            element2 = element2.toString()
                            if (element2?.toLocaleLowerCase().includes(value?.toLocaleLowerCase())) {
                                exist = true
                                return;
                            }
                        }
                    })
                    if (exist)
                        newArray.push(element)
                })
            }
            return newArray;
        } else {
            return array
        }
    }
}