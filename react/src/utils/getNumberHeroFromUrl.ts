const getNumberHeroFromUrl = (url: string): number | null => {
    const number = url.replace(/\D/g, '');
    return number ? Number(number) : null;
};

export default getNumberHeroFromUrl;
