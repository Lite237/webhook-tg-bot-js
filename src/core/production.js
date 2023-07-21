const VERCEL_URL = `${process.env.VERCEL_URL}`;

const production = async (req, res, bot) => {
    if (!VERCEL_URL) {
        throw new Error("VERCEL_URL is not set.");
    }

    const webhookInfo = await bot.getWebHookInfo();
    if (webhookInfo.url !== VERCEL_URL + "/api") {
        await bot.deleteWebHook();
        await bot.setWebHook(`${VERCEL_URL}/api`);
    }

    if (req.method === "POST") {
        await bot.processUpdate(req.body);
    } else {
        res.status(200).json("Listening to bot events...");
    }
};
export { production };
