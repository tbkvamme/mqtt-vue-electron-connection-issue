import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

var mqtt = require('mqtt')
var brokerUrl = 'mqtt://broker.hivemq.com';

console.log("Connecting to: " + brokerUrl);
var client = mqtt.connect(brokerUrl)

client.on('connect', function () {
    console.log("Connected!");
    client.subscribe('presence', function (err) {
        if (!err) {
            client.publish('presence', 'Hello mqtt')
        }
    })
})

client.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString())
    client.end()
})

new Vue({
    render: h => h(App),
}).$mount('#app')
