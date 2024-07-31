import { IUser } from './interface.client';
import { IMessage } from './interface.server';

type ResponseType =
    | 'MSG_DELIVER'
    | 'MSG_FROM_USER'
    | 'MSG_SEND'
    | 'USER_ACTIVE'
    | 'USER_INACTIVE'
    | 'USER_LOGIN'
    | 'USER_LOGOUT'
    | 'USER_EXTERNAL_LOGIN'
    | 'USER_EXTERNAL_LOGOUT'
    | 'MSG_READ'
    | 'MSG_DELETE'
    | 'MSG_EDIT';

interface IResponse {
    id: string;
    type: ResponseType;
}

interface IResponseAuthorization extends IResponse {
    payload: {
        user: {
            login: string;
            isLogined: boolean;
        };
    };
}

interface IResponseUsers extends IResponse {
    payload: {
        users: IUser[];
    };
}

interface IResponseMessage extends IResponse {
    payload: {
        message: IMessage;
    };
}

interface IResponseHistoryMessage extends IResponse {
    payload: {
        messages: IMessage[];
    };
}

interface IResponseDelivered extends IResponse {
    payload: {
        message: {
            id: string;
            status: {
                isDelivered: boolean;
            };
        };
    };
}

interface IResponseReadMessage extends IResponse {
    payload: {
        message: {
            id: string;
            status: {
                isReaded: boolean;
            };
        };
    };
}

interface IResponseDeleteMessage extends IResponse {
    payload: {
        message: {
            id: string;
            status: {
                isDeleted: boolean;
            };
        };
    };
}

interface IResponseEditMessage extends IResponse {
    payload: {
        message: {
            id: string;
            text: string;
            status: {
                isEdited: boolean;
            };
        };
    };
}

export {
    ResponseType,
    IResponseAuthorization,
    IResponseDelivered,
    IResponseHistoryMessage,
    IResponseMessage,
    IResponseUsers,
    IResponseReadMessage,
    IResponseDeleteMessage,
    IResponseEditMessage,
};
