// Aldığı parametrelere göre bir error nesnesi oluşturan fonksiyon.

const error = (status, message) => {
    // Bir err nesnesi oluşturma
    const err = new Error();
  
    // Hata nesnesini güncelleme
    err.message = message;
    err.status = status;
  
    return err;
  };
  
  export default error;
  