const express = require("express");
const app = express();

app.use(express.json());

// test root
app.get("/", (req, res) => {
  res.send("Server notif jalan 🚀");
});

// endpoint notif
app.post("/notif", (req, res) => {
  const { token, pesan } = req.body;

  console.log("KIRIM NOTIF:", token, pesan);

  res.json({ status: "ok" });
});

// 🔥 wajib railway
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server jalan di port", PORT);
});