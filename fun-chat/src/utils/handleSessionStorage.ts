import { IUserAccount } from '../interface/interface.client';
import upperCaseFirstLetter from './upperCaseFirstLettes';

interface HandleSessionStorage {
    setDataUserAccount: (value: IUserAccount) => void;
    getDataUserAccount: () => IUserAccount;
    removeDataUserAccount: () => void;
}

const handleSessionStorage = (): HandleSessionStorage => {
    const setDataUserAccount = (value: IUserAccount): void => {
        if (value.username) value.username = upperCaseFirstLetter(value.username);

        sessionStorage.setItem('user', JSON.stringify(value));
    };

    const getDataUserAccount = (): IUserAccount => {
        const dataAccount: IUserAccount = JSON.parse(sessionStorage.getItem('user') || '{}');

        if (dataAccount.username) dataAccount.username = upperCaseFirstLetter(dataAccount.username);

        return dataAccount;
    };

    const removeDataUserAccount = (): void => {
        sessionStorage.removeItem('user');
    };

    return {
        setDataUserAccount,
        getDataUserAccount,
        removeDataUserAccount,
    };
};

export default handleSessionStorage;
