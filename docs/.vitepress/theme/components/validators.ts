import { computed, ref, reactive, toRaw, watch } from 'vue'

export type FormValueKey =
  | 'whereYouHear'
  | 'whereYouHearOther'
  | 'industry'
  | 'industryOther'
  | 'profession'
  | 'professionOther'
  | 'toolsYouUse'
  | 'toolsYouUseOther'
  | 'email'
  | 'nickname'

export const formValue = ref({
  whereYouHear: '',
  whereYouHearOther: '',
  industry: '',
  industryOther: '',
  profession: '',
  professionOther: '',
  toolsYouUse: '',
  toolsYouUseOther: '',
  email: '',
  nickname: '',
})

export const validStatus = ref<{
  whereYouHear: undefined | boolean
  whereYouHearOther: undefined | boolean
  industry: undefined | boolean
  industryOther: undefined | boolean
  profession: undefined | boolean
  professionOther: undefined | boolean
  toolsYouUse: undefined | boolean
  toolsYouUseOther: undefined | boolean
  email: undefined | boolean
  nickname: undefined | boolean
}>({
  whereYouHear: undefined,
  whereYouHearOther: undefined,
  industry: undefined,
  industryOther: undefined,
  profession: undefined,
  professionOther: undefined,
  toolsYouUse: undefined,
  toolsYouUseOther: undefined,
  email: undefined,
  nickname: undefined,
})
export const validators = {
  whereYouHear: async () => {
    const isValid = !!formValue.value.whereYouHear
    validStatus.value.whereYouHear = isValid
    return isValid
  },
  whereYouHearOther: async () => {
    let isValid = true
    if (formValue.value.whereYouHear === 'other') {
      isValid = !!formValue.value.whereYouHearOther
    }
    validStatus.value.whereYouHearOther = isValid
    return isValid
  },
  industry: async () => {
    const isValid = !!formValue.value.industry
    validStatus.value.industry = isValid
    return isValid
  },
  industryOther: async () => {
    let isValid = true
    if (formValue.value.industry === 'other') {
      isValid = !!formValue.value.industryOther
    }
    validStatus.value.industryOther = isValid
    return isValid
  },
  profession: async () => {
    const isValid = !!formValue.value.profession
    validStatus.value.profession = isValid
    return isValid
  },
  professionOther: async () => {
    let isValid = true
    if (formValue.value.profession === 'other') {
      isValid = !!formValue.value.professionOther
    }
    validStatus.value.professionOther = isValid
    return isValid
  },
  toolsYouUse: async () => {
    const isValid = true // TODO: implement validation
    // validStatus.value.toolsYouUse = isValid
    return isValid
  },
  toolsYouUseOther: async () => {
    const isValid = true // TODO: implement validation
    // validStatus.value.toolsYouUseOther = isValid
    return isValid
  },
  email: async () => {
    let isValid = true
    if (!formValue.value.email) {
      isValid = false
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      isValid = emailRegex.test(formValue.value.email)
    }
    validStatus.value.email = isValid
    return isValid
  },
  nickname: async () => {
    const isValid = !!formValue.value.nickname
    validStatus.value.nickname = isValid
    return isValid
  },
}

export const validatorPromptsI18n = ref({
  promptsEn: {
    whereYouHear: '',
    whereYouHearOther: '',
    industry: '',
    industryOther: '',
    profession: '',
    professionOther: '',
    toolsYouUse: '',
    toolsYouUseOther: '',
    email: '',
    nickname: '',
  },
  promptsZh: {
    whereYouHear: '',
    whereYouHearOther: '',
    industry: '',
    industryOther: '',
    profession: '',
    professionOther: '',
    toolsYouUse: '',
    toolsYouUseOther: '',
    email: '',
    nickname: '',
  },
})

watch(
  () => validStatus.value,
  () => refreshPrompts(),
  { deep: true },
)

export const refreshPrompts = () => {
  for (const [k, v] of Object.entries(PROMPTS_EN)) {
    if (validStatus.value[k as FormValueKey] === false) {
      validatorPromptsI18n.value.promptsEn[k] = v
      validatorPromptsI18n.value.promptsZh[k] = PROMPTS_ZH[k]
    }
    console.log(k, validStatus.value[k as FormValueKey])
  }
  console.log('** validStatus **', validStatus.value)
}

const PROMPTS_EN = Object.freeze({
  whereYouHear: 'Please select',
  whereYouHearOther: 'Please input',
  industry: 'Please input',
  industryOther: 'Please input',
  profession: 'Please input',
  professionOther: 'Please input',
  toolsYouUse: 'Please input',
  toolsYouUseOther: 'Please input',
  email: 'Please input email',
  nickname: 'Please input',
})
const PROMPTS_ZH = Object.freeze({
  whereYouHear: '请选择',
  whereYouHearOther: '请输入',
  industry: '请输入',
  industryOther: '请输入',
  profession: '请输入',
  professionOther: '请输入',
  toolsYouUse: '请输入',
  toolsYouUseOther: '请输入',
  email: '请输入邮箱',
  nickname: '请输入',
})

export const isFormValueValid = computed(() => {
  if (
    validStatus.value.whereYouHear &&
    validStatus.value.whereYouHearOther !== false &&
    validStatus.value.industry &&
    validStatus.value.industryOther !== false &&
    validStatus.value.profession &&
    validStatus.value.professionOther !== false &&
    validStatus.value.email &&
    validStatus.value.nickname
  ) {
    return true
  }
  return false
})
