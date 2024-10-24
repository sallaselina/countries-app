import { createSlice } from "@reduxjs/toolkit";
import {
  addFavouriteToFirebase,
  auth,
  db,
  clearFavouritesFromFirebase,
} from "../auth/firebase";
import { collection, query, getDocs } from "firebase/firestore";
import Swal from "sweetalert2";

const initialState = {
  favourites: [],
  isLoading: true,
};

export const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    addFavourite(state, action) {
      state.favourites = [...state.favourites, action.payload];
      const user = auth.currentUser;
      if (user) {
        addFavouriteToFirebase(user.uid, action.payload);
      }
    },
    clearFavourites(state) {
      const user = auth.currentUser;
      if (user) {
        clearFavouritesFromFirebase(user.uid);
      }
      state.favourites = [];
    },
    removeFavourite(state, action) {
      state.favourites = state.favourites.filter(
        (favourite) => favourite !== action.payload
      );
      Swal.fire({
        title: "Alert",
        text: "Are you sure you want to remove favourite?",
        icon: "warning",
        confirmButtonText: "Yes",
      });
    },
    getFavourites(state, action) {
      state.favourites = action.payload;
    },
    isLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const getFavouritesFromSource = () => async (dispatch) => {
  const user = auth.currentUser;
  if (user) {
    const q = query(collection(db, `users/${user.uid}/favourites`));
    const querySnapshot = await getDocs(q);
    const favourites = querySnapshot.docs.map((doc) => doc.data().name);
    dispatch(getFavourites(favourites));
    dispatch(isLoading(false));
  }
};
export const {
  addFavourite,
  clearFavourites,
  removeFavourite,
  getFavourites,
  isLoading,
} = favouritesSlice.actions;
export default favouritesSlice.reducer;
