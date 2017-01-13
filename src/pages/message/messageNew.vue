<template>
	<div>
		<h1 class="ui dividing header">
	      	<div class="ui breadcrumb">
		        <div class="active section">后台</div>
		        <i class="right angle icon divider"></i>
		        <div class="active section"><a href="#/message">消息推送</a></div>
		        <i class="right angle icon divider"></i>
		        <a class="section">发文章</a>
	      	</div>
	    </h1>
		<div class="ui fluid input">
			<div class="ui label huge">标题</div>
		  	<input type="text">
		</div>
		<br>
		<div class="field">
        	<tinymce height="300">content here...</tinymce>
     	</div>
     	<br>
     	<button class="ui blue button right floated">
     		<i class="linkify icon"></i>
     		保存
     	</button>
     	<br>
     	<h3 class="ui header">客户列表</h3>
		<br>
		<div class="ui equal width grid">
			<div class="five wide column">
				<div class="ui checkbox">
					<input type="checkbox">
					<label>聪明的小明</label>
				</div>
			</div>
			<div class="five wide column">
				<div class="ui checkbox">
					<input type="checkbox">
					<label>聪明的小明</label>
				</div>
			</div>
			<div class="five wide column">
				<div class="ui checkbox">
					<input type="checkbox">
					<label>聪明的小明</label>
				</div>
			</div>
			<div class="five wide column">
				<div class="ui checkbox">
					<input type="checkbox">
					<label>聪明的小明</label>
				</div>
			</div>
			<div class="five wide column">
				<div class="ui checkbox">
					<input type="checkbox">
					<label>聪明的小明</label>
				</div>
			</div>
			<div class="five wide column">
				<div class="ui checkbox">
					<input type="checkbox">
					<label>聪明的小明</label>
				</div>
			</div>
			<div class="five wide column">
				<div class="ui checkbox">
					<input type="checkbox">
					<label>聪明的小明</label>
				</div>
			</div>
		</div>
		<br>
     	<div class="ui bottons">
	     	<button class="ui blue button left floated" @click="chooseAll">
	     		<i class="check square icon"></i>
	     		全选
	     	</button>
	     	<button class="ui positive button right floated">
	     		<i class="cloud upload icon"></i>
	     		上传
	     	</button>
	    </div>
	</div>
</template>

<script>
import tinymce from 'components/tinymce/Tinymce.vue'
export default {
	name: 'message-new',
	components: {
	    tinymce
	},
	methods:{
		chooseAll: function () {
			$('input[type="checkbox"]').attr("checked",'true');
		}
	},
	data () {
	    return {
	    }
	}
}
</script>


<style>
	.ui.breadcrumb .section a{
		color: inherit;
	}
</style>












