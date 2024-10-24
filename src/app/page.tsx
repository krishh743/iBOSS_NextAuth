import Image from "next/image";
import Register from "./pages/authentication/register";
import SignUp from "./pages/authentication/SignUp";
import 'antd/dist/reset.css';


export default function Home() {
  return (
    <>
      <div className="flex justify-center items-center">
        <SignUp />
        {/* <Register/> */}
      </div>
    </>
  );
}
