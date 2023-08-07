import Image from "next/image";
import Link from "next/link";
import notFoundImage from "/public/404.png";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1>Sorry!! Page is not found</h1>
      <Image
        src={notFoundImage}
        alt="not found"
        width={600}
        height={600}
        className="lg:max-w-[600px] h-auto w-auto mx-auto p-2 rounded-md"
        sizes="100vw"
      ></Image>
      <Link href="/" className="btn btn-primary">
        Back to Home
      </Link>
    </div>
  );
};
export default NotFound;
