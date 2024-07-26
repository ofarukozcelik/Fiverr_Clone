import error from "../utils/error.js";
import jwt from "jsonwebtoken";

// Client'tan çerezler ile gönderilen jwt tokenin geçerliliğini kontrol edecek ve geçersiz ise hata gönderecek

const protect = (req, res, next) => {
  //1) çerezler ile gelen token'a eriş
  const token = req.cookies.accessToken;

  console.log("ÇEREZLERRR", req.cookies);

  //2) token yoksa hata ver
  if (!token) return next(error(403, "Yetkiniz yok (Token Bulunamadı)"));

  //3) token geçerli mi kontrol et
  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (err) return next(error(403, "Tokeniniz geçersiz veya süresi dolmuş"));

    //4) req içerisine kullanıcı id ve isSeller değerini ekle
    req.userId = payload.id;
    req.isSeller = payload.isSeller;
  });

  //5) sonraki adıma devam et
  next();
};

export default protect;
