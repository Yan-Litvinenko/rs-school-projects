const getPageNumberFromDetailNumber = (elementNumber: number, itemsPerPage: number = 10): number => {
    return Math.ceil(elementNumber / itemsPerPage);
};

export default getPageNumberFromDetailNumber;
