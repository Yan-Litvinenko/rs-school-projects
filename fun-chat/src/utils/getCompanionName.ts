import handleSessionStorage from './handleSessionStorage';

const getCompanionName = (name1: string, name2: string): string => {
    const username: string = handleSessionStorage().getDataUserAccount().username;
    const companionName: string = name1 === username ? name2 : name1;

    return companionName;
};

export default getCompanionName;
