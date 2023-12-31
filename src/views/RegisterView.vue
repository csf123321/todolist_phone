<script setup>
import registerForm from '../components/register/registerForm.vue'
import {reactive, ref} from "vue";
import axios from "axios";

const props = defineProps(['URL'])

const form = reactive({
  username:"",
  email:"",
  password:"",
  confirm_password:"",
  username_error:false,
  email_error:false,
})


const instance = axios.create({
  baseURL:props.URL,
  timeout:1000,
  withCredentials:true,
  headers:{'Content-Type':'application/x-www-form-urlencoded'}
})
const confirm_password = (rule,value,callback) =>{
  if (value!=form.password){
    callback(new Error('两次输入的密码不一致'))
  }else{
    callback()
  }
}

const rules = {
  username:[
    {required: true,message: '请输入用户名',trigger:'blur'}
  ],
  email:[
    {required: true,message: '请输入邮箱',trigger: 'blur'},
    {type:"email",message: '请输入正确的邮箱',trigger: 'blur'}
  ],
  password:[
    {required: true,message: '密码不能为空',trigger: 'blur'}
  ],
  confirm_password:[
    {required: true,message: '密码不能为空',trigger:"blur"},
    {validator: confirm_password,trigger: 'blur'}
  ]
}

async function onSubmit(formEL,form){
  form.username_error = false
  form.email_error = false
  if(!formEL)return
  formEL.validate((valid) =>{
    console.log(valid)
    if (valid){
      instance.post('/api/users/register',{
        username:form.username,
        email:form.email,
        password:form.password,
        confirm_password:form.confirm_password
      }).then(res=>{
        formEL.clearValidate()
        if (res.data.code==1){
          form.username_error = true
        }else if(res.data.code==2){
          form.email_error = true
        }else {
          window.location.href = '/login'
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
  <register-form :URL="props.URL" :form="form" :rules="rules" :on-submit="onSubmit"></register-form>
</template>

<style scoped>

</style>