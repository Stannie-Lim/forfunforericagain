import axios from 'axios';

export const getMovies = (page = 1) => {
  return async dispatch => {
    const { data: movies } = await axios.get(`/api/movies/${page}`);
    dispatch({
      type: 'GET_MOVIES',
      movies,
    });
  };
};

export const addToFavorite = (movieId, userId) => {
  return async dispatch => {
    const { data } = await axios.post(`/api/movies/favorite/${movieId}/${userId}`);
    dispatch({
      type: 'SET_AUTH',
      auth: data,
    });
  };
};

export const removeFavorite = (movieId, userId) => {
  return async dispatch => {
    const { data } = await axios.delete(`/api/movies/favorite/${movieId}/${userId}`);
    dispatch({
      type: 'SET_AUTH',
      auth: data,
    });
  };
};

export default function(state = { count: 0, rows: [] }, action) {
  switch (action.type) {
    case 'GET_MOVIES':
      return action.movies;
    default:
      return state;
  };
};