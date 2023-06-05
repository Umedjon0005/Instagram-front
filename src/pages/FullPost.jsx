import React from "react";
import { useParams } from "react-router-dom";
import { Post } from "../components/Post";
import { CommentItem } from "../components/CommentItem";
import axios from "../axios";
import { useDispatch, useSelector } from "react-redux";
import { createComment, getPostComments } from "../redux/slices/comment";

export const FullPost = () => {
  const [ data, setData ] = React.useState();
  const [ isLoading, setIsLoading ] = React.useState(true);
  const { id } = useParams();
  const userData = useSelector((state) => state.auth.data); 
  const [comment, setComment] = React.useState('')
  const { comments } = useSelector((state) => state.comment)
  const dispatch = useDispatch();
  const params = useParams()
  React.useEffect(() => {
    axios.get(`/posts/${id}`).then(res => {
      setData(res.data);
      setIsLoading(false);
    }).catch((err) => {
      console.warn(err);
      alert('Error with post');
    })
  }, []);

  const handleSubmit = () => {
    try {
        const postId = params.id
        dispatch(createComment({ postId, comment }))
        setComment('')
    } catch (error) {
        console.log(error)
    }
  }
console.log(data);
  const fetchComments = React.useCallback(async () => {
    try {
        dispatch(getPostComments(params.id))
    } catch (error) {
        console.log(error)
    }
  }, [params.id, dispatch])

  React.useEffect(() => {
    fetchComments()
  }, [fetchComments])

  if(isLoading) {
    return <Post isLoading={isLoading} isFullPost/>
  }
  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `${process.env.REACT_APP_API_URL}${data.imageUrl}` : ''}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={data.comments.length}
        isFullPost
      >
        <p>
          {data.text}
        </p>
      </Post>
      <div className='w-1/3 p-8 bg-gray-700 flex flex-col gap-2 rounded-sm'>
      {comments?.map((cmt) => (
          
          <CommentItem key={cmt._id} cmt={cmt} fullName={cmt.author} />
      ))}
          <form
              onSubmit={(e) => e.preventDefault()}
          >
              <input
                  type='text'
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder='Comment'
                  style={{padding:"10px" }}
              />
              <button
              style={{padding:"10px 15px",color:'white',marginLeft:"10px",border:'none2',backgroundColor:"#4361ee" }}
                  type='submit'
                  onClick={handleSubmit}
              >
                  Submit
              </button>
          </form>
            
      </div>
    </>
  );
};
