<template>
    <div v-bind:style="styleObject">
        <span v-if="cell === 'R'">&#x1F533;</span>
        <span v-if="cell === 'W'">&#x1F6A7;</span>
        <span v-if="cell === '#'">&#x1F4E6;</span>
        <span v-if="typeof(cell) === 'object' && cell[0] === 'B' ">&#x1F4A3;</span>
        <span v-if="typeof(cell) === 'object' && cell[0] === 'F' ">&#x1F525;</span>
    </div>
</template>

<script>
    /* eslint-disable no-console */

    export default {
        name: 'game-cell',
        props: {
            index: {
                type : Number,
                required: true
            },
            mapWidth: {
                type : Number,
                required: true
            },
            cell: {
                type : [String, Object],
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
                let x = this.index % this.mapWidth;
                let y = (this.index - x) / this.mapWidth;
                return {
                    top: this.size*y + "px",
                    left: this.size*x + "px",
                    width: this.size + "px",
                    height: this.size + "px",
                    lineHeight: this.size + "px",
                    textAlign: "center",
                }
            }
        },
        methods: {

        }


    }
</script>

<style scoped>
    div {
        position:absolute;
    }
</style>
