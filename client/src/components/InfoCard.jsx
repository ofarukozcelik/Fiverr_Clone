import { IoCheckmarkCircleOutline } from "react-icons/io5";

const InfoCard = ({ title, text }) => {
  return (
    <div className="mt-10">
      <h3 className="flex text-xl font-semi-bold items-center gap-2">
        <IoCheckmarkCircleOutline />
        {title}
      </h3>

      <p className="text-gray-500">{text}</p>
    </div>
  ); 
};

export default InfoCard;
