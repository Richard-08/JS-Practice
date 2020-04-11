

function regxp(str) {
    return str.replace(/\,/g, '\n').replace(/\n\-/g, '');
}

console.log(regxp('Tomatoes - 4,Olive Oil - 2 tbs,Onion - 1 Diced,Red Pepper - 1 sliced,Green Pepper - 1 sliced,Garlic - 3 Cloves Crushed,Cumin - 1 tsp ,Paprika - 1 tsp ,Salt - 3/4 teaspoon,Chili Powder - 1/2 teaspoon,Eggs - 4,- ,- ,- ,- ,- ,- ,- ,- ,-, '))