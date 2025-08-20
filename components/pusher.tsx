"use client";

import { useRouter } from "next/navigation";
import NProgress from "nprogress";

export function useProgressRouter() {
  const router = useRouter();

  function pushWithProgress(href: string) {
    NProgress.start();
    router.push(href);
  }

  return { pushWithProgress };
}
