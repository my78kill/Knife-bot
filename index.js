const express = require("express");
const TelegramBot = require("node-telegram-bot-api");
const path = require("path");

const app = express();
const bot = new TelegramBot(process.env.BOT_TOKEN);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post(`/bot${process.env.BOT_TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running...");
});
