<template>
  <div id="article-create">
    <h3>发表文章</h3>
    <form id="image_form">
      <div class="form-elem">
        <span>图片：</span>
        <input v-on:change="onFileChange" type="file" id="file">
      </div>
    </form>
    <form>
      <div class="form-elem">
        <span>标题：</span>
        <input v-model="title" type="text" placeholder="输入标题">
      </div>

      <div class="form-elem">
        <span>分类：</span>
        <span v-for="category in categories" :key="category.id">
          <!--样式也可以通过 :style 绑定-->
          <button class="category-btn" :style="categoryStyle(category)" @click.prevent="chooseCategory(category)">
            {{category.title}}
          </button>
        </span>
      </div>

      <div class="form-elem">
        <span>标签：</span>
        <input v-model="tags" type="text" placeholder="输入标签，用逗号分隔">
      </div>

      <div class="form-elem">
        <span>正文：</span>
        <textarea v-model="body" placeholder="输入正文" rows="20" cols="80"></textarea>
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
  } from '@/api/table';

  export default {
    name: 'ArticleCreate',
    components: {},
    data: function() {
      return {
        // 文章标题
        title: '',
        // 文章正文
        body: '',
        // 数据库中所有的分类
        categories: [],
        // 选定的分类
        selectedCategory: null,
        // 标签
        tags: '',
        // 标题图
        avatarID: null,
      }
    },
    mounted() {
      // 页面初始化时获取所有分类
      axios
        .get('/api/category/')
        .then(response => this.categories = response.data)
    },
    methods: {
      onFileChange(e) {
        const file = e.target.files[0];
        // this.imageUrl = URL.createObjectURL(file);


        let formData = new FormData();
        formData.append("content", file);

        // 省去鉴权和错误处理的部分
        postImage(formData)
          .then(response => this.avatarID = response.data.id)
      },
      // 根据分类是否被选中，按钮的颜色发生变化
      // 这里可以看出 css 也是可以被 vue 绑定的，很方便
      categoryStyle(category) {
        if (this.selectedCategory !== null && category.id === this.selectedCategory.id) {
          return {
            backgroundColor: 'black',
          }
        }
        return {
          backgroundColor: 'lightgrey',
          color: 'black',
        }
      },
      // 选取分类的方法
      chooseCategory(category) {
        // 如果点击已选取的分类，则将 selectedCategory 置空
        if (this.selectedCategory !== null && this.selectedCategory.id === category.id) {
          this.selectedCategory = null
        }
        // 如果没选中当前分类，则选中它
        else {
          this.selectedCategory = category;
        }
      },
      // 点击提交按钮
      submit() {
        const that = this;
        // 前面封装的验证函数又用上了

        let data = {
          title: that.title,
          body: that.body,
        };
        // 添加标题图
        data.avatar_id = that.avatarID;

        // 添加分类
        if (that.selectedCategory) {
          data.category_id = that.selectedCategory.id
        }
        // 标签预处理
        data.tags = that.tags
          // 用逗号分隔标签
          .split(/[,，]/)
          // 剔除标签首尾空格
          .map(x => x.trim())
          // 剔除长度为零的无效标签
          .filter(x => x.charAt(0) !== '');
        
        //{headers: {Authorization: 'Bearer ' + getToken()}},
        postArticle(data).then(function(response) {
          
          that.$router.push({
            name: 'ArticleDetail',
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
