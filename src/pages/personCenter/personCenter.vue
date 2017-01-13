<template>
	<div>
		<h1 class="ui dividing header">
	      	<div class="ui breadcrumb">
		        <div class="active section">后台</div>
		        <i class="right angle icon divider"></i>
		        <a class="section">个人中心</a>
	      	</div>
	    </h1>
		<h3 class="ui header">个人信息</h3>
		<div style="padding-left: 30px;">XXXXXXXXX</div>
		<h3 class="ui header">修改密码</h3>
		<div class="ui form">
	    	<div class="field">
	      		<label>旧密码</label>
	      		<input type="text" name="old-pwd">
	    	</div>
		    <div class="field">
		      	<label>新密码</label>
		      	<input type="password" name="new-pwd">
		    </div>
		    <div class="field">
		      	<label>再次确认</label>
		      	<input type="password" name="re-pwd">
		    </div>
		  	<button class="ui positive button">
		  		<i class="checkmark icon"></i>
		  		确定
		  	</button>
		</div>
	</div>
</template>




<script>
export default {
	name: 'person-center',
	methods:{
	},
	data () {
	    return {
	    }
	}
}
</script>

<style scoped>
	.field{
		clear: none !important;
	}
</style>



