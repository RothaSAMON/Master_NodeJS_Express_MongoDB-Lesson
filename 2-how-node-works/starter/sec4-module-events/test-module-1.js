//All of this style is the module.exports way :

// class Calculator {
//     add(a, b) {
//         return a + b;
//     }
//     multiply(a, b) {
//         return a * b;
//     }

//     divide(a, b) {
//         return a / b;
//     }
// }
// module.exports = Calculator;


//This style is an expression :
module.exports = class {
    add(a, b) {
        return a + b;
    }
    multiply(a, b) {
        return a * b;
    }

    divide(a, b) {
        return a / b;
    }
};