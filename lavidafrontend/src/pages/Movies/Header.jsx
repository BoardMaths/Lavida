import { useGetNewMoviesQuery } from "../../redux/api/movies";
import { Link } from "react-router";
import SliderUtil from "../../component/SliderUtil";

const Header = () => {
  const { data } = useGetNewMoviesQuery();

  return;

  <div className=" mt-[2rem] ml-[2rem] md:flex-row  flex flex-col justify-between items-center md:items-start ">
    <nav className="w-full md:w-[10rem] ml-0 md:ml-2 mb-4 md:mb-0 ">
      <Link
        to="/"
        className="transition duration-300 ease-in-out hover:bg-teal-200 block p-2 rounded mb-1 md:mb-2 text-lg"
      >
        Home
      </Link>
      <Link
        to="/movies"
        className="transition duration-300 ease-in-out hover:bg-teal-200 block p-2 rounded mb-1 md:mb-2 text-lg"
      >
        Browse Movies
      </Link>
    </nav>
    <div className="w-full mr-0 md:w-[80%] md:mr-2">
      <SliderUtil data={data} />
    </div>
  </div>;
};

export default Header;

/*




import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Loader from "./Loader";
import SmallProduct from "../pages/Products/SmallProduct";
import ProductCarousel from "../pages/Products/ProductCarousel";


  

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <h1> ERROR </h1>;
  }

  
        <div className="xl:block lg:hidden md:hidden sm:hidden">
          <div className="grid grid-cols-2">
            {data.map((product) => (
              <div key={product._id}>
                <SmallProduct product={product} />
              </div>
            ))}
          </div>
        </div>
        <ProductCarousel />
      </div>
    </>
  );
};









*/
