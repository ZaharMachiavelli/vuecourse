import { Module } from "vuex";
import { State } from ".";


interface Auto{
    name: string;
}

const autos: Module<Auto, State> = {
    namespaced: true,
    state: {
        name: 'Toyota'
    },
    mutations: {
        changeCar(state: Auto, payload: Auto) {
            state.name = payload.name;
        }
    },
    actions: {
        setCar({commit}, name:string) {
            commit('changeCar', {name: name})
        }
    }
}

export default autos;