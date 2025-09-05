<script lang="ts">
  import { Input, Label, Button, Spinner, Toast } from 'flowbite-svelte';
  import {
    EyeOutline,
    EyeSlashOutline,
    UserOutline,
    LockSolid,
    ExclamationCircleOutline,
    CheckCircleOutline,
  } from 'flowbite-svelte-icons';

  let value = $state({
    username: 'alice',
    password: 'alice123',
  });
  let showPwd = $state(false);
  let loading = $state(false);
  let success = $state(false);
  let message = $state('');
  let toastStatus = $state(false);

  async function onsubmit(event: Event) {
    event.preventDefault();

    loading = true;

    try {
      const res = await fetch('http://127.0.0.1:8008/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(value),
      });

      const data = await res.json();

      if (data.code === 200) {
        success = true;
        message = '登录成功，正在跳转...';
        localStorage.setItem('token', data.data.token);
        console.log('登录成功:', data.data.token);

        // 这里可以添加页面跳转逻辑
      } else {
        success = false
        message = data.message;
      }
    } catch (err) {
      success = false
      message = '网络错误，请稍后重试';
      console.error('登录错误:', err);
    } finally {
      toastStatus = true;
      loading = false;
      setTimeout(() => {
        toastStatus = false;
      }, 3000);
    }
  }
</script>

<!-- 顶部通知 -->
<Toast
  class="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4"
  color={success ? 'green' : 'red'}
  bind:toastStatus
>
  {#snippet icon()}
    {#if success}
      <CheckCircleOutline class="w-5 h-5" />
    {:else}
      <ExclamationCircleOutline class="w-5 h-5" />
    {/if}
  {/snippet}
  {message}
</Toast>

<div
  class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
>
  <div class="max-w-md w-full space-y-8">
    <div class="text-center">
      <h2 class="mt-6 text-3xl font-extrabold text-gray-900">登录您的账户</h2>
      <p class="mt-2 text-sm text-gray-600">请输入您的登录信息</p>
    </div>

    <form class="mt-8 space-y-6" {onsubmit}>
      <div class="space-y-4">
        <div>
          <Label for="username" class="mb-2 text-sm font-medium text-gray-700"
            >用户名</Label
          >
          <Input
            id="username"
            type="text"
            placeholder="请输入用户名"
            size="lg"
            class="pl-10"
            required
            disabled={loading}
            bind:value={value.username}
          >
            {#snippet left()}
              <UserOutline class="h-5 w-5 text-gray-400" />
            {/snippet}
          </Input>
        </div>

        <div>
          <Label for="password" class="mb-2 text-sm font-medium text-gray-700"
            >密码</Label
          >
          <Input
            id="password"
            type={showPwd ? 'text' : 'password'}
            placeholder="请输入密码"
            size="lg"
            class="pl-10 pr-10"
            required
            disabled={loading}
            bind:value={value.password}
          >
            {#snippet left()}
              <LockSolid class="h-5 w-5 text-gray-400" />
            {/snippet}
            {#snippet right()}
              <button
                type="button"
                onclick={() => (showPwd = !showPwd)}
                class="pointer-events-auto p-1 text-gray-400 hover:text-gray-600 focus:outline-none"
                disabled={loading}
              >
                {#if showPwd}
                  <EyeOutline class="h-5 w-5" />
                {:else}
                  <EyeSlashOutline class="h-5 w-5" />
                {/if}
              </button>
            {/snippet}
          </Input>
        </div>
      </div>

      <div class="flex items-center justify-between">
        <div class="text-sm">
          <a href="#" class="font-medium text-blue-600 hover:text-blue-500">
            忘记密码？
          </a>
        </div>
      </div>

      <Button
        type="submit"
        class="w-full"
        size="lg"
        disabled={loading || !value.username || !value.password}
      >
        {#if loading}
          <Spinner class="mr-3" size="4" />
          登录中...
        {:else}
          登录
        {/if}
      </Button>

      <div class="text-center">
        <p class="text-sm text-gray-600">
          还没有账户？
          <a href="#" class="font-medium text-blue-600 hover:text-blue-500">
            立即注册
          </a>
        </p>
      </div>
    </form>
  </div>
</div>
