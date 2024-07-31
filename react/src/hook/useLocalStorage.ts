import React from 'react';

type UseLocalStorage<T> = [T, (newValue: T) => void];

const useLocalStorage = <T>(key: string, initValue: T): UseLocalStorage<T> => {
    const [value, setValue] = React.useState<T>(() => {
        try {
            const data = localStorage.getItem(key);
            return data ? (JSON.parse(data) as T) : initValue;
        } catch (error) {
            console.error(`Failed to get value from local storage, key: ${key}`, error);
            return initValue;
        }
    });

    const updateSetValue = (newValue: T): void => {
        try {
            localStorage.setItem(key, JSON.stringify(newValue));
            setValue(newValue);
        } catch (error) {
            console.error(`Failed to set value from local storage, key: ${key}, value: ${newValue}`, error);
        }
    };

    return [value, updateSetValue];
};

export default useLocalStorage;
