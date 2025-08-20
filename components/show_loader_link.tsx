// // app/providers.tsx
// "use client";
// import NProgress from "nprogress";

// import "nprogress/nprogress.css";
// import { usePathname, useRouter } from "next/navigation";
// import { useEffect, useRef, useTransition } from "react";

// export default function Providers({ children }: { children: React.ReactNode }) {
//   const pathname = usePathname();
//   const [isPending, startTransition] = useTransition();
//   const prevPath = useRef(pathname);

//   useEffect(() => {
//     if (isPending) {
//       NProgress.start();
//     } else {
//       NProgress.done();
//     }
//   }, [isPending]);

//   useEffect(() => {
//     if (prevPath.current !== pathname) {
//       prevPath.current = pathname;
//       NProgress.done();
//     }
//   }, [pathname]);

//   return children;
// }
"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import NProgress from "nprogress";

export default function ProgressBar() {
  const pathname = usePathname();
  const timer = useRef<NodeJS.Timeout>(0);

  useEffect(() => {
    // Start the progress bar
    NProgress.start();

    // Simulate slight delay to show animation
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      NProgress.done();
    }, 300); // You can tweak this delay
  }, [pathname]);

  return null;
}
