import SecondaryCard from "./SecondaryCard";
import VideoCard from "./VideoCard";
import RealTimeCard from "./RealTimeCard";
import {
  useGetTopMoviesQuery,
  useGetAllMoviesQuery,
} from "../../../../redux/api/movies";
import { useGetUsersQuery } from "../../../../redux/api/users";

const Main = () => {
  const { data: visitors } = useGetUsersQuery();
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: allMovies } = useGetAllMoviesQuery();

  const totalCommentsLength = allMovies?.map((m) => m.numReviews);
  const sumOfCommentsLength = totalCommentsLength?.reduce(
    (acc, length) => acc + length,
    0
  );

  return (
    <div>
      <section className="flex justify-around">
        <div className="mt-10 ml-[14rem]">
          <div className="-translate-x-4 flex">
            <SecondaryCard
              pill="Movies"
              content={visitors?.length}
              info="20.2k more than usual"
              gradient="from-teal-500 to-lime-400"
            />
            <SecondaryCard
              pill="Comments"
              content={sumOfCommentsLength}
              info="742.8 more than usual"
              gradient="from-[#CCC514] to-[#CDCB8E]"
            />
            <SecondaryCard
              pill="Users"
              content={allMovies?.length}
              info="372+ more than usual"
              gradient="from-teal-500 to-lime-400"
            />
            <SecondaryCard
              pill="Users"
              content={visitors?.length}
              info="20.2k more than usual"
              gradient="from-green-500 to-lime-400"
            />
          </div>
          <div className="flex justify-between w-[90%] text-white mt-10 font-bold">
            <p>Top Content</p>
            <p>Comments</p>
          </div>
          {topMovies?.map((movie) => (
            <VideoCard
              key={movie._id}
              image={movie.image}
              title={movie.name}
              date={movie.year}
              comments={movie.numReviews}
            />
          ))}
        </div>
        <div>
          <RealTimeCard />
        </div>
      </section>
    </div>
  );
};

export default Main;
