import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {auth}  from '../../firebase';
import { getAuth, createUserWithEmailAndPassword, UserCredential } from 'firebase/auth';
import Paper from '@mui/material/Paper';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../contexts/AuthContext';

const styles = {
  // styles moves everything to the top of the page, how to make the contents center?
  paperContainer: {
    backgroundColor: 'white', // change to backgroundImage in the future
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  }
}
function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        CookBook
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme({
    palette: {
      primary: {
        main: '#556cd6',
      },
      secondary: {
        main: '#19857b',
      },
      error: {
        main: '#f44336',
      }
    },
}
);

export default function SignUp() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [checkBoxToggle, setCheckBoxToggle] = React.useState(false);
  const navigate = useNavigate();
  const {signUp} = useAuth();

  // if already logged in...
  if (auth.currentUser) {
    navigate('/dashboard', { replace: true })
  }
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (signUp) {
      signUp(email, password, checkBoxToggle);
      navigate('/dashboard', { replace: true })
    }
  }
  
  

  return (
    <>
      {/*Fill paper to the entire screen dynamically with MUI  */}
      <Paper sx={styles.paperContainer}>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth = 'xs'>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'white',
              borderRadius: '10px',
              padding: '20px',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up with your email address
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 5 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value = {email}
                    onChange = {(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value = {password}
                    onChange = {(e) => setPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox 
                              value="allowExtraEmails"
                              color="primary"
                              checked = {checkBoxToggle}
                              onChange = {(e) => {
                                console.log(checkBoxToggle)
                                setCheckBoxToggle(e.target.checked)
                                }
                              }
                              />}
                    label="I want to receive updates via email."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
      </Paper>
    </>
  );
}