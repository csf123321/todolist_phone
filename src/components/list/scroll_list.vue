<script setup>
import axios from "axios";
import {ref,reactive} from "vue";
import Todo_card from "@/components/list/todo_card.vue";

const props = defineProps(['URL'])

//请求实例
const instance = axios.create({
  baseURL:props.URL,
  timeout:1000,
  withCredentials:true,
  headers:{
    'Content-Type':'application/json',
    'Authorization':'Bearer '+ localStorage.getItem('todolistAuth')
  }
})

let all_list = []
const infoList = reactive({
  data:[],
  if_has:true,
  if_login:false
})
let listIndex = 0

onBeforeMount(async ()=>{
  try {
    const res = await instance.get('/api/list/info')

    infoList.if_login = true

    all_list = res.data.data

    all_list = all_list.map((item) => {
      let res = item.deadline.split('T')
      item.date = res[0].replaceAll('-', '/')
      item.time = res[1]
      return item
    })
    console.log(all_list)
    if (all_list.length === 0) {
      infoList.if_has = false
    }
    if (all_list.length < 4) {
      infoList.data = res.data.data
      listIndex = all_list.length
    } else {
      for (let i = 0; i < 4; i++) {
        infoList.data.push(all_list[i])
      }
      listIndex = 4
    }
  }
  catch {
    infoList.if_has = false
  }
})

const load = ()=>{
  if (listIndex<all_list.length) {
    infoList.data.push(all_list[listIndex])
    listIndex++
  }
}

function delete_list(id,index){
  instance.delete('/api/list/info',{
    data:{id:id}
  }).then(res=>{
    if(res.data.code===0){
      console.log(infoList.data)
      infoList.data.splice(index,1)
      all_list.splice(index,1)
      console.log(infoList.data)
    }
    if (infoList.data.length===0){
      location.reload()
    }
  })
}

</script>

<template>
  <div v-if="infoList.if_has">
    <ul v-infinite-scroll="load">
      <el-collapse accordion>
        <li v-for="(i,index) in infoList.data" :key="i.id"><todo_card :URL="props.URL" :values="i" :index="index" :delete="delete_list"/></li>
      </el-collapse>
    </ul>
  </div>
  <div v-else-if="infoList.if_login" class="message">
    <text>你真清闲</text>
  </div>
  <div v-else class="message">
    <text>未登录</text>
  </div>
</template>

<style scoped>
ul{
  list-style-type: none;
  padding: 20px 10px 0 10px;
}

li{
  display: flow;
  margin: 7px;
}

.message{
  text-align: center;
  font-size: 50px;
}
</style>