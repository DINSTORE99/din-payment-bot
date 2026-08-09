const BOT_TOKEN =
  process.env.TELEGRAM_BOT_TOKEN;

const API =
  `https://api.telegram.org/bot${BOT_TOKEN}`;

export async function telegram(
  method,
  data
) {
  const response = await fetch(
    `${API}/${method}`,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json"
      },

      body: JSON.stringify(data)
    }
  );

  return response.json();
}

export async function sendMessage(
  chatId,
  text,
  keyboard
) {
  const data = {
    chat_id: chatId,
    text,
    parse_mode: "HTML"
  };

  if (keyboard) {
    data.reply_markup = {
      inline_keyboard: keyboard
    };
  }

  return telegram(
    "sendMessage",
    data
  );
}
