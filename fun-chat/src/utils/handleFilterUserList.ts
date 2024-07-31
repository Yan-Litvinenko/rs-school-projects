import { IUser, IUserAccount } from '../interface/interface.client';
import handleSessionStorage from './handleSessionStorage';

const handleFilterUserList = (users: IUser[]) => {
    const { getDataUserAccount } = handleSessionStorage();
    const account: IUserAccount = getDataUserAccount();

    return users.filter((user) => user.login !== account.username);
};

export default handleFilterUserList;
