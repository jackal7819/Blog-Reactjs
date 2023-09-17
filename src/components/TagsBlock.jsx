import Grid from '@mui/material/Unstable_Grid2';
import { Link } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { SideBlock } from './SideBlock';
import Skeleton from '@mui/material/Skeleton';
import TagIcon from '@mui/icons-material/Tag';

export const TagsBlock = ({ items, isLoading = true }) => {
    return (
        <SideBlock>
            <Grid container spacing={{ xs: 2, md: 1 }}>
                {(isLoading ? [...Array(4)] : items).map((name, index) => (
                    <Grid key={name ? name : index} xs={6} sm={4} md={3}>
                        <Link
                            style={{ textDecoration: 'none', color: 'black' }}
                            to={`https://www.google.com.ua/search?q=${name}`}
                            target='_blank'
                            rel='noreferrer'>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <TagIcon />
                                    </ListItemIcon>
                                    {isLoading ? (
                                        <Skeleton width={100} />
                                    ) : (
                                        <ListItemText primary={name} />
                                    )}
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </SideBlock>
    );
};
