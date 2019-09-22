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
                // appState: SplashScreen.name
                appState: GameBoard.name
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

        created: function () {

            window.addEventListener('keypress', function() {



            });
        }
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
