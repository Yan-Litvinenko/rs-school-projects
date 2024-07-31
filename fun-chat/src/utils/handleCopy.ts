const handleCopy = (message: string, setStatusMenu: React.Dispatch<React.SetStateAction<boolean>>): void => {
    navigator.clipboard.writeText(message);
    setStatusMenu(false);
};

export default handleCopy;
