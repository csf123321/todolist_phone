<script setup>
import axios from "axios";
import {reactive} from "vue";
import scroll_list from '../components/list/scroll_list.vue'

const props = defineProps(['URL'])


</script>

<template>
  <main>
    <scroll_list :URL="props.URL"></scroll_list>
  </main>
</template>

<style scoped>
.add-btn {
  position: fixed;
  left: 50%;
  bottom: 10%;
  transform: translate(-50%,-50%);
}

button {
  width: 60px;
  height: 60px;
  border-radius: 60px;
  background-color: #227ff8;
  border: 0;
  color:white;
}
</style>
