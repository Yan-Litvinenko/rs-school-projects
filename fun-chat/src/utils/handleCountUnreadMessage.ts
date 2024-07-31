import { IUserListUnreadMessage } from '../interface/interface.client';
import { IMessage } from '../interface/interface.server';
import handleSessionStorage from './handleSessionStorage';

const handleCountUnreadMessage = (
    messages: IMessage[],
    companionName: string,
    setUserListUnreadMessage: React.Dispatch<React.SetStateAction<IUserListUnreadMessage>>,
): void => {
    const username: string = handleSessionStorage().getDataUserAccount().username;
    const countUnreadMessage: number = messages.reduce((acc, message) => {
        if (message.from !== username) {
            if (!message.status.isReaded) {
                return acc + 1;
            }
        }

        return acc + 0;
    }, 0);

    setUserListUnreadMessage((prevList) => {
        return { ...prevList, [companionName]: countUnreadMessage };
    });
};

export default handleCountUnreadMessage;
