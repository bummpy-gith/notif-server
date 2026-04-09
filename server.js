const express = require("express");
const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const app = express();
app.use(express.json());

app.post("/notif", async (req, res) => {

  const { token, pesan } = req.body;

  try {
    await admin.messaging().send({
      token: token,
      notification: {
        title: "Rental PS",
        body: pesan
      }
    });

    console.log("✅ Notif terkirim");
    res.json({ status: "success" });

  } catch (err) {
    console.log("❌ Error:", err);
    res.json({ status: "error", error: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("Server notif jalan 🚀");
});

app.listen(3000, () => {
  console.log("Server jalan di http://localhost:3000");
});