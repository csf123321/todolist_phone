<script setup>
import axios from "axios";
import changeButton from './changeButton.vue'

const props = defineProps(['URL','values','index','delete'])
const values = props.values

const instance = axios.create({
  baseURL:props.URL,
  timeout:1000,
  withCredentials:true,
  headers:{
    'Content-Type':'application/json',
    'Authorization':'Bearer '+ localStorage.getItem('todolistAuth')
  }
})

const card_model = reactive({
  l_px:0.,
  l_py:0.,
  translate_value:0.,
  translate:"",
  speed:0.5
})

function onChange(){
  instance.put('/api/list/info',{
    todo:{
      id:values.id,
      name:"",
      description:"",
      deadline:"",
      state:values.state==="未完成"?1:0
    }
  }).then(res=>{
    values.state==="未完成"?values.state="已完成":values.state="未完成"
  })
}

function initTouch(e){
  card_model.l_px = e.touches[0].clientX
  card_model.l_py = e.touches[0].clientY
}

function touchMove(e){
  let tx = e.touches[0].clientX
  let ty = e.touches[0].clientY

  let offset = card_model.l_px-tx
  offset *= card_model.speed
  if(card_model.translate_value - offset >= -100 && card_model.translate_value - offset <= 0)
    card_model.translate_value -= offset
  card_model.translate = `transform:translate(${card_model.translate_value}px,0)`
  card_model.l_px = tx
  card_model.l_py = ty
}

function endTouch(e){
  if(card_model.translate_value > -60)
    card_model.translate = 'transform:translate(0px,0)'
  else
    card_model.translate = 'transform:translate(-100px,0)'
}
</script>

<template>
  <div id="deap" @touchstart="initTouch" @touchmove="touchMove" @touchend="endTouch" class="over-container">

    <el-card shadow="always" :style="card_model.translate">
      <el-row>
        <el-col :span="13">{{ values.name }}</el-col>
        <el-col :span="6">截止日期：</el-col>
        <el-col :span="5">
          <el-row>{{ values.date }}</el-row>
          <el-row>{{ values.time }}</el-row>
        </el-col>
      </el-row>
      <el-collapse-item title="详情">
        <el-text class="mx-1" size="default" >{{values.description}}</el-text>
      </el-collapse-item>
      <el-row>
        <el-col :span="4">
          <change-button :value="props.index" :state="values.state" :on-change="onChange"/>
        </el-col>
        <el-col :span="4" :offset="16">
          <el-text>{{values.state}}</el-text>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="delete" :style="card_model.translate">
      <button class="btn" @click="props.delete(values.id,props.index)">删除</button>
    </el-card>
  </div>
</template>

<style scoped>
.over-container {
  overflow: hidden;
  position: relative;
}

.delete {
  text-align: center;
  justify-content: center;
  align-items: center;
  position: absolute;
  top:0;
  left: 100%;
  width: 100px;
  height: 100%;
}

.delete>>>.el-card__body{
  width: 100%;
  height: 100%;
  padding: 0;
  border-radius: 0;
}

.delete>>>.el-card__body .btn{
  background-color: #ef3d3d;
  color: white;
  font-size: 20px;
  border: 0;
  border-radius: 0;
  width: 100%;
  height: 100%;
}

</style>