<template>
  <section>
    <el-row>
      <el-col :span="24">
        <!--表单-->
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="姓名">
            <el-input v-model="formInline.user.name" placeholder="姓名" style="width: 140px;"></el-input>
          </el-form-item>
          <el-form-item label="年份">
            <el-date-picker
              v-model="formInline.user.date"
              align="right"
              type="year"
              placeholder="选择年份"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="地址">
            <el-cascader
              expand-trigger="hover"
              :options="options"
              v-model="formInline.user.address"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="籍贯">
            <el-select v-model="formInline.user.place" placeholder="请选择">
              <el-option v-for="item in places" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <a
            href="javascript:;"
            id="download"
            style="background-color:#409EFF;color: #fff;padding: 12px 10px!important;margin-left: 10px!important;border-radius:4px "
            @click="download()"
            download="download.csv"
          >导出数据</a>
        </el-form>

        <el-container style="max-height: 80vh">
          <el-aside width="360px" class="activities">
            <!--表格-->
            <el-table :data="tableData" :show-header="false" size="mini" border style="width: 100%">
              <!-- @row-click="handleTableRowClick" > -->
              <!-- <el-table-column prop="date" label="出生日期" width="180"> -->
              <el-table-column>
                <template scope="scope">
                  <el-container @click.native="handleShowActivity(scope.$index, scope.row)">
                    <!-- <el-aside width="60px" style="text-align:center"> -->
                    <img :src="scope.row.avatar" class="image">
                    <!-- </el-aside> -->
                    <el-main style="padding: 5px">
                      <el-row>
                        <div style="float:right">
                          <span class="activity-info">点赞({{scope.row.likes}})</span>
                          <span class="separate"/>
                          <span class="activity-info">评论({{scope.row.replies}})</span>
                        </div>
                        <span class="name">{{ scope.row.name }}</span>
                        <span class="activity-info">{{ scope.row.activity }}</span>
                      </el-row>
                      <el-row>
                        <span class="date">{{ scope.row.date }}</span>
                        <span class="separate"/>
                        <span>{{scope.row.company}}</span>
                      </el-row>
                    </el-main>
                  </el-container>
                  <p class="description short">{{ scope.row.description }}</p>
                </template>
              </el-table-column>
              <!-- <el-table-column label="操作">
                <template scope="scope">
                  <el-button
                    type="primary"
                    style="display: block;"
                    size="small"
                    @click="handleEdit(scope.$index, scope.row)"
                  >编辑</el-button>
                  <el-button
                    type="danger"
                    size="small"
                    @click="handleDelete(scope.$index, scope.row)"
                  >删除</el-button>
                </template>
              </el-table-column>-->
            </el-table>
          </el-aside>

          <el-main class="activity-detail">
            <el-container>
              <!-- <el-aside width="88px" > -->
              <img :src="currentItem.avatar" class="avatar">
              <!-- </el-aside> -->
              <el-main style="padding: 5px">
                <el-row class="detail-row">
                  <span class="name">{{ currentItem.name }}</span>
                  <span class="activity-info">{{ currentItem.activity }}</span>
                  <el-button
                    type="text"
                    style="float:right;padding: 0"
                    plain
                    @click="handleEdit()"
                  >编辑</el-button>
                </el-row>
                <el-row class="detail-row">
                  <span class="date">{{ currentItem.date }}</span>
                </el-row>
                <el-row class="detail-row">
                  <span class="address">{{ currentItem.address }}</span>
                </el-row>
              </el-main>
            </el-container>
            <p class="description">{{ currentItem.description }}</p>
            <div style="float:right">
              <el-button type="text" @click="handleLike">点赞</el-button>
              <span class="separate"/>
              <el-button type="text" icon="el-icon-edit" @click="handleComment">评论</el-button>
            </div>
            <el-input v-model="commentInput" type="textarea" autosize placeholder="请输入内容"></el-input>
          </el-main>
          <el-aside style="padding: 0 10px">
            <span class="title">基本信息</span>
            <el-form label-position="top" size="medium" inline class="demo-table-expand">
              <el-form-item label="客户名称">
                <span>{{ currentItem.company }}</span>
              </el-form-item>
            </el-form>

            <span class="title">其他信息</span>
            <el-form label-position="top" inline size="mini" class="demo-table-expand">
              <el-form-item label="拜访时间">
                <span>2019.1.20 09:10</span>
              </el-form-item>
              <el-form-item label="提交时间">
                <span>2019.1.20 18:30</span>
              </el-form-item>
            </el-form>
          </el-aside>
        </el-container>

        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="100"
            layout="prev, pager, next, jumper"
            :total="1000"
          ></el-pagination>
        </div>
      </el-col>
    </el-row>
    <el-dialog title="修改个人信息" :visible="dialogFormVisible" size="tiny">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSave" :loading="editLoading">修改</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </section>
</template>
<script type="text/ecmascript-6">
const ERR_OK = "000";
export default {
  data() {
    return {
      formInline: {
        user: {
          name: "",
          date: "",
          address: [],
          place: ""
        }
      },
      tableData: [],
      options: [],
      places: [],
      dialogFormVisible: false,
      editLoading: false,
      form: {
        name: "",
        address: "",
        date: ""
      },
      currentPage: 1,
      table_index: 0,
      commentInput: ""
    };
  },
  created() {
    this.$http.get("/api/getTable").then(response => {
      response = response.data;
      if (response.code === ERR_OK) {
        this.tableData = response.datas;
      }
    });
    this.$http.get("/api/getOptions").then(response => {
      response = response.data;
      if (response.code === ERR_OK) {
        this.options = response.datas;
        this.places = response.places;
      }
    });
  },
  computed: {
    // a computed getter
    currentItem: function() {
      // `this` points to the vm instance
      if (!this.tableData || this.tableData.length === 0) {
        return {
          name: "",
          company: "",
          address: ""
        };
      }
      if (this.table_index >= this.tableData.length || this.table_index < 0) {
        this.table_index = 0;
      }
      return this.tableData[this.table_index];
    }
  },
  methods: {
    handleShowActivity(index, row) {
      console.log("click row " + index);
      this.table_index = index;
    },
    onSubmit() {
      this.$message("模拟数据，这个方法并不管用哦~");
    },
    handleDelete(index, row) {
      this.tableData.splice(index, 1);
      this.$message({
        message: "操作成功！",
        type: "success"
      });
    },
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      this.form = Object.assign({}, row);
      this.table_index = index;
    },
    handleComment() {},
    handleLike() {},
    handleSave() {
      this.$confirm("确认提交吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        cancelButtonClass: "cancel"
      })
        .then(() => {
          this.editLoading = true;
          let date = this.form.date;
          if (typeof date === "object") {
            date = [
              date.getFullYear(),
              date.getMonth() + 1,
              date.getDate()
            ].join("-");
            this.form.date = date;
          }
          //          this.tableData[this.table_index] = this.form;
          this.tableData.splice(this.table_index, 1, this.form);
          this.$message({
            message: "操作成功！",
            type: "success"
          });
          this.editLoading = false;
          this.dialogFormVisible = false;
        })
        .catch(() => {});
    },
    download: function() {
      console.log("xiazai");
      var obj = document.getElementById("download");
      var str = "姓名,出生日期,地址\n";
      for (var i = 0; i < this.tableData.length; i++) {
        var item = this.tableData[i];
        str += item.name + "," + item.date + "," + item.address;
        str += "\n";
      }
      console.log(obj);
      str = encodeURIComponent(str);
      console.log(str);
      obj.href = "data:text/csv;charset=utf-8,\ufeff" + str;
      obj.download = "download.csv";
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(`当前页: ${val}`);
    }
  }
};
</script>
<style>
.el-pagination {
  text-align: center;
  margin-top: 30px;
}
.el-message-box__btns .cancel {
  float: right;
  margin-left: 10px;
}

.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  /* width: 90px; */
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  display: block;
  margin-right: 0;
  margin-bottom: 0;
  /* width: 50%; */
}

.title {
  font-size: large;
  font-weight: bold;
  padding: 20px 0 20px;
  line-height: 60px;
}

.activity-detail {
  /* height: 100vh; */
  /* auto; */
  /* height: 500px;  */
  /* text-align: center; */
  border: 1px solid #eee;
  padding: 0 15px;
}

.detail-row {
  padding: 5px 0;
}

.activities {
  background-color: rgb(238, 241, 246);
  margin: 0;
  /* height:calc(100vh - 20px); */
  /* height:calc(100vh - 20px); */
  max-height: 80vh;
}

.image {
  width: 50px;
  height: 50px;
  display: block;
  margin: auto;
}

.avatar {
  width: 80px;
  height: 80px;
  text-align: center;
  margin: auto;
  /* padding: 3px; */
}

.name {
  /* font-size: medium; */
  padding: 0 10px 0 0;
}

.activity-info {
  color: #3a8ee6;
  /* padding: 10px; */
}

.extra-info {
  display: flex;
  /* position: absolute; */
  height: 40px;
}

.address {
  /* padding: 10px 0 10px; */
}
.address:before {
  content: "地址：";
}

.description {
  padding: 5px 0 5px;
  line-height: normal;
}

.short {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.date {
  /* text-align: center; */
}

.separate::before {
  color: #409eff;
  padding: 0 3px;
  content: "|";
}
</style>
