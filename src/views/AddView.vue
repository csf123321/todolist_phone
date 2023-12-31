<script setup>
import axios from "axios";
import {reactive,ref} from "vue";
import addForm from '../components/add/addForm.vue'
import {ArrowLeft} from "@element-plus/icons-vue";
import {ElMessage,ElMessageBox} from "element-plus";
import 'element-plus/theme-chalk/el-message.css'

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

const form = reactive({
  name:"",
  description:"",
  deadline:""
})


const rules = {
  name:[
    {required:true,message:"请输入任务名称",trigger:"blur"}
  ],
  deadline:[
    {required:true,message:"请填写截止日期",trigger:"blur"}
  ]
}

function onSubmit(formEL,form){
  if(!formEL)return
  formEL.validate((valid)=>{
    if(!valid)return false
    instance.post('/api/list/info',{
      todo:{
        name:form.name,
        description:form.description,
        deadline:form.deadline
      }
    }).then(res=>{
      if (res.data.code==0){
        window.location.href='/'
      }
    }).catch(res=>{
      if(res.response.status==401){
        ElMessage('未登录')
      }
    })
  })
}

function goBack(){
  window.location.href='/'
}

</script>

<template>
  <el-page-header @back="goBack" class="page-header" title="返回" :icon="ArrowLeft">
    <template class="content" #content>
      <h4>添加任务</h4>
    </template>
  </el-page-header>
<add-form
    :URL="props.URL"
    :form="form"
    :rules="rules"
    :on-submit="onSubmit"
></add-form>
</template>

<style scoped>
.page-header {
  background-color: white;
  display: flex;
  justify-items: center;
  height: 50px;
}
.page-header .content{

}

</style>