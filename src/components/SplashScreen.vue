<template>
    <div class="hello">
        <h1>Splash</h1>
    </div>
</template>

<script>
    export default {
        name: 'SplashScreen',
        mounted: function () {

            setTimeout(function () {
                    this.displayMenu() }.bind(this),
                0);

        },
        inject: ['displayMenu']
    }
</script>

<style scoped>

</style>
