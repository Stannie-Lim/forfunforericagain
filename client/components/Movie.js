import axios from 'axios';
import React, { useState, useEffect } from 'react';

import { DisplayMovie } from './DisplayMovie';

import { CircularProgress } from '@material-ui/core';

export const Movie = ({ match }) => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const getMovie = async () => {
      const { id } = match.params;
      setMovie((await axios.get(`/api/movies/id/${id}`)).data);
    };

    getMovie();
  }, []);

  if (!movie) return <CircularProgress />;

  return (
    <DisplayMovie movie={movie} />
  );
};