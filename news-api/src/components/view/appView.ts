import { News, Article } from './news/news';
import { Sources, Source } from './sources/sources';

interface DrawNews {
    articles?: Article[];
    status: string;
    totalResults?: number;
}

interface DrawSource {
    sources?: Source[];
    status: string;
}

class AppView {
    public news;
    public sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: DrawNews): void {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: DrawSource): void {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export { AppView, DrawNews, DrawSource };
