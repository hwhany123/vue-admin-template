<template>
  <div class="app-container">
    <router-link :to="{ name: 'Article_bxCreate'}">
      <el-button type="primary" size="mini">创建报销单</el-button>
    </router-link>
    <br>
    <br>
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>

      <el-table-column align="center" label="报销单号" width="95">
        <template slot-scope="scope">
          {{ scope.row.id}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="经办人" width="95">
        <template slot-scope="scope">
          {{ scope.row.author.username}}
        </template>
      </el-table-column>
      <el-table-column label="报销人" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.报销人">
            {{ scope.row.报销人}}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="部门" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.部门">
            {{ scope.row.部门}}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="是否享受车改" align="center" width="60px">
        <template slot-scope="scope">
          <span>{{ scope.row.是否享受车改}}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否公派车辆" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.是否公派车辆 !== null">
            {{ scope.row.是否公派车辆}}
          </div>
        </template>
      </el-table-column>

      <el-table-column label="事由" align="center">
        <template slot-scope="scope">
          <!--div @click="htm(x=scope.row.id)">{{ scope.row.title}}</div-->
          <router-link :to="{ name: 'ArticleDetail_xsz', params: { id: scope.row.id }}">
            {{ scope.row.事由}}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="行项目" align="center">
        <template slot-scope="scope">
          <!--div @click="htm(x=scope.row.id)">{{ scope.row.title}}</div-->

            <div class="hxmm">{{ scope.row.行项目}}</div>

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
        <template slot-scope="{row,$index}">
          <!--el-button type="primary" size="mini" @click="handleUpdate(row)">
            Edit
          </el-button-->
          <el-button type="primary" size="mini">
            <router-link :to="{ name: 'ArticleEdit', params: { id: row.id }}">
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
    deleteArticle
  } from '@/api/table_clbx'

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
          console.assert(this.list)
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
    .hxmm{
      white-space: nowrap;
      overflow: hidden;
    text-overflow: ellipsis;
    }
</style>
