<script setup>
import changeButton from '../components/list/changeButton.vue'

const test_model = reactive({
  test_data:""
})

function test1(e){
  test_model.test_data = "开始"
}

function test2(e){
  test_model.test_data = "结束"
}
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h1>{{test_model.test_data}}</h1>
    <div @touchstart="test1" @touchend="test2">测试</div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
