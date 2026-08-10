export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method tidak diizinkan",
    });
  }

  try {
    const { amount, description } = req.body;

    if (!amount || Number(amount) < 1000) {
      return res.status(400).json({
        success: false,
        message: "Nominal minimal Rp 1.000.",
      });
    }

    const apiKey = process.env.QRIS_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        success: false,
        message: "QRIS API Key belum dikonfigurasi di Vercel.",
      });
    }

    const url =
      "https://qris.adijayavpn.cloud/api/deposit";

    const params = new URLSearchParams({
      amount: String(Number(amount)),
      apikey: apiKey,
    });

    const response = await fetch(`${url}?${params.toString()}`);

    const result = await response.json();

    if (!response.ok || result.status !== "success") {
      return res.status(400).json({
        success: false,
        message: result.message || "Gagal membuat QRIS.",
        data: result,
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        ...result.data,
        description: description || "DIN PAY",
      },
    });
  } catch (error) {
    console.error("QRIS CREATE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server gagal membuat QRIS.",
    });
  }
}
