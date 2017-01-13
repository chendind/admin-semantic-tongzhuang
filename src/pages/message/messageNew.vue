<template>
	<div>
		<div class="ui fluid input">
			<div class="ui label huge">标题</div>
		  	<input type="text">
		</div>
		<br>
		<div class="field">
        	<tinymce height="300">content here...</tinymce>
     	</div>
     	<br>
     	<button class="ui button right floated">上传</button>
     	<button class="ui button right floated">保存</button>
	</div>
</template>

<script>
import tinymce from 'components/Tinymce.vue'
export default {
	name: 'message-new',
	components: {
	    tinymce
	},
	methods:{
	},
	data () {
	    return {
	    }
	}
}
</script>















