import Error from "../components/Error";
import GigCard from "../components/GigCard";
import Loader from "../components/Loader";
import api from "../utils/api";
import { useQuery } from "react-query";

const MyGigs = () => {
  const params = {
    userId: JSON.parse(localStorage.getItem("user"))._id,
  };

  const { isLoading, error, data } = useQuery("gigs", () =>
    api.get(`/gig`, { params }).then((res) => res.data)
  );

  return (
    <div>
      <h1 className="text-2xl mb-5">Benim Hizmetlerim</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 ">
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Error err={error} />
        ) : (
          data.gigs.map((gig) => <GigCard key={gig._id} gig={gig} />)
        )}
      </div>
    </div>
  );
};

export default MyGigs;
