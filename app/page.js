import Image from "next/image";
import { Button } from "@/components/ui/button"
import Slider from "./_components/Slider";
import GlobalApi from "./_utils/GlobalApi";
import CategoryList from "./_components/CategoryList";
import ProductList from "./_components/ProductList";
import Footer from "./_components/Footer";

export default async function Home() {
  const sliderList = await GlobalApi.getSliders();
  const categoryList = await GlobalApi.getCategoryList();
  const productList = await GlobalApi.getAllProducts();
  return (
    <div className=" p-5 md:p-15 px-20">
      {/* sliders */}
      <Slider sliderList={sliderList} />

      {/* category list */}
      <CategoryList categoryList={categoryList} />

      {/* product list */}
      <ProductList productList={productList} />

      {/* banner */}
      <Image src={'/banner.png'} width={1000} height={300} alt="banner"
      className="w-full h-[400px] object-contain"
      />

      {/* footer */}
      <Footer />
    </div>
  );
}
