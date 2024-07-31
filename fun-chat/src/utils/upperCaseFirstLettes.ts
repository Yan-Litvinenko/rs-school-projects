const upperCaseFirstLetter = (string: string): string => {
    if (!string || string.length <= 0) return '';

    return string[0].toUpperCase() + string.slice(1);
};

export default upperCaseFirstLetter;
