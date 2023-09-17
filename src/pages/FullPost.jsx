import { useEffect, useState } from 'react';

import { Post } from '../components/Post';
import ReactMarkdown from 'react-markdown';
import axios from '../axios';
import { useParams } from 'react-router-dom';

export const FullPost = () => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/posts/${id}`);

                setData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error when receiving an article');
            }
        };

        fetchData();
    }, [id]);

    if (loading) {
        return <Post isLoading={loading} isFullPost />;
    }

    return (
        <>
            <Post
                _id={data._id}
                key={data._id}
                title={data.title}
                imageUrl={
                    data.imageUrl ? `${process.env.REACT_APP_API_URL}${data.imageUrl}` : ''
                }
                user={data.user}
                createdAt={new Date(data.createdAt).toLocaleString()}
                viewsCount={data.viewsCount}
                tags={data.tags}
                isEditable
                isFullPost>
                <ReactMarkdown children={data.text} />
            </Post>
        </>
    );
};
