<script setup>
import {RouterLink} from "vue-router";

const drawer = ref(false);

const props = defineProps(['username','logout'])

</script>

<template>
  <el-affix :offset="0">
    <header>
      <nav>
        <ul class="nav-ul">
          <li>
            <router-link to="#" @click="drawer = true">
              <el-icon size="40">
                <Menu/>
              </el-icon>
            </router-link>
          </li>
          <li>
            <router-link to="/add">
              <el-icon size="40">
                <Plus />
              </el-icon>
            </router-link>
          </li>
          <li style="float: right">
            <RouterLink v-if="props.username === 'unkown'" to="/login">
              <el-avatar> unkown</el-avatar>
            </RouterLink>
            <a v-else>
              <el-dropdown>
                <span class="el-dropdown-link">
                  <el-avatar> {{ props.username }}</el-avatar>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item><a @click="props.logout">登出</a></el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  </el-affix>
  <el-drawer
      v-model="drawer"
      title="跳转"
      :direction="'ltr'"
      size="30%"
  >
    <el-menu mode="vertical" :router="true">
      <el-menu-item index="/">首页</el-menu-item>
      <el-menu-item index="/add">添加</el-menu-item>
    </el-menu>
  </el-drawer>
</template>

<style scoped>
header {
  width: 100%;
}

.nav-ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  background-color: #227ff8;
  height: 60px;
  width: 100%;
}


.nav-ul li {
  display: inline-flex;
}


.nav-ul li a {
  color: rgba(24, 22, 22, 0.98);
  display: block;
  text-align: center;
  padding: 10px 12px;
  height: 60px;
  text-decoration: none;
}



</style>