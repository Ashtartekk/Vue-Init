import { createApp } from 'vue'
import App from './App.vue'
import './styles/index.scss'
const app = createApp(App);
// new Vue({ //这是vue2版本
//     el:'#app', //替换../index.html里的id=app
//     render:h=>h(App) //渲染函数 vnode 创建一个虚拟节点 然后把虚拟节点变成一个真实的DOM节点
// })
app.mount('#app')