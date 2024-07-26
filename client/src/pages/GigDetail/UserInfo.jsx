import { FaStar } from 'react-icons/fa';

const UserInfo = ({ user }) => {
  return (
    <>
      <div>
        <h1 className="text-lg font-bold mt-10">Satıcı Hakkında</h1>

        <div className="flex gap-2 mt-4">
          <img
            className="w-[70px] h-[70px] rounded-full object-cover"
            src={user.photo}
          />
          <div className="flex flex-col gap-2">
            <h4 className="text-lg font-bold">{user.username}</h4>
            <div className="flex">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <button className="text-sm rounded-md border py-1 px-2">
              İletişime Geç
            </button>
          </div>
        </div>
      </div>

      <div className="border mt-5 p-5">
        <p>{user.desc}</p>

        <div className="grid md:grid-cols-2 gap-5 mt-4">
          <p className="flex flex-col gap-1">
            <span>Nereden</span>
            <span className="font-bold">{user.country}</span>
          </p>

          <p className="flex flex-col gap-1">
            <span>Üyelik Tarihi</span>
            <span className="font-bold">{user.createdAt}</span>
          </p>

          <p className="flex flex-col gap-1">
            <span>Telefon</span>
            <span className="font-bold">{user.phone}</span>
          </p>

          <p className="flex flex-col gap-1">
            <span>Email</span>
            <span className="font-bold">{user.email}</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
