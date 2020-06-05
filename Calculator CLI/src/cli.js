import minimist from 'minimist';
import { add } from './add';
import { subtraction } from './subtraction';
import { multiplication } from './multiplication';
import { divison } from './divison';
import { help } from './help';
import { version } from './version';

export async function cli(commandsArr) {
    const argsObj = minimist(commandsArr.slice(2));
    const argsArray = [...argsObj._];

    if (argsObj.version || argsObj.v) {
        return version();
    }

    if (argsObj.help || argsObj.h) {
        return help();
    }

    else if (argsArray.includes('add')) {
        return add(argsObj);
    }
    else if (argsArray.includes('subtraction')) {
        return subtraction(argsObj);
    }
    else if (argsArray.includes('multiplication')) {
        return multiplication(argsObj);
    } else if (argsArray.includes('divison')) {
        return divison(argsObj);
    } else {
        console.error('Is not a valid command');
    }

}