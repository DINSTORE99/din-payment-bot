export default async function handler(req, res) {
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).json({
      status: "error",
      message: "Method tidak diizinkan",
    });
  }

  try {
    const auth = process.env.TRIAL_SSH_AUTH;

    if (!auth) {
      return res.status(500).json({
        status: "error",
        message: "TRIAL_SSH_AUTH belum dikonfigurasi di Vercel.",
      });
    }

    const response = await fetch(
      `https://id.dinns.my.id/api/trial-ssh?auth=${encodeURIComponent(auth)}`
    );

    const data = await response.json();

    if (!response.ok || data.status !== "success") {
      return res.status(response.status || 500).json({
        status: "error",
        message: data.message || "Gagal membuat akun trial SSH.",
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("TRIAL SSH ERROR:", error);

    return res.status(500).json({
      status: "error",
      message: "Server gagal menghubungi provider trial SSH.",
    });
  }
}
