import Link from "next/link";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa6";
const Footer = () => {
  return (
    <footer className="footer text-base-content bg-slate-200 p-4 dark:bg-slate-900 px-5 mx-2 lg:mx-0 lg:px-20 flex justify-between">
      <div className="">
        <p>Copyright © 2023 - All right reserved</p>
      </div>
      <div className="flex gap-5">
        <Link className="text-xl" href="">
          <FaLinkedin></FaLinkedin>
        </Link>
        <Link className="text-xl" href="">
          <FaGithub></FaGithub>
        </Link>
        <Link className="text-xl" href="/facebook.com">
          <FaFacebook></FaFacebook>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
