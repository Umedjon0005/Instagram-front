import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { useSelector, useDispatch } from 'react-redux';
import { Post } from '../components/Post';
import { fetchPosts, fetchTags } from '../redux/slices/posts';
import UserItem from '../components/UserItem';
import { fetchUser } from '../redux/slices/user';

export const Home = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);
  const userData = useSelector((state) => state.auth.data); 
  const isPostsLoading = posts.loading === 'loading';
  const data = useSelector(state => state.user.data);
  const [search, setSearch] = React.useState('');
  
  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchUser());
  }, [])
  
  return (
    <>
        <div className="input" style={{ textAlign: 'center', marginBottom: 20 }}>
          <input type="text" style={{width: 300, height: 30, borderRadius: 15, padding: 18, fontSize: 16}} onChange={(e)=>setSearch(e.target.value)}  placeholder='Search...' />
        </div>
      <Grid container spacing={4}>
        <Grid xs={8} item>
        {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) =>
            isPostsLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              (<Post
                key={index}
                id={obj._id}
                title={obj.title}
                imageUrl={obj.imageUrl ? `${process.env.REACT_APP_API_URL}${obj.imageUrl}` : ''}
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={obj.comments.length}
                isEditable={userData?._id === obj.user?._id}
              />
              )),
          )}
        </Grid>
        <Grid xs={4} item>
            <UserItem all={data} search={search}/>
        </Grid>
      </Grid>
    </>
  );
};
