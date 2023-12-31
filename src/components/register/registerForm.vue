<script setup>
import {reactive,ref} from "vue";

const props = defineProps(['URL','onSubmit','form','ref','rules'])
const FormRef = ref(props.form)


</script>

<template>
  <div id="form-container">
    <el-form :model="props.form" label-width="90px" label-position="left" :rules="props.rules" ref="FormRef" :hide-required-asterisk="true">
      <div class="inputDeep">
        <el-form-item label="用户名:" prop="username">
          <el-input v-model="form.username"/>
          <div v-if="form.username_error" class="el-form-item__error">用户名已存在</div>
        </el-form-item>
      </div>
      <div class="inputDeep">
        <el-form-item label="邮箱:" prop="email">
          <el-input v-model="form.email"/>
          <div v-if="form.email_error" class="el-form-item__error">邮箱已注册</div>
        </el-form-item>
      </div>
      <div class="inputDeep">
        <el-form-item label="密码:" prop="password">
          <el-input v-model="form.password" type="password"/>
        </el-form-item>
      </div>
      <div class="inputDeep">
        <el-form-item label="确认密码:" prop="confirm_password">
          <el-input v-model="form.confirm_password" type="password"/>
        </el-form-item>
      </div>
    </el-form>
  </div>
  <ul>
    <li><button class="login-btn" type="button" @click="props.onSubmit(FormRef,form)">注册</button></li>
    <li><router-link to="/login">返回登录</router-link></li>
  </ul>
</template>

<style scoped>
#form-container{
  background-color: white;
}

form{
  padding: 1rem;
}

.inputDeep>>>.el-form-item{
  border-bottom: 1px solid var(--el-border-color);
}

.inputDeep>>>.el-input__wrapper{
  box-shadow: 0 0 0 0 ;
}

.inputDeep>>>.el-input__wrapper:hover{
  box-shadow: 0 0 0 0;
}


ul {
  list-style-type: none;
  margin: 0;
  padding: 20px 0 0 0;
  text-align: center;
  background-color: var(--vt-c-gray);
}

ul li{
  padding: 3px;
}

ul li button{
  width: 80%;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 8px 15px;
  font-weight: 500;
  font-size: 14px;
}

.login-btn{
  background-color: #409eff;
  color:white;
}

.register-btn{
  background-color: rgba(134, 134, 134, 0.05);
  color:black;
}
</style>