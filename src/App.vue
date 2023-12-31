<script setup>
import { RouterLink, RouterView } from 'vue-router'
import nav_bar from '@/components/nav/nav_bar.vue'
import axios from "axios";
import {reactive} from "vue";

const remoteURL = "http://8.130.123.211:8000"
const devURL = "http://127.0.0.1:8000"
const URL = remoteURL

axios.defaults.withCredentials = true

//请求实例
const instance = axios.create({
  baseURL:URL,
  timeout:1000,
  withCredentials:true,
  headers:{
    'Content-Type':'application/x-www-form-urlencoded',
    'Authorization':'Bearer '+ localStorage.getItem('todolistAuth')
  }
})

//nav model
const nav_m = reactive({
  username:"unkown"
})

onBeforeMount(async ()=>{
  const user_res = await instance.get('/api/users/info')
  nav_m.username = user_res.data.data.username
})

async function logout(){
  await instance.put('api/users/logout')
  location.reload()
}

</script>

<template>
  <nav_bar :username="nav_m.username" :logout="logout"></nav_bar>
  <RouterView :URL="URL"/>
</template>

<style scoped>
</style>
