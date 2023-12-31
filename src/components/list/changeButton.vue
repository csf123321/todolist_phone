<script setup>
import {ref,reactive} from "vue";

const props = defineProps(['state','onChange','value'])

const changeButtonModel = reactive({
  is_check:false
})

onMounted(()=>{
  if (props.state==="已完成"){
    changeButtonModel.is_check = true
  }
})

</script>

<template>
  <div class="circle-check">
    <input type="checkbox" :value="props.value" :id="props.value" :hidden="true" v-model="changeButtonModel.is_check" @change="props.onChange"/>
    <label class="circle-in" :for="props.value"/>
  </div>
</template>

<style scoped>
.circle-check {
  top:5px;
  width: 20px;
  height: 20px;
  background: #c0c0c0;
  border-radius: 100%;
  position: relative;
  -webkit-box-shadow: 0 1px 3px rgba(0,0,0,0.5);
  -moz-box-shadow: 0 1px 3px rgba(0,0,0,0.5);
  box-shadow: 0 1px 3px rgba(0,0,0,0.5);;
}
.circle-check .circle-in{
  display: block;
  width: 90%;
  height: 90%;
  border-radius: 100%;
  background: white;

  -webkit-transition: all .5s ease;
  -moz-transition: all .5s ease;
  -o-transition: all .5s ease;
  -ms-transition: all .5s ease;
  transition: all .5s ease;
  cursor: pointer;
  position: absolute;
  top: 5%;
  left: 5%;
  z-index: 1;

  -webkit-box-shadow:inset 0px 1px 3px rgba(0,0,0,0.5);
  -moz-box-shadow:inset 0px 1px 3px rgba(0,0,0,0.5);
  box-shadow:inset 0px 1px 3px rgba(0,0,0,0.5);
}
.circle-check input[type=checkbox]:checked + label{
  background: #2254f8;
}


</style>