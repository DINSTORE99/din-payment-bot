export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const {
      transaction_id,
    } = req.query;

    if (!transaction_id) {
      return res.status(400).json({
        success: false,
        message:
          "transaction_id wajib diisi.",
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
        "https://qris.adijayavpn.cloud/api/status/payment"
      );

    url.searchParams.set(
      "transaction_id",
      transaction_id
    );

    url.searchParams.set(
      "apikey",
      apiKey
    );

    const response =
      await fetch(url);

    const data =
      await response.json();

    return res.status(
      response.ok ? 200 : 502
    ).json(data);

  } catch (error) {
    console.error(
      "QRIS status error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Gagal mengecek pembayaran.",
    });
  }
}
