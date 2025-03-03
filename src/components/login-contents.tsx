"use client";

import { MouseEvent, useCallback, useState } from "react";
import Image from "next/image";

type Props = {
  onLogin: () => void;
};

const PASSWORD = "gktkddnr";
const LoginContents = ({ onLogin }: Props) => {
  const [inputPassword, setInputPassword] = useState("");

  const handleCheckPassword = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      if (inputPassword == PASSWORD) return onLogin();
      alert("비밀번호가 일치하지 않습니다.");
    },
    [inputPassword, onLogin],
  );

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black px-10">
      <div className="min-w-[365px] w-[400px] h-[300px] bg-gray-100 flex flex-col items-center gap-6 rounded-xl pt-10 px-10 relative">
        {/* 로고 */}
        <div className="flex justify-center">
          <Image src="/img/logo.png" alt="logo" width={200} height={100} />
        </div>

        <form className="w-full">
          <div className="flex flex-col justify-center items-center gap-3">
            {/* 비밀번호 */}
            <div className="flex justify-center items-center gap-4 w-full">
              <label htmlFor="password">비밀번호</label>
              <input
                id="password"
                className="h-8 flex-1"
                type="password"
                value={inputPassword}
                onChange={(e) => setInputPassword(e.target.value)}
              />
            </div>

            {/* 로그인 버튼 */}
            <div className="w-full absolute px-10 bottom-0 pb-8">
              <button
                className="border-2 w-full bg-green-500 text-white py-1 rounded-md font-bold"
                type="submit"
                onClick={(event) => handleCheckPassword(event)}
              >
                로그인
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginContents;
