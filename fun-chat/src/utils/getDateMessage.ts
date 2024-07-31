const getZero = (n: number): string => {
    return n >= 10 ? `${n}` : `0${n}`;
};

const getDateMessage = (ms: number): Record<string, string> => {
    const date: Date = new Date(ms);
    const year: number = date.getFullYear();
    const month: number = date.getMonth() + 1;
    const day: number = date.getDate();

    const hours: number = date.getHours();
    const minutes: number = date.getMinutes();

    return {
        date: `${getZero(day)}.${getZero(month)}.${year}`,
        time: `${getZero(hours)}:${getZero(minutes)}`,
    };
};

export default getDateMessage;
