import './news.css';

interface Article {
    author: string | null;
    publishedAt: string;
    source: {
        id: string;
        name: string;
    };
    title: string;
    url: string;
    urlToImage: string;
    description: string;
}

type nullement = HTMLElement | null;

class News<T extends Article> {
    draw(data: T[]): void {
        const news: T[] = data.length >= 10 ? data.slice(0, 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement | null = document.querySelector('#newsItemTemp');

        if (!newsItemTemp) throw new Error('Item is not defined');

        news.forEach((item, idx) => {
            const newsClone: DocumentFragment = newsItemTemp.content.cloneNode(true) as DocumentFragment;

            if (idx % 2) {
                const newsItem: nullement = newsClone.querySelector('.news__item');
                if (newsItem) newsItem.classList.add('alt');
            }

            const metaPhoto: nullement = newsClone.querySelector('.news__meta-photo');
            if (metaPhoto) metaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;

            const metaAuthor: nullement = newsClone.querySelector('.news__meta-author');
            if (metaAuthor) metaAuthor.textContent = item.author || item.source.name;

            const metaDate: nullement = newsClone.querySelector('.news__meta-date');
            if (metaDate) {
                metaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
            }

            const newsTitle: nullement = newsClone.querySelector('.news__description-title');
            if (newsTitle) newsTitle.textContent = item.title;

            const newsSource: nullement = newsClone.querySelector('.news__description-source');
            if (newsSource) newsSource.textContent = item.source.name;

            const newsDescription: nullement = newsClone.querySelector('.news__description-content');
            if (newsDescription) newsDescription.textContent = item.description;

            const newsUrl: nullement = newsClone.querySelector('.news__read-more a');
            if (newsUrl) newsUrl.setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        const newsElement: nullement = document.querySelector('.news');
        if (newsElement) {
            newsElement.innerHTML = '';
            newsElement.appendChild(fragment);
        }
    }
}

export { News, Article };
