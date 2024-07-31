import { IDetail } from '../interfaces/interface.api.ts';
import fetchApiData from './fetchApiData.ts';

interface IInitDetail {
    numberDetail: number;
    setActiveHero: React.Dispatch<React.SetStateAction<null | number>>;
    setDetail: React.Dispatch<React.SetStateAction<IDetail | null>>;
    setLoadDetail: React.Dispatch<React.SetStateAction<boolean>>;
}

const initDetail = async (props: IInitDetail) => {
    const { numberDetail, setActiveHero, setDetail, setLoadDetail } = props;
    const data: IDetail | null = await fetchApiData<IDetail | null>(`https://swapi.dev/api/people/${numberDetail}`);

    setActiveHero(numberDetail);
    setDetail(data);
    setLoadDetail(false);
};

export default initDetail;
