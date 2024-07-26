import { FaStar } from 'react-icons/fa';
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import moment from 'moment';
import 'moment/locale/tr';

const Review = ({ item }) => {
  const arr = Array(Math.floor(item.star)).fill();

  return (
    <div className="flex flex-col gap-5 py-10 border-b">
      <div className="flex gap-5">
        <img
          className="w-[50px] h-[50px] rounded-full object-cover"
          src={item.user.photo}
        />
        <div>
          <h4 className="font-semibold">{item.user.username}</h4>
          <p>{item.user.country}</p>
        </div>
      </div>

      <div className="flex items-center">
        {arr.map((x, i) => (
          <FaStar key={i} />
        ))}

        <span className="ms-1 me-3">{item.star}</span>
        <span className="border-s px-3">
          {moment(item.createdAt).fromNow()}
        </span>
      </div>

      <p>{item.desc}</p>

      <div className="flex gap-5">
        <span className="font-semibold">Heplful?</span>
        <button className="flex gap-1 items-center">
          <AiOutlineLike /> Yes
        </button>
        <button className="flex gap-1 items-center">
          <AiOutlineDislike /> No
        </button>
      </div>
    </div>
  );
};

export default Review;
