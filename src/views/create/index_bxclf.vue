<template>
  <div id="article-create">
    <h3>发表文章</h3>

    <form>
      <div class="form-elem">
        <span>报销单号：</span>
        <textarea v-model="id" placeholder="输入id" rows="1" cols="3"></textarea>
      </div>
      <div class="form-elem">
        <span>报销人：</span>
        <textarea v-model="报销人" placeholder="输入报销人" rows="1" cols="5"></textarea>
      </div>
      <div class="form-elem">
        <span>部门：</span>
        <textarea v-model="部门" placeholder="输入部门" rows="1" cols="15"></textarea>
      </div>
      <div class="form-elem">
        <span>是否享受车改：</span>
        <el-checkbox  v-model="是否享受车改"/>
      </div>
      <div class="form-elem">
        <span>是否公派车辆：</span>
        <el-checkbox v-model="是否公派车辆"/>
      </div>
      <div class="form-elem">
        <span>事由：</span>
        <textarea v-model="事由" placeholder="输入事由" rows="2" cols="80"></textarea>
      </div>
      <div>
        <el-button  @click="create_row">增行</el-button>

        <el-table v-loading="listLoading" ref="table2" :data="行项目" contenteditable="true" element-loading-text="Loading" border fit highlight-current-row :header-cell-style="{background:'#778899',color:'white'}" >

          <el-table-column align="center" label="序号" width="95">
            <template slot-scope="scope">
              <el-input v-model="scope.row.id"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="起始日期" align="center">
            <template slot-scope="scope">

                <el-input v-model="scope.row.起始日期"></el-input>

            </template>
          </el-table-column>
          <el-table-column label="结束日期" align="center">
            <template slot-scope="scope">

                <el-input v-model="scope.row.结束日期"></el-input>

            </template>
          </el-table-column>
          <el-table-column label="出发地" align="center" width="60px">
            <template slot-scope="scope">
              <el-input v-model="scope.row.出发地"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="目的地" align="center">
            <template slot-scope="scope">

                <el-input v-model="scope.row.目的地"></el-input>

            </template>
          </el-table-column>

          <el-table-column label="补贴" align="center">
            <template slot-scope="scope">


              <el-input v-model="scope.row.补贴"></el-input>

            </template>
          </el-table-column>
          <el-table-column label="交通工具类型" align="center">
            <template slot-scope="scope">
              <!--div @click="htm(x=scope.row.id)">{{ scope.row.title}}</div-->

              <el-input v-model="scope.row.交通工具类型"></el-input>

            </template>
          </el-table-column>
          <el-table-column label="交通费" align="center">
            <template slot-scope="scope">
              <!--div @click="htm(x=scope.row.id)">{{ scope.row.title}}</div-->

              <el-input v-model="scope.row.交通费"></el-input>

            </template>
          </el-table-column>
          <el-table-column label="住宿地点" align="center">
            <template slot-scope="scope">
              <!--div @click="htm(x=scope.row.id)">{{ scope.row.title}}</div-->

              <el-input v-model="scope.row.住宿地点"></el-input>

            </template>
          </el-table-column>
          <el-table-column label="住宿费" align="center">
            <template slot-scope="scope">
              <!--div @click="htm(x=scope.row.id)">{{ scope.row.title}}</div-->

              <el-input v-model="scope.row.住宿费"></el-input>

            </template>
          </el-table-column>
          <el-table-column label="其他费用" align="center">
            <template slot-scope="scope">
              <!--div @click="htm(x=scope.row.id)">{{ scope.row.title}}</div-->

              <el-input v-model="scope.row.其他费用"></el-input>

            </template>
          </el-table-column>
          <el-table-column label="文章内容" align="center" width="60px">
            <template slot-scope="scope">
              <div>
                <router-link :to="{ name: 'ArticleDetail_bxclf', params: { id: scope.row.id }}">
                  -详情-
                </router-link>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="Actions" align="center" width="330" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <!--el-button type="primary" size="mini" @click="handleUpdate(row)">
                Edit
              </el-button-->

              <el-button  type="danger" @click="handleDelete(scope.$index)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="form-elem">
        <button v-on:click.prevent="submit">提交</button>
      </div>
    </form>
  </div>
</template>

<script>
  import axios from 'axios';
  import {
    getToken
  } from '@/utils/auth'
  import {
    getList,
    getDetail,
    postArticle,
    postImage,
  } from '@/api/table_clbx';

  export default {
    name: 'Article_Create',
    components: {},
    data: function() {
      return {
        listLoading: false,
        id: null,
        报销人: null,
        //
        部门: null,
        //
        是否享受车改: false,
        //
        是否公派车辆: false,
        //
        事由: null,
        行项目: []
      }
    },
    //mounted() {

    //}
    methods: {


      // 点击提交按钮
      submit() {
        const that = this;
        // 前面封装的验证函数又用上了

        let data = {
          id:that.id,
          //

          报销人: that.报销人,
          //
          部门: that.部门,
          //
          是否享受车改: that.是否享受车改,
          //
          是否公派车辆: that.是否公派车辆,
          //
          事由: that.事由,
          行项目: that.行项目,
        };

        


        //{headers: {Authorization: 'Bearer ' + getToken()}},
        postArticle(data).then(function(response) {
          
          that.$router.push({
            name: 'ArticleDetail_bxclf',
            params: {
              id: response.data.id
            }
          });

        })
      },
      create_row(){

        this.行项目.push({"id": this.$refs.table2.data.length+1, "补贴":null , "交通费": null, "住宿费": null, "出发地": null, "目的地": null, "住宿地点": null, "其他费用": null, "结束日期": null, "起始日期": null, "交通工具类型": null})

      },
      handleDelete(row){
        let nm=[];
        this.listLoading=true;
        console.log("行",row)
        this.$refs.table2.data=this.$refs.table2.data.splice(row,1);
        for (let i=1;i<this.$refs.table2.data.length+1;i++){nm.push(i)};
        this.行项目.id=nm;
        console.log(this.行项目.id)
        this.listLoading=false;
      }

    }


  }
</script>

<style scoped>
  .category-btn {
    margin-right: 10px;
  }

  #article-create {
    text-align: center;
    font-size: large;
  }

  form {
    text-align: left;
    padding-left: 100px;
    padding-right: 10px;
  }

  .form-elem {
    padding: 10px;
  }

  input {
    height: 25px;
    padding-left: 10px;
    width: 50%;
  }

  button {
    height: 35px;
    cursor: pointer;
    border: none;
    outline: none;
    background: steelblue;
    color: whitesmoke;
    border-radius: 5px;
    width: 60px;
  }
</style>
