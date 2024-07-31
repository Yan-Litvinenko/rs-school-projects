import { IUser } from '../interface/interface.client';

const getClassUserByStatus = (user: IUser, targetUser: IUser | null, styles: Record<string, string>): string => {
    const className: string[] = [styles.user_list__item];

    if (user.isLogined) {
        className.push(styles.user_list__item_online);
    } else {
        className.push(styles.user_list__item_offline);
    }

    if (targetUser?.login === user.login) {
        className.push(styles.user_list__item_active);
    }

    return className.join(' ');
};

export default getClassUserByStatus;
