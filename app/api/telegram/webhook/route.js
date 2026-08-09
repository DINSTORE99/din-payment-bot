import {
  sendMessage
} from "../../../../lib/telegram";

import {
  getUser,
  createUser
} from "../../../../lib/database";

import {
  generateApiKey
} from "../../../../lib/api-key";

export async function POST(request) {
  try {
    const update =
      await request.json();

    if (!update.message) {
      return Response.json({
        ok: true
      });
    }

    const message =
      update.message;

    const chatId =
      message.chat.id;

    const telegramId =
      message.from.id;

    const username =
      message.from.username;

    const text =
      message.text || "";

    let user =
      getUser(telegramId);

    /*
     * /start
     */

    if (
      text === "/start" ||
      !user
    ) {
      if (!user) {
        user = createUser(
          telegramId,
          username,
          generateApiKey()
        );
      }

      await sendMessage(
        chatId,
        `🎉 <b>Selamat datang!</b>

💎 Saldo Anda:
<b>Rp ${formatRupiah(
          user.balance
        )}</b>

🔑 <b>API Key Anda:</b>
<code>${user.apiKey}</code>

Gunakan API Key tersebut untuk mengakses API Bot.

Pilih menu yang tersedia:`,
        [
          [
            {
              text: "💳 Tarik Saldo",
              callback_data:
                "withdraw"
            }
          ],
          [
            {
              text: "📋 Riwayat Transaksi",
              callback_data:
                "history"
            }
          ],
          [
            {
              text:
                "ℹ️ Bantuan & kebijakan",
              callback_data:
                "help"
            }
          ],
          [
            {
              text: "🔑 API & ApiKey",
              callback_data:
                "apikey"
            }
          ]
        ]
      );

      return Response.json({
        ok: true
      });
    }

    /*
     * Unknown command
     */

    await sendMessage(
      chatId,
      "Gunakan /start untuk membuka menu."
    );

    return Response.json({
      ok: true
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        ok: false,
        error: error.message
      },
      {
        status: 500
      }
    );
  }
}

function formatRupiah(value) {
  return new Intl.NumberFormat(
    "id-ID"
  ).format(value || 0);
}
