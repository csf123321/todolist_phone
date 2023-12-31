<script setup>
import LoginForm from "@/components/Login/LoginForm.vue";
import axios from "axios";
import {reactive, ref} from "vue";

//参数
const props = defineProps(['URL'])

//请求实例
const instance = axios.create({
  baseURL:props.URL,
  timeout:1000,
  withCredentials:true,
  headers:{'Content-Type':'application/x-www-form-urlencoded'}
})

//登录表单数据
const form = reactive({
  email:"",
  password:"",
  email_error:false,
  password_error:false,
})


const rules = {
  email:[
    {required: true,message: '请输入邮箱',trigger: 'blur'},
    {type:"email",message: '请输入正确的邮箱',trigger: 'blur'}
  ],
  password:[
    {required: true,message: '密码不能为空',trigger: 'blur'}
  ]
}



function onSubmit(formEL,form){
  form.email_error = false
  form.password_error = false
  console.log(formEL)
  if(!formEL)return
  formEL.validate((valid) =>{
    if (valid){
      instance.post('/api/users/login',{
        email:form.email,
        password:form.password
      }).then(res=>{
        console.log(res.data)
        formEL.clearValidate()
        if (res.data.code==1){
          form.email_error = true
        }else if(res.data.code==2){
          form.password_error = true
        }else {
          localStorage.setItem('todolistAuth',res.data.token)
          window.location.href = '/'
        }
      })
      return true
    }else{
      console.log('fail')
      return false
    }
  })
}
</script>

<template>
  <LoginForm
      :URL="props.URL"
      :rules="rules"
      :form="form"
      :onSubmit="onSubmit"
  ></LoginForm>
</template>

<style scoped>

</style>