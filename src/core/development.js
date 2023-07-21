const development = async (bot) => {
    await bot.deleteWebHook();

    await bot.startPolling();

    process.once("SIGINT", () =>
        bot.stopPolling({
            reason: "SIGINT",
        })
    );
    process.once("SIGTERM", () =>
        bot.stopPolling({
            reason: "SIGTERM",
        })
    );
};

export { development };
