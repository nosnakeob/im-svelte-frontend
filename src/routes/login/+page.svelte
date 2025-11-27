<script lang="ts">
  import { Section, Register } from 'flowbite-svelte-blocks';
  import { Input, Label, Button, Toast, Checkbox } from 'flowbite-svelte';
  import {
    ExclamationCircleOutline,
    CheckCircleOutline,
  } from 'flowbite-svelte-icons';

  let form = $state({
    username: 'alice',
    password: 'alice123',
  });
  let loading = $state(false);
  let success = $state(false);
  let message = $state('');
  let toastStatus = $state(false);

  async function onsubmit() {
    loading = true;

    // 模拟延迟
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // 固定返回成功
    success = true;
    message = '登录成功，正在跳转...';
    localStorage.setItem('token', 'mock-token-123456');
    console.log('登录成功');

    toastStatus = true;
    loading = false;

    // 延迟后跳转到聊天室
    setTimeout(() => {
      window.location.href = '/chat';
    }, 1500);

    // 隐藏提示
    setTimeout(() => {
      toastStatus = false;
    }, 3000);

    // 原后端请求代码（已注释）
    // try {
    //   const res = await fetch('http://127.0.0.1:8008/auth/login', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json; charset=UTF-8',
    //     },
    //     body: JSON.stringify(form),
    //   });

    //   const data = await res.json();

    //   if (data.code === 200) {
    //     success = true;
    //     message = '登录成功，正在跳转...';
    //     localStorage.setItem('token', data.data.token);
    //     console.log('登录成功:', data.data.token);
    //   } else {
    //     success = false;
    //     message = data.message;
    //   }
    // } catch (err) {
    //   success = false;
    //   message = '网络错误，请稍后重试';
    //   console.error('登录错误:', err);
    // } finally {
    //   toastStatus = true;
    //   loading = false;
    //   setTimeout(() => {
    //     toastStatus = false;
    //   }, 3000);
    // }
  }
</script>

<!-- 顶部通知 -->
<Toast
  class="fixed top-4 left-1/2 -translate-x-1/2"
  color={success ? 'green' : 'red'}
  bind:toastStatus
>
  {#snippet icon()}
    {#if success}
      <CheckCircleOutline />
    {:else}
      <ExclamationCircleOutline />
    {/if}
  {/snippet}
  {message}
</Toast>

<Section name="login" class="min-h-screen flex">
  <Register>
    {#snippet top()}
      登录您的账户
    {/snippet}
    <div class="space-y-4 p-6 sm:p-8 md:space-y-6 w-full min-w-[400px]">
      <form class="flex flex-col space-y-6" {onsubmit}>
        <Label>
          <span>账号</span>
          <Input
            type="text"
            name="username"
            required
            bind:value={form.username}
          />
        </Label>
        <Label>
          <span>密码</span>
          <Input
            type="password"
            name="password"
            required
            bind:value={form.password}
          />
        </Label>
        <div class="flex items-start">
          <Checkbox>记住我</Checkbox>
          <a
            href="/"
            class="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
          >
            忘记密码?
          </a>
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? '登录中...' : '登录'}
        </Button>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          还没有账户?
          <a
            href="/"
            class="text-primary-600 dark:text-primary-500 hover:underline"
          >
            立即注册
          </a>
        </p>
      </form>
    </div>
  </Register>
</Section>
