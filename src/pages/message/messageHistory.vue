<template>
	<div>
		<h1 class="ui dividing header">
	      	<div class="ui breadcrumb">
		        <div class="active section">后台</div>
		        <i class="right angle icon divider"></i>
		        <a class="section">消息推送</a>
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
				<tr>
					<td>
						<a href="#/message/messageDetail">儿童萌装大促销</a>
					</td>
					<td>2017-01-01</td>
					<td class="right aligned">阅读量：333</td>
				</tr>
				<tr>
					<td>
						<a href="#/message/messageDetail">儿童萌装大促销</a>
					</td>
					<td>2017-01-01</td>
					<td class="right aligned">阅读量：333</td>
				</tr>
				<tr>
					<td>
						<i class="caret left icon"></i>
						<i class="angle left icon"></i>
						<i class="angle right icon"></i>
						<i class="caret right icon"></i>
					</td>
					<td colspan="2" class="right aligned">
				        第1页，共99页，297条
				    </td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
export default {
	name: 'message-history',
	methods:{
	},
	data () {
	    return {
	    }
	}
}
</script>

<style>
	a{
		color: inherit;
	}
</style>


















