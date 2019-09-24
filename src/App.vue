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
                appState: SplashScreen.name
            }
        },
        methods: {
            displayMenu: function () {
                this.appState = GameMenu.name
            },
            displayBoard: function () {
                this.appState = GameBoard.name
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
    body, html {
        height:100%;
        padding:0;
        margin:0;
    }

    h1, h2, h3, h4, h5, h6 {
        padding: 0 20px;
    }

    #app {
        font-family: 'Press Start 2P', monospace;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        max-width:100%;
        margin: 0 auto;

        display:flex;
        height:100%;
        flex-direction: column;
        align-items: center;
    }

    input[type='text'] {
        padding: 10.5px;
        font-family: 'Press Start 2P', monospace;
        margin-bottom: 10px;
        margin-right: 5px;
        width: 220px;
        text-align: center;
    }

    button {
        font-family: 'Press Start 2P', monospace;
        background: black;
        color: white;
        padding: 10px;
        border: 1px solid white;
        outline: 1px solid black;
        cursor: pointer;
    }
</style>
