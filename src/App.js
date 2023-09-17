import { AddPost, FullPost, Home, Login, Registration } from './pages';
import { Fragment, useEffect } from 'react';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Container } from '@mui/material';
import { Header } from './components/Header';
import { fetchAuthMe } from './redux/authSlice';
import { useDispatch } from 'react-redux';

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <Fragment>
                <Header />
                <Container maxWidth='lg'>
                    <Outlet />
                </Container>
            </Fragment>
        ),
        children: [
            { index: true, element: <Home /> },
            { path: 'posts/:id', element: <FullPost /> },
            { path: 'posts/:id/edit', element: <AddPost /> },
            { path: 'posts/create', element: <AddPost /> },
            { path: 'login', element: <Login /> },
            { path: 'register', element: <Registration /> },
        ],
    },
]);

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAuthMe())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return <RouterProvider router={router} />;
};

export default App;
