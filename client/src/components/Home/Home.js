import React, {useState, useEffect} from 'react'
import { Container, Grow, Grid, Paper } from '@material-ui/core'
import { getPosts } from '../../actions/posts'
import { useDispatch } from 'react-redux'
import Posts from '../Posts/Posts'
import Form from '../Form/Form'
import Pagination from '../Pagination'
 import useStyles from './styles'

 const Home = () => {
    const classes = useStyles()
    const [currentId, setCurrentId] = useState(null)
    const dispatch = useDispatch()

    useEffect(
        () => { dispatch(getPosts()) }, [currentId, dispatch]
    )
    return (
        <Grow in>
            <Container>
                <Grid className={classes.mainContainer} container justifyContent="space-between" alignItems="stretch" spacing={5}>
                    <Grid item xs={12} sm={8}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={4} >
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        <Paper elevation={6} >
                            <Pagination />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}
export default Home
