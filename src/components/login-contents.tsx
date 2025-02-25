"use client";

import { MouseEvent, useCallback, useState } from "react";

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
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black">
      <div className="w-[350px] h-[200px] bg-gray-100 flex flex-col justify-center items-center gap-6 rounded-xl">
        <div className="flex justify-center">
          <span className="font-bold text-4xl text-black">SAMSUNG</span>
        </div>

        <form>
          <div className="flex flex-col justify-center items-center gap-3">
            <div className="flex justify-center items-center gap-4">
              <label htmlFor="password">비밀번호</label>
              <input
                id="password"
                className="h-8"
                type="password"
                value={inputPassword}
                onChange={(e) => setInputPassword(e.target.value)}
              />
            </div>
            <button
              className="border-2 w-full bg-green-500 text-white py-1 rounded-md font-bold"
              type="submit"
              onClick={(event) => handleCheckPassword(event)}
            >
              로그인
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginContents;
