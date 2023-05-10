let _ = require('underscore');

let stack = [];

// Lägger ett element överst i stacken
exports.push = async function (x) {
    stack.push(x);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // vänta 1 sekund
};

// Returnerar det översta elementet i stacken och tar bort det
exports.pop = function () {
    return stack.pop();
}

// Returnerar det översta elementet i stacken
exports.peek = function () {
    return _.last(stack);
}
