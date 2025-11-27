<script lang="ts">
  import { Button, Input } from 'flowbite-svelte';
  import { PaperPlaneOutline } from 'flowbite-svelte-icons';
  import MessageBubble from '$lib/components/MessageBubble.svelte';

  interface Message {
    id: number;
    sender_id: number;
    sender_name: string;
    content: string;
    timestamp: string;
  }

  let currentUser = $state({ id: 1, username: 'alice' });
  let messages = $state<Message[]>([
    {
      id: 1,
      sender_id: 2,
      sender_name: 'bob',
      content: '大家好！',
      timestamp: '10:30',
    },
    {
      id: 2,
      sender_id: 1,
      sender_name: 'alice',
      content: '你好呀',
      timestamp: '10:31',
    },
    {
      id: 3,
      sender_id: 3,
      sender_name: 'charlie',
      content: '今天天气不错',
      timestamp: '10:32',
    },
  ]);

  let messageInput = $state('');
  let messageId = $state(4);

  function sendMessage() {
    if (!messageInput.trim()) return;

    const now = new Date();
    const timestamp = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;

    messages.push({
      id: messageId++,
      sender_id: currentUser.id,
      sender_name: currentUser.username,
      content: messageInput,
      timestamp,
    });

    messageInput = '';

    // 自动滚动到底部
    setTimeout(() => {
      const container = document.getElementById('messages-container');
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }, 0);
  }

  function isCurrentUser(senderId: number) {
    return senderId === currentUser.id;
  }
</script>

<!-- 消息列表 -->
<div
  id="messages-container"
  class="flex-1 overflow-y-auto p-4 space-y-4 max-w-6xl mx-auto w-full"
>
  {#each messages as msg (msg.id)}
    <MessageBubble
      senderName={msg.sender_name}
      content={msg.content}
      timestamp={msg.timestamp}
      isCurrentUser={isCurrentUser(msg.sender_id)}
    />
  {/each}
</div>

<!-- 输入框 -->
<div
  class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4"
>
  <form
    class="flex gap-2 max-w-6xl mx-auto"
    onsubmit={(e) => {
      e.preventDefault();
      sendMessage();
    }}
  >
    <Input
      type="text"
      placeholder="输入消息..."
      bind:value={messageInput}
      class="flex-1"
    />
    <Button type="submit" disabled={!messageInput.trim()}>
      <PaperPlaneOutline class="w-5 h-5" />
    </Button>
  </form>
</div>
