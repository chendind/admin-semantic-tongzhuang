<template>
	<div>
		<div class="ui top attached tabular menu">
		  	<div class="item">客户列表</div>
		</div>
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
     	<button class="ui button left floated" @click="chooseAll">全选</button>
     	<button class="ui button right floated">上传</button>
	</div>
</template>

<script>
export default {
	name: 'message-choose',
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















