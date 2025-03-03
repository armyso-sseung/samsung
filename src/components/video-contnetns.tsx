"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ImageContents from "@/components/image-contents";

const VideoContntns = () => {
  const synth = useMemo(() => {
    if (window["speechSynthesis"] === undefined) return;
    return window.speechSynthesis;
  }, []);

  const voice = synth?.getVoices().find((ele) => ele.name === "Google 한국의");
  const [num, setNum] = useState<number | undefined>();
  const [open, setOpen] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleCloseCall = useCallback(() => {
    setOpen(false);
    setNum(undefined);
    videoRef.current?.play().then();
  }, []);

  const handleOpenCall = useCallback(
    (event: KeyboardEvent) => {
      // 호출 중 입력 제한
      if (open) return;

      // 번호입력
      if (event.key.match(/[0-9]/)) {
        const value = Number(`${num ?? ""}${event.key}`);
        setNum(value);
      }

      // 입력완료
      if (event.key === "Enter" && num) {
        // TODO: TTS 확인 필요
        // if (synth) {
        //   const utterance = new SpeechSynthesisUtterance(
        //     `${num}번 고객님 담당 서비스 창구로 와주세요.`,
        //   );
        //
        //   utterance.rate = 0.95;
        //   utterance.voice = voice!;
        //
        //   synth?.speak(utterance);
        // } else {
        //   const audio = new Audio(`/sound/${num}.mp3`);
        //   audio?.play();
        // }

        const audio = new Audio(`/sound/${num}.mp3`);
        audio?.play().catch(() => {
          // 음성 파일 없을 시 TTS
          const utterance = new SpeechSynthesisUtterance(
            `${num}번 고객님 담당 서비스 창구로 와주세요.`,
          );

          utterance.rate = 0.95;
          utterance.voice = voice!;

          synth?.speak(utterance);
        });

        // 비디오 멈춤
        videoRef.current?.pause();
        setOpen(true);
      }

      // 실행취소
      if (event.key === "a") {
        setNum(undefined);
      }
    },
    [num, open, synth, voice],
  );
  useEffect(() => {
    window.addEventListener("keydown", handleOpenCall);
    return () => {
      window.removeEventListener("keydown", handleOpenCall);
    };
  }, [handleOpenCall]);

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted
        >
          <source src="/video/0.mp4" type="video/mp4" />
        </video>
      </div>

      {open && (
        <ImageContents num={num as number} onCloseCall={handleCloseCall} />
      )}
    </>
  );
};

export default VideoContntns;
