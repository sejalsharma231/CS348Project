// put all api calls regarding the movies page and its functionalties in here

import Axios from '../Axios';

export const getMovies = () => {
    return Axios().get('/movies');
};

export const searchMovies = (s) => {
    console.log(s)
    return Axios().get(`/movies/search/data?name=${s}`);
};

export const sortMovies = (s, str) => {
    console.log(s)
    return Axios().get(`/movies/sort/data?sort=${s}&search=${str}`);
};

export const filterMovies = (list, s, str) => {
    console.log(list)
    return Axios().get(`/movies/filter/data?list=${list}&sort=${s}&search=${str}`);
};
