import Image from "next/image";
import LoginForm from "./LoginForm";

const SignUpPage = () => {
  return (
    <div className="hero bg-base-200 w-full">
      <div className="hero-content flex-col lg:flex-row justify-between w-full">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold text-center">Login now!</h1>
          <p className="pt-6 text-center">Login now to connect with us.</p>
          <Image
            width={400}
            height={400}
            src="https://i.ibb.co/Y26xvCc/login.png"
            alt="login-image"
          ></Image>
        </div>
        <div className="card flex-shrink-0 w-full max-w-lg shadow-2xl bg-base-100">
          <LoginForm></LoginForm>
        </div>
      </div>
    </div>
  );
};
export default SignUpPage;
