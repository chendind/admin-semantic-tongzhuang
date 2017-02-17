<template>
    <div>
        <textarea :id="id">
            <slot></slot>
        </textarea>
        <image-choose-modal id="tinymce-imageChooseModal" v-on:finishChoose="finishChoose"></image-choose-modal>
    </div>

</template>
<script>
import imageChooseModal from 'components/ImageChooseModal.vue'
import ajax from 'src/ajax/ajax.js'
var id = 0

export default {
    name: 'tinymce',
    props: ['height'],
    components: {
        'image-choose-modal': imageChooseModal
    },
    methods:{
      waitFinishChoose(callback){
        self.deferred = $.Deferred();
        $.when(self.deferred).done(function(data){
          callback(data.src)
        })
      },
      finishChoose(src){
        self.deferred.resolve({"src": src})
      },
      getContent(){
        if (this.editor) {
          this.content = this.editor.getContent()
        }
        return this.content
      },
      setContent(content){
        if (this.editor) {
          this.editor.setContent(content)
        }
        this.content = content
      }
    },
    data () {
      return {
        id:`tm${id++}`,
        deferred: {},
        content: ""
      }
    },
    mounted(){
        var self = this;
        var editor_p =  tinymce.init({
            selector: `#${this.id}`,
            height: self.height,
            theme: 'modern',
            language: 'zh_CN',
            plugins: [
                'lineheight advlist autolink lists link image charmap print preview hr anchor pagebreak',
                'searchreplace wordcount visualblocks visualchars code fullscreen',
                'insertdatetime media nonbreaking save table contextmenu directionality',
                'emoticons template powerpaste textcolor colorpicker textpattern imagetools'
            ],
            toolbar1: 'insertfile undo redo | fontselect | fontsizeselect | styleselect | lineheightselect | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent',
            toolbar2: 'link image media | forecolor backcolor emoticons print preview', //| example
            font_formats: '宋体=SimSun,STSong;黑体=SimHei,STHeiti;微软雅黑=Microsoft YaHei;楷体=KaiTi,STKaiti;Arial=arial,helvetica,sans-serif;Courier New=courier new,courier,monospace;AkrutiKndPadmini=Akpdmi-n',
            lineheight_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt 48pt 60pt 72pt',
            fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt 48pt 60pt 72pt',
            indentation: '2em',
            init_instance_callback: function (editor) {
                editor.on('keydown', function (e) {
                    // tab键缩紧2格
                    if(e.keyCode == 9){
                        e.preventDefault();
                        this.execCommand("Indent");
                    }
                });
                editor.on('keyup', function (e) {
                    if(e.keyCode == 9){

                    }
                });
            },
            file_browser_callback: function(field_name, url, type, win) {

            },
            file_picker_callback: function(callback, value, meta) {
                // Provide file and text for the link dialog
                if (meta.filetype == 'file') {
                    callback('mypage.html', {text: 'My text'});
                }

                // Provide image and alt text for the image dialog
                if (meta.filetype == 'image') {
                    $("#tinymce-imageChooseModal").modal('show')
                    self.waitFinishChoose(callback);
                }

                // Provide alternative source and posted for the media dialog
                if (meta.filetype == 'media') {
                    callback('movie.mp4', {source2: 'alt.ogg', poster: 'image.jpg'});
                }
            },
            file_browser_callback_types: 'file image media',
            powerpaste_word_import: 'propmt',// propmt, merge, clear
            powerpaste_html_import: 'propmt',// propmt, merge, clear
            powerpaste_allow_local_images: true,
            paste_data_images: true,
            images_upload_handler: function (blobInfo, success, failure) {
              ajax.upload(blobInfo.blob()).done(function(data){
                success(data.detail)
              })
            },
            templates: [
                { title: 'Test template 1', content: 'Test 1' },
                { title: 'Test template 2', content: 'Test 2' }
            ],
            content_style: "body{font-family: sans-serif !important;}"
        });
        editor_p.then((editors)=>{
            this.editor = editors[0]
            this.editor.setContent(this.content)
        })

    }
}
</script>
