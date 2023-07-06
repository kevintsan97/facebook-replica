import React, { useEffect, useState } from "react"
import useStyles from './styles'
import { Card, CardActions, CardContent, CardMedia, Button, Typography,ButtonBase } from '@material-ui/core'

import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import ThumbUpAltOutLine from '@material-ui/icons/ThumbUpAltOutlined'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import moment from 'moment'
import decode from 'jwt-decode'
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { deletePost, likePost } from "../../../actions/posts"
const Post = ({ post, setCurrentId }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('profile'))
    let extractedToken
    if (user?.token)
        extractedToken = decode(user.token)

    const Likes = () => {
        if (post.likes.length > 0 && user?.token) {
            return post.likes.find((like) => like === (extractedToken?.id || extractedToken?.sub))
                ? (
                    <>
                        <ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}</>
                )
                : (
                    <><ThumbUpAltOutLine fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
                )
        }
        return <><ThumbUpAltOutLine fontSize="small" /> &nbsp;Like</>
    }

    const openPost = () => {
        navigate(`/posts/${post._id}`)
    }

    return (
        <Card className={classes.card} raised elevation={6} onClick={openPost} >
            {/* <ButtonBase className={classes.cardAction} onClick={openPost}> */}
                <CardMedia className={classes.media} image={post.selectedFile} title={post.title} component="div" />
                <div className={classes.overlay}>
                    <Typography variant="h6">{post.name}</Typography>
                    <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
                </div>

                {
                    (extractedToken?.id === post?.creator || extractedToken?.sub === post.creator) &&
                    <div className={classes.overlay2}>
                        {/* <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(post._id)}>
                            <MoreHorizIcon fontSize='medium' />
                        </Button> */}
                    </div>
                }

                <div className={classes.details}>
                    <Typography variant='body2' color='textSecondary'>{post.tags.map((tag) => `#${tag} `)}</Typography>
                </div>

                <Typography className={classes.title} variant='h5' gutterBottom>{post.title}</Typography>

                <CardContent>
                    <Typography className={classes.title} variant='body2' color="textSecondary" gutterBottom>{post.message}</Typography>
                </CardContent>
            {/* </ButtonBase> */}
            <CardActions className={classes.cardActions}>

                <Button size="small" color="primary" disabled={!user?.token} onClick={() => { dispatch(likePost(post._id)) }}>
                    <Likes />
                </Button>

                {
                    (extractedToken?.id === post?.creator || extractedToken?.sub === post.creator) &&
                    <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
                        <DeleteIcon fontSize="small" />
                        Delete
                    </Button>
                }

            </CardActions>
        </Card>
    )
}

export default Post