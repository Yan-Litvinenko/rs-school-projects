import { Source } from '../view/sources/sources';

type undeting = undefined | string;

interface Options {
    apiKey: undeting;
}

interface GetResponse {
    endpoint: string;
    options?: {
        sources: string | null;
    };
}

interface CallbackFunction {
    sources: Source;
    status: string;
}

class Loader {
    baseLink: undeting;
    options: Options;

    constructor(baseLink: undeting, options: Options) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        { endpoint, options }: GetResponse,
        callback: (data: CallbackFunction) => void = (data): void => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: {}, endpoint: string): string {
        const urlOptions: Record<string, undeting> = { ...this.options, ...options };
        let url: string = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key: string) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load(method: string, endpoint: string, callback: (data: CallbackFunction) => void, options = {}): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data: CallbackFunction) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
