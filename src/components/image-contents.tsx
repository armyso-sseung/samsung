"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Props = {
  num: number;
  onCloseCall: () => void;
};

const ImageContents = ({ num, onCloseCall }: Props) => {
  const numRef = useRef<number>(num);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible((prev) => !prev);
    }, 500); // 0.5초마다 깜빡이기

    setTimeout(() => {
      clearInterval(interval);
      setVisible(true); // 마지막에는 이미지가 보이도록 설정
    }, 7000); // 7초 후 멈춤

    setTimeout(() => {
      onCloseCall();
    }, 10000);

    return () => clearInterval(interval);
  }, [onCloseCall]);

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-[rgba(0,0,0,0.80)]">
        <div className="relative w-full h-full">
          <Image
            src="/img/person.png"
            alt="person"
            width={1080}
            height={1920}
            className="w-full h-full object-cover transition-opacity duration-300"
            style={{ opacity: visible ? 1 : 0 }}
          />
          <span
            className="absolute inset-0 flex top-[23vh] justify-center text-white text-[450px] font-bold  transition-opacity duration-300"
            style={{ opacity: visible ? 1 : 0 }}
          >
            {numRef.current}
          </span>
        </div>
      </div>
    </>
  );
};

export default ImageContents;
