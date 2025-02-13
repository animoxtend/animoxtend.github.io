<script setup lang="ts">
import axios from 'axios'
import { ref, computed, nextTick } from 'vue'
import { useLocalStorage } from '@vueuse/core'

import '../styles/bulma-inside.scss'

import {
  formValue,
  validatorPromptsI18n,
  validators,
  isFormValueValid,
  refreshPrompts,
} from './validators'
import type { FormValueKey } from './validators'

type Locale = 'zh' | 'en'
interface Props {
  locale?: Locale
}
const props = withDefaults(defineProps<Props>(), {
  locale: 'zh',
})

const formLocale = computed<Locale>(() => props.locale)
const submitted = useLocalStorage('register-submitted', false)
const submittedEmail = useLocalStorage('register-submitted-email', '')

const validatorPrompts = computed(() => {
  if (formLocale.value === 'zh') {
    return validatorPromptsI18n.value.promptsZh
  }
  return validatorPromptsI18n.value.promptsEn
})

type FormItemKey = FormValueKey | 'submit'
type FormItems = Record<
  FormItemKey,
  {
    label?: string
    label_cn?: string
    label_en?: string
    path?: string
    required?: boolean
    [key: string]: any
  }
>
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
    toolsYouUse: {
      label_cn: '您常用的工具',
      label: 'Tools You Often Use',
      path: 'toolsYouUse',
      required: true,
    },
    toolsYouUseOther: {
      label_cn: '其他工具 (请输入)',
      label: 'Other Tools (Please Input)',
      path: 'toolsYouUseOther',
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

const emailValidation = computed<{
  status: 'error' | 'warning' | 'success'
  message: string
}>(() => {
  const value = formValue.value.email
  const isZh = formLocale.value === 'zh'
  if (!value) {
    return {
      status: 'error',
      message: isZh ? '请输入您的邮箱' : 'Please input your email',
    }
  }
  // Check if the email is valid
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
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

const onWhereYouHearChange = async (event) => {
  if (event.target.checked) {
    formValue.value.whereYouHear = event.target.value
    if (event.target.value !== 'other') {
      formValue.value.whereYouHearOther = ''
    }
    await nextTick(() => validators.whereYouHear())
  }
  console.debug('??? whereYouHear', event.target.value, event.target.checked)
}
const onWhereYouHearOtherChange = async (event) => {
  formValue.value.whereYouHearOther = event.target.value.slice(0, 128)
  await nextTick(() => validators.whereYouHearOther())
  console.debug('??? whereYouHearOther', event.target.value, event.target.checked)
}
const onIndustryChange = async (event) => {
  formValue.value.industry = event.target.value
  await nextTick(() => validators.industry())
  formValue.value.industryOther = ''
  console.debug('??? industry', event.target.value, event.target.checked)
}
const onIndustryOtherChange = async (event) => {
  formValue.value.industryOther = event.target.value.slice(0, 128)
  await nextTick(() => validators.industryOther())
  console.debug('??? industryOther', event.target.value, event.target.checked)
}
const onProfessionChange = async (event) => {
  formValue.value.profession = event.target.value
  if (event.target.value !== 'other') {
    formValue.value.professionOther = ''
  }
  await nextTick(() => validators.profession())
  console.debug('??? profession', event.target.value, event.target.checked)
}
const onProfessionOtherChange = async (event) => {
  formValue.value.professionOther = event.target.value.slice(0, 128)
  await nextTick(() => validators.professionOther())
  console.debug('??? professionOther', event.target.value, event.target.checked)
}
const onNicknameChange = async (event) => {
  formValue.value.nickname = event.target.value.slice(0, 32) // Limit the length of nickname
  await nextTick(() => validators.nickname())
  console.debug('??? nickname', event.target.value, event.target.checked)
}
const onEmailChange = async (event) => {
  formValue.value.email = event.target.value.slice(0, 64) // Limit the length of email
  await nextTick(() => validators.email())
  console.debug('??? email', event.target.value, event.target.checked)
}

const handleValidateClick = async () => {
  refreshPrompts()
  await nextTick()
  if (!isFormValueValid.value) {
    if (formLocale.value === 'zh') {
      alert('请完整填写表单')
    } else {
      alert('Please fill in the form correctly')
    }
    return
  }
  axios
    .post('https://yangzhitao.top/animoxtend/api/apply/', {
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
        submittedEmail.value = formValue.value.email
      } else {
        alert(isZh ? '提交失败' : 'failed')
      }
    })
}
</script>

<template>
  <div>
    <div class="blm-content" style="margin-top: 20px">
      <div v-if="submitted" style="margin: 10px 0">
        <p v-if="formLocale === 'zh'">
          感谢您的支持！<br />
          我们已收到您的申请，将尽快通过邮箱{{
            submittedEmail ? `(${submittedEmail})` : ''
          }}与您联系！
          <br />
          (请注意查收邮件，可能会被误判为垃圾邮件)
        </p>
        <p v-else>
          Thank you for your support!<br />
          We have received your application, and will contact you by email
          {{ submittedEmail ? `(${submittedEmail})` : '' }}
          as soon as possible!
          <br />
          (Please check your email, it may be misjudged as spam)
        </p>
      </div>

      <!-- FORM -->
      <div class="blm-content" v-if="!submitted">
        <h1 class="blm-h1">
          <span v-if="formLocale === 'zh'">申请试用</span>
          <span v-else>Apply for a Trial</span>
        </h1>
        <!-- 1. Where You Hear -->
        <div class="blm-field">
          <label class="blm-label">{{ formItems.whereYouHear.label }}</label>
          <div class="blm-control">
            <label
              v-for="option in whereYouHearOptions"
              class="blm-radio"
              style="padding-right: 10px"
            >
              <input
                type="radio"
                v-model="formValue.whereYouHear"
                :id="formItems.whereYouHear.path + option.value"
                :value="option.value"
                @change="onWhereYouHearChange"
              />
              {{ option.label }}
            </label>
            <span class="blm-help blm-is-danger" v-if="!!validatorPrompts.whereYouHear">
              {{ validatorPrompts.whereYouHear }}
            </span>
          </div>
        </div>
        <div v-if="formValue.whereYouHear === 'other'" class="blm-field">
          <label class="blm-label" for="whereYouHearOther">
            {{ formItems.whereYouHearOther.label }}
          </label>
          <div class="blm-control">
            <input
              type="text"
              v-model="formValue.whereYouHearOther"
              class="blm-input"
              :id="formItems.whereYouHearOther.path"
              @blur="onWhereYouHearOtherChange"
            />
            <span class="blm-help blm-is-danger" v-if="!!validatorPrompts.whereYouHearOther">
              {{ validatorPrompts.whereYouHearOther }}
            </span>
          </div>
        </div>

        <!-- 2. Industry -->
        <div class="blm-field">
          <label class="blm-label">{{ formItems.industry.label }}</label>
          <div class="blm-control">
            <div class="blm-select">
              <select v-model="formValue.industry" class="w-250" @change="onIndustryChange">
                <option v-for="option in industryOptions" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
            </div>
            <span class="blm-help blm-is-danger" v-if="!!validatorPrompts.industry">
              {{ validatorPrompts.industry }}
            </span>
          </div>
        </div>
        <div v-if="formValue.industry === 'other'" class="blm-field">
          <label class="blm-label" for="industryOther">{{ formItems.industryOther.label }}</label>
          <div class="blm-control">
            <input
              type="text"
              v-model="formValue.industryOther"
              class="blm-input"
              :id="formItems.industryOther.path"
              @blur="onIndustryOtherChange"
            />
            <span class="blm-help blm-is-danger" v-if="!!validatorPrompts.industryOther">
              {{ validatorPrompts.industryOther }}
            </span>
          </div>
        </div>

        <!-- 3. Profession -->
        <div class="blm-field">
          <label class="blm-label">{{ formItems.profession.label }}</label>
          <div class="blm-control">
            <div class="blm-select">
              <select v-model="formValue.profession" class="w-250" @change="onProfessionChange">
                <option v-for="option in occupationOptions" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
            </div>
            <span class="blm-help blm-is-danger" v-if="!!validatorPrompts.profession">
              {{ validatorPrompts.profession }}
            </span>
          </div>
        </div>
        <div v-if="formValue.profession === 'other'" class="blm-field">
          <label class="blm-label" for="professionOther">{{
            formItems.professionOther.label
          }}</label>
          <div class="blm-control">
            <input
              type="text"
              v-model="formValue.professionOther"
              class="blm-input"
              :id="formItems.professionOther.path"
              @blur="onProfessionOtherChange"
            />
            <span class="blm-help blm-is-danger" v-if="!!validatorPrompts.professionOther">
              {{ validatorPrompts.professionOther }}
            </span>
          </div>
        </div>

        <!-- 4. Nickname -->
        <div class="blm-field">
          <label class="blm-label">{{ formItems.nickname.label }}</label>
          <div class="blm-control">
            <input
              type="text"
              v-model="formValue.nickname"
              class="blm-input"
              :id="formItems.nickname.path"
              @blur="onNicknameChange"
            />
            <span class="blm-icon is-small is-left">
              <i class="blm-fas blm-fa-user"></i>
            </span>
            <span class="blm-help blm-is-danger" v-if="!!validatorPrompts.nickname">
              {{ validatorPrompts.nickname }}
            </span>
          </div>
        </div>

        <!-- 5. Email -->
        <div class="blm-field">
          <label class="blm-label">{{ formItems.email.label }}</label>
          <div class="blm-control">
            <input
              type="text"
              v-model="formValue.email"
              class="blm-input"
              :id="formItems.email.path"
              @blur="onEmailChange"
            />
            <span class="blm-icon blm-is-small blm-is-left">
              <i class="blm-fas blm-fa-envelope"></i>
            </span>
            <span class="blm-help blm-is-danger" v-if="!!validatorPrompts.email">
              {{ validatorPrompts.email }}
            </span>
          </div>
        </div>

        <!-- Submit Button -->
        <button class="blm-button blm-is-info w-250" @click="handleValidateClick">
          {{ formItems.submit.label }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.w-250 {
  width: 250px;
}
</style>
