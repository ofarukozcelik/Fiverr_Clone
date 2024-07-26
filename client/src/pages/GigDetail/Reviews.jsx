import { useQuery } from 'react-query';
import Review from './Review';
import api from '../../utils/api';
import Loader from '../../components/Loader';
import Error from '../../components/Error';
import { FaStar } from 'react-icons/fa';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

const Reviews = ({ gigId }) => {
  const queryClient = useQueryClient();

  // Bütün yorumları alır
  const { isLoading, error, data } = useQuery('reviews', () =>
    api.get(`/review/${gigId}`).then((res) => res.data.reviews)
  );

  // Yeni yorum gönderen fn tanımla
  const mutation = useMutation({
    mutationFn: (newReview) => {
      return api.post('/review', newReview);
    },
    onSuccess: () => {
      toast.success('Yorum gönderildi');
      queryClient.invalidateQueries(['reviews']);
    },
    onError: (error) => {
      toast.error(error.response.data?.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Yıldız inputlarından bir dizi oluşturduk
    const arr = [
      e.target[0],
      e.target[1],
      e.target[2],
      e.target[3],
      e.target[4],
    ];

    // Dizideki seçli olan inputu bulduk
    const found = arr.find((inp) => inp.checked == true);

    // Yeni yorumu api'a kaydet
    mutation.mutate({ star: found.value, desc: e.target[5].value, gigId });
  };

  return (
    <div className="my-10">
      <h1 className="text-xl font-bold">Yorumlar</h1>
      <div>
        <h2 className="font-semibold my-4">Yorum Gönder</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <label>Deneyiminizi Puanlayın</label>
          <div className="flex">
            <div className="rating">
              <input type="radio" id="star5" name="rate" value="5" />
              <label htmlFor="star5" title="text">
                <FaStar />
              </label>
              <input type="radio" id="star4" name="rate" value="4" />
              <label htmlFor="star4" title="text">
                <FaStar />
              </label>
              <input type="radio" id="star3" name="rate" value="3" />
              <label htmlFor="star3" title="text">
                <FaStar />
              </label>
              <input type="radio" id="star2" name="rate" value="2" />
              <label htmlFor="star2" title="text">
                <FaStar />
              </label>
              <input type="radio" id="star1" name="rate" value="1" />
              <label htmlFor="star1" title="text">
                <FaStar />
              </label>
            </div>
          </div>

          <label className="mt-7">Açıklama Yazın</label>
          <input
            className="border p-2 rounded-md shadow"
            placeholder="açıklama..."
            type="text"
          />

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 rounded-md p-3 font-bold text-white"
            >
              Gönder
            </button>
          </div>
        </form>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Error err={error} />
      ) : (
        data.map((item) => <Review key={item._id} item={item} />)
      )}
    </div>
  );
};

export default Reviews;
