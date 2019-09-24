<template>
    <div v-bind:style="styleObject" v-if="player.life > 0">
        <PlayerIcon v-bind:player="player"></PlayerIcon>
    </div>
</template>

<script>
    /* eslint-disable no-console */

    import PlayerIcon from './PlayerIcon.vue'

    export default {
        name: 'game-player',
        components: {
            PlayerIcon
        },
        props: {
            player: {
                type : Object,
                required: true
            },
            size: {
                type : Number,
                default: 10
            },
        },
        data: function () {
            return {
                gameId: 42,

                stamina: null,
                explosionIntensity: null,

                map: [],
                movingDirection: "moveDown"
            }
        },
        computed: {
            styleObject: function() {
                return {
                    top: this.size*this.player.position.y + "px",
                    left: this.size*this.player.position.x + "px",
                    width: this.size + "px",
                    height: this.size + "px",
                }
            }
        }
    }
</script>

<style scoped>
div {
    position: absolute;
}
</style>
