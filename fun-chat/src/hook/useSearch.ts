import React from 'react';
import { ContextApp } from '../components/app/App';
import { IContextApp, IUser } from '../interface/interface.client';

type UseSearch = [string, React.Dispatch<React.SetStateAction<string>>, IUser[]];

const useSearch = (initValue: string): UseSearch => {
    const contextApp: IContextApp | null = React.useContext(ContextApp);
    const [value, setValue] = React.useState<string>(initValue);
    const [searchList, setSearchList] = React.useState<IUser[]>([]);

    React.useEffect(() => {
        if (contextApp?.userList) {
            const filterSearchUserList: IUser[] = contextApp.userList.slice(0);
            setSearchList([
                ...filterSearchUserList.filter((user) => user.login.toLowerCase().includes(value.toLowerCase())),
            ]);
        }
    }, [contextApp?.userList, value]);

    return [value, setValue, searchList];
};

export default useSearch;
