type ErrorLogin =
    | 'a user with this login is already authorized'
    | 'another user is already authorized in this connection'
    | 'incorrect password';

type ErrorLogout =
    | 'there is no user with this login'
    | 'incorrect password'
    | 'the user was not authorized'
    | 'a user with this login is already authorized';

type ErrorSendMessage =
    | 'sender and recipient logins are the same'
    | 'the user with the specified login does not exist'
    | 'user not registered or not logged';

type ErrorHistoryMessage =
    | 'sender and recipient logins are the same'
    | 'the user with the specified login does not exist'
    | 'user not registered or not logged';

type ErrorReadMessage = 'incorrect message id';
type ErrorEditMessage = 'user not sender cannot be executed';

interface IError {
    id: string;
    type: 'ERROR';
    payload: {
        error: ErrorLogin | ErrorLogout | ErrorSendMessage | ErrorHistoryMessage | ErrorReadMessage | ErrorEditMessage;
    };
}

export { IError };
