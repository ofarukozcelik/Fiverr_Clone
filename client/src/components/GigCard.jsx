import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const GigCard = ({ gig }) => {
  return (
    <Link
      to={`/gig/${gig._id}`}
      className="border p-2 rounded-md cursor-pointer shadow hover:shadow-lg flex flex-col gap-3"
    >
      <img className="h-full object-contain rounded-md" src={gig.cover} />

      <div className="flex gap-2 items-center">
        <img className="w-[50px] h-[50px] rounded-full" src={gig.user.photo} />
        <p>
          <span className="font-semibold">{gig.user.username} </span>
          tarafından
        </p>
      </div>

      <p className="font-semibold">{gig.title}</p>

      <p className="flex items-center gap-1 font-bold text-lg">
        <FaStar />
        {gig.avgRating}
        <span className="font-normal">({gig.reviewCount})</span>
      </p>

      <p className="font-semibold">${gig.price}</p>
    </Link>
  );
};

export default GigCard;
