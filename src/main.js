/* eslint-disable no-console */
import Vue from 'vue'
import App from './App.vue'
import VueSocketIO from 'vue-socket.io'

Vue.use(new VueSocketIO({
    debug: true,
    connection: window.location.port === "8080" ? "http://localhost:9000" : "http://" + (window.location.host),
    options: {
        path: '/socket',
    }
}))

Vue.config.productionTip = false

new Vue({
    sockets: {
        connect: function () {
            console.log('Socket connected')
        },
        customEmitToClient: function (data) {  //template
            console.log('Received message from server', data)
        }
    },
    render: h => h(App),
    created: function () {
        this.$socket.emit('customEmitToServer', Date.now()) //template
    }
}).$mount('#app')
