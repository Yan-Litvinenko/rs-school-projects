import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { IEditMessage } from '../interface/interface.client';

const useEditMessage = (
    editMessage: IEditMessage | null,
    handleFormMessage: UseFormReturn<Record<string, string>, any, undefined>,
) => {
    React.useEffect(() => {
        if (editMessage) {
            handleFormMessage.setValue('message', editMessage.text);
            handleFormMessage.setFocus('message');
        }
    }, [editMessage]);
};

export default useEditMessage;
