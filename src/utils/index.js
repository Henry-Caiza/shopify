/*
-----Esta funcion calcula el precio total de una nueva orden------
        @param {Array} prodcuts --> cartProducts: Array de Objects
        @return {number} Total price
*/

export const totalPrice = (listProducts) => {
    let sum = 0
    listProducts.forEach(element => sum += element.price)
    return sum
}