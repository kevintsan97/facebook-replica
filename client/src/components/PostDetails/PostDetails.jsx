import React, { useEffect } from 'react'
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment'
import { useParams, useNavigate } from 'react-router-dom'
import styles from './styles'
import { getPost, getPostsBySearch } from '../../actions/posts'


const PostDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { posts, post, isLoading } = useSelector((state) => state.posts);
  const history = useNavigate();
  const classes = styles();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id])

  useEffect(()=>{
    if(post){
      dispatch(getPostsBySearch({search: 'none', tags: post?.data.tags.join(',') }))
    }
  },[post])

  if (!post) return;

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>)
  }

  const recommendedPosts = posts.filter(({_id}) => _id !== post.data._id)
  const openPost = (_id) => history(`/posts/${_id}`)

  return (
    <>
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{post.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.data.tags.map((tag) => `#${tag} `)}</Typography>
          <Typography gutterBottom variant="body1" component="p">{post.data.message}</Typography>
          <Typography variant="h6">Created by: {post.data.name}</Typography>
          <Typography variant="body1">{moment(post.data.createdAt).fromNow()}</Typography>
          <hr style={{ backgroundColor: '#eee',margin: '20px 0', border: '0 none', height: '1px' }} ></hr>
          <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
          <hr style={{ backgroundColor: '#eee',margin: '20px 0', border: '0 none', height: '1px' }} ></hr>
          <Typography variant="body1"><strong>Comments - coming soon!</strong></Typography>
          <hr style={{ backgroundColor: '#eee',margin: '20px 0', border: '0 none', height: '1px' }} ></hr>
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={post.data.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
        </div>
      </div>
      {recommendedPosts.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant='h5'>You might also like below posts</Typography>
          <div className={classes.recommendedPosts}>
            {
              recommendedPosts.map(({title, message, name, likes, selectedFile, _id}) =>(
                  <div key={_id} style={{margin: '20px', cursor: "pointer"}} onClick={() =>openPost(_id)}>
                    <Typography gutterBottom variant="h6">{title}</Typography>
                    <Typography gutterBottom variant="subtitle2">{name}</Typography>
                    <Typography gutterBottom variant="subtitle2">{message}</Typography>
                    <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                    <img src={selectedFile} width="200px" height="300px" />
                  </div>
              ))
            }
          </div>
        </div>
      )}
    </Paper>
    </>
    
  )
}

export default PostDetails