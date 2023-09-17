import DeleteConfirmationDialog from '../DeleteConfirmationDialog';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import { PostSkeleton } from './Skeleton';
import { UserInfo } from '../UserInfo';
import clsx from 'clsx';
import { fetchRemovePost } from '../../redux/postsSlice';
import styles from './Post.module.scss';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

export const Post = ({
    _id,
    title,
    createdAt,
    imageUrl,
    user,
    viewsCount,
    tags,
    children,
    isFullPost,
    isLoading,
    isEditable,
}) => {
    const dispatch = useDispatch();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    if (isLoading) {
        return <PostSkeleton />;
    }

    const handleOpenDeleteDialog = () => {
        setDeleteDialogOpen(true);
    };

    const handleCloseDeleteDialog = () => {
        setDeleteDialogOpen(false);
    };

    const handleConfirmDelete = () => {
        dispatch(fetchRemovePost(_id));
        setDeleteDialogOpen(false);
    };

    return (
        <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
            {isEditable && (
                <div className={styles.editButtons}>
                    <Link to={`/posts/${_id}/edit`}>
                        <IconButton color='primary'>
                            <EditIcon />
                        </IconButton>
                    </Link>
                    <IconButton
                        onClick={handleOpenDeleteDialog}
                        color='secondary'>
                        <DeleteIcon />
                    </IconButton>
                </div>
            )}
            {imageUrl && (
                <img
                    className={clsx(styles.image, {
                        [styles.imageFull]: isFullPost,
                    })}
                    src={imageUrl}
                    alt={title}
                />
            )}
            <div className={styles.wrapper}>
                <UserInfo {...user} additionalText={createdAt} />
                <div className={styles.indention}>
                    <h2
                        className={clsx(styles.title, {
                            [styles.titleFull]: isFullPost,
                        })}>
                        {isFullPost ? (
                            title
                        ) : (
                            <Link to={`/posts/${_id}`}>{title}</Link>
                        )}
                    </h2>
                    <ul className={styles.tags}>
                        {tags.map((name) => (
                            <li key={name}>
                                <Link
                                    to={`https://www.google.com.ua/search?q=${name}`}
                                    target='_blank'
                                    rel='noreferrer'>
                                    #{name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    {children && (
                        <div className={styles.content}>{children}</div>
                    )}
                    <ul className={styles.postDetails}>
                        <li>
                            <EyeIcon />
                            <span>{viewsCount}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <DeleteConfirmationDialog
                open={deleteDialogOpen}
                onClose={handleCloseDeleteDialog}
                onConfirm={handleConfirmDelete}
            />
        </div>
    );
};
