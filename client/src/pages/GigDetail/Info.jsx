import React from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { FaStar } from 'react-icons/fa';

const Info = ({ data }) => {
  const arr = Array(Math.floor(data.avgRating)).fill();

  return (
    <div className="flex-1 flex flex-col gap-5">
      <p className="flex gap-3 items-center text-gray-500">
        <Link to="/">
          <AiOutlineHome />
        </Link>
        / <span>{data.category}</span>
      </p>

      <h1 className="font-bold text-xl md:text-2xl">{data.title}</h1>

      <div className="flex items-center gap-3">
        <img className="w-[50px] h-[50px] rounded-full" src={data.user.photo} />
        <h4 className="font-bold">{data.user.username}</h4>

        <div className="flex gap-1">
          {arr.map((x, i) => (
            <FaStar key={i} />
          ))}
        </div>
        <span className="font-semibold">{data.avgRating}</span>
        <span>({data.reviewCount})</span>
      </div>

      <Splide>
        {data.images.map((url, i) => (
          <SplideSlide key={i}>
            <img className="h-[30vh] w-full object-contain" src={url} />
          </SplideSlide>
        ))}
      </Splide>

      <h1 className="font-bold text-lg">Bu Hizmet Hakkında</h1>

      <p>{data.desc}</p>
    </div>
  );
};

export default Info;
