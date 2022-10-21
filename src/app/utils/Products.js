export const getData = () => {
    const dateNow = new Date();
    let day = dateNow.getDate();
    let month = dateNow.getMonth() + 1;
    const year = dateNow.getFullYear();
    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = '0' + month;
    }
    return day + '.' + month + '.' + year;
};

// export const getPrice = (price) => {
//     const newPrice = String(price);
//     if (newPrice.length === 1 || newPrice.length === 2 || newPrice.length === 3) {
//         return  '$' + newPrice;
//     }
//     return '$' + newPrice[0] + ' ' + newPrice.slice(1);
// };

export const getWeight = (weight) => {
    return weight + 'kg'
};

export function getPrice(amount) {
    const offset = 3;
    const price = amount.toString();

    let fmtPrice = '';

    if (price.length > offset) {
        let iter = 0;

        for (let count = price.length - 1; count >= 0; count--) {
            iter++
            switch (iter % offset) {
                case 1:
                    fmtPrice += ` ${price[count]}`;
                    continue

                default:
                    fmtPrice += price[count];
            }
        }

        return '$' + fmtPrice.split("").reverse().join("")

    } else {
        return  '$' + price
    }
}


const products = [];
export const getProductsStorage = () => {
    if (!localStorage.getItem('products')) {
        localStorage.setItem('products', JSON.stringify(products))
    }
    return JSON.parse(localStorage.getItem('products'));
}


