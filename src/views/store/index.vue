<template>
  <div class="app-container">
    <router-link :to="{ name: 'StoreCreate'}">
      <el-button type="primary" size="mini">创建文章</el-button>
    </router-link>
    <br>
    <br>
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="标题图" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.avatar">
            <img :src="scope.row.avatar.content" width="80" height="80" >
          </div>
        </template>
      </el-table-column>
      <el-table-column label="标题" align="center">
        <template slot-scope="scope">
          <!--div @click="htm(x=scope.row.id)">{{ scope.row.title}}</div-->
          <router-link :to="{ name: 'StoreDetail', params: { id: scope.row.id }}">
            {{ scope.row.title}}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="作者" align="center" width="60px">
        <template slot-scope="scope">
          <span>{{ scope.row.author.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="标签" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.tags !== null">
            <span v-for="tag in scope.row.tags" v-bind:key="tag" class="tag">{{ tag }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="分类" align="center" width="100px">
        <template slot-scope="scope">
          <span v-if="scope.row.category !== null" class="category">
            {{ scope.row.category.title }}
          </span>

        </template>
      </el-table-column>

      <el-table-column align="center" prop="created_at" label="更新时间" width="100px">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ formatted_time(scope.row.updated)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="文章内容" align="center" width="60px">
        <template slot-scope="scope">
          <div>
            <router-link :to="{ name: 'StoreDetail', params: { id: scope.row.id }}">
              -详情-
            </router-link>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center" width="330" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <!--el-button type="primary" size="mini" @click="handleUpdate(row)">
            Edit
          </el-button-->
          <el-button type="primary" size="mini">
            <router-link :to="{ name: 'StoreEdit', params: { id: row.id }}">
              编辑
            </router-link>
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {
    getList,
    getDetail,
    deleteStore
  } from '@/api/store'

  export default {
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'gray',
          deleted: 'danger'
        }
        return statusMap[status]
      }
    },
    data() {
      return {
        list: null,
        listLoading: true,
        tobody: null,
        temp: {
          id: undefined,
          importance: 1,
          remark: '',
          timestamp: new Date(),
          title: '',
          type: '',
          status: 'published'
        },
        dialogFormVisible: false,
        dialogStatus: '',
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        this.listLoading = true
        getList().then(response => {
          
          this.list = response.results
          this.listLoading = false
        })
      },
      htm(x) {
        this.listLoading = true
        getDetail(x).then(response => {
          
          this.tobody = response.body
          this.listLoading = false

          return response.body
        })
      },
      handleUpdate(row) {
        this.temp = Object.assign({}, row) // copy obj
        this.temp.timestamp = new Date(this.temp.timestamp)
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          //this.$refs['dataForm'].clearValidate()
        })
      },
      handleDelete(row, index) {
        this.$notify({
          title: 'Success',
          message: 'Delete Successfully'+row.title+'has be deleted',
          type: 'success',
          duration: 2000
        })
        this.list.splice(index, 1)
        deleteStore(row.id)
          .then(function(response){
            that.$router.push({
              name: 'Table'
            })
          })

      },
      handleModifyStatus(row, status) {
        this.$message({
          message: '操作Success',
          type: 'success'
        })
        row.status = status
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
