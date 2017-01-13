<template>
	<div>
		<div class="ui fluid input">
			<div class="ui label huge">标题</div>
		  	<input type="text">
		</div>
		<div class="ui selection dropdown">
		    <input type="hidden" name="font">
		    <i class="dropdown icon"></i>
		    <div class="default text">字体</div>
		    <div class="menu">
		        <div class="item" data-value="1">AAA</div>
		        <div class="item" data-value="0">BBB</div>
		    </div>
		</div>
		<!-- <div class="ui selection dropdown">
		    <input type="hidden" name="font-size">
		    <i class="dropdown icon"></i>
		    <div class="default text">字号</div>
		    <div class="menu">
		        <div class="item" data-value="0">AAA</div>
		        <div class="item" data-value="1">BBB</div>
		    </div>
		</div> -->
	</div>
</template>

<script>
export default {
	name: 'message-new',
	methods:{
	},
	data () {
	    return {
	    }
	}
}
</script>



















