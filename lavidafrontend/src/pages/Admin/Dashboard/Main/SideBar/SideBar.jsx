import { Link } from "react-router";

const SideBar = () => {
  return (
    <div className="-translate-y-10 flex h-screen fixed mt-10 border-r-2 border-[#242424]">
      <aside className="text-white w-64 flex-shrink-0">
        <ul className="py-4">
          <li className="text-lg bg-gradient-to-b from-green-500 to-lime-400 rounded-full -translate-x-6">
            <Link
              className="block p-2 ml-20 mb-10"
              to="/admin/movies/dashboard"
            >
              Dashboard
            </Link>
          </li>
          <li className="text-lg -translate-x-6 hover:bg-gradient-to-b from-green-500 to-lime-400 rounded-full ">
            <Link className="block p-2 ml-20 mb-10" to="/admin/movies/create">
              Create Movie
            </Link>
          </li>
          <li className="text-lg -translate-x-6 hover:bg-gradient-to-b from-green-500 to-lime-400 rounded-full ">
            <Link className="block p-2 ml-20 mb-10" to="/admin/movies/genre">
              Create Genre
            </Link>
          </li>
          <li className="text-lg -translate-x-6 hover:bg-gradient-to-b from-green-500 to-lime-400 rounded-full ">
            <Link className="block p-2 ml-20 mb-10" to="/admin/movies-list">
              Update Movie
            </Link>
          </li>
          <li className="text-lg -translate-x-6 hover:bg-gradient-to-b from-green-500 to-lime-400 rounded-full ">
            <Link className="block p-2 ml-20 mb-10" to="/admin/movies/comments">
              Comments
            </Link>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default SideBar;
