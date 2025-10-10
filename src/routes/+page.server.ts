import { redirect } from '@sveltejs/kit';

export function load() {
  // 服务端重定向到登录页面
  throw redirect(302, '/login');
}