import React from 'react';
import './userPage.scss';
import axios from '../axios';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { Post } from '../components/Post';
import { useSelector } from 'react-redux';

const UserPage = () => {
    const { id } = useParams(); 
    const [userInfo, setUserInfo] = React.useState([]);
    const [showFollow, setShowFollow] = React.useState(true);
    const { posts } = useSelector((state) => state.posts);
    const userData = useSelector((state) => state.auth.data); 
    const isPostsLoading = posts.loading === 'loading';
    const [userPost, setUserPost] = React.useState([]);


    const getFollow = async () => {
      try {
        const { data } = await axios.put(`/follow/${id}`, {followId: userInfo._id},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
      }
      })
      
      setShowFollow(false);
      return data;
      } catch (e) {
        console.log(e);
      }
    }

    const getUnFollow = async () => {
      try {
        const { data } = await axios.put(`/unfollow/${id}`, {unfollowId: userInfo._id},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
      }
      })
      
      setShowFollow(true);
      return data;
      } catch (e) {
        console.log(e);
      }
    }

    const getUser = React.useCallback(async () => {
      try {
        const { data } = await axios.get(`/oneUser/${id}`);
        setUserInfo(data);
      } catch (e) {
        console.log(e);
      }
    }, []);

    const fetchMyPosts = async () => {
      try {
        const { data } = await axios.get(`/auth/posts/user/me/${id}`)
        setUserPost(data);
      } catch (err) {
        console.log(err);
      }
    }
 
    React.useEffect(() => {
        getUser()
        fetchMyPosts();
    }, []);

  return (
    <div className='main__page'>
        <div className="userPage">
            <img src="/noavatar.png" alt="" />
            <div>
                <p className='userPage__name'>{userInfo.fullName}</p>
                {
                  userData?._id === userInfo?._id ? 
                    <Link to={`/user/${id}/edit`}>
                      <button className='userPage__btn'>Edit profile</button>
                    </Link> : ''
                }
                <div>
                    <span className="userPage__info">post {userInfo.posts ? userInfo.posts.length : 0}</span>
                    <span className="userPage__info">followers {userInfo.followers?.length}</span>
                    <span className="userPage__info">following {userInfo.following?.length}</span>
                    {
                      showFollow ? 
                      userData?._id !== userInfo?._id ? <button type='submit' onClick={getFollow} className="userPage__btn">follow</button> : ''
                      :
                      userData?._id !== userInfo?._id ? <button type='submit' onClick={getUnFollow} className="uuserPage__btn">unfollow</button> : ''
                    }
                </div>
            </div>
        </div>
        <hr />

        {
          userInfo?.posts?.length >= 1 ? 
          <Grid xs={8} item>
        {
           userPost.map((obj, index) =>
            <Post
            key={index}
            id={obj?._id}
            title={obj?.title}
            imageUrl={obj?.imageUrl ? `http://localhost:4444${obj?.imageUrl}` : ''}
            user={obj?.user}
            createdAt={obj?.createdAt}
            viewsCount={obj?.viewsCount}
            commentsCount={obj?.comments.length}
            tags={obj?.tags}
            isEditable={userData?._id === id}
          />
           )
        }
        </Grid>
        :
        <div className='no-posts'>No Posts</div>
        }
    </div>
  )
} 

export default UserPage;
//userData?._id === obj.user._id
