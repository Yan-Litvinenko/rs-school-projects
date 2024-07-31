type RequestType =
    | 'USER_LOGIN'
    | 'USER_LOGOUT'
    | 'USER_ACTIVE'
    | 'USER_INACTIVE'
    | 'MSG_SEND'
    | 'MSG_FROM_USER'
    | 'MSG_READ'
    | 'MSG_DELETE'
    | 'MSG_EDIT';

interface IRequest {
    id: string;
    type: RequestType;
}

interface IRequestAuthorization extends IRequest {
    payload: {
        user: {
            login: string;
            password: string;
        };
    };
}

interface IRequestUsers extends IRequest {
    payload: null;
}

interface IRequestMessage extends IRequest {
    payload: {
        message: {
            to: string;
            text: string;
        };
    };
}

interface IRequestHistoryMessage extends IRequest {
    payload: {
        user: {
            login: string;
        };
    };
}

interface IRequestReadMessage extends IRequest {
    payload: {
        message: {
            id: string;
        };
    };
}

interface IRequestDeleteMessage extends IRequest {
    payload: {
        message: {
            id: string;
        };
    };
}

interface IRequestEditMessage extends IRequest {
    payload: {
        message: {
            id: string;
            text: string;
        };
    };
}

export {
    RequestType,
    IRequestAuthorization,
    IRequestUsers,
    IRequestMessage,
    IRequestHistoryMessage,
    IRequestReadMessage,
    IRequestDeleteMessage,
    IRequestEditMessage,
};
