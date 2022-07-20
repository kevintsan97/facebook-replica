import React,{useState} from 'react'
import {Avatar, Button, Paper, Grid, Container, Typography, TextField} from '@material-ui/core'
import { GoogleLogin, GoogleOAuthProvider, hasGrantedAllScopesGoogle } from '@react-oauth/google'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import decode from 'jwt-decode'
import useStyles from './styles'
import Input from './Input'
import Icon from './icon'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {signin, signup} from '../../actions/auth'
const initState = {firstName:'', lastName: '', email: '', password:'', confirmPassword: ''}
const Auth = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleShowPassword = () => setShowPassword((prevShowPassword)=> !prevShowPassword)

    const [isSignUp, setIsSignUp] = useState(false)
    const [showPassword, setShowPassword]  = useState(false)
    const [formData, setFormData] = useState(initState)

    const handleSubmit = (e)=>{
        e.preventDefault()
        if(isSignUp){
            dispatch(signup(formData, navigate))
        }
        else{
            dispatch(signin(formData, navigate))

        }
    }

    const handleChange = (e) =>{
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp)
        handleShowPassword(false)
    }

    const googleSuccess  = async (res) =>{
        const token = res ?.credential
        try{
            dispatch({type: 'AUTH', data:{token}})

            navigate('/')
        }
        catch(err){
            console.log(err)
        }
    }
  
    const googleFailure = (err) =>{
        console.log(err)
        console.log("Google Sign In was unsuccessful")
    }
 
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant='h5'>{(isSignUp)? 'Sign Up' :'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing ={2}>
                        {
                            isSignUp &&(
                                <>                      
                                    <Input  name="firstName" label= "First Name" handleChange={handleChange} autoFocus half />                    
                                    <Input  name="lastName" label= "Last Name" handleChange={handleChange} half />
                                </>
                            )
                        }
                        <Input name='email' label= 'Email Address' handleChange={handleChange} type='email' />
                        <Input name='password' label = 'Password' handleChange={handleChange} type={showPassword ? "text" : "password"}  handleShowPassword = {handleShowPassword} />
                        { isSignUp && <Input name="confirmPassword" label = "Repeat Password" handleChange= {handleChange} type="password" /> }
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignUp ? 'Sign Up':'Sign In'}
                    </Button>
                    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_KEY} >
                        
                        <GoogleLogin 
                            // clientId='198900657819-f4ou39hlsbch2rhab6dmohja7d9umqa5.apps.googleusercontent.com'                         
                            // render={(renderProps) =>(
                            //     <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled = {renderProps.disabled} startIcon={<Icon />} variant="contained">Google Sign In</Button>
                            // )}
                            
                            onSuccess={googleSuccess}
                            onFailure={googleFailure}
                            cookiePolicy="single_host_origin"
                        />

                  </GoogleOAuthProvider>
                   
                    
                   

                    <Grid container justifyContent='flex-start'>
                        <Grid item>
                            <Button onClick={switchMode}>
                                { isSignUp ? 'Already have an account? Sign In': "Don't have an account? Sign Up"}
                             
                            </Button>
                        </Grid>

                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}
export default Auth