<template>
  <div class="app-container">
    <div style="display: flex;justify-content: center">
      <el-steps :active="step" finish-status="success" :space="300" style="width: 500px" align-center>
        <el-step title="商品分类信息"/>
        <el-step title="商品基本信息"/>
        <el-step title="商品销售信息"/>
        <el-step title="商品发布"/>
      </el-steps>
    </div>
    <el-divider></el-divider>
    <div v-if="step == 0" style="display: flex;justify-content: center;">
      <el-form ref="form" :model="categoryForm" :rules="rules" label-width="80px">
        <el-form-item label="类目">
          <el-select v-model="categoryCode2" placeholder="请选择">
            <el-option-group
              v-for="group in options"
              :key="group.label"
              :label="group.label">
              <el-option
                v-for="item in group.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-option-group>
          </el-select>
          <el-select style="margin-left: 20px;" v-model="categoryForm.categoryCode" placeholder="请选择">
            <el-option
              v-for="item in options3th"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="品牌" prop="brandId" required>
          <el-select v-model="categoryForm.brandId" placeholder="请选择">
            <el-option
              v-for="item in brandOption"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
            <el-button style="margin-top: 12px;" @click="next">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-if="step == 1">

    </div>
    <div v-if="step == 2">

    </div>


  </div>
</template>

<script>
  import {treeSelect} from "@/api/goods/category";
  import {options} from "@/api/goods/brand";

  export default {
    data() {
      return {
        step: 0,
        categoryCode2: null,
        categoryForm: {
          categoryCode: null,
          brandId: null
        },
        options: [],
        options3th: [],
        brandOption: []
      }
    },
    created() {
      this.getOption();
    },
    watch: {
      categoryCode2: {
        handler(newValue, oldValue) {
          this.categoryForm.categoryCode = null;
          this.getOption3th(newValue);
        }
      },
      'categoryForm.categoryCode': {
        handler(newValue, oldValue) {
          if (newValue != null) {
            this.getBlandOptions(newValue);
          }
        }
      }
    },
    methods: {
      getOption3th(parentId) {
        treeSelect({parentId: parentId}).then(res => {
          var options = []
          for (var index in res) {
            var temp = {
              label: res[index].label,
              value: res[index].value
            }
            options.push(temp)
          }
          this.options3th = options;
        })
      },
      getOption() {
        treeSelect({level: 1}).then(res => {
          treeSelect({level: 2}).then(res2 => {
            var options = [];
            var map = {};
            for (var index in res) {
              map[res[index].id] = {
                label: res[index].label,
                options: []
              }
            }
            for (var index in res2) {
              map[res2[index].parentId].options.push({
                value: res2[index].id,
                label: res2[index].label
              })
            }
            for (var index in map) {
              var temp = {
                label: map[index].label,
                options: map[index].options
              }
              options.push(temp)
            }
            this.options = options;
          })
        })
      },
      getBlandOptions(categoryCode) {
        options({categoryCode: categoryCode}).then(res => {
          var options = [];
          for (var index in res) {
            options.push({
              value: res[index].id,
              label: res[index].label
            })
          }
          this.brandOption = options;
        })
      },
      next() {
        if (this.step++ > 2) {
          this.step = 0;
        }
      }
    }
  }
</script>
