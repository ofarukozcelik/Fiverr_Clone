import Gig from "../models/gig.model.js";
import error from "./../utils/error.js";

// filtreme ayarları oluşturan method
const buildFilters = (query) => {
  // filtreleme ayarlarının tanımlandığı nesne oluştur
  const filters = {};

  if (query.userId) {
    filters.user = query.userId;
  }

  if (query.cat) {
    filters.category = query.cat;
  }

  if (query.min || query.max) {
    filters.price = {};

    if (query.min) {
      filters.price.$gt = query.min;
    }

    if (query.max) {
      filters.price.$lt = query.max;
    }
  }

  if (query.search) {
    filters.title = { $regex: query.search, $options: "i" };
  }

  if (query.userId) {
    filters.user = query.userId;
  }

  // fonksiyonun  çağrıldığı yere ayarları döndür
  return filters;
};

// 1) Bütün hizmetleri al
export const getAllGigs = async (req, res, next) => {
  // filtreleme ayarlarını oluşturan fonk. çağır
  const filters = buildFilters(req.query);

  try {
    const gigs = await Gig.find(filters).populate("user");

    if (gigs.length > 0) {
      res.status(200).json({
        message: "Hizmetler alındı",
        gigs,
      });
    } else {
      next(error(404, "Aratılan kriterlere uygun bir hizmet bulunamadı"));
    }
  } catch (err) {
    next(error(500, "Hizmetler alınırken bir sorun oluştu"));
  }
};

// 2) Bir hizmeti al
export const getGig = async (req, res, next) => {
  try {
    // url'ye param olarak eklenen id den yola çıkarak hizmetin bilgilerine eriş
    const gig = await Gig.findById(req.params.id).populate("user");

    res.status(200).json({
      message: "Hizmet bulundu",
      gig: gig,
    });
  } catch (err) {
    // gönderilen id'de hizmet yoksa hata gönder
    next(error(404, "Bu id'ye sahip bir hizmet bulunamadı"));
  }
};

// 3) Yeni hizmet oluştur
export const createGig = async (req, res, next) => {
  // kullanıcı satıcı değilse hata gönder
  if (!req.isSeller)
    return next(error(403, "Sadece satıcılar hizmet oluşturabilir"));

  // yeni hizmet oluştur
  const newGig = new Gig({
    userId: req.userId,
    ...req.body,
  });

  try {
    // hizmeti kaydet
    const savedGig = await newGig.save();

    // client'a cevap gönder
    res.status(200).json({
      message: "Hizmet başarıyla oluşturuldu",
      gig: savedGig,
    });
  } catch (err) {
    console.log(err);
    next(error(500, "Hizmet oluşturulurken bir sorun oluştu"));
  }
};

// 4) Bir hizmeti sil
export const deleteGig = async (req, res, next) => {
  try {
    // 1) hizmetin detaylarını al
    const gig = await Gig.findById(req.params.id);

    // 2) hizmeti oluşturan ve silmek isteyen kullanıcı aynı mı kontrol et
    if (gig.userId !== req.userId)
      return next(
        error(403, "Sadece kendi oluştuduğunuz hizmetleri silebilirsiniz")
      );

    // 3) hizmeti sil
    await Gig.findByIdAndDelete(req.params.id);

    // 4) client'a cevap gönder
    res.status(200).json({ message: "Hizmet başarıyla kaldırıldı" });
  } catch (err) {
    return next(error(500, "Hizmet silinirken bir sorun oluştu"));
  }
};
