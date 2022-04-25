import React from 'react';
import { useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';

import { DisplayMovie } from './DisplayMovie';

export const Favorites = () => {
  const me = useSelector(({ auth }) => auth);

  return (
    <Grid container spacing={3}>
      {me.movies.map(movie => (
        <Grid item xs={6} sm={4} md={3} >
          <DisplayMovie movie={movie} removeButton />
        </Grid>
      ))}
    </Grid>
  );
};