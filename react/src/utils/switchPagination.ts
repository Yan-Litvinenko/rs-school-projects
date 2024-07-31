import { IPagination, PositionPagination } from '../interfaces/interface.app.ts';

const switchPagination = (
    position: PositionPagination,
    numberPage: number,
    amountPages: number | null,
    setPagination: React.Dispatch<React.SetStateAction<IPagination>>,
) => {
    if (position === 'first') {
        if (numberPage === 1) {
            setPagination({
                first: numberPage,
                second: numberPage + 1,
                third: numberPage + 2,
            });
        } else {
            setPagination({
                first: numberPage - 1,
                second: numberPage,
                third: numberPage + 1,
            });
        }
    } else if (position === 'third') {
        if (numberPage === amountPages) {
            setPagination({
                first: numberPage - 2,
                second: numberPage - 1,
                third: numberPage,
            });
        } else {
            setPagination({
                first: numberPage - 1,
                second: numberPage,
                third: numberPage + 1,
            });
        }
    }
};

export default switchPagination;
