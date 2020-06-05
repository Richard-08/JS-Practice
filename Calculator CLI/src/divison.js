export async function divison(args) {
    let numbersArr = args._.filter(value => typeof value !== 'string');

    if (args.e) {
        const result = numbersArr.filter(n => n % 2 === 0).reduce((a, b) => a / b, 0);
        console.log(result);
    } else if (args.o) {
        const result = numbersArr.filter(n => n % 2 !== 0).reduce((a, b) => a / b, 0);
        console.log(result);
    } else {
        const result = numbersArr.reduce((a, b) => a / b);
        console.log(result);
    }
}