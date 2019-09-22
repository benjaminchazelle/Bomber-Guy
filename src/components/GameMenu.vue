<template>
    <div class="hello">
        <h1>Menu</h1>

        <button v-on:click="displayBoard">Play</button>
    </div>
</template>

<script>
    export default {
        name: 'Menu',
        props: {
            msg: String
        },
        inject: ['displayBoard']
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
