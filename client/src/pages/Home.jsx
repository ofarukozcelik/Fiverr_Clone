import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import InfoCard from "../components/InfoCard";
import { cards } from "../utils/constants";

const Home = () => {
  const navigate = useNavigate();

  // aratılma durumunda
  const handleSearch = (e) => {
    // sayfa yenilemeyi engelle
    e.preventDefault();

    // aratılan kelimeyi al
    const text = e.target[0].value;

    // kullanıcyı hizmetler sayfasına yönlendir
    navigate(`/search/gigs?query=${text}`);
  };

  return (
    <div>
      <section className="h-[40vh] bg-[#0a4226] m-[-20px] text-white p-5 pt-20">
        <h1 className="text-3xl font-bold">
          Find the right freelance service, right away
        </h1>

        <form onSubmit={handleSearch} className="flex flex-col gap-5 mt-10">
          <input
            className="p-2 rounded-md text-black"
            placeholder="herhangi bir hizmeti arayın.."
            type="text"
            required
          />
          <button className="bg-[#1dbf73] p-2 rounded-md cursor-pointer hover:bg-green-700 transition">
            <IoSearch />
          </button>
        </form>
      </section>

      <section className="mt-20">
        <h1 className="text-2xl font-bold">The best part? Everything.</h1>

        {cards.map((props, key) => (
          <InfoCard {...props} key={key} />
        ))}
      </section>
    </div>
  );
};

export default Home;
