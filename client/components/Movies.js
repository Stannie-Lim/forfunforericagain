import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { Card, CardActions, CardContent, CardActionArea, Typography, Button, Grid, CardMedia } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

import { getMovies, addToFavorite } from '../store';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    height: '100%',
  },
});

export const Movies = () => {
  const [page, setPage] = useState(0);

  const dispatch = useDispatch();
  const classes = useStyles();

  const { movies, userId } = useSelector(({ movies, auth }) => ({ movies, userId: auth.id, }));

  const isLoggedIn = !!userId;

  useEffect(() => {
    dispatch(getMovies(page));
  }, [page]);

  const onClick = (movieId) => {
    dispatch(addToFavorite(movieId, userId));
  };

  return (
    <>

      <Grid container spacing={3} style={{ padding: '2rem' }}>
        <Grid container item justifyContent="center">
          <Grid item>
            <Pagination count={movies.count} value= {page} onChange={(_, page) => setPage(page)} color="primary" />
          </Grid>
        </Grid>
        {movies.rows.map(({ name, id, overview, releaseDate, voteAverage, imageUrl }) => (
          <Grid item xs={6} sm={4} md={3} key={id}>
            <Card className={classes.root}>
              <CardMedia
                component="img"
                alt={name}
                height="400"
                image={imageUrl}
                title={name}
              />
              <CardActionArea>
                <CardContent  style={{ height: '400px', overflowX: 'scroll', }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {overview}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Link to={`/movies/${id}`} style={{ textDecoration: 'none', }}>
                  <Button size="small" color="primary">
                    Learn More
                  </Button>
                </Link>
                { isLoggedIn && (
                  <Button size="small" color="primary" onClick={() => onClick(id)}>
                    Add To Favorite
                  </Button>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};