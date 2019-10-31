import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        wave: '',
        waveSeries: [],
        selectedMethod: 'HDB3'
    },
    mutations: {
        setWave(state, newWave) {
            state.wave = newWave;
            state.waveSeries = !!newWave ? newWave.split(',').map(i => parseInt(i)) : [];
        },
        setSelectedMethod(state, newMethod) {
            state.selectedMethod = newMethod;
        }
    },
    actions: {},
    modules: {}
});
