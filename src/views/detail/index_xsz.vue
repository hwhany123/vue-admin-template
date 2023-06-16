<template>
  <div class="grid-container">
    <div>
      <h1 id="title">{{ list.摘要 }}</h1>
      <div id="pzh">{{ list.年 }}年{{ list.月 }}月----{{ list.凭证号 }}</div>
      <div>
        <table border="1">
          <tr>
            <th>科目名称</th>
            <th v-if="list.费用">费用</th>
            <th v-if="list.新部门">部门</th>
            <th v-if="list.客商">客商</th>
            <th v-if="list.人员">人员</th>
            <th v-if="list.项目">项目</th>
            <th v-if="list.安全环保投入范围">安全环保投入范围</th>
            <th v-if="list.成本对象">成本对象</th>
            <th v-if="list.物料名称">物料名称</th>
            <th v-if="list.税率">税率</th>
            <th v-if="list.银行账户">银行账户</th>
            <th>摘要</th>
            <th>借方</th>
            <th>贷方</th>
          </tr>
          <tr>
            <td>{{ list.科目名称 }}</td>
            <td v-if="list.费用">{{ list.费用 }}</td>
            <td v-if="list.新部门">{{ list.新部门 }}</td>
            <td v-if="list.客商">{{ list.客商 }}</td>
            <td v-if="list.人员">{{ list.人员 }}</td>
            <td v-if="list.项目">{{ list.项目 }}</td>
            <td v-if="list.安全环保投入范围">{{ list.安全环保投入范围 }}</td>
            <td v-if="list.成本对象">{{ list.成本对象 }}</td>
            <td v-if="list.物料名称">{{ list.物料名称 }}</td>
            <td v-if="list.税率">{{ list.税率 }}</td>
            <td v-if="list.银行账户">{{ list.银行账户 }}</td>
            <td>{{ list.摘要 }}</td>
            <td>{{ list.借方 }}</td>
            <td>{{ list.贷方 }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>

</template>

<script>
  import {
    getList,
    getDetail
  } from '@/api/table_xsz'
  import Comments from '@/components/comment/Comments.vue'

  export default {
    components: {Comments,},
    data() {
      return {
        //listLoading: true,
        list: null,
      }
    },
    mounted() {
      this.fetchData()
    },
    methods:{
      fetchData() {
        getDetail(this.$route.params.id).then(response => {

        this.list = response
        
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
    #pzh {
        text-align: center;
        font-size: small;
        color: gray;
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
