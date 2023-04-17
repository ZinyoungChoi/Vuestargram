import { createApp } from 'vue'
import App from './App.vue'

//mitt 라이브러리 세팅
import mitt from 'mitt'
let emitter = mitt();
let app = createApp(App);
//app.config.globalProperties : 글로벌 변수 보관함
app.config.globalProperties.emitter = emitter; //글로벌 변수 보관함에 emitter를 보관.

import store from './store.js';
import './registerServiceWorker'

// import './assets/main.css'

app.use(store).mount('#app')
