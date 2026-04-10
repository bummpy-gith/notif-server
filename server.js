const express = require("express");
const admin = require("firebase-admin");

const app = express();
app.use(express.json());

// 🔥 ambil file dari Firebase
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// ================= TEST ROOT =================
app.get("/", (req, res) => {
  res.send("Server notif jalan 🚀");
});

// ================= KIRIM NOTIF =================
app.post("/notif", async (req, res) => {
  const { token, pesan } = req.body;

  if (!token || !pesan) {
    return res.status(400).json({
      status: "error",
      message: "token atau pesan kosong"
    });
  }

  try {
    const response = await admin.messaging().send({
      token: token,
      notification: {
        title: "Rental PS 🎮",
        body: pesan
      }
    });

    console.log("✅ NOTIF TERKIRIM:", response);

    res.json({
      status: "sukses",
      response: response
    });

  } catch (error) {
    console.error("❌ ERROR KIRIM NOTIF:", error);

    res.status(500).json({
      status: "gagal",
      error: error.message
    });
  }
});

// ================= PORT =================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server jalan di port", PORT);
});