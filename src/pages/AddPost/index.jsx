import 'easymde/dist/easymde.min.css';

import { Fragment, useCallback, useEffect } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { useMemo, useRef, useState } from 'react';

import Button from '@mui/material/Button';
import MuiAlert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';
import SimpleMDE from 'react-simplemde-editor';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import axios from '../../axios';
import { handlerAuth } from '../../redux/authSlice';
import styles from './AddPost.module.scss';
import { useSelector } from 'react-redux';

export const AddPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isAuth = useSelector(handlerAuth);
    const [isLoading, setIsLoading] = useState(false);
    const inputFileRef = useRef(null);
    const [text, setText] = useState('');
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [error, setError] = useState(null);

    const isEditing = Boolean(id);

    const handleChangeFile = async (event) => {
        try {
            const formData = new FormData();
            const file = event.target.files[0];
            formData.append('image', file);
            const { data } = await axios.post('/upload', formData);
            setImageUrl(data.url);
        } catch (error) {
            setError('Error uploading image. Please try again.');
        }
    };

    const onClickRemoveImage = () => {
        setImageUrl('');
    };

    const onChange = useCallback((value) => {
        setText(value);
    }, []);

    const onSubmit = async () => {
        try {
            setIsLoading(true);
            const fields = { title, tags: tags.split(','), text, imageUrl };
            const { data } = isEditing
                ? await axios.patch(`/posts/${id}`, fields)
                : await axios.post('/posts', fields);
            const _id = isEditing ? id : data._id;
            navigate(`/posts/${_id}`);
        } catch (error) {
            setError('Error creating post. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                try {
                    setIsLoading(true);
                    const { data } = await axios.get(`/posts/${id}`);
                    setTitle(data.title);
                    setTags(data.tags.join(','));
                    setText(data.text);
                    setImageUrl(data.imageUrl);
                } catch (error) {
                    setError('Error receiving post. Please try again.');
                    console.log(error);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchData();
        }
    }, [id]);

    const options = useMemo(
        () => ({
            spellChecker: false,
            maxHeight: '400px',
            autofocus: true,
            placeholder: 'Enter text...',
            status: false,
            autosave: {
                enabled: true,
                uniqueId: 'uniqueId',
                delay: 1000,
            },
        }),
        []
    );

    if (!window.localStorage.getItem('token') && !isAuth) {
        return <Navigate to='/' />;
    }

    return (
        <Paper style={{ padding: 30, marginBottom: 30 }}>
            <Button
                onClick={() => inputFileRef.current.click()}
                style={{ marginRight: 30 }}
                variant='outlined'
                size='large'>
                Download preview
            </Button>
            <input
                type='file'
                ref={inputFileRef}
                onChange={handleChangeFile}
                hidden
            />
            {imageUrl && (
                <Fragment>
                    <Button
                        variant='contained'
                        color='error'
                        onClick={onClickRemoveImage}>
                        Delete
                    </Button>
                    <img
                        className={styles.image}
                        src={`${process.env.REACT_APP_API_URL}${imageUrl}`}
                        alt='Uploaded'
                    />
                </Fragment>
            )}
            <br />
            <br />
            <TextField
                classes={{ root: styles.title }}
                variant='standard'
                placeholder='Article title...'
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                fullWidth
            />
            <TextField
                classes={{ root: styles.tags }}
                variant='standard'
                placeholder='Tags'
                value={tags}
                onChange={(event) => setTags(event.target.value)}
                fullWidth
            />
            <SimpleMDE
                className={styles.editor}
                value={text}
                onChange={onChange}
                options={options}
            />
            <div className={styles.buttons}>
                <Button
                    onClick={onSubmit}
                    size='large'
                    variant='contained'
                    disabled={isLoading}>
                    {isLoading
                        ? 'Loading...'
                        : isEditing
                        ? 'Save Changes'
                        : 'Post'}
                </Button>
                <Link to='/'>
                    <Button size='large'>Cancel</Button>
                </Link>
            </div>
            <Snackbar
                open={!!error}
                autoHideDuration={6000}
                onClose={() => setError(null)}>
                <MuiAlert
                    elevation={6}
                    variant='filled'
                    onClose={() => setError(null)}
                    severity='error'>
                    {error}
                </MuiAlert>
            </Snackbar>
        </Paper>
    );
};
