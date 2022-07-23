import React, {useEffect, useState} from 'react'
import { AppBar, Avatar, Toolbar, Typography, Button,Link  } from '@material-ui/core'
import useStyles from './styles'
import memories from '../../images/memories.png'
import decode from 'jwt-decode'
import * as actions from '../../constants/actionTypes'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const Navbar = () =>{
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')))

    let userData
    if(user?.result)
        userData = user.result
    else if(user?.token)
        userData = decode(user.token)


    
    const logOut= () =>{
        dispatch({type: actions.LOGOUT})

      //  navigate('/auth')  

        setUser(null)
    }

    useEffect(() =>{
        const token = user?.token
        if(token)
        {
            
           const decodedToken  = decode(token)
            if(decodedToken.exp * 1000 < new Date().getTime())
                logOut()
        }

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location]   )

    
    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component ={Link} href ='/' className={classes.heading} variant="h2" align="center"> Memories</Typography>
                <img className={classes.image} src={memories} height="60" />
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={userData.name} src={userData.picture}>
                            {userData.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{userData.name}</Typography>
                        <Button variant ="contained" className={classes.logout} color="secondary" onClick={logOut} href="/auth">Logout</Button>
                    </div>
                )                 
                : 
                (
                        <Button variant="contained" color="primary" href="/auth">Sign In</Button>
                        //<Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                     
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar




