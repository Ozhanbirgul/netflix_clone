import axios from "axios";
import { options } from "../../constant";
import { ActionTypes } from "./../actionTypes";

// bütün isteklerin baseUrl 'ini tanımlama
axios.defaults.baseURL = "https://api.themoviedb.org/3";

// popüler filmleri getir ve store a aktar.
export const getPopular = () => (dispatch) => {
    // reducer'a yüklemenin başladığına haber ver
    dispatch({
        type: ActionTypes.SET_MOVIES_LOADING,
    });

  axios
    .get("/movie/popular?language=tr", options)
    // olumlu olursa reducer'a veriyi gönder
    .then((res) =>
      dispatch({
        type: ActionTypes.SET_MOVIES,
        payload: res.data.results,
      })
    )
    // olumsuz olursa reducer'a hatayı gönder
    .catch((err) => {
      dispatch({
        type: ActionTypes.SET_MOVIES_ERROR,
        payload: err.message,
      });
    });
};

// kategorileri al ve store'a aktar
export const getGenres = () => (dispatch) => {
dispatch({type: ActionTypes.SET_GENRES_LOADING});


  axios.get('/genre/movie/list?language=tr' , options).then((res) => {
    dispatch({type: ActionTypes.SET_GENRES,
      payload: res.data.genres,
    })
  })
  .catch(err => dispatch({
    type:ActionTypes.SET_GENRES_ERROR,
    payload:err.message,
  })
  );
};
