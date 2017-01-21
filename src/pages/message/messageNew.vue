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
		  	<div class="field">
			    <label>背景图</label>
			    <img id="expImage" src="~assets/image.png" class="ui small image" alt="">
			    <div class="ui button" @click="show('#imageChooseModal')" style="margin-top: 10px;">
			      选择一张图片
			    </div>
			    <image-choose-modal id="imageChooseModal" v-on:finishChoose="finishChoose"></image-choose-modal>
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
			<div class="five wide column" v-for="i in shops">
				<div class="ui checkbox">
					<input type="checkbox">
					<label>{{i.id}}+{{i.name}}</label>
				</div>
			</div>
		    <!-- <vuetable-pagination ref="pagination" @vuetable-pagination:change-page="onChangePage"></vuetable-pagination> -->
		    <Pagination id="page1" :total="this.all" show="9" current="1" v-if="this.all!=''" style="margin:10px auto" v-on:pageChange="getData"></Pagination>
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
import imageChooseModal from 'components/ImageChooseModal.vue'
import VuetablePagination from 'components/vue-table/VuetablePagination'
import Pagination from 'components/Pagination'

export default {
	name: 'message-new',
	components: {
	    tinymce,
	    'image-choose-modal': imageChooseModal,
	    VuetablePagination,
	    Pagination
	},
	methods:{
		show(selector){
	      $(selector).modal('show')
	    },
	    finishChoose(src){
	      console.log(src)
	      $('#expImage').attr('src', src)
	    },
		chooseAll: function () {
			$('input[type="checkbox"]').attr("checked",'true');
		},
		getData(params){
	      // console.log(params)
	      var number = (params-0-1)*9
	      var self = this
	      $.when(ajax2.getUserForPage(number, 9).done(function(data){
		        self.shops = data.list
		        self.all = data.countAll
		  }))
	    },
	    getfirstData(){
	    	var self = this
	    	$.when(ajax2.getUserForPage(0, 9).done(function(data){
		        self.shops = data.list
		        self.all = data.countAll
		    }))
	    }
	},
	data () {
	    return {
	    	title:"",
	    	author:"",
	    	date:"",
	    	text:"",
	    	ids:[],
	    	shops:[],
	    	all:''
	    }
	},
	mounted:function(){
		this.getfirstData()
	}
}
</script>

<style scoped>
	.field{
		clear: none !important;
	}
</style>









