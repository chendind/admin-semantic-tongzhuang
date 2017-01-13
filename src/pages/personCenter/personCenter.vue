<template>
	<div>
		<h3 class="ui header">个人信息</h3>
		<div style="padding-left: 30px;">XXXXXXXXX</div>
		<h3 class="ui header">修改密码</h3>
		<form class="ui form">
		  	<div class="inline field">
		    	<label >旧密码</label>
		    	<input type="text" name="old-pwd">
		  	</div>
		  	<div class="inline field">
		    	<label>新密码</label>
		    	<input type="password" name="new-pwd">
		  	</div>
		  	<div class="inline field">
		    	<label>再次确认</label>
		    	<input type="password" name="re-pwd">
		    	<button class="ui button">确定</button>
		  	</div>
		</form>
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
	.ui.form .inline.field > label{
		display: inline-block;
		width: 90px;
		padding-left: 30px;
	}
</style>



