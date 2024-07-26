import error from '../utils/error.js';
import Review from '../models/review.model.js';
import Gig from '../models/gig.model.js';

export const createReview = async (req, res, next) => {
  // 1) kullanıcı satıcı ise işlemi iptal et
  if (req.isSeller) return next(error(403, 'Satıcılar yorum gönderemez'));

  // 2) yorum belgesi oluştur
  const newReview = new Review({
    user: req.userId,
    gigId: req.body.gigId,
    desc: req.body.desc,
    star: req.body.star,
  });

  try {
    // 3) kullanıcının bu hizmete daha önce yaptığı yorumu al
    const oldRev = await Review.findOne({
      user: req.userId,
      gigId: req.body.gigId,
    });

    // 4) eski bir yorum varsa işlemi iptal et
    if (oldRev) return next(error(403, 'Zaten bu hizmete yorumunuz var'));

    // 5) yorumu kaydet
    await newReview.save();

    // 6) hizmetin rating değerlerini güncelle
    // toplam yıldız sayısını yeni atılan yorumun yıldızı kadar arttır
    // toplam yorum sayısı ise 1 arttır
    await Gig.findByIdAndUpdate(req.body.gigId, {
      $inc: { starCount: req.body.star, reviewCount: 1 },
    });

    res.status(201).json({
      message: 'Yorum gönderildi',
      data: newReview,
    });
  } catch (err) {
    console.log(err);
    next(error(500, 'Yorum gönderilirken bir sorun oluştu'));
  }
};

export const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ gigId: req.params.gigId }).populate(
      'user'
    );
    res.status(200).json({ reviews });
  } catch (err) {
    next(error(500, 'Yorumlar alınırken bir sorun oluştu'));
  }
};

export const deleteReview = () => {};
