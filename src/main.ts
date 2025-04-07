import './assets/main.css'
import ErrorStackParser from 'error-stack-parser'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import findCodeBySourceMap  from './utils/index'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.config.errorHandler = (err)=>{
  const errotrStack = ErrorStackParser.parse(err as Error)
  findCodeBySourceMap(errotrStack[0])
  console.log(errotrStack[0])
}

app.mount('#app')
