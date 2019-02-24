<template>
  <el-button-group>
    <el-button
      v-for="(btn, btnIndex) in newButtonGroup"
      :key="btnIndex"
      :span="btn.colLength||8"
      :disabled="btn.disable"
      :loading="btn.loading"
      @click="()=>handleClick(btn.event)"
    >
      <i v-if="btn.icon" class="btn-active" :class="btn.icon"></i>
      {{btn.label}}
    </el-button>
  </el-button-group>
</template>

<script>
    import tableMixin from '@/util/Mixins/tableMixins'
    export default {
       name: "tableButton",
      mixins: [tableMixin],
      data(){
         return {
           newButtonGroup:[]
         }
      },
      props: {
        ButtonGroup: {
          type: Array,
          required: true,
        }
      },
        methods:{
          handleClick(event){
           /* console.log(this.ButtonGroup)*/
            this.$emit('handleClick',event)
          }
        },
        mounted() {
            this.newButtonGroup = this.ButtonGroup;
        }
    }

</script>

<style scoped>

</style>
