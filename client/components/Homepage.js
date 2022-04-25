import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getMovies } from '../store';

import { Movies } from './Movies';

export const Homepage = () => {
  return (
    <>
      <Movies />
    </>
  );
};