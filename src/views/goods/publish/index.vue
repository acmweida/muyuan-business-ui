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
    <div v-if="step == 0">
      <el-form ref="form" :model="categoryForm" :rules="rules" label-width="80px">
        <el-form-item label="类目" prop="categoryCode">
          <el-select v-model="categoryForm.categoryCode" placeholder="请选择">
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
        </el-form-item>
      </el-form>
    </div>
    <div v-if="step == 1">

    </div>
    <div v-if="step == 2">

    </div>

    <el-button style="margin-top: 12px;" @click="next">下一步</el-button>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        step: 0,
        categoryForm: {}
      }
    },
    methods: {
      next() {
        if (this.step++ > 2) {
          this.step = 0;
        }

      }
    }
  }
</script>
