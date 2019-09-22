<template>
    <div class="hello">
        <h1>Splash</h1>
    </div>
</template>

<script>
    export default {
        name: 'splash-screen',
        mounted: function () {
            var vm = this;
            setTimeout(function () {
                vm.displayMenu()
            }, 0);
        },
        inject: ['displayMenu']
    }
</script>

<style scoped>

</style>
