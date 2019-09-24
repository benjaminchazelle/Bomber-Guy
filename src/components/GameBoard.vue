<template>
    <div class="wrap">


        <p>
            <button v-on:click="back">&lt; Back</button>
        </p>
        <div class="players" v-if="hasStarted">
            <div v-for="(player, index) in players" v-bind:key="index">
                <div>
                    <PlayerIcon v-bind:player="player"></PlayerIcon>
                    <b>{{player.pseudo}}</b>
                </div>
                <div>
                    &#x2764;️{{player.life}}
                    &#x1F4A3;{{player.bombStock}}
                </div>
            </div>
        </div>
        <div class="cells" v-bind:style="styleObject" v-if="hasStarted">
            <GameCell v-bind:size="cellSize" v-bind:map-width="map.width" v-for="(cell, index) in map.cells"
                      v-bind:key="index" v-bind:index="index" v-bind:cell="cell"></GameCell>
            <GamePlayer v-bind:size="cellSize" v-for="(player, index) in players" v-bind:key="index"
                        v-bind:player="player"></GamePlayer>
        </div>
        <div v-if="!hasStarted && countdown === null">
            <h2>Waiting for other players</h2>
        </div>
        <div v-if="!hasStarted && countdown !== null">
            <h2>Game will start</h2>
            <h1>{{countdown}}</h1>
        </div>
        <div v-if="hasStarted">
            <table>
                <tr>
                    <td></td>
                    <td>
                        <button @mousedown="handleKeydown({defaultPrevented:false, code:'ArrowUp',preventDefault:function(){}})"
                                @mouseup="handleKeyup({defaultPrevented:false, code:'ArrowUp',preventDefault:function(){}})"
                                style="transform:rotate(90deg)"
                        >&lt;
                        </button>
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td>
                        <button @mousedown="handleKeydown({defaultPrevented:false, code:'ArrowLeft',preventDefault:function(){}})"
                                @mouseup="handleKeyup({defaultPrevented:false, code:'ArrowLeft',preventDefault:function(){}})"
                        >&lt;
                        </button>
                    </td>
                    <td>
                        <button @mousedown="handleKeydown({defaultPrevented:false, code:'Space',preventDefault:function(){}})"
                                @mouseup="handleKeyup({defaultPrevented:false, code:'Space',preventDefault:function(){}})"
                                style="background:white;color: unset;"
                        >&#x1F4A3;
                        </button>
                    </td>
                    <td>
                        <button @mousedown="handleKeydown({defaultPrevented:false, code:'ArrowRight',preventDefault:function(){}})"
                                @mouseup="handleKeyup({defaultPrevented:false, code:'ArrowRight',preventDefault:function(){}})"
                        >&gt;
                        </button>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                        <button @mousedown="handleKeydown({defaultPrevented:false, code:'ArrowDown',preventDefault:function(){}})"
                                @mouseup="handleKeyup({defaultPrevented:false, code:'ArrowDown',preventDefault:function(){}})"
                                style="transform:rotate(90deg)"
                        >&gt;
                        </button>
                    </td>
                    <td></td>
                </tr>
            </table>

        </div>
    </div>

</template>

<script>
    /* eslint-disable no-console */

    import GameCell from './GameCell.vue'
    import GamePlayer from './GamePlayer.vue'
    import PlayerIcon from "./PlayerIcon";


    const actionKeys = {
        ArrowUp: {action: 'moveUp', type: 'move'},
        ArrowDown: {action: 'moveDown', type: 'move'},
        ArrowLeft: {action: 'moveLeft', type: 'move'},
        ArrowRight: {action: 'moveRight', type: 'move'},
        Space: {action: 'bomb', type: 'bomb'},
        Enter: {action: 'bomb', type: 'bomb'},
    };

    export default {
        name: 'game-board',
        components: {
            PlayerIcon,
            GameCell,
            GamePlayer
        },
        props: {},
        inject: ['displayMenu'],
        data: function () {
            return {
                gameId: 42,
                players: {},
                map: {},
                movingDirection: "moveDown",
                cellSize: 20,
                hasStarted: false,
                countdown: null
            }
        },
        computed: {
            styleObject: function () {

                let cells = document.querySelector('.cells');

                if(cells !== null) {
                    cells.style.transform = "unset";
                    cells.style.overflow = "hidden";

                    let scale = cells.offsetHeight / cells.scrollHeight;

                    cells.style.transform = "scale("+scale+")"
                    cells.style.overflow = "unset";
                }

                return {
                    width: this.cellSize * this.map.width + "px",
                    //height: this.cellSize * this.map.height + "px"
                }
            }
        },
        methods: {
            back: function () {
                this.$socket.emit("quitGame");
                this.displayMenu();
            },
            handleKeydown: function (e) {

                if (e.defaultPrevented) {
                    return;
                }

                if (e.code in actionKeys) {
                    this.$socket.emit(actionKeys[e.code].action);
                    if (actionKeys[e.code].type === 'move') {
                        this.movingDirection = actionKeys[e.code].action;
                    }
                }
                else {
                    return;
                }

                e.preventDefault();
            },
            handleKeyup: function (e) {

                if (e.defaultPrevented) {
                    return;
                }

                if (e.code in actionKeys) {
                    if (this.movingDirection === actionKeys[e.code].action) {
                        this.$socket.emit("stopMoving");
                    }
                    else if ("bomb" === actionKeys[e.code].type) {
                        this.$socket.emit("stopBombing");
                    }
                }
                else {
                    return;
                }

                e.preventDefault();
            },
        },
        sockets: {
            refresh: function (data) {
                this.hasStarted = true;
                this.players = data.players;
                this.map = data.map;
            },
            countdown: function (data) {
                this.countdown = data;
            },
        },
        mounted: function () {
            window.addEventListener('keyup', this.handleKeyup, false);
            window.addEventListener('keydown', this.handleKeydown, false);
        },
        destroyed: function () {
            window.removeEventListener('keyup', this.handleKeyup, false);
            +
                window.removeEventListener('keydown', this.handleKeydown, false);
        }
    }
</script>

<style scoped>
    .wrap {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .players {
        display: flex;
    }

    .players div {
        margin: 0 5px;
    }

    .cells {
        position: relative;
        flex:1;
        transform-origin: center 0;
    }
</style>
