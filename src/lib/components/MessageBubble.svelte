<script lang="ts">
  import { Avatar } from 'flowbite-svelte';

  interface Props {
    senderName: string;
    content: string;
    timestamp: string;
    isCurrentUser: boolean;
  }

  let { senderName, content, timestamp, isCurrentUser }: Props = $props();
</script>

<div class="flex {isCurrentUser ? 'justify-end' : 'justify-start'}">
  <div class="flex gap-2 max-w-md {isCurrentUser ? 'flex-row-reverse' : ''}">
    <Avatar size="sm">{senderName[0].toUpperCase()}</Avatar>
    <div>
      <div
        class="text-xs text-gray-500 dark:text-gray-400 mb-1 {isCurrentUser
          ? 'text-right'
          : ''}"
      >
        {senderName} · {timestamp}
      </div>
      <div
        class="px-4 py-2 rounded-lg {isCurrentUser
          ? 'bg-blue-500 text-white'
          : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white'}"
      >
        {content}
      </div>
    </div>
  </div>
</div>
