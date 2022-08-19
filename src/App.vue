<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" v-if="$route.meta.keepalive"/>
    </keep-alive>
    <component :is="Component" v-if="!$route.meta.keepalive"></component>
  </router-view>
</template>

<script>
</script>

<style>
</style>
