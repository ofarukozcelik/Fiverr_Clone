import axios from 'axios';
import { toast } from 'react-toastify';

const upload = async (file) => {
  // resim değilse hata ver
  if (!file.type.startsWith('image')) return null;

  // resmi bir formdata içerisne ekle
  const data = new FormData();
  data.append('file', file);

  // yüklenme ayarlarını belirle
  data.append('upload_preset', 'profile');

  try {
    // api isteği atıp resmi buluta yükle
    const res = await axios.post(
      'https://api.cloudinary.com/v1_1/dkpywzlo2/image/upload',
      data
    );

    // resmin url'ini fonksiyonun çağrıldığı yere döndür
    return res.data.url;
  } catch (err) {
    toast.error('fotoğraf yüklenirken bir sorun oluştu');
  }
};

export default upload;
