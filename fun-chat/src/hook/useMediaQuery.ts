import React from 'react';

const useMediaQuery = (): boolean => {
    const [isSmallScreen, setIsSmallScreen] = React.useState(false);

    const checkScreenSize = (): void => {
        const mediaQuery: MediaQueryList = window.matchMedia('(max-width: 768px)');
        if (mediaQuery.matches) {
            setIsSmallScreen(true);
        } else {
            setIsSmallScreen(false);
        }
    };

    React.useEffect(() => {
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => {
            window.removeEventListener('resize', checkScreenSize);
        };
    }, []);

    return isSmallScreen;
};

export default useMediaQuery;
