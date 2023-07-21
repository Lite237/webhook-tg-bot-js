import TelegramBot from "node-telegram-bot-api";
import { development, production } from "./core";

const BOT_TOKEN = process.env.BOT_TOKEN || "";
const ENVIRONMENT = process.env.NODE_ENV || "";

const bot = new TelegramBot(BOT_TOKEN);

bot.onText(/\/about/, async (msg) => {
    await bot.sendMessage(
        msg.chat.id,
        "I am a simple telegram bot build to test node-telegram-bot-api and webhook"
    );
});

bot.on("message", async (msg) => {
    await bot.sendMessage(msg.chat.id, `Hello ${msg.from.first_name}`, {
        reply_to_message_id: msg.message_id,
    });
});

//prod mode (Vercel)
export const startVercel = async (req, res) => {
    await production(req, res, bot);
};
//dev mode
ENVIRONMENT !== "production" && development(bot);
