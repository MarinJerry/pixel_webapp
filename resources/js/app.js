require('./bootstrap');
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap';


import { createApp } from 'vue'
import HelloWorld from './components/chores'


const app = createApp({})

app.component('hello-world', HelloWorld)
app.mount('#app')
