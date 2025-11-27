<script lang="ts">
  import { onMount } from 'svelte';
  import { Button } from 'flowbite-svelte';

  let { children } = $props();
  let currentUser = $state({ username: 'alice' });

  onMount(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
    }
  });

  function logout() {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
</script>

<div class="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
  <!-- 顶部导航栏 -->
  <div
    class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4"
  >
    <div class="flex items-center justify-between max-w-6xl mx-auto">
      <h1 class="text-xl font-semibold text-gray-900 dark:text-white">
        全局聊天室
      </h1>
      <div class="flex items-center gap-4">
        <span class="text-sm text-gray-600 dark:text-gray-400">
          {currentUser.username}
        </span>
        <Button size="sm" color="alternative" onclick={logout}>退出</Button>
      </div>
    </div>
  </div>

  <!-- 页面内容 -->
  {@render children?.()}
</div>
