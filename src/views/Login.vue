<script setup lang="ts">
import { ref } from 'vue'
import type {
  FormInst,
  FormItemInst,
  FormItemRule,
  FormValidationError,
  FormRules
} from 'naive-ui';
import { useMessage } from 'naive-ui';
import { login } from "@/apis/user";
import { addRouterFromMenu, adminRoot } from "@/router/add";
import { useRouter } from "vue-router";
import { useTokenStore } from "@/stores/token";
import { useMenuStore } from "@/stores/menu";

interface ModelType {
  name: string
  password: string
}


let router = useRouter();
const formRef = ref<FormInst | null>(null)
const tokenStore = useTokenStore();
const menuStore = useMenuStore();
const message = useMessage()
const model = ref<ModelType>({
  name: "",
  password: "",
})

const rules: FormRules = {
  name: [
    {
      required: true,
      message: 'username is required'
    }
  ],
  password: [
    {
      required: true,
      message: 'Password is required'
    }
  ],
}

function handleValidateButtonClick(e: MouseEvent) {
  formRef.value?.validate(async (errors: Array<FormValidationError> | undefined) => {
    if (errors) {
      console.log(errors)
      message.error('Invalid')
      return;
    }

    const data = await login(model.value.name, model.value.password);
    if (data.code) {
      message.error("登录失败");
      return;
    }

    console.log("data:", data);

    //保存token
    tokenStore.saveToken(data.data?.token || "", data.data?.expiredAt || "");

    // 保存 menu
    const menu = data.data?.menu || [];
    menuStore.saveMenu(menu);

    // 增加动态路由
    addRouterFromMenu(router, menu);

    //页面跳转
    message.success("登录成功");
    router.push("/admin/dashboard");
  });
}
</script>

<template>
  <n-card class="center">
    <n-form ref="formRef" :model="model" :rules="rules">
      <n-form-item path="name" label="用户名">
        <n-input v-model:value="model.name" @keydown.enter.prevent />
      </n-form-item>
      <n-form-item path="password" label="密码">
        <n-input v-model:value="model.password" type="password" @keydown.enter.prevent />
      </n-form-item>
      <div class="flex justify-end">
        <n-button type="primary" @click.prevent="handleValidateButtonClick">登录</n-button>
      </div>
    </n-form>
  </n-card>
</template>

<style scoped lang="scss">
.center {
  width: 500px;
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>