<template>
	<div>
		<h1 class="ui dividing header">
	      	<div class="ui breadcrumb">
		        <div class="section">后台</div>
		        <i class="right angle icon divider"></i>
		        <a class="section active">消息推送</a>
	      	</div>
	    </h1>
		<table class="ui single line table">
			<tbody>
				<tr>
					<td>历史推送</td>
					<td colspan="2" class="right aligned">
						<a href="#/message/messageNew">
							<button class="ui blue button">
								<i class="plus icon"></i>
								发文章
							</button>
						</a>
					</td>
				</tr>
				<tr v-for="i in articles">
					<td>
						<router-link :to="{path:'/message/messageDetail',query:{id:i[0]}}">{{i[1]}}</router-link>
					</td>
					<td v-if="i[2]!=null">{{formatDate(i[2])}}</td>
					<td v-else></td>				
					<td class="right aligned">阅读量：{{i[3]}}</td>
				</tr>
				<!-- <tr>
					<Pagination id="page2" :total="this.all" show="9" current="1" v-if="this.all!=''" style="margin:10px auto" v-on:pageChange="getData"></Pagination>
				</tr> -->
			</tbody>
			<tfoot>
        <tr>
          <th colspan="4">
            <Pagination id="page2" :total="this.all" show="9" current="1" v-if="this.all!=''" v-on:pageChange="getData"></Pagination>
          </th>
        </tr>
      </tfoot>
		</table>
	</div>
</template>

<script>
import ajax2 from 'src/ajax/ajax2.js'
import Pagination from 'components/Pagination'
   
export default {
	name: 'message-history',
	components: {
	    Pagination
	},
	data () {
	    return {
	    	articles:'',
	    	all:''
	    }
	},
	methods:{
		formatDate(time)   {  
		  var   now = new Date(time)   
		  var   year = now.getFullYear();     
		  var   month = "0" + (now.getMonth()+1);     
		  var   date = "0" +(now.getDate());         
		  return   year+"-"+month.substr(-2)+"-"+date.substr(-2)  
		},
		getList(){
			var self = this
	    	$.when(ajax2.getArticleForPage(0, 10).done(function(data){
		        self.articles = data.list
		        self.all = data.countAll
		    }))
		},
		getData(params){
	      	// console.log(params)
	      	var number = (params-0-1)*9
	      	var self = this
	     	$.when(ajax2.getArticleForPage(number, 10).done(function(data){
	     	 	data.list.forEach(function(list){
	    			list.check = false
	    		})
		        self.shops = data.list
		        self.all = data.countAll
		  	}))
	    },	
	},
	mounted:function(){
		this.getList()
	}
}
</script>

<style>
	a{
		color: inherit;
	}
</style>


















