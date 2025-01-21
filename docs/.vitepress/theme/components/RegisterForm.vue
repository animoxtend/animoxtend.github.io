<script setup lang="ts">
import { ref } from 'vue'
import { NForm, NFormItem, NInput, NButton, NRadio, NRadioGroup, NSelect } from 'naive-ui'

const formRef = ref()
const formValue = ref({
  whereYouHear: '',
  whereYouHearOther: '',
  specialty: '',
  email: '',
})
const rules = {
  email: {
    required: true,
    message: '请输入邮箱 | Please input your email',
    trigger: 'blur',
  },
}
const specialtyOptions = [
  {
    label: '动画 | Animation',
    value: 'animation',
  },
  {
    label: '3D模型 | 3D Model',
    value: '3d-model',
  },
  {
    label: '游戏设计 | Game Design',
    value: 'game-design',
  },
  {
    label: '影视制作 | Film Production',
    value: 'film-production',
  },
  {
    label: '技术美术 | Technical Artist',
    value: 'technical-artist',
  },
  {
    label: '自媒体 | Self-Media',
    value: 'self-media',
  },
  {
    label: '数字艺术 | Digital Art',
    value: 'digital-art',
  },
  {
    label: '软件开发 | Software Development',
    value: 'software-development',
  },
  {
    label: '3D视觉/图形学研究 | 3D Visual/Graphic Research',
    value: '3d-visual-graphic-research',
  },
  {
    label: '其他 | Other',
    value: 'other',
  },
]

const handleValidateClick = () => {
  formRef.value?.validate()
}
</script>

<template>
  <div class="w-full h-full">
    <h2>申请试用 | Apply for Trial</h2>
    <n-form
      ref="formRef"
      :label-width="80"
      :model="formValue"
      :rules="rules"
    >
      <n-form-item label="您从哪里了解到 AnimoXtend | Where did you hear about AnimoXtend" path="whereYouHear" required>
        <n-radio-group v-model:value="formValue.whereYouHear" name="whereYouHear">
          <n-radio value="blenderMarket">Blender Market</n-radio>
          <n-radio value="youtube">YouTube</n-radio>
          <n-radio value="bilibili">Bilibili</n-radio>
          <n-radio value="rednote">小红书 | rednote</n-radio>
          <n-radio value="github">GitHub</n-radio>
          <n-radio value="friends">朋友 | Friends</n-radio>
          <n-radio value="searchEngine">搜索引擎 | Search Engine</n-radio>
          <n-radio value="website">官网 | Website</n-radio>
          <n-radio value="other">其它 (请输入) | Other (please input)</n-radio>
        </n-radio-group>
      </n-form-item>
      <n-form-item label="请输入您了解到 AnimoXtend 的其他渠道 | Please input the channel you heard about AnimoXtend" path="whereYouHearOther"
        :required="formValue.whereYouHear === 'other'"
      >
        <n-input v-if="formValue.whereYouHear === 'other'" v-model:value="formValue.whereYouHearOther" placeholder="Please input" />
      </n-form-item>

      <n-form-item label="您的专业 | Your Specialty" path="specialty" required>
        <n-select v-model:value="formValue.specialty" placeholder="请选择您的专业" :options="specialtyOptions" />
      </n-form-item>

      <n-form-item label="邮箱 | e-mail" path="email" required>
        <n-input v-model:value="formValue.email" placeholder="输入邮箱 | Input your email" />
      </n-form-item>
    </n-form>
    <n-button attr-type="button" type="primary" @click="handleValidateClick">
      提交 | Submit
    </n-button>
  </div>
</template>

<style scoped>

</style>
