export default async function handler(req, res) {
  // Tes GET dari browser
  if (req.method === "GET") {
    return res.status(200).json({
      success: true,
      message: "QRIS API aktif. Gunakan POST untuk membuat QRIS.",
    });
  }

  // Hanya POST untuk membuat transaksi
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method tidak diizinkan.",
    });
  }

  try {
    const { amount, description } = req.body || {};

    const numericAmount = Number(amount);

    if (!numericAmount || numericAmount < 1000) {
      return res.status(400).json({
        success: false,
        message: "Nominal minimal Rp 1.000.",
      });
    }

    const apiKey = process.env.QRIS_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        success: false,
        message: "QRIS_API_KEY belum diatur di Vercel.",
      });
    }

    const qrisUrl =
      "https://qris.adijayavpn.cloud/api/deposit";

    const params = new URLSearchParams({
      amount: String(numericAmount),
      apikey: apiKey,
    });

    const response = await fetch(
      `${qrisUrl}?${params.toString()}`,
      {
        method: "GET",
      }
    );

    const result = await response.json();

    if (!response.ok || result.status !== "success") {
      return res.status(400).json({
        success: false,
        message:
          result.message ||
          "API QRIS gagal membuat transaksi.",
        data: result,
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        ...result.data,
        description:
          description || "Pembayaran DIN PAY",
      },
    });
  } catch (error) {
    console.error("QRIS CREATE ERROR:", error);

    return res.status(500).json({
      success: false,
      message:
        error?.message ||
        "Terjadi kesalahan pada server QRIS.",
    });
  }
}
