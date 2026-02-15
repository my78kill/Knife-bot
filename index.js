const express = require("express");
const TelegramBot = require("node-telegram-bot-api");
const path = require("path");

const app = express();

const TOKEN = process.env.BOT_TOKEN;
const bot = new TelegramBot(TOKEN);

app.use(express.json());

// ✅ Public folder serve karo
app.use(express.static(path.join(__dirname, "public")));

// ✅ Root pe index.html force open karao
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ✅ Telegram webhook
app.post(`/bot${TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// ✅ Start command
bot.onText(/\/start/, (msg) => {
  bot.sendGame(msg.chat.id, "knifethrow");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
