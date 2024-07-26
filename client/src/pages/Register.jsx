import { useState } from 'react';
import Input from '../components/Input';
import { toggler } from '../utils/constants';
import api from './../utils/api';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../components/Button';
import upload from '../utils/upload';

const Register = () => {
  const [isSeller, setIsSeller] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // bir formdata örneği oluştur
    const formData = new FormData(e.target);

    // bütün inputlardaki verilerden bir nesne tanımla
    const newUser = Object.fromEntries(formData.entries());
    console.log(newUser);

    // fotoğrafı bulut depolama alanına yükle
    const url = await upload(newUser.photo);

    // buluttaki fotoğrafın url'ini nesneye kaydet
    newUser.photo = url;

    // satıcı ise bunu nesnenin içerisne kaydet
    newUser.isSeller = isSeller;

    // kullanıcı hesabı oluşturmak için api isteği at
    api.post('/auth/register', newUser)
      // başarılı olursa
      .then(() => {
        // bildirim gönder
        toast.success('Hesabınız oluşturuldu. Giriş Yapabilirsiniz');
        // logine yönlendir
        navigate('/login');
      })
      // başarısız olursa
      .catch((err) => {
        // bildirim gönder
        toast.error('Bir sorun oluştu' + err.message);
      });
  };

  return (
    <div className="max-w-[900px] mx-auto ">
      <form
        className="grid md:grid-cols-2 md:gap-[100px] md:pt-24"
        onSubmit={handleSubmit}
      >
        <div>
          <h1 className="text-xl md:text-2xl text-gray-500 font-bold mb-5">
            Yeni Hesap Oluştur
          </h1>
          <Input label="İsim" isReq={true} name={'username'} />
          <Input label="Mail" isReq={true} name={'email'} />
          <Input label="Fotoğraf" isReq={true} name={'photo'} type="file" />
          <Input label="Ülke" isReq={true} name={'country'} />
          <Input label="Şifre" isReq={true} name={'password'} type="password" />
        </div>

        <div>
          <h1 className="text-xl md:text-2xl text-gray-500 font-bold mb-5">
            Satıcı Olmak İstiyorum
          </h1>

          <div className="flex gap-5 mb-5">
            <p>Satıcı hesabını etkinleştir</p>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                onChange={(e) => setIsSeller(e.target.checked)}
                type="checkbox"
                className="sr-only peer"
              />
              <div className={toggler}></div>
            </label>
          </div>

          <Input
            label="Telefon"
            type={'number'}
            name={'phone'}
            disabled={!isSeller}
            isReq={isSeller}
          />
          <Input
            label="Açıklama"
            name={'desc'}
            disabled={!isSeller}
            isReq={isSeller}
          />
        </div>

        <Button text="Kaydol" />
      </form>

      <p className="mt-5 text-gray-500">
        Hesabınız var mı?
        <Link className="ms-3 text-blue-500" to="/login">
          Giriş Yap
        </Link>
      </p>
    </div>
  );
};

export default Register;
