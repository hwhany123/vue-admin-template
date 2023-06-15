<template>
  <div class="grid-container">
    <div  id="title">
      <h2>差旅费报销单</h2>
      </br>
      <hr>


      <div id="pzh" class="row">
        <div class="col-lg-3">报销人：{{ list.报销人 }}</div>
        <div class="col-lg-3">部门：{{ list.部门 }}</div>
        <div class="col-lg-3">是否享受车改：<input type="checkbox" :checked="list.是否享受车改" disabled=True></div>
        <div class="col-lg-3">是否公派车辆/；<input type="checkbox" :checked="list.是否公派车辆" disabled=True></div>
      </div>
      </br>
      <div id="pzh" class="row">最后修改时间：{{ formatted_time2(list.updated) }}</div>




      </br>
      <hr>
      </br>
      <div id="hs">
        出差事由：
        <div><textarea v-model="list.事由" placeholder="输入事由" rows="2" cols="90"></textarea></div>

        </br>
        <el-button type="primary" size="mini">
          <router-link :to="{ name: 'ArticleEdit_bx', params: { id:list.id}}">
            修改
          </router-link>
        </el-button>
        </br>
        <div id="pzh" class="row"><div>报销单号：{{ list.id }}</div><div></br></div><div>单据日期：{{ formatted_time(list.created) }}</div></div>
        </br>
        <el-table v-loading="listLoading" :data="list.行项目" element-loading-text="Loading" border fit highlight-current-row :header-cell-style="{background:'#778899',color:'white'}" >

          <el-table-column align="center" label="序号" width="95">
            <template slot-scope="scope">
              {{ scope.row.id}}
            </template>
          </el-table-column>
          <el-table-column label="起始日期" align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.起始日期">
                {{ scope.row.起始日期}}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="结束日期" align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.结束日期">
                {{ scope.row.结束日期}}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="出发地" align="center" width="60px">
            <template slot-scope="scope">
              <span>{{ scope.row.出发地}}</span>
            </template>
          </el-table-column>
          <el-table-column label="目的地" align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.目的地 !== null">
                {{ scope.row.目的地}}
              </div>
            </template>
          </el-table-column>

          <el-table-column label="补贴" align="center">
            <template slot-scope="scope">


                {{ scope.row.补贴}}

            </template>
          </el-table-column>
          <el-table-column label="交通工具类型" align="center">
            <template slot-scope="scope">
              <!--div @click="htm(x=scope.row.id)">{{ scope.row.title}}</div-->

              {{ scope.row.交通工具类型}}

            </template>
          </el-table-column>
          <el-table-column label="交通费" align="center">
            <template slot-scope="scope">
              <!--div @click="htm(x=scope.row.id)">{{ scope.row.title}}</div-->

              {{ scope.row.交通费}}

            </template>
          </el-table-column>
          <el-table-column label="住宿地点" align="center">
            <template slot-scope="scope">
              <!--div @click="htm(x=scope.row.id)">{{ scope.row.title}}</div-->

              {{ scope.row.住宿地点}}

            </template>
          </el-table-column>
          <el-table-column label="住宿费" align="center">
            <template slot-scope="scope">
              <!--div @click="htm(x=scope.row.id)">{{ scope.row.title}}</div-->

              {{ scope.row.住宿费}}

            </template>
          </el-table-column>
          <el-table-column label="其他费用" align="center">
            <template slot-scope="scope">
              <!--div @click="htm(x=scope.row.id)">{{ scope.row.title}}</div-->

              {{ scope.row.其他费用}}

            </template>
          </el-table-column>

        </el-table>
      </div>
    </div>
  </div>

</template>

<script>
  import {
    getList,
    getDetail
  } from '@/api/table_clbx'
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
        console.log("差旅报销",this.list)
        })
      },
      hh(args){
        console.log(args)
        return {
          backgroundColor:'red'
        }

      },
      formatted_time: function (iso_date_string) {
        const date = new Date(iso_date_string);
        return date.toLocaleDateString()},
      formatted_time2: function (iso_date_string) {
        const date2 = new Date(iso_date_string);
        return date2.toLocaleDateString()+" "+date2.toLocaleTimeString()},
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
    #title {
        text-align: center;
        font-size: small;
        color: black;
    }
    #hs {
        text-align: left;
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
    .row {
      display: flex;
      justify-content: space-around;
    }
</style>
