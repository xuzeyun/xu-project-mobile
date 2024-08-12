import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import * as Api from './api'

import { Button, NavBar, Col, Row, Icon, Form, Field, CellGroup, Checkbox, CountDown, Dialog } from 'vant'
import 'vant/lib/index.css'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import specific icons */
import { fas } from '@fortawesome/free-solid-svg-icons'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// import 'animate.css/source/animate.min.css';
import 'animate.css'
import './styles/index.scss'
/* add icons to the library */
library.add(fas)

const pinia = createPinia()
const app = createApp(App)

app.config.globalProperties.$Api = Api

app.use(Button)
app.use(NavBar)
app.use(Col)
app.use(Row)
app.use(Icon)
app.use(Form)
app.use(Field)
app.use(CellGroup)
app.use(Checkbox)
app.use(CountDown)
app.use(Dialog)

app.use(pinia)
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
