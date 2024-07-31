import React from 'react';
import { nanoid } from 'nanoid';
import { ContextApp } from '../app/App';
import useSearch from '../../hook/useSearch';
import handleFilterUserList from '../../utils/handleFilterUserList';
import getClassUserByStatus from '../../utils/getClassUserByStatus';
import { IContextApp } from '../../interface/interface.client';
import styles from './ChatAside.module.scss';

const ChatAside = (): React.JSX.Element => {
    const contextApp = React.useContext<IContextApp | null>(ContextApp);

    if (!contextApp) return <></>;

    const [searchValue, setSearchValue, searchUserList] = useSearch('');

    return (
        <div className={styles.aside}>
            <div className={styles.aside__inner}>
                <input
                    className={styles.aside__search}
                    placeholder="Поиск..."
                    type="text"
                    value={searchValue}
                    onChange={(event) => setSearchValue(event?.target.value)}
                />
                <ul className={styles.user_list}>
                    {handleFilterUserList(searchUserList).map((user) => {
                        return (
                            <li
                                key={nanoid()}
                                className={getClassUserByStatus(user, contextApp.targetUser, styles)}
                                onClick={() => {
                                    contextApp.setMobileSectionActive('chat');
                                    contextApp.requestSwitchTarget(user);
                                }}
                            >
                                {user.login}
                                {contextApp.userListUnreadMessage[user.login] > 0 ? (
                                    <span className={styles.unread_messages}>
                                        {contextApp.userListUnreadMessage[user.login]}
                                    </span>
                                ) : null}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default ChatAside;
