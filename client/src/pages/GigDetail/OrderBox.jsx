import { FaRegClock } from 'react-icons/fa6';
import { GiRecycle } from 'react-icons/gi';
import { IoMdCheckmark } from 'react-icons/io';
const OrderBox = ({ data }) => {
  return (
    <div className="h-fit flex flex-col gap-4 border shadow rounded-md p-5">
      <div className="flex justify-between">
        <h2 className="font-semibold text-lg">{data.shortTitle}</h2>
        <p className="text-lg">${data.price}</p>
      </div>

      <h2>{data.shortDesc}</h2>

      <div className="flex justify-between gap-5">
        <p className="font-semibold flex items-center gap-2 whitespace-nowrap">
          <FaRegClock />
          {data.deliveryTime} gün içinde teslimat
        </p>

        <p className="font-semibold flex items-center gap-2 whitespace-nowrap">
          <GiRecycle />
          {data.revisionNumber} revizyon hakkı
        </p>
      </div>

      <ul>
        {data.features.map((text) => (
          <li className="flex gap-2 items-center">
            <IoMdCheckmark className="text-xl" />
            <span className="text-gray-400">{text}</span>
          </li>
        ))}
      </ul>

      <button className="bg-green-500 p-2 text-white font-semibold hover:bg-green-600 transition">
        Devam Et
      </button>
    </div>
  );
};

export default OrderBox;
