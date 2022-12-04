<template>
  <div class="app-container">
    <div><h1>{{ article.title }}</h1>       <p>本文由 {{ article.author.username }} 发布于 {{ article.created}}
      </p>
      <div v-html="article.body_html"></div>
    </div>
    <div>
      <h3>目录</h3>
      <div v-html="article.toc_html">

      </div>     </div>

  </div>
</template>

<script>
  import {
    getList,
    getDetail
  } from '@/api/table'

  export default {
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
      }
    },
  }
</script>
