import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import {logout} from '../store'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    color: 'white',
    textDecoration: 'none',
  },
}));

export default function NavBar() {
  const classes = useStyles();

  const isLoggedIn = useSelector(({ auth }) => !!auth.id);
  const dispatch = useDispatch();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Link className={classes.link} to='/'>Movies for Eric</Link>
          </Typography>
          {
            isLoggedIn ? (
              <>
                <Button color="inherit">
                  <Link to='/favorites' className={classes.link}>
                    My Favorites
                  </Link>
                </Button>
                <Button color="inherit" onClick={() => dispatch(logout())}>
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Button color="inherit">
                  <Link to='/login' className={classes.link}>Login</Link>
                </Button>
                <Button color="inherit">
                  <Link to='/signup' className={classes.link}>Sign up</Link>
                </Button>
              </>
            )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

// const Navbar = ({handleClick, isLoggedIn}) => (
//   <div>
//     {/* <nav>
//       {isLoggedIn ? (
//         <div>
//           <Link to="/home">Home</Link>
//           <a href="#" onClick={handleClick}>
//             Logout
//           </a>
//         </div>
//       ) : (
//         <div>
//           <Link to="/login">Login</Link>
//           <Link to="/signup">Sign Up</Link>
//         </div>
//       )}
//     </nav>
//     <hr /> */}
//   </div>
// )
