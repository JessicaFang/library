<template>
    <div class="top"><h1>{{message}}</h1></div>
</template>

<script>
    export default {
        name: "top",
        props:['message']
    }
</script>

<style scoped>
.top{
  padding: 10px;
  border-bottom: 1px solid #d6dfea;
  background: #eff4fa;
}
</style>
