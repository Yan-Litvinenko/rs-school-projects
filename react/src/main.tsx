import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import ResultList from './components/resultList/ResultList.tsx';
import Details from './components/details/Details.tsx';
import NotFound from './components/notFound/NotFound.tsx';
import SelectACharacter from './components/selectACharacter/SelectACharacter.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.scss';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: 'page/:idPage',
                element: (
                    <>
                        <ResultList />
                        <SelectACharacter />
                    </>
                ),
            },
            {
                path: 'page/:idPage/detail/:name',
                element: (
                    <>
                        <ResultList />
                        <Details />
                    </>
                ),
            },
            {
                path: '*',
                element: <NotFound />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router}></RouterProvider>
    </React.StrictMode>,
);
