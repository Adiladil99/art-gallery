import { createStore } from 'vuex'

export default createStore({
  state: {
    favourites: JSON.parse(localStorage.getItem("favourites"))  || []
  },
  getters: {
    getFavourites:(state) => state.favourites
  },
  mutations: {
    addFavourires(state, value) {
      console.log(value);
      if (!state.favourites.some((i) => i.id === value.id)) {
        state.favourites.push({
          id: value.id,
          image: value.urls.small
        });
      } 
      localStorage.setItem("favourites", JSON.stringify(state.favourites));
    },
    removeFavourires(state, id) {
      state.favourites = state.favourites.filter(i => i.id !== id)
      localStorage.setItem("favourites", JSON.stringify(state.favourites));
    }
  }
})
