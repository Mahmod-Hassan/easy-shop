import getCategories from "@/utils/getCategories";
import SingleCategory from "./SingleCategory";

const Categories = async () => {
  const categories = await getCategories();
  return (
    <div className="my-12">
      <h1 className="text-2xl font-semibold mb-5">All Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map((category) => (
          <SingleCategory
            category={category}
            key={category?._id}
          ></SingleCategory>
        ))}
      </div>
    </div>
  );
};
export default Categories;
