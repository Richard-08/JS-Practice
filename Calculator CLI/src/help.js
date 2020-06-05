const chalk = require('chalk');


const menus = {
    main: `
  ${chalk.greenBright('calculator [command, arguments] <options>')}

  [command]:
    ${chalk.blueBright('add')} ................ add numbers (a + b)
    ${chalk.blueBright('subtraction')} ........... subtraction numbers (a - b)
    ${chalk.blueBright('multiplication')}.............. multiplication numbers (a * b)
    ${chalk.blueBright('divison')} ............ division numbers (a / b)

  [arguments]: ${chalk.blueBright('Numbers (Example: calculator add 5 6) // 11')}

  <options>:
    ${chalk.blueBright('-e')} ............... use only even numbers
    ${chalk.blueBright('-o')} ............... use only odd numbers
    ${chalk.blueBright('--version / --v')} ............... show package version
    ${chalk.blueBright('--help / --h')} ............... show help menu for a command
  `,
}

export async function help() {
    console.log(menus.main);
}