<template>
    <div>
        <h1>Bomber Guy !</h1>
        <h5>by <a target="_blank" href="https://www.chazelle.pro/en">Benjamin Chazelle</a></h5>
    </div>
</template>

<script>
    export default {
        name: 'splash-screen',
        mounted: function () {
            var vm = this;
            setTimeout(function () {
                vm.displayMenu()
                document.body.requestFullscreen()
            }, 2000);
        },
        inject: ['displayMenu']
    }
</script>

<style scoped>
    h1 {
        font-size: 36px;
    }

    a {
        color: red;
    }
</style>
