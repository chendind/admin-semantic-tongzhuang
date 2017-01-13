<template>
    <div class="image-container">
        <div class="image-container-inner" :style="{height: height + 'px'}" ref="container">

        </div>
    </div>
</template>
<script>
    function imgLoad(url){
        return new Promise((resolve, reject) => {
            var img = new Image()
            img.onload = ()=>{
                resolve(img)
            }
            img.onerror = (e)=>{
                reject(e)
            }
            img.src = url
        })
    }

    export default {
        props: {
            init: String,
            Height: Number
        },
        methods: {
            mountImage(url){
                imgLoad(this.init).then((img)=>{
                    this.$refs.container.appendChild(img)
                })
            }
        },
        created(){
            this.height = this.height || 300
        },
        mounted(){
            if (this.init != undefined) {
                imgLoad(this.init).then((img)=>{
                    this.img$ = img
                    this.$refs.container.appendChild(img)
                })
            }
            this.$on('img-change', (url)=>{
                this.img$.src = url
            })
        }
    }
</script>
<style lang="less">
    .image-container {
        display: table;
        width: 100%;
        table-layout: fixed;
        border-collapse: collapse;
    }
    .image-container-inner {
        display: table-cell;
        vertical-align: middle;
        text-align: center;

        & > img {
            border-radius: 5px;
            max-width: 80%;
            max-height: 300px;
            width: auto;
            height: auto;
        }
    }

</style>
