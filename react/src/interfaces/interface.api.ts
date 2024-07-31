interface IResponseData {
    count: number;
    next: string;
    previous: null;
    results: IResponseDataPeople[];
}

interface IResponseDataPeople {
    birth_year: string;
    created: string;
    edited: string;
    eye_color: string | 'n/a' | 'uknown';
    films: string[];
    gender: string | 'Male' | 'Female' | 'n/a' | 'uknown';
    hair_color: string | 'n/a' | 'uknown';
    height: string;
    homeworld: string;
    mass: string;
    name: string;
    skin_color: string;
    species: string[];
    starship: string[];
    type?: 'people';
    url: string;
    vehicles: string[];
}

interface IDetail {
    gender: string | 'Male' | 'Female' | 'n/a' | 'uknown';
    height: string;
    mass: string;
    name: string;
}

export type { IResponseData, IResponseDataPeople, IDetail };
