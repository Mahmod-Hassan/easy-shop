import getSingleProduct from "@/utils/getSingleProduct";
import Image from "next/image";
import { AiOutlineStar } from "react-icons/ai";
import AddToCartBtn from "./AddToCartButton";

export const revalidate = 0;

const ProductDetails = async ({ params: { id } }) => {
  const product = await getSingleProduct(id);
  const { imageUrls, title, price, ratings, features, details, brand } =
    product;
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      <figure>
        <Image
          src={imageUrls[0]}
          alt={title}
          width={450}
          height={450}
          className="max-h-[450px] mx-auto object-cover rounded-md"
          sizes="33vw"
        />
      </figure>
      <div className="col-span-2">
        <h2 className="card-title text-3xl">{title}</h2>
        <h3 className="card-title text-xl">brand: {brand}</h3>
        <h3 className="text-xl">Price: {price}</h3>
        <h3 className="text-xl mt-2">Features</h3>
        <ul>
          {features.map((feature, i) => (
            <ul key={i}>
              {i + 1}. {feature}
            </ul>
          ))}
        </ul>
        <h3 className="text-xl mt-2">Details</h3>
        <p>{details}</p>
        <div className="flex gap-1 mt-3">
          {[...Array(Math.round(ratings)).keys()].map((i) => (
            <AiOutlineStar key={i} className="text-2xl text-orange-500" />
          ))}
        </div>
        <AddToCartBtn id={id} />
      </div>
    </div>
  );
};

export default ProductDetails;
