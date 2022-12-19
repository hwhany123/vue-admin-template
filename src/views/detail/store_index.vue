<template>
  <div class="grid-container">
    <div><h1 id="title">{{ article.title }}</h1>
       <p id="subtitle">本文由 {{ article.author.username }} 发布于 {{formatted_time(article.created)}}
      </p>
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
    components: {Comments,},
    data() {
      return {
        //listLoading: true,
        article: null,
      }
    },
    mounted() {
      this.fetchData()
    },
    methods:{
      fetchData() {
        getDetail(this.$route.params.id).then(response => {

        this.article = response
        })
      },
      formatted_time: function (iso_date_string) {
        const date = new Date(iso_date_string);
        return date.toLocaleDateString()},
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
</style>
