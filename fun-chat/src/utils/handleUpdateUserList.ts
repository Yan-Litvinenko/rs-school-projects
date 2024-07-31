import { IResponseAuthorization } from '../interface/interface.response';
import { IUser } from '../interface/interface.client';

const handleAuthorizationUpdateUserList = (
    setUserList: React.Dispatch<React.SetStateAction<IUser[]>>,
    data: IResponseAuthorization,
): void => {
    setUserList((prevList) => {
        let hasNewUser: boolean = false;

        const updateUserList: IUser[] = prevList.map((user) => {
            if (user.login === data.payload.user.login) {
                hasNewUser = true;
                return { ...user, isLogined: data.payload.user.isLogined };
            }

            return user;
        });

        if (!hasNewUser) updateUserList.push(data.payload.user);

        return updateUserList;
    });
};

export default handleAuthorizationUpdateUserList;
