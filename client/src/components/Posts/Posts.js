import React from "react"
import Post from './Post/Post'
import { useSelector } from "react-redux"
import useStyles from './styles'
import { createTheme } from "@mui/system"
import { ThemeProvider, useTheme } from "@mui/styles"
import {Grid, CircularProgress} from "@mui/material"
const Posts = ({setCurrentId})=>{

    const posts = useSelector((state) => state.posts)

    const classes = useStyles()
    return (
        !posts.length ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing = {3}>
                {
                    posts.map((post) =>(
                        <Grid key = {post._id} item xs={12} sm={6}>
                            <Post post={post} setCurrentId={setCurrentId}/>
                        </Grid>
                    ))
                }
            </Grid>
        )    
    )
}

export default Posts