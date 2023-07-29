import Link from "next/link";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa6";
const Footer = () => {
  return (
    <footer className="footer text-base-content bg-slate-200 p-4 dark:bg-neutral">
      <div className="items-center grid-flow-col">
        <p>Copyright © 2023 - All right reserved</p>
      </div>
      <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
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
