<script setup lang="ts">
import axios from 'axios'
import { ref, computed } from 'vue'
import { useLocalStorage } from '@vueuse/core'

type Locale = 'zh' | 'en'
interface Props {
  locale?: Locale
}
const props = withDefaults(defineProps<Props>(), {
  locale: 'zh',
})

const formLocale = computed<Locale>(() => props.locale)
const submitted = useLocalStorage('register-submitted', false)

const formRef = ref()
const formValue = ref({
  whereYouHear: '',
  whereYouHearOther: '',
  industry: '',
  industryOther: '',
  profession: '',
  professionOther: '',
  email: '',
  nickname: '',
})
const formRules = computed(() => {
  const rules = {
    whereYouHear: {
      required: true,
      message_cn: '请选择',
      message: 'Please select',
      trigger: 'change',
    },
    industry: {
      required: true,
      message_cn: '请输入',
      message: 'Please input',
      trigger: 'blur',
    },
    profession: {
      required: true,
      message_cn: '请输入',
      message: 'Please input',
      trigger: 'blur',
    },
    nickname: {
      required: true,
      message_cn: '请输入',
      message: 'Please input',
      trigger: 'blur',
    },
    email: {
      required: true,
      message_cn: '请输入邮箱',
      message: 'Please input your email',
      trigger: 'blur',
    },
  }
  if (formLocale.value === 'zh') {
    for (const v of Object.values(rules)) {
      v.message = (v.message_cn || v.message) ?? ''
    }
  }
  return rules
})

type KeyOfForm = 'whereYouHear' | 'whereYouHearOther' | 'industry' | 'industryOther' | 'profession' | 'professionOther' | 'nickname' | 'email' | 'submit'
type FormItems = Record<KeyOfForm, {
  label?: string
  label_cn?: string
  label_en?: string
  path?: string
  required?: boolean
  [key: string]: any
}>
const formItems = computed<FormItems>(() => {
  const items: FormItems = {
    whereYouHear: {
      label_cn: '您从哪里了解到了 AnimoXtend',
      label: 'Where did you hear about AnimoXtend',
      path: 'whereYouHear',
      required: true,
    },
    whereYouHearOther: {
      label_cn: '其他渠道 (请输入)',
      label: 'Other Channel (Please Input)',
      path: 'whereYouHearOther',
      required: false,
    },
    industry: {
      label_cn: '您所在的行业',
      label: 'The Industry You Are In',
      path: 'industry',
      required: true,
    },
    industryOther: {
      label_cn: '其他行业 (请输入)',
      label: 'Other Industry (Please Input)',
      path: 'industryOther',
      required: false,
    },
    profession: {
      label_cn: '您的职业',
      label: 'Your Profession',
      path: 'profession',
      required: true,
    },
    professionOther: {
      label_cn: '其他职业 (请输入)',
      label: 'Other Profession (Please Input)',
      path: 'professionOther',
      required: false,
    },
    nickname: {
      label_cn: '如何称呼您 (您的昵称)',
      label: 'Your Nickname',
      path: 'nickname',
      required: true,
    },
    email: {
      label_cn: '邮箱',
      label: 'e-mail',
      path: 'email',
      required: true,
    },
    submit: { label_cn: '提交', label: 'Submit', path: undefined, required: false },
  }
  if (formLocale.value === 'zh') {
    for (const v of Object.values(items)) {
      v.label = (v.label_cn || v.label) ?? ''
    }
  }
  return items
})

const whereYouHearOptions = computed(() => {
  const options = [
    {
      label: 'Blender Market',
      value: 'blenderMarket',
    },
    {
      label: 'YouTube',
      value: 'youtube',
    },
    {
      label: 'Bilibili',
      value: 'bilibili',
    },
    {
      label_cn: '小红书',
      label: 'rednote',
      value: 'rednote',
    },
    {
      label: 'GitHub',
      value: 'github',
    },
    {
      label_cn: '朋友介绍',
      label: 'Friends',
      value: 'friends',
    },
    {
      label_cn: '搜索引擎',
      label: 'Search Engine',
      value: 'searchEngine',
    },
    {
      label_cn: '官网',
      label: 'Website',
      value: 'website',
    },
    {
      label_cn: '其它 (请输入)',
      label: 'Other (Please Input)',
      value: 'other',
    },
  ]
  if (formLocale.value === 'zh') {
    for (const o of options) {
      o.label = (o.label_cn || o.label) ?? ''
    }
  }
  return options
})
const industryOptions = computed(() => {
  const options = [
    {
      label_cn: '动画制作',
      label: 'Animation Production',
      value: 'animation-production',
    },
    {
      label_cn: '游戏设计',
      label: 'Game Design',
      value: 'game-design',
    },
    {
      label_cn: '影视制作',
      label: 'Film Production',
      value: 'film-production',
    },
    {
      label_cn: '数字艺术',
      label: 'Digital Art',
      value: 'digital-art',
    },
    {
      label_cn: '平面设计',
      label: '2D Design',
      value: '2d-design',
    },
    {
      label_cn: '自媒体',
      label: 'Self-Media',
      value: 'self-media',
    },
    {
      label_cn: '软件开发',
      label: 'Software Development',
      value: 'software-development',
    },
    {
      label_cn: '计算机视觉/图形学研究',
      label: 'Computer Vision/Graphic Research',
      value: 'computer-vision-graphic-research',
    },
    {
      label_cn: '其他',
      label: 'Other',
      value: 'other',
    },
  ]
  if (formLocale.value === 'zh') {
    for (const o of options) {
      o.label = (o.label_cn || o.label) ?? ''
    }
  }
  return options
})
const occupationOptions = computed(() => {
  const options = [
    {
      label_cn: '3D 动画师',
      label: '3D Animation Artist',
      value: '3d-animation-artist',
    },
    {
      label_cn: '3D 模型师',
      label: '3D Modeller',
      value: '3d-modeller',
    },
    {
      label_cn: '游戏设计',
      label: 'Game Design',
      value: 'game-design',
    },
    {
      label_cn: '技术美术',
      label: 'Technical Artist',
      value: 'technical-artist',
    },
    {
      label_cn: '游戏开发',
      label: 'Game Development',
      value: 'game-development',
    },
    {
      label_cn: '数字艺术家',
      label: 'Digital Artist',
      value: 'digital-artist',
    },
    {
      label_cn: '平面设计师',
      label: '2D Designer',
      value: '2d-designer',
    },
    {
      label_cn: '软件开发',
      label: 'Software Development',
      value: 'software-development',
    },
    {
      label_cn: '产品经理',
      label: 'Product Manager',
      value: 'product-manager',
    },
    {
      label_cn: '自媒体人',
      label: 'Self-Media',
      value: 'self-media',
    },
    {
      label_cn: '独立制作人',
      label: 'Independent Producer',
      value: 'independent-producer',
    },
    {
      label_cn: '创业者',
      label: 'Entrepreneur',
      value: 'entrepreneur',
    },
    {
      label_cn: '学生',
      label: 'Student',
      value: 'student',
    },
    {
      label_cn: '教师',
      label: 'Teacher',
      value: 'teacher',
    },
    {
      label_cn: '研究员',
      label: 'Researcher',
      value: 'researcher',
    },
    {
      label_cn: '其他',
      label: 'Other',
      value: 'other',
    },
  ]
  if (formLocale.value === 'zh') {
    for (const o of options) {
      o.label = (o.label_cn || o.label) ?? ''
    }
  }
  return options
})

const emailValidation = computed(() => {
  const value = formValue.value.email
  const isZh = formLocale.value === 'zh'
  if (!value) {
    return {
      status: 'error',
      message: isZh ? '请输入您的邮箱' : 'Please input your email',
    }
  }
  // Check if the email is valid
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    return {
      status: 'warning',
      message: isZh ? '请输入正确的邮箱' : 'Please input a valid email',
    }
  } else {
    return {
      status: 'success',
      message: '',
    }
  }
})

const handleValidateClick = async () => {
  if (await formRef.value?.validate()) {
    console.log('success')
  }
  axios.post('https://animoxtend.yangzhitao.top/api/apply/', {
    whereYouHear: formValue.value.whereYouHear,
    whereYouHearOther: formValue.value.whereYouHearOther,
    industry: formValue.value.industry,
    industryOther: formValue.value.industryOther,
    profession: formValue.value.profession,
    professionOther: formValue.value.professionOther,
    email: formValue.value.email,
    nickname: formValue.value.nickname,
    locale: formLocale.value,
  })
  .then((resp) => {
    const isZh = formLocale.value === 'zh'
    if (resp.data.code === 200) {
      alert(isZh ? '感谢您的支持' : 'Thank you for your support')
      submitted.value = true
    } else {
      alert(isZh ? '提交失败' : 'failed')
    }
  })
}
</script>

<template>
  <div style="margin-top: 20px">
    <div v-if="submitted" style="margin: 10px 0">
      <n-text v-if="formLocale === 'zh'">
        感谢您的支持！<br />
        我们已收到您的申请，将尽快通过邮箱与您联系！
      </n-text>
      <n-text v-else>
        Thank you for your support!<br />
        We have received your application, and will contact you by email as soon as possible!
      </n-text>
    </div>
    <n-divider v-if="submitted" style="margin: 10px 0" />

    <n-form
      ref="formRef"
      :label-width="80"
      :model="formValue"
      :rules="formRules"
      style="max-width: 640px"
      :disabled="submitted"
    >
      <!-- 1. Where You Hear -->
      <n-form-item :label="formItems.whereYouHear.label" :path="formItems.whereYouHear.path" :required="formItems.whereYouHear.required" >
        <n-radio-group v-model:value="formValue.whereYouHear" name="whereYouHear">
          <n-radio v-for="option in whereYouHearOptions" :key="option.value" :value="option.value">
            {{ option.label }}
          </n-radio>
        </n-radio-group>
      </n-form-item>
      <n-form-item :label="formItems.whereYouHearOther.label" :path="formItems.whereYouHearOther.path"
        :required="formValue.whereYouHear === 'other'"
      >
        <n-input v-model:value="formValue.whereYouHearOther" :disabled="formValue.whereYouHear !== 'other'" placeholder="" maxlength="32" />
      </n-form-item>

      <!-- 2. Industry -->
      <n-form-item :label="formItems.industry.label" :path="formItems.industry.path" :required="formItems.industry.required">
        <n-select v-model:value="formValue.industry" :options="industryOptions" />
      </n-form-item>

      <n-form-item :label="formItems.industryOther.label" :path="formItems.industryOther.path"
        :required="formValue.industry === 'other'"
      >
        <n-input v-model:value="formValue.industryOther" :disabled="formValue.industry !== 'other'" placeholder="" maxlength="32" />
      </n-form-item>

      <!-- 3. Profession -->
      <n-form-item :label="formItems.profession.label" :path="formItems.profession.path" :required="formItems.profession.required">
        <n-select v-model:value="formValue.profession" :options="occupationOptions" />
      </n-form-item>

      <n-form-item :label="formItems.professionOther.label" :path="formItems.professionOther.path"
        :required="formValue.profession === 'other'"
      >
        <n-input v-model:value="formValue.professionOther" placeholder="" :disabled="formValue.profession !== 'other'" maxlength="32"/>
      </n-form-item>

      <!-- 4. Nickname -->
      <n-form-item :label="formItems.nickname.label" :path="formItems.nickname.path" :required="formItems.nickname.required">
        <n-input v-model:value="formValue.nickname" placeholder="" maxlength="32" />
      </n-form-item>

      <!-- 5. Email -->
      <n-form-item
        :label="formItems.email.label"
        :path="formItems.email.path"
        :validation-status="emailValidation.status"
        :feedback="emailValidation.message"
        :required="formItems.email.required"
      >
        <n-input
          v-model:value="formValue.email"
          placeholder=""
          maxlength="64"
        />
      </n-form-item>
    </n-form>

    <!-- Submit Button -->
    <n-button attr-type="button" type="info" @click="handleValidateClick" style="width: 150px; margin-bottom: 20px" :disabled="submitted">
      {{ formItems.submit.label }}
    </n-button>
  </div>
</template>

<style scoped>

</style>
