<template>
    <div id="app" v-bind:is="appState">
    </div>
</template>

<script>
    import SplashScreen from './components/SplashScreen.vue'
    import GameMenu from './components/GameMenu.vue'
    import GameBoard from './components/GameBoard.vue'

    export default {
        name: 'app',
        components: {
            SplashScreen,
            GameMenu,
            GameBoard,
        },
        data: function () {
            return {
                appState: 'splash-screen'
            }
        },
        methods: {
            displayMenu: function () {
                this.appState = "game-menu"
            },
            displayBoard: function () {
                this.appState = "game-board"
            },
        },
        provide: function () {
            return {
                displayMenu: this.displayMenu,
                displayBoard: this.displayBoard,
            }
        },
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
