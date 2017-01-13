<template>
	<div>
		<h3 class="ui header">客户列表</h3>
		<hr>
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
			$('input[type="checkbox"]').checked();
		}
	},
	data () {
	    return {
	    }
	}
}
</script>















