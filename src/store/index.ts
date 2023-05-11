import { createStore } from 'vuex';
import autos from './autos';

export interface State{
  post: {
    id: number;
    title: string;
    body: string;
  }
}

export default createStore<State>({
  state: {
    post: {
      id: 101,
      title: 'Global Post',
      body: 'global Post Description'
    }
  },
  getters: {
    getPost(state) {
      return {...state.post, title: 'Global Post Getter'}
    }
  },
  mutations: {
    changePost(state, payload) {
      state.post.id = payload.id
    }
  },
  actions: {
    setId({state, commit}, id) {
      console.log(id);
      commit('changePost', {id: id});
    }
  },
  modules: {
   auto: autos
  }
})
