import React, { useEffect, useState } from 'react'
import { AppBar, Avatar, Toolbar, Typography, Button } from '@material-ui/core'
import useStyles from './styles'
import memoriesText from '../../images/memories-Text.png'
import decode from 'jwt-decode'
import * as actions from '../../constants/actionTypes'
import { useNavigate, useLocation} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Container, Grow, Grid} from '@material-ui/core'

const Navbar = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

    let userData
    if (user?.result)
        userData = user.result
    else if (user?.token)
        userData = decode(user.token)



    const logOut = () => {
        dispatch({ type: actions.LOGOUT })

        //  navigate('/auth')  

        setUser(null)
    }

    useEffect(() => {
        const token = user?.token
        if (token) {

            const decodedToken = decode(token)
            if (decodedToken.exp * 1000 < new Date().getTime())
                logOut()
        }

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])


    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid container justifyContent="space-between" alignItems="stretch" spacing={5} className={classes.gridContainer}>
                    <Grid item xs={12} sm={8}>
                        <AppBar className={classes.appBar} position="static" color="inherit">
                            <div onClick={() => { navigate("/") }} className={classes.brandContainer}>
                                <img src={memoriesText} className={classes.memoriesText} height="45px" alt="icon" />
                            </div>
                            <Toolbar className={classes.toolbar}>
                                {user ? (
                                    <div className={classes.profile}>
                                        <Avatar className={classes.purple} alt={userData.name} src={userData.picture}>
                                            {userData.name.charAt(0)}</Avatar>
                                        <Typography className={classes.userName} variant="h6">{userData.name}</Typography>
                                        <Button variant="contained" className={classes.btnLogOut} color="secondary" onClick={logOut} href="/auth">Logout</Button>
                                    </div>
                                )
                                    :
                                    (
                                        <Button className={classes.btn} variant="contained" color="primary" href="/auth">Sign In</Button>
                                    )}
                            </Toolbar>
                        </AppBar>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Navbar




