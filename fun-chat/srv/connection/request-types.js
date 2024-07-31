const RequestTypes = {
    // common
    USER_LOGIN: 'USER_LOGIN',
    USER_LOGOUT: 'USER_LOGOUT',
    USER_ACTIVE: 'USER_ACTIVE',
    USER_INACTIVE: 'USER_INACTIVE',
    MSG_FROM_USER: 'MSG_FROM_USER',
    MSG_SEND: 'MSG_SEND',
    MSG_READED: 'MSG_READ',
    MSG_DELETE: 'MSG_DELETE',
    MSG_EDIT: 'MSG_EDIT',
    // server
    USER_EXTERNAL_LOGIN: 'USER_EXTERNAL_LOGIN',
    USER_EXTERNAL_LOGOUT: 'USER_EXTERNAL_LOGOUT',
    MSG_READED_FROM_SERVER: 'MSG_READED_FROM_SERVER',
    MSG_DELETED_FROM_SERVER: 'MSG_DELETED_FROM_SERVER',
    MSG_EDITED_FROM_SERVER: 'MSG_EDITED_FROM_SERVER',
    MSG_SENDED_FROM_SERVER: 'MSG_SENDED_FROM_SERVER',
    MSG_DELIVERED: 'MSG_DELIVER',
    ERROR: 'ERROR',
};

module.exports = {
    RequestTypes,
};
