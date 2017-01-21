<template>
    <div :id="id" class="ui right floated pagination menu"></div>
</template>

<script>
import '../../static/pagination/pagination.js'
export default {
  name: 'pagination',
  props: ['id','current','total','show'],
  methods: {

  },
  data () {
    return {
    }
  },
  created(){

  },
  mounted(){
    $("#"+this.id).pagination({
      totalData: this.total-0,
      showData: this.show-0,
      current: this.current-0,
      count:2,
      jump:true,
      coping:true,
      callback:(pagination)=>{
        this.$emit('pageChange', pagination.getCurrent())
      }
    })
  }
}
</script>

<style scoped>

</style>
