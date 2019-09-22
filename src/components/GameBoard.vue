<template>
    <div class="hello">
        <h1>Board</h1>

        <button v-on:click="displayMenu">Back</button>

        {{ map }}

    </div>
</template>

<script>
    /* eslint-disable no-console */

    const actionKeys = {
        ArrowUp: {action : 'moveUp', type: 'move'},
        ArrowDown: {action : 'moveDown', type: 'move'},
        ArrowLeft: {action : 'moveLeft', type: 'move'},
        ArrowRight: {action : 'moveRight', type: 'move'},
        Space: {action : 'bomb', type: 'bomb'},
        Enter: {action : 'bomb', type: 'bomb'},
    };

    export default {
        name: 'game-board',
        props: {},
        inject: ['displayMenu'],
        data: function () {
            return {
                gameId: 42,

                stamina: null,
                explosionIntensity: null,

                map: [],
                movingDirection: "moveDown"
            }
        },
        methods: {
            handleKeydown : function (e) {

                if (e.defaultPrevented) {
                    return;
                }

                if(e.code in actionKeys) {
                    this.$socket.emit(actionKeys[e.code].action);
                    if(actionKeys[e.code].type === 'move') {
                        this.movingDirection = actionKeys[e.code].action;
                    }
                }
                else {
                    return;
                }

                e.preventDefault();
            },
            handleKeyup : function (e) {

                if (e.defaultPrevented) {
                    return;
                }


                if(e.code in actionKeys) {
                    if(this.movingDirection === actionKeys[e.code].action) {
                        this.$socket.emit("stopMoving");
                    }
                    else if("bomb" === actionKeys[e.code].type) {
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
            refresh : function (data) {
                // data.map & data.characters

                this.map = data.map;
            },
        },
        mounted: function () {
            window.addEventListener('keyup', this.handleKeyup, false);
            window.addEventListener('keydown', this.handleKeydown, false);

            this.$socket.emit('joinGame', this.gameId);
        },
        destroyed: function () {
            window.removeEventListener('keyup', this.handleKeyup, false);
            window.removeEventListener('keydown', this.handleKeydown, false);
        }
    }
</script>

<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
