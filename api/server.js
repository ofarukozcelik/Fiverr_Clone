import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import authRouter from "./routes/auth.route.js";
import gigRouter from "./routes/gig.route.js";
import reviewRouter from "./routes/review.route.js";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

// .env dosyasına erişmek için kurulum
dotenv.config();

// Veritabanı ile bağlantı kurulumu
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Veritabanı ile bağlantı kuruldu"))
  .catch((err) =>
    console.log("Veritabanı ile bağlantı kurulurken bir ❌HATA❌ oluştu", err)
  );

// Express uygulaması oluşturulur
const app = express();

//* Middlewares

//a) Bodydeki json içeriğinin okunmasını sağlar
app.use(express.json());

//b) Kendi react uygulamamızdan gelen isteklere cevap vermesine izin ver
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

//c) Consola istekleri yazan middlware
app.use(morgan("dev"));

//d) Çerezleri işler ve erişilebilir hale getirir
app.use(cookieParser());

//* Route tanımlama

app.use("/api/auth", authRouter);
app.use("/api/gig", gigRouter);
app.use("/api/review", reviewRouter);

//* Hata yönetimi

// Controller'lardan yapılacak tüm yönlendirmeler bu middleware'i tetikler
app.use((err, req, res, next) => {
  console.log("❌HATA MEYDANA GELDİ❌");
  console.log(err);

  const errStatus = err.status || 500;
  const errMessage = err.message || "Üzgünüz yolunda gitmeyen birşeyler var.";

  return res.status(errStatus).json({
    statusCode: errStatus,
    message: errMessage,
  });
});

// Hangi portun dinlenileceğini belirler
app.listen(process.env.PORT, () => {
  console.log(`API ${process.env.PORT} portu dinlemeye başladı`);
});
