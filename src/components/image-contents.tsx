"use client";

import {useEffect, useRef, useState} from "react";

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
    }, 600); // 0.5초마다 깜빡이기

    setTimeout(() => {
      clearInterval(interval);
      setVisible(true); // 마지막에는 이미지가 보이도록 설정
    }, 4000); // 7초 후 멈춤

    // setTimeout(() => {
    //   onCloseCall();
    // }, 7000);

    return () => clearInterval(interval);
  }, [onCloseCall]);

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-[rgba(0,0,0,0.80)]">
        <div className="relative w-full h-full">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-[80%] h-[50%] rounded-[5em] px-[2%] pt-[2%]">
            <div className="flex flex-col w-full h-full">
              <div className="flex-1 w-full rounded-t-[5em] bg-blue-950 text-white flex justify-center items-center aspect-video">
                <span
                  className="text-white font-bold transition-opacity duration-300"
                  style={{
                    opacity: visible ? 1 : 0,
                    fontSize: "clamp(50px, 35vw, 900px)", // 글자 크기 조정
                  }}
                >
                  {numRef.current}
                </span>
              </div>

              <div className="flex w-full h-[30%] justify-evenly items-center text-[20vw] font-[900] text-blue-950">
                <span>고</span>
                <span>객</span>
                <span>님</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageContents;
