import { handlerAuth, logout } from '../../redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

export const Header = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(handlerAuth);
    const userData = useSelector((state) => state.auth.data);

    const onClickLogout = () => {
        dispatch(logout());
        window.localStorage.removeItem('token');
    };

    return (
        <div className={styles.root}>
            <Container maxWidth='lg'>
                <div className={styles.inner}>
                    <Link className={styles.logo} to='/'>
                        <div>{userData?.fullName ? userData.fullName : 'Metaphor Magic'}</div>
                    </Link>
                    <div className={styles.buttons}>
                        {isAuth ? (
                            <>
                                <Link to='/posts/create'>
                                    <Button variant='contained'>
                                        Write an article
                                    </Button>
                                </Link>
                                <Button
                                    onClick={onClickLogout}
                                    variant='contained'
                                    color='error'>
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link to='/login'>
                                    <Button variant='outlined'>Login</Button>
                                </Link>
                                <Link to='/register'>
                                    <Button variant='contained'>Sign Up</Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    );
};
