"use client";

import { useState } from "react";
import VideoContntns from "@/components/video-contnetns";
import LoginContents from "@/components/login-contents";

const HomeContents = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  return (
    <>
      {isAuth ? (
        <VideoContntns />
      ) : (
        <LoginContents onLogin={() => setIsAuth(true)} />
      )}
    </>
  );
};

export default HomeContents;
