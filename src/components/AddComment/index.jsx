import React from "react";
import { useParams } from "react-router-dom";
import styles from "./AddComment.module.scss";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { createComment, getPostComments } from "../../redux/slices/comment";

export const Index = ({ cmt }) => {
  //const avatar = cmt.comment.trim().toUpperCase().split('').slice(0, 2)
  const [comment, setComment] = React.useState('')
  const { comments } = useSelector((state) => state.comment)
  const dispatch = useDispatch();
  const params = useParams()

  const handleSubmit = () => {
    try {
        const postId = params.id
        dispatch(createComment({ postId, comment }))
        setComment('')
    } catch (error) {
        console.log(error)
    }
  }

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

  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src=''
        />
        <div className={styles.form}>
          <form onSubmit={(e) => e.preventDefault()}>
            <TextField
              label="Написать комментарий"
              variant="outlined"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              maxRows={10}
              multiline
              fullWidth
            />
            <Button onClick={handleSubmit} variant="contained">Submit</Button>
          </form>
        </div>
      </div>
    </>
  );
};
