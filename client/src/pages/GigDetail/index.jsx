import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import api from '../../utils/api';
import Loader from '../../components/Loader';
import Info from './Info';
import OrderBox from './OrderBox';
import UserInfo from './UserInfo';
import Reviews from './Reviews';

const GigDetail = () => {
  const { id } = useParams();

  const { isLoading, error, data } = useQuery('gig', () =>
    api.get(`/gig/${id}`).then((res) => res.data.gig)
  );

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Error err={error} />
      ) : (
        <div className="flex flex-col lg:flex-row gap-10">
          <div>
            <Info data={data} />
            <UserInfo user={data.user} />
            <Reviews gigId={id} />
          </div>

          <OrderBox data={data} />
        </div>
      )}
    </div>
  );
};

export default GigDetail;
