<template>
  <div id="article-create">
    <h3>发表文章</h3>
    <form>
      <div class="form-elem">
        <span>id：</span>
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
        <input type="checkbox" :checked="是否享受车改">
      </div>
      <div class="form-elem">
        <span>是否公派车辆：</span>
        <input type="checkbox" :checked="是否公派车辆">
      </div>
      <div class="form-elem">
        <span>事由：</span>
        <textarea v-model="事由" placeholder="输入事由" rows="1" cols="80"></textarea>
      </div>
      <div class="form-elem">
        <span>行项目：</span>
        <input type="text" v-model="行项目">
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
        //
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
        行项目: [],


        // 标题图

      }
    },
    mounted() {

    },
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
        data.行项目=JSON.parse(data.行项目)
        console.log("data数据：",data)


        //{headers: {Authorization: 'Bearer ' + getToken()}},
        postArticle(data).then(function(response) {
          console.log('ghj:', response);
          that.$router.push({
            name: 'ArticleDetail_bxclf',
            params: {
              id: response.data.id
            }
          });
        })
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
