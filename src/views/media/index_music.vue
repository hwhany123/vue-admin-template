<template>
 <div style="">
   <div id="left">
     <div id="album"></div>
     <div id="info">
       脆弱一分钟
       <div>歌手：林宥嘉</div>
       <div>专辑：脆弱一分钟 </div>
     </div>
   </div>
   <div id="canvas">
     <canvas width="450" height="80"></canvas>
   </div>
   <div id="mask">
     <div id="gc"></div>
   </div>
   <div id="mse"></div>
   <Music :config="config"  @player="Player = $event"/>
 </div>
</template>

<script>
import Music from 'xgplayer-vue';

export default {
  components:{Music},
  data(){
    return {
      config: {
        id: 'mse',
        url: [
          {
            src: '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/music/audio.mp3',
            name: '林宥嘉·脆弱一分钟',
            vid: '000001',
            poster: '//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/music/poster-small.jpeg',

          }
        ],
        volume: 0.8,
        width: window.innerWidth,
        height: 50,
        preloadNext: true,
        switchKeepProgress: false,
        abCycle: {
          start: 3,
          end: 9,
          loop: true,
          play:null
        },
      },
      Player: null,
      }
  },
  created() {
    this.bfgc()
  },
  methods: {
    bfgc(){


    }
  },
}
</script>

<style type="text/css">
html, body {width:100%;height:100%;background:white;margin:auto;overflow: hidden;}
      body {background-image:url('//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/music/bg.jpg');background-size:100% 100%}
      #left {position:absolute;top:50px;left:0;width:50%;height:100%;margin-left:10%;z-index:1;}
      #mask {position:absolute;left: 50%;top:0;width:50%;height:100%;-webkit-mask-image:linear-gradient(to bottom,rgba(255,255,255,0) 0,rgba(255,255,255,.6) 15%,rgba(255,255,255,1) 25%,rgba(255,255,255,1) 75%,rgba(255,255,255,.1) 85%,rgba(255,255,255,0) 100%);}
      #gc {height:100%;display: block;position: relative;}
      #mse {position:absolute;bottom:0;left:0;}
      #album {height:55%;background-image:url('//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/music/poster-big.jpeg');background-size:60%;background-repeat:no-repeat;background-position:center left;}
      #info {font-size: 18px;line-height:40px;width:53%;color: white;}
      #info > div {font-size: 12px;line-height:16px;color: rgba(225,225,225,.8);}
      .xgplayer-lyric-item {
          display: block;
          text-align: center;
          line-height: 22px !important;
          font-size: 12px !important;
          color: rgba(225,225,225,.8) !important;
      }
      .xgplayer-lyric-item-active {
        color: rgb(49, 194, 124) !important;
      }
      #canvas {
        position:absolute;bottom:-5px;left:0;z-index:0;
        -webkit-mask-image:linear-gradient(to bottom,rgba(255,255,255,0.3) 0,rgba(255,255,255,.8) 70%,rgba(255,255,255,0.9) 100%);
      }
      .xgplayer-lrcWrap {
        border: 0px solid #ddd !important;
        height: 100% !important;
        padding: 0 !important;
      }
      .xgplayer-play {
        margin: -2px 0 0 !important;
      }
      .xgplayer-time {
        top: 50% !important;
      }
      .xgplayer-lrcForward {left: 0px !important;}
      .xgplayer-lrcBack {left: 0px !important;top: 75% !important;}

</style>
