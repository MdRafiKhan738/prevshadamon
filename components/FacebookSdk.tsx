"use client";

import { useEffect, useState } from "react";

const FACEBOOK_SDK_SRC = "https://connect.facebook.net/en_US/sdk.js";

declare global {
  interface Window {
    fbAsyncInit?: () => void;
    FB?: {
      init: (config: {
        appId: string;
        cookie?: boolean;
        xfbml?: boolean;
        version?: string;
      }) => void;
    };
  }
}

export default function FacebookSdk() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    window.fbAsyncInit = () => {
      window.FB?.init({
        appId: "352947546661410",
        cookie: true,
        xfbml: true,
        version: "v18.0",
      });
    };

    if (document.querySelector(`script[src="${FACEBOOK_SDK_SRC}"]`)) {
      return () => {
        window.fbAsyncInit = undefined;
      };
    }

    const script = document.createElement("script");

    script.async = true;
    script.defer = true;
    script.crossOrigin = "anonymous";
    script.src = FACEBOOK_SDK_SRC;

    document.body.appendChild(script);

    return () => {
      window.fbAsyncInit = undefined;
    };
  }, []);

  if (!mounted) return null;

  return <div id="fb-root" suppressHydrationWarning />;
}
