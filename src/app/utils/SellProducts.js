
const soldProducts = [];
export const getSoldProducts = () => {
    if (!localStorage.getItem('sellProducts')) {
        localStorage.setItem('sellProducts', JSON.stringify(soldProducts))
    }
    return JSON.parse(localStorage.getItem('sellProducts'));
}