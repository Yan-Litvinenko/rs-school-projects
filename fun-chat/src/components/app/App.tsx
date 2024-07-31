import React from 'react';
import { Routes, Route, Outlet, useNavigate, NavigateFunction } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import Authorization from '../authorization/Authorization';
import Chat from '../chat/Chat';
import Information from '../information/Information';
import Reconnection from '../reconnection/Reconnection';
import useSocketClose from '../../hook/useSocketClose';
import useSocketError from '../../hook/useSocketError';
import useSocketMessage from '../../hook/useSocketMessage';
import useSocketOpen from '../../hook/useSocketOpen';
import useSocket from '../../hook/useSocket';
import useMediaQuery from '../../hook/useMediaQuery';
import useEditMessage from '../../hook/useEditMessage';
import useLogoutClean from '../../hook/useLogoutClean';
import handleServerRequest from '../../utils/handleServerRequest';
import handleServerResponse from '../../utils/handleServerResponse';
import { IMessage } from '../../interface/interface.server';
import { IContextApp, IEditMessage, IUser } from '../../interface/interface.client';
import { IUserAccount, IUserListUnreadMessage } from '../../interface/interface.client';
import styles from './App.module.scss';

const ContextApp = React.createContext<IContextApp | null>(null);

function App(): React.JSX.Element {
    const [socket, setSocket] = React.useState<WebSocket | null>(null);
    const [isConnect, setIsConnect] = React.useState<boolean>(false);
    const [userList, setUserList] = React.useState<IUser[]>([]);
    const [userListUnreadMessage, setUserListUnreadMessage] = React.useState<IUserListUnreadMessage>({});
    const [targetUser, setTargetUser] = React.useState<IUser | null>(null);
    const [historyMessage, setHistoryMessage] = React.useState<IMessage[] | null>(null);
    const [editMessage, setEditMessage] = React.useState<IEditMessage | null>(null);
    const [errorLogin, setErrorLogin] = React.useState<null | string>(null);
    const [messageDetails, setMessageDetails] = React.useState<IMessage | null>(null);
    const [mobileSectionActive, setMobileSectionActive] = React.useState<'aside' | 'chat'>('aside');
    const isSmallScreen = useMediaQuery();
    const navigate: NavigateFunction = useNavigate();

    const handleFormLogin = useForm<IUserAccount>({ mode: 'onChange' });
    const handleFormMessage = useForm<Record<string, string>>({ mode: 'onChange' });

    const {
        requestAuthorization,
        requestGetAllUsers,
        requestSendMessage,
        requestSwitchTarget,
        requestLogout,
        requestDeleteMessage,
        requestReadMessage,
        requestEditMessage,
        requestHistoryMessage,
    } = handleServerRequest(socket, handleFormLogin, targetUser, setTargetUser);

    const { responseAuthorization } = handleServerResponse(
        navigate,
        setErrorLogin,
        setUserList,
        setUserListUnreadMessage,
        setHistoryMessage,
        setTargetUser,
        requestHistoryMessage,
        historyMessage,
        targetUser,
    );

    const onSubmitFormLogin: SubmitHandler<IUserAccount> = (data): void => {
        requestAuthorization(data);
        requestGetAllUsers();
    };
    const onSubmitFormMessage = (data: Record<string, string>): void => {
        if (editMessage) {
            requestEditMessage(editMessage.id, data.message);
            setEditMessage(null);
        } else {
            requestSendMessage(data);
        }

        handleFormMessage.reset();
    };
    const handleUserAuthorization = (event: MessageEvent): void => responseAuthorization(event);

    useSocket(isConnect, setSocket);
    useSocketOpen(isConnect, socket, setIsConnect, requestAuthorization);
    useSocketMessage(
        isConnect,
        socket,
        setErrorLogin,
        setUserList,
        setUserListUnreadMessage,
        handleUserAuthorization,
        setHistoryMessage,
        setTargetUser,
        requestHistoryMessage,
        historyMessage,
        targetUser,
    );
    useSocketError(socket, isConnect);
    useSocketClose(isConnect, socket, setIsConnect);

    useEditMessage(editMessage, handleFormMessage);
    useLogoutClean(socket, setTargetUser, setHistoryMessage);

    return (
        <ContextApp.Provider
            value={{
                editMessage,
                errorLogin,
                handleFormLogin,
                handleFormMessage,
                historyMessage,
                isConnect,
                isSmallScreen,
                messageDetails,
                mobileSectionActive,
                socket,
                targetUser,
                userList,
                userListUnreadMessage,
                onSubmitFormLogin,
                onSubmitFormMessage,
                requestDeleteMessage,
                requestGetAllUsers,
                requestHistoryMessage,
                requestLogout,
                requestReadMessage,
                requestSwitchTarget,
                setEditMessage,
                setErrorLogin,
                setHistoryMessage,
                setIsConnect,
                setMessageDetails,
                setMobileSectionActive,
                setTargetUser,
                setUserList,
                setUserListUnreadMessage,
            }}
        >
            <div className={styles.wrapper}>
                {isConnect ? (
                    <>
                        <Routes>
                            <Route path="/" element={<Authorization />} />
                            <Route path="chat" element={<Chat />} />
                            <Route path="information" element={<Information />} />
                        </Routes>
                        <Outlet />
                    </>
                ) : (
                    <Reconnection />
                )}
            </div>
        </ContextApp.Provider>
    );
}

export { App, ContextApp };
