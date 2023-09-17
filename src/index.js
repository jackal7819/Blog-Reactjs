import './index.scss';

import App from './App';
import CssBaseline from '@mui/material/CssBaseline';
import { Fragment } from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material';
import store from './redux/store';
import { theme } from './theme';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Fragment>
        <CssBaseline />
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <App />
            </Provider>
        </ThemeProvider>
    </Fragment>
);
