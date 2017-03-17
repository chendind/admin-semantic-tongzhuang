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
			    <input type="text" name="title" placeholder="请输入作者" v-model="author">
		  	</div>
		  	<div class="field">
			    <label>时间</label>
			    <input type="date" name="title" placeholder="请输入时间" v-model="date">
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
		<div class="field mt10" style="width: 375px">
        	<tinymce height="300" ref="text">content here...</tinymce>
     	</div>
     	<div class="after mt10">
	     	<button class="ui blue button right floated" @click="save">
	     		<i class="linkify icon"></i>
	     		保存
	     	</button>
     	</div>
     	<h3 class="ui header">客户列表</h3>
		<div class="ui equal width mt10 segment after">
			<div class="ui grid after">
				<div class="five wide column" v-for="customer in customers">
					<div class="ui checkbox">
						<input :id="'customer'+customer.id" type="checkbox" v-model="lookup[customer.id]">
						<label :for="'customer'+customer.id">{{customer.name}}</label>
					</div>
				</div>
			</div>
			
		    <!-- <vuetable-pagination ref="pagination" @vuetable-pagination:change-page="onChangePage"></vuetable-pagination> -->
		    <Pagination id="page1" class="mv10" :total="this.all" show="9" current="1" v-if="this.all!=''" v-on:pageChange="getData">
		    </Pagination>
		</div>
     	<div class="after mt10">
	     	<button class="ui blue button left floated" @click="chooseAll" >
	     		<i class="square icon" v-if="choose"></i>
	     		<i class="check square icon" v-else></i>
	     		全选
	     	</button>
	     	<button class="ui positive button right floated" @click="send">
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

function   formatDate(time)   {
  var   now = new Date(time)
  var   year = now.getFullYear();
  var   month = "0" + (now.getMonth()+1);
  var   date = "0" +(now.getDate());
  return   year+"-"+month.substr(-2)+"-"+date.substr(-2)
}

export default {
	name: 'message-new',
	components: {
	    tinymce,
	    'image-choose-modal': imageChooseModal,
	    VuetablePagination,
	    Pagination
	},
	data () {
	    return {
	    	title:"",
	    	author:"",
	    	date:"",
	    	text:"",
	    	ids:[],
	    	customers:[],
	    	all:'',
	    	src:'',
	    	info:'',
	    	lookup:{},
	    	id: undefined,
	    	choose: true,
        	merchantId: window.localStorage.getItem('usertype') == 'back'? 0 : 9
	    }
	},
	methods:{
		isChecked(id){
			return !!this.lookup[id]
		},
		check(id){
			this.lookup[id] = !this.lookup[id]
		},
		save(){
			var x
			var date = undefined
			if (this.date!=null&&this.date!="") {
				x = this.date.replace(/-/g,"/")
				console.log(x)
				date = new Date(x);
				console.log(date)
			}
			this.ids = []
			this.ids = Object.keys(this.lookup)
			ajax2.editArticle(this.id,this.merchantId, this.title, this.author, date, this.$refs.text.getContent(), this.src, this.ids, 0).done(function(data){
		        if(data.state == 0){
		            xy.toast('保存成功')
		        }
		        else if(data.detail){
		            xy.alert(data.detail)
		        }
	  		})
		},
		send(){
			var x
			var date = undefined
			if (this.date!=null&&this.date!="") {
				x = this.date.replace(/-/g,"/")
				console.log(x)
				date = new Date(x);
				console.log(date)
			}
			this.ids = []
			this.ids = Object.keys(this.lookup)
			ajax2.editArticle(this.id,this.merchantId, this.title, this.author, date, this.$refs.text.getContent(), this.src, this.ids, 1).done(function(data){
		      if(data.state == 0){
	          	xy.toast('发送成功')
        		}
        		else if(data.detail){
          			xy.alert(data.detail)
        		}
		  })
		},
		show(selector){
      $(selector).modal('show')
    },
    finishChoose(src){
      console.log(src)
      $('#expImage').attr('src', src)
      this.src = src
    },
		chooseAll: function () {
			var self = this;
			var _lookup = {}
			for (var id in self.lookup){
				_lookup[id]=self.choose
			}
			self.lookup = _lookup
			self.choose = !self.choose
		},
		draft(){
			var self = this
			ajax2.getDraft().done(function(data){
				console.log(data)
	     	 	self.info = data
	     	 	self.title = data.title
	     	 	self.author = data.author
	     	 	self.date = formatDate(data.time)
	     	 	self.src = data.img
	     	 	self.id = data.id
	     	 	$('#expImage').attr('src', self.src)
	     	 	self.$refs.text && self.$refs.text.setContent(data.text)
	     	 	data.userId.forEach(function(id){
	     	 		self.lookup[id]=true;
	     	 	})
		  	})
		},
		getData(params){
	      	// console.log(params)
	      	var number = (params-0-1)*9
	      	var self = this
	     	ajax2.getUserForPage(number, 9).done(function(data){
	     	//  	data.list.forEach(function(list){
	    		// 	list.check = false
	    		// })
		        self.customers = data.list
		        self.all = data.countAll
		  	})
	    },
	    getfirstData(){
	    	var self = this
	    	ajax2.getUserForPage(0, 9).done(function(data){
	    		// data.list.forEach(function(list){
	    		// 	list.check = false
	    		// })
		        self.customers = data.list
		        self.all = data.countAll
		    })
		    ajax2.getUserForPage().done(function(data){
	    		data.list.forEach(function(list){
	    			self.lookup[list.id] = false
	    		})
	    		self.draft()
		    })
	    }
	},
	mounted:function(){
		this.lookup = {}
		this.getfirstData()
	}
}
</script>

<style scoped>
	.field{
		clear: none !important;
	}
</style>









