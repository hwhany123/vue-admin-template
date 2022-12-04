<template>
  <div class="app-container">
    <router-link :to="{ name: 'ArticleCreate'}">
      发表新文章
    </router-link>
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="标题" align="center">
        <template slot-scope="scope">
          <!--div @click="htm(x=scope.row.id)">{{ scope.row.title}}</div-->
          <router-link :to="{ name: 'ArticleDetail', params: { id: scope.row.id }}">
            {{ scope.row.title}}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="作者" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="文章网址" align="center">
        <template slot-scope="scope">
          {{ scope.row.url }}
        </template>
      </el-table-column>

      <el-table-column align="center" prop="created_at" label="更新时间">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.updated }}</span>
        </template>
      </el-table-column>
      <el-table-column label="文章内容" align="center">
        <template slot-scope="scope">
          <div>
            <router-link :to="{ name: 'ArticleDetail', params: { id: scope.row.id }}">
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
            <router-link :to="{ name: 'ArticleEdit', params: { id: row.id }}">
              编辑
            </router-link>
          </el-button>
          <el-button v-if="row.status!='published'" size="mini" type="success"
            @click="handleModifyStatus(row,'published')">
            Publish
          </el-button>
          <el-button v-if="row.status!='draft'" size="mini" @click="handleModifyStatus(row,'draft')">
            Draft
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
            Delete
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
    deleteArticle
  } from '@/api/table'

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
          console.log('view.getlist:', response)
          this.list = response.results
          this.listLoading = false
        })
      },
      htm(x) {
        this.listLoading = true
        getDetail(x).then(response => {
          console.log('view.getdetail:', response)
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
        deleteArticle(row.id)
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

    }
  }
</script>
