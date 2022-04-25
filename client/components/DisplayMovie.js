import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Paper, Typography, Button, Grid } from '@material-ui/core';

import { removeFavorite } from '../store';

export const DisplayMovie = ({ movie, removeButton }) => {
  const userId = useSelector(({ auth }) => auth.id);

  const dispatch = useDispatch();
  const onClick = () => {
    const { id: movieId } = movie;
    dispatch(removeFavorite(movieId, userId));
  };

  return (
    <Grid container style={{ width: '50%', textAlign: 'center' }}>
      <Paper>
        <Grid item>
          <Typography variant="h5">{movie.name}</Typography>
        </Grid>
        <Grid item>
          <img src={movie.imageUrl} style={{ height: '400px' }} />
        </Grid>
        <Grid item>
          <Typography variant="caption">{movie.overview}</Typography>
        </Grid>
        <Grid item>
          {removeButton && <Button onClick={onClick} variant='outlined' color='primary'>Remove from favorite</Button>}
        </Grid>
      </Paper>
    </Grid>
  );
};