console.log('hello', 'index')
import Vue from 'vue'
import App from './components/App.vue'

export default new Vue({
    el: '#app',
    components: { App },
    render: h => h(App)
})
