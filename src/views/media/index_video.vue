<template>
 <div>视频播放器
 <Xgplayer :config="config" @player="Player = $event"/>
 </div>
</template>

<script>
import Xgplayer from 'xgplayer-vue';
export default {
  components:{Xgplayer},
  data(){
    return {
      config:{
        id: 'vs',
        url: "//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-360p.mp4",//修改为能播放的视频地址
        width: '100%',//宽度可以是 数字 ，也可以是百分比
        height: 600,
        playbackRate: [0.5, 0.75, 1, 1.5, 2],//倍速
      },
      Player: null
    }
  }
}

</script>

<style>

</style>
