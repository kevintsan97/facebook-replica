import React, {useEffect, useState} from 'react'
import { AppBar, Avatar, Toolbar, Typography, Button, Link } from '@material-ui/core'
import useStyles from './styles'
import memories from '../../images/memories.png'
import decode from 'jwt-decode'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
//import {Link} from 'react-router-dom'
const Navbar = () =>{
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('token')))
    const userData = (user?.token) ? decode(user.token) : null

    const logOut= () =>{
        dispatch({type:'LOGOUT'})
        navigate('/')
        setUser(null)
    }
    useEffect(() =>{
        const token = user?.token
        setUser(JSON.parse(localStorage.getItem('token')))
    }, [location]   )

    
    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component ={Link} to ='/' className={classes.heading} variant="h2" align="center"> Memories</Typography>
                <img className={classes.image} src={memories} height="60" />
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={userData.name} src={userData.picture}>
                            {userData.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{userData.name}</Typography>
                        <Button variant ="contained" className={classes.logout} color="secondary" onClick={logOut}>Logout</Button>
                    </div>
                )                 
                : 
                (
                        <Button variant="contained" color="primary"><Link href="/auth" color="inherit">Sign In</Link></Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar