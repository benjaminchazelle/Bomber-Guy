<template>
    <span>
        <span v-if="player.index === 0">&#x1F435;</span>
        <span v-if="player.index === 1">&#x1F43C;</span>
        <span v-if="player.index === 2">&#x1F428;</span>
        <span v-if="player.index === 3">&#x1F439;</span>
    </span>
</template>

<script>

    export default {
        name: 'player-icon',
        props: {
            player: {
                type : Object,
                required: true
            },
        }
    }
</script>

<style scoped>
span {
    z-index: 1000;
}
</style>
