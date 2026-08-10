export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const { amount } = req.body || {};

    const numericAmount = Number(amount);

    if (
      !Number.isFinite(numericAmount) ||
      numericAmount <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Nominal tidak valid.",
      });
    }

    const apiKey =
      process.env.ADIJAYA_QRIS_APIKEY;

    if (!apiKey) {
      return res.status(500).json({
        success: false,
        message:
          "API QRIS belum dikonfigurasi.",
      });
    }

    const url =
      new URL(
        "https://qris.adijayavpn.cloud/api/deposit"
      );

    url.searchParams.set(
      "amount",
      String(numericAmount)
    );

    url.searchParams.set(
      "apikey",
      apiKey
    );

    const response =
      await fetch(url);

    const data =
      await response.json();

    if (!response.ok) {
      return res.status(502).json({
        success: false,
        message:
          "Provider QRIS gagal merespons.",
      });
    }

    return res.status(200).json(data);

  } catch (error) {
    console.error(
      "QRIS create error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Gagal membuat pembayaran.",
    });
  }
}
