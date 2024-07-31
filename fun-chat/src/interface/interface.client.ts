import { IMessage } from './interface.server';
import { SubmitHandler, UseFormReturn } from 'react-hook-form';

interface IContextApp {
    editMessage: IEditMessage | null;
    errorLogin: null | string;
    handleFormLogin: UseFormReturn<IUserAccount, any, undefined>;
    handleFormMessage: UseFormReturn<Record<string, string>, any, undefined>;
    historyMessage: IMessage[] | null;
    isConnect: boolean;
    isSmallScreen: boolean;
    messageDetails: IMessage | null;
    mobileSectionActive: 'aside' | 'chat';
    socket: WebSocket | null;
    targetUser: IUser | null;
    userList: IUser[];
    userListUnreadMessage: IUserListUnreadMessage;
    onSubmitFormLogin: SubmitHandler<IUserAccount>;
    onSubmitFormMessage: SubmitHandler<Record<string, string>>;
    requestDeleteMessage: (id: string) => void;
    requestGetAllUsers: () => void;
    requestHistoryMessage: (username: string) => void;
    requestLogout: () => void;
    requestReadMessage: (id: string) => void;
    requestSwitchTarget: (user: IUser) => void;
    setEditMessage: React.Dispatch<React.SetStateAction<IEditMessage | null>>;
    setErrorLogin: React.Dispatch<React.SetStateAction<string | null>>;
    setHistoryMessage: React.Dispatch<React.SetStateAction<IMessage[] | null>>;
    setIsConnect: React.Dispatch<React.SetStateAction<boolean>>;
    setMessageDetails: React.Dispatch<React.SetStateAction<IMessage | null>>;
    setMobileSectionActive: React.Dispatch<React.SetStateAction<'aside' | 'chat'>>;
    setTargetUser: React.Dispatch<React.SetStateAction<IUser | null>>;
    setUserList: React.Dispatch<React.SetStateAction<IUser[]>>;
    setUserListUnreadMessage: React.Dispatch<React.SetStateAction<IUserListUnreadMessage>>;
}

interface IUserAccount {
    username: string;
    password: string;
}

interface IUser {
    login: string;
    isLogined: boolean;
}

interface ICoordinateMessageMenu {
    x: number;
    y: number;
}

interface IEditMessage {
    id: string;
    text: string;
}

interface IUserListUnreadMessage {
    [key: string]: number;
}

export { IUserAccount, IContextApp, IUser, ICoordinateMessageMenu, IEditMessage, IUserListUnreadMessage };
