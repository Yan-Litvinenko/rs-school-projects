import React from 'react';
import { ContextApp } from '../../App.tsx';
import { IContextApp } from '../../interfaces/interface.app.ts';
import styles from './ThrowErrorButton.module.scss';

const ThrowErrorButton = (): React.JSX.Element => {
    const contextApp = React.useContext<IContextApp | null>(ContextApp);

    React.useEffect(() => {
        if (contextApp?.error) {
            contextApp?.setError(false);
            throw new Error('Проверка работы компонента ErrorBoundary');
        }
    }, [contextApp?.error]);

    return (
        <button className={styles.bug} onClick={() => contextApp?.setError(true)}>
            Throw Error
        </button>
    );
};

export default ThrowErrorButton;
