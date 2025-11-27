<script lang="ts">
  import { onMount } from 'svelte';

  onMount(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
    }
  });
</script>
