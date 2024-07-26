import { Link, useNavigate } from 'react-router-dom';
import api from './../utils/api';
import { CiSearch } from 'react-icons/ci';

const Header = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  const navigate = useNavigate();

  const logout = () => {
    api.post('/auth/logout').then(() => {
      localStorage.removeItem('user');
      navigate('/');
    });
  };

  // Aratılma durumunda
  const handleSearch = (e) => {
    // Sayfa yenilemeyi engelle
    e.preventDefault();

    // Aratılan kelimeyi al
    const text = e.target[0].value;

    // Kullanıcyı hizmetler sayfasına yönlendir
    navigate(`/search/gigs?query=${text}`);
  };

  return (
    <header className="p-5 shadow">
      <div className="max-w-[1440px] mx-auto flex justify-between gap-4 md:gap-8">
        <Link to={'/'}>
          <img className="w-[100px]" src="/fiverr.png" alt="logo" />
        </Link>

        <form
          onSubmit={handleSearch}
          className="flex-1 flex border rounded max-w-[600px]"
        >
          <input
            className="w-full h-full  px-3  outline-none"
            placeholder="Hizmetleri ara.."
            type="search"
          />
          <button className="max-md:hidden bg-black p-2 rounded-md text-white text-xl">
            <CiSearch />
          </button>
        </form>

        <div className="flex items-center gap-2 group relative">
          {user ? (
            <>
              <img
                className="h-[40px] w-[40px] rounded-full object-cover"
                src={user.photo}
              />
              <span className="font-semibold">{user.username}</span>

              <div className="w-[110px] text-[13px] hidden group-hover:flex  flex-col absolute top-[40px] left-[0px] transition bg-gray-200 rounded-md">
                {user.isSeller && (
                  <>
                    <Link
                      to={'/my-gigs'}
                      className="px-5 py-2 hover:bg-gray-100"
                    >
                      Hizmetler
                    </Link>
                    <Link
                      to={'/add-gig'}
                      className="px-5 py-2 hover:bg-gray-100"
                    >
                      Hizmet Ekle
                    </Link>
                  </>
                )}
                <Link className="px-5 py-2 hover:bg-gray-100">Siparişler</Link>
                <Link className="px-5 py-2 hover:bg-gray-100">Mesajlar</Link>
                <button
                  onClick={logout}
                  className="px-5 py-2 hover:bg-gray-100"
                >
                  Çıkış Yap
                </button>
              </div>
            </>
          ) : (
            <>
              <Link className="transition hover:text-green-500" to={'/login'}>
                Giriş Yap
              </Link>
              <Link
                className="border border-green-500 p-1 rounded transition hover:bg-green-500 hover:text-white"
                to={'/register'}
              >
                Kaydol
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
