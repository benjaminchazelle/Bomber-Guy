<template>
    <div class="hello">
        <h1>Menu</h1>

        <h3>Enter your pseudo</h3>
        <input title="" type="text" v-model="pseudo"/>



        <button v-on:click="joinGame(null)">Play</button>

        <div class="divider"></div>

        <div v-for="(game, gameId) in games" v-bind:key="gameId">

            <p>
            <b>Game #{{gameId}}</b>
            </p>
            <p>Player<span v-if="game.players.length > 1">s</span>:
                {{game.players.join(', ')}}
            </p>

            <p>
            <i v-if="game.hasStarted">This game has already started</i>
            <i v-else>This game has not yet started</i>
            </p>

            <p>
            <button v-on:click="joinGame(gameId)">Join</button>
            </p>
            <div class="divider"></div>
        </div>
    </div>
</template>

<script>

    function generatePseudo() {

        let adjectives = [
            'Great',
            'Bad',
            'Best',
            'New',
            'First',
            'Nice',
            'Hot',
            'Cold',
            'High',
            'Low',
            'Big',
            'Sharp',
            'Happy',
            'Enthusiastic',
            'Empowered',
            'Playful',
            'Lucky',
            'Amazed',
            'Strong',
            'Clever',
            'Mysterious',
            'Gold',
            'Black',
            'Silver',
        ];

        let animals = [
            'Monkey',
            'Carp',
            'Parrot',
            'Cow',
            'Scorpion',
            'Tiger',
            'Worm',
            'Bear',
            'Fox',
            'Cat',
            'Lion',
            'Koala',
            'Panda',
            'Ara',
            'Wolf',
            'Bird',
            'Lizard',
            'Bat',
        ];

        return    adjectives[Math.floor(Math.random() * adjectives.length)] + animals[Math.floor(Math.random() * animals.length)];
    }

    export default {
        name: 'game-menu',
        props: {},
        data: function () {
            return {
                pseudo: generatePseudo(),
                games: {}
            }
        },
        inject: ['displayBoard'],
        sockets: {
            games: function (data) {
                this.games = data;
            },
        },
        mounted: function () {
            this.$socket.emit('getGames');
        },
        methods: {
            joinGame: function (gameId) {
                this.$socket.emit('joinGame', {
                    gameId: gameId,
                    pseudo: this.pseudo
                });
                this.displayBoard();
            }
        }
    }
</script>

<style scoped>

    .divider {
        width:95%;
        margin: 10px auto;
        border:2px solid black;
    }

</style>
