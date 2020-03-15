
const convert = (json) => {
    let arr = [];
    let headArr = [];
    for (let i = 0; i < json.length; i += 1) {
        arr[i + 1] = [];
        arr[0] = [];
        for (let key in json[i]) {
            arr[0].push(key)
            arr[i + 1].push(json[i][key]);
        }
    }
    return arr;
}

let Arr = (convert([
    {'id': 1, 'username': 'Richard'},
    {'id': 2, 'username': 'Albert'},
    {'id': 3, 'username': 'Niel'}
]));

/* console.log(Arr);
 */
const convertToCSV = (arr) => {
    return arr.join(`\n`).replace(/,/g, ', ');
}
console.log(convertToCSV(Arr));



//json

/* [
    {'id': 1, 'username': 'Richard'},
    {'id': 2, 'username': 'Albert'},
    {'id': 3, 'username': 'Niel'}
]; */


//csv

/* 'id', 'username'
1, 'Richard'
2, 'Albert'
3, 'Neil' */