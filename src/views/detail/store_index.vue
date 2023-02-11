<template>
  <div class="grid-container">
    <div>
      <h1 id="title">{{ article.title }}</h1>
      <p id="subtitle">本文由 {{ article.author.username }} 发布于 {{formatted_time(article.created)}}</p>
      <el-row :gutter="20"  >
        <el-col :span="5" >规格： <div class="grid-content bg-purple" >{{ article.specification }} </div></el-col>
        <el-col :span="5" >成本： <div class="grid-content bg-purple">{{ article.cost }}</div> </el-col>
        <el-col :span="5" >数量： <div class="grid-content bg-purple">{{ article.count }}</div> </el-col>
        <el-col :span="5" >单价： <div class="grid-content bg-purple">{{ article.price }}</div> </el-col>
        <el-col :span="4" >折扣： <div class="grid-content bg-purple">{{ article.discount }}</div> </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="center"><img src="https://s2.cn.bing.net/th?id=OJ.AR0cTRmf9y09BQ&w=120&h=120&c=8&rs=1&pid=academic" /></el-row>浏览图片
      <el-row type="flex" class="row-bg" justify="center"><img :src="article.avatar.content" with="50%" /></el-row>
      <div v-html="article.body_html" class="article-body"></div>

    </div>

    <div>
      <h3>目录</h3>
      <div v-html="article.toc_html" class="toc">

      </div>
    </div>
    <Comments :article="article" />
  </div>



</template>

<script>
  import {
    getList,
    getDetail
  } from '@/api/store'
  import Comments from '@/components/comment/Comments_store.vue'

  export default {
    components: {
      Comments,
    },
    data() {
      return {
        //listLoading: true,
        article: null,
      }
    },
    mounted() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        getDetail(this.$route.params.id).then(response => {

          this.article = response
        })
      },
      formatted_time: function(iso_date_string) {
        const date = new Date(iso_date_string);
        return date.toLocaleDateString()
      },
    },
  }
</script>

<style scoped>
  .grid-container {
    display: grid;
    grid-template-columns: 3fr 1fr;
    margin-left: 20px;
  }


  #title {
    text-align: center;
    font-size: x-large;
  }

  #subtitle {
    text-align: center;
    color: gray;
    font-size: small;
  }
</style>

<style>
  .article-body p img {
    max-width: 100%;
    border-radius: 50px;
    box-shadow: gray 0 0 20px;
  }

  .toc ul {
    list-style-type: none;
  }

  .toc a {
    color: gray;
  }

  .el-row {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
