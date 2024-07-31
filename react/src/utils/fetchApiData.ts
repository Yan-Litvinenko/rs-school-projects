const fetchApiData = async <T>(url: string): Promise<null | T> => {
    try {
        const apiUrl: string = url;
        const response: Response = await fetch(apiUrl);

        if (!response.ok) {
            console.error(`Ошибка HTTP: ${response.status}`);
            return null;
        }

        const data: T = await response.json();

        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export default fetchApiData;
