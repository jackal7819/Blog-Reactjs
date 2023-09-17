import { fetchRegister, handlerAuth } from '../../redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { Navigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import styles from './Login.module.scss';
import { useForm } from 'react-hook-form';

export const Registration = () => {
    const isAuth = useSelector(handlerAuth);
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
        },
        mode: 'onChange',
    });

    const onSubmit = async (values) => {
    try {
        const { payload, error } = await dispatch(fetchRegister(values));

        if (error) {
            setError('email', { message: 'Registration failed' });
        } else if ('token' in payload) {
            window.localStorage.setItem('token', payload.token);
        }
    } catch (error) {
        console.error('Error during registration:', error);
        setError('email', { message: 'An error occurred during registration' });
    }
};

    if (isAuth) {
        return <Navigate to='/' />;
    }

    return (
        <Paper classes={{ root: styles.root }}>
            <Typography classes={{ root: styles.title }} variant='h5'>
                Create Account
            </Typography>
            <div className={styles.avatar}>
                <Avatar sx={{ width: 100, height: 100 }} />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    className={styles.field}
                    label='Full Name'
                    fullWidth
                    error={Boolean(errors.fullName?.message)}
                    helperText={errors.fullName?.message}
                    {...register('fullName', {
                        required: 'Enter your full name',
                    })}
                />
                <TextField
                    className={styles.field}
                    label='E-Mail'
                    fullWidth
                    error={Boolean(errors.email?.message)}
                    helperText={errors.email?.message}
                    {...register('email', {
                        required: 'Enter your email',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address',
                        },
                    })}
                />
                <TextField
                    className={styles.field}
                    label='Password'
                    fullWidth
                    error={Boolean(errors.password?.message)}
                    helperText={errors.password?.message}
                    {...register('password', {
                        required: 'Enter your password',
                    })}
                />
                <Button
                    disabled={!isValid}
                    type='submit'
                    size='large'
                    variant='contained'
                    fullWidth>
                    Sign up
                </Button>
            </form>
        </Paper>
    );
};
