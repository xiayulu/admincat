<script  lang="ts" setup>
import type {
  FormItemRule,
  FormValidationError,
  FormRules,
  FormInst,
} from 'naive-ui';

import {
  useMessage
} from 'naive-ui';

import { createBook, getBookCategories } from "@/apis/book";
import { ref } from 'vue';

// types
interface ModelType {
  name: string,
  about: string,
  category: string,
  subcategory: string,
  hard: number,
  cover: string,
}

// vars
const message = useMessage();
const bookCategories = getBookCategories();
const emit = defineEmits<{
  (e: "success"): void,
}>();

const rules: FormRules = {
  name: [
    {
      required: true,
      validator(_rule: FormItemRule, value: string) {
        if (!value) {
          return new Error('book name is required')
        } else if (value.length < 2 || value.length > 20) {
          return new Error('book name length should be 2~20 words.')
        }
        return true
      },
      trigger: ['input', 'blur']
    }
  ],
  about: [
    {
      required: true,
      validator(_rule: FormItemRule, value: string) {
        if (!value) {
          return new Error('introduction is required')
        } else if (value.length < 1 || value.length > 300) {
          return new Error('introduction length should be 1~300 words.')
        }
        return true
      },
      trigger: ['input', 'blur']
    }
  ],
  category: [
    {
      required: true,
      message: 'category is required',
    }
  ],
  subcategory: [
    {
      required: true,
      validator(_rule: FormItemRule, value: string) {
        if (!value) {
          return new Error('sub category is required')
        } else if (value.length < 2 || value.length > 20) {
          return new Error('subcategory length should be 2~20 words.')
        }
        return true
      },
      trigger: ['input', 'blur']
    }
  ],
  hard: [
    {
      required: true,
      message: 'hard is required',
    }
  ],
  cover: [
    {
      required: true,
      message: 'cover link is required',
    }
  ],
};

// states
const form = ref<FormInst | null>(null);
const model = ref<ModelType>({
  name: "",
  about: "",
  category: bookCategories[0].value,
  subcategory: "",
  hard: 1,
  cover: ""
});

async function handleSubmit(e: MouseEvent) {
  form.value?.validate((errors: Array<FormValidationError> | undefined) => {
    if (errors) {
      message.error('Invalid fields');
      return;
    }
  })

  try {
    const _resp = await createBook({
      ...model.value,
      userId: 1,
      hard: Number(model.value.hard) * 2,
      category: `${model.value.category}:${model.value.subcategory}`,
    });
    message.info("Create success.");
    emit("success");
  } catch (e) {
    message.error("create failed");
  }
}
</script>

<template>
  <NuxtLayout name="admin">
    <div class="bg-light-50 px-6 py-3">
      <n-form ref="form" :model="model" :rules="rules">
        <n-form-item path="name" label="Book Name">
          <n-input v-model:value="model.name" @keydown.enter.prevent />
        </n-form-item>
        <n-form-item path="about" label="Book Introdution">
          <n-input v-model:value="model.about" type="textarea" placeholder="支持 markdown 语法" />
        </n-form-item>
        <n-form-item path="categoy" label="Category">
          <n-select v-model:value="model.category" :options="bookCategories" />
        </n-form-item>
        <n-form-item path="subcategoy" label="Sub Category">
          <n-input v-model:value="model.subcategory" type="text" />
        </n-form-item>
        <n-form-item path="hard" label="Hard">
          <n-rate v-model:value="model.hard" allow-half />
        </n-form-item>
        <n-form-item path="cover" label="Cover Link">
          <n-input v-model:value="model.cover" type="text" placeholder="封面链接" />
        </n-form-item>
        <n-image width="100" :src="model.cover" />
        <div class="flex justify-end">
          <n-button round type="primary" @click.prevent="handleSubmit">
            Submit
          </n-button>
        </div>
      </n-form>
    </div>
  </NuxtLayout>
</template>