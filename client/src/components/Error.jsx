const Error = ({ err }) => {
    return (
      <div>
        <h1 className="text-center font-bold text-3xl text-red-500">
          {err.response.data?.statusCode}
        </h1>
        <h2 className="text-lg mt-5">Üzgünüz bir sorun oluştu</h2>
        <p className="text-lg font-semibold"> {err.response.data?.message}</p>
      </div>
    );
  };
  
  export default Error;
  