import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import error from "../utils/error.js";
import jwt from "jsonwebtoken";

// * Kaydol : Yeni hesap oluşturma

export const register = async (req, res, next) => {
 
  try {
    // Şifreyi hashleme ve saltlama
    const hashedPass = bcrypt.hashSync(req.body.password, 5);
    
    // Veritabanına kaydedilecek kullanıcıyı oluşturma
    const newUser = new User({ ...req.body, password: hashedPass });
    
    //  Veritabanına kaydetme
    await newUser.save();

    // Clienta cevap gönderme
    res.status(201).json({
      message: "Yeni kullanıcı oluşturuldu",
      user: newUser,
    });
  } catch (err) {
    // Hata middleware'ine yönlendirdik ve yönlendirirken hata açıklamasını gönderdik
    next(error(400, "Hesap oluşturulurken bir hata meydana geldi."));
  }
};

// * Giriş yap: Varolan hesaba giriş yap

export const login = async (req, res, next) => {
  try {
    // 1) İsmine göre kullanıcıyı bul
    const user = await User.findOne({ username: req.body.username });

    // 2) Kullanıcı bulunamazsa hata gönder
    if (!user) return next(error(404, "Kullanıcı bulunamadı"));

    // 3) Kullanıcı bulunursa şifresi doğrumu kontrol et (veritabanındaki hashlenmiş şifre ile isteğin body'sinde gelen normal şifreyi karşılaştır)
    const isCorrect = bcrypt.compareSync(req.body.password, user.password);

    // 4) Şifre yanlış ise hata ver
    if (!isCorrect) return next(error(404, "Şifreniz yanlış"));

    // 5) Şifre doğruysa jwt tokeni oluştur
    const token = jwt.sign(
      {
        id: user._id,
        isSeller: user.isSeller,
      },
      process.env.JWT_KEY
      // { expiresIn: 7*24*60*60 "7d" }
    );

    // Şifre alanını kaldır
    user.password = null;

    // 6) Tokeni çerezler ile client'a gönder
    res.cookie("accessToken", token).status(200).json({
      message: "Hesaba giriş yapıldı",
      user,
    });
  } catch (err) {
    next(error(400, "Giriş yaparken bir sorun oluştu"));
  }
};

// * Çıkış yap: Oturumu kapat

// Kullanıcıya giriş yaptığında gönderdiğimiz accessToken çerezinin geçerliliğini sonlandır
// Cookie'leri temizler
export const logout = async (req , res, nex) => {
  res.clearCookie("accessToken").status(200).json({
    message: "Kullanıcı hesabından çıkış yaptı",
  });
};
