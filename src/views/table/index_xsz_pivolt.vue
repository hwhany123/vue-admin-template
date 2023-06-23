<template>

  <div class="app-container">
    <h2 style="text-align: center">行政费用统计表</h2>

    <el-input type="number" v-model="begin" placeholder="输入查询起始月份" ></el-input>
    <el-input type="number" v-model="end" placeholder="输入查询结束月份" ></el-input>

    <el-button type="primary" size="mini" @click="search">查询</el-button>

    <br>
    <br>

    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row :header-cell-style="{background:'#778899',color:'white'}" >







      <el-table-column v-for="col in columns" :label="col" :prop="col" :key="col">

      </el-table-column>


    </el-table>
    <hr>
    <br>
     <h2 style="text-align: center">行政费用明细表</h2>


    <br>

    <el-table v-loading="listLoading" :data="detail" element-loading-text="Loading" border fit highlight-current-row :header-cell-style="{background:'#778899',color:'white'}" >







      <el-table-column v-for="col in columns2" :label="col" :prop="col" :key="col">

      </el-table-column>


    </el-table>


  </div>
</template>

<script>
  import {
    getPivolt,
    getDetail,
    deleteArticle
  } from '@/api/table_xsz'

  export default {

    data() {
      return {
        begin:null,
        end:null,
        list: null,
        detail:null,
        columns:[],
        columns2:[],
        listLoading: false
      }
    },
    //created() {
     // this.fetchData()
    //},
    methods: {
      search() {

        let data = {
          begin: this.begin,
          end:this.end
        };
        this.listLoading = true;
        getPivolt(data).then(response => {

          this.list = response[0]
          this.detail = response[1]
          console.log('list', this.list)
          console.log('detail', this.detail)
          this.columns = Object.keys(this.list[0]).reverse()
          this.columns2 = Object.keys(this.detail[0])



          this.listLoading = false
        });
      },

      fetchData() {
        this.listLoading = true
        getPivolt().then(response => {

          this.list = response
           console.log('list',this.list[0])
          this.columns=Object.keys(this.list[0]).reverse()
          console.log('cols',this.columns)


          this.listLoading = false
        })
      },



      formatted_time: function (iso_date_string) {
        const date = new Date(iso_date_string);
        return date.toLocaleDateString()},
    },
  }
</script>

<style scoped>
    .tag {
        padding: 2px 5px 2px 5px;
        margin: 5px 5px 5px 0;
        font-family: Georgia, Arial, sans-serif;
        font-size: small;
        background-color: #4e4e4e;
        color: whitesmoke;
        border-radius: 5px;
    }
    .category {
        padding: 5px 10px 5px 10px;
        margin: 5px 5px 5px 0;
        font-family: Georgia, Arial, sans-serif;
        font-size: small;
        background-color: darkred;
        color: whitesmoke;
        border-radius: 15px;

    }
</style>
