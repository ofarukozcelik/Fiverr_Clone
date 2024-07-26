import Input from "../components/Input";
import { inputs } from "../utils/constants";
import upload from "../utils/upload";
import api from "../utils/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const AddGig = () => {
  const navigate = useNavigate();

  // form gönderilince
  const handleSubmit = async (e) => {
    // sayfayı yenilemeyi engelle
    e.preventDefault();

    // bütün inputlardaki verilere eriş
    const formData = new FormData(e.target);
    const gigData = Object.fromEntries(formData.entries());
    gigData.images = e.target.images.files;

    // fotoğrafları bulut depolama alanına yükle
    const coverUrl = await upload(gigData.cover);
    const imageUrls = await Promise.all(
      [...gigData.images].map(async (file) => {
        return await upload(file);
      })
    );

    // fotoğrafların url'ini nesneye kaydet
    gigData.cover = coverUrl;
    gigData.images = imageUrls;

    // özellikler alanındaki metni "," göre diziye çevir
    gigData.features = gigData.features.split(",");

    // api'a veriyi kaydet
    api
      .post("/gig", gigData)
      .then((res) => {
        // hizmet detay sayfasına yönlendir
        navigate(`/gig/${res.data.gig._id}`);
        // bildirim ver
        toast.success(`Hizmet oluşturuldu`);
      })
      .catch((err) => {
        console.log(err);
        toast.error(`Bir hata oluştu`);
      });
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-x-10">
        {inputs.map((data) => (
          <Input {...data} />
        ))}

        <div>
          <label className='className="block mb-2 text-sm font-medium text-gray-900"'>
            Özellikler
          </label>
          <p>Lütfen özellikleri "," ile ayırınız</p>
          <textarea
            name="features"
            className="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500  block w-full p-2.5  placeholder-gray-400 text-dark disabled:bg-gray-200  focus:border-blue-500 min-h-[200px] max-h-[400px]"
          />
        </div>

        <button className="my-10 bg-blue-500 p-2 font-bold text-white rounded hover:bg-blue-600">
          Hizmeti Yayınla
        </button>
      </form>
    </div>
  );
};

export default AddGig;
