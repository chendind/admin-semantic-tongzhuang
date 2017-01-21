<template>
	<div>
		<h1 class="ui dividing header">
	      	<div class="ui breadcrumb">
		        <div class="section">后台</div>
		        <i class="right angle icon divider"></i>
		        <a href="#/message" class="section">消息推送</a>
		        <i class="right angle icon divider"></i>
		        <a class="section active">发文章</a>
	      	</div>
	    </h1>
		<form class="ui form">
		  	<div class="field">
			    <label>标题</label>
			    <input type="text" name="title" placeholder="请输入标题" v-model="title">
		  	</div>
		  	<div class="field">
			    <label>作者</label>
			    <input type="text" name="title" placeholder="请输入标题" v-model="author">
		  	</div>
		  	<div class="field">
			    <label>时间</label>
			    <input type="date" name="title" placeholder="请输入标题" v-model="date">
		  	</div>
  		</form>
		<div class="field mt10">
        	<tinymce height="300" ref="text">content here...</tinymce>
     	</div>
     	<div class="after mt10">
	     	<button class="ui blue button right floated">
	     		<i class="linkify icon"></i>
	     		保存
	     	</button>
     	</div>
     	<h3 class="ui header">客户列表</h3>
		<div class="ui equal width grid mt10 segment">
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
     	<div class="after mt10">
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
import ajax2 from 'src/ajax/ajax2.js'

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
	    	title:"",
	    	author:"",
	    	date:"",
	    	text:"",
	    	ids:[]
	    }
	}
}
</script>

<style scoped>
	.field{
		clear: none !important;
	}
</style>









