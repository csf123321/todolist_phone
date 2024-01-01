<script setup>
import {ref} from "vue";

const props = defineProps(['URL','form','rules','onSubmit','ref'])
const form = props.form
const FormRef = ref(form)

</script>

<template>
  <div id="form-container">
    <el-form :model="props.form" label-width="90px" label-position="left" :rules="props.rules" ref="FormRef" :hide-required-asterisk="true">
      <div class="inputDeep">
        <el-form-item label="任务名称：" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="截止日期：" prop="deadline">
          <el-date-picker
              v-model="form.deadline"
              type="datetime"
              format="YYYY/MM/DD HH:mm:ss"
              value-format="X"
          />
        </el-form-item>
        <el-form-item label="详细描述：" prop="description">
          <el-input v-model="form.description" />
        </el-form-item>
      </div>
    </el-form>
  </div>
  <ul>
    <li><button class="login-btn" type="button" @click="props.onSubmit(FormRef,form)">添加</button></li>
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
  background-color: #227ff8;
  color: white;
}
</style>