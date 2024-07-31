import { IPagination } from '../interfaces/interface.app.ts';

const initPagination = (
    activePage: number,
    setPagination: React.Dispatch<React.SetStateAction<IPagination>>,
    amountPages: number | null,
): void => {
    const updatePagination = {
        first: 1,
        second: 2,
        third: 3,
    };

    if (activePage === 1) {
        updatePagination.first = activePage;
        updatePagination.second = activePage + 1;
        updatePagination.third = activePage + 2;
    } else if (activePage === amountPages) {
        updatePagination.first = activePage - 2;
        updatePagination.second = activePage - 1;
        updatePagination.third = activePage;
    } else {
        updatePagination.first = activePage - 1;
        updatePagination.second = activePage;
        updatePagination.third = activePage + 1;
    }

    setPagination(updatePagination);
};

export default initPagination;
