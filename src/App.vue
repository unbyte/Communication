<template>
    <div id="app">
        <Inputs/>
        <Graph/>
    </div>
</template>

<script>
    import Graph from "./components/Graph";
    import Inputs from "./components/Inputs";

    export default {
        name: 'App',
        components: {Inputs, Graph},
        data() {
            return {}
        },
        methods: {},
        mounted() {
        }
    }
</script>

<style lang="less">
    #app {
        display: flex;

        flex-direction: column;

        align-items: center;

        user-select: none;
    }
</style>
