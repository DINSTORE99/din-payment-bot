import { useState } from "react";
import {
  CreditCard,
  ShieldCheck,
  Loader2,
  QrCode,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export default function Payment() {
  const [customerName, setCustomerName] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [qrData, setQrData] = useState(null);

  async function handleCreateQRIS(event) {
    event.preventDefault();

    setError("");
    setQrData(null);

    const numericAmount = Number(amount);

    if (!numericAmount || numericAmount < 1000) {
      setError("Nominal minimal Rp 1.000.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/qris/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: numericAmount,
          description:
            description ||
            `Pembayaran ${customerName || "DIN PAY"}`,
          test: true,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Gagal membuat QRIS."
        );
      }

      setQrData(result.data);
    } catch (err) {
      console.error("Create QRIS error:", err);

      setError(
        err.message || "Terjadi kesalahan saat membuat QRIS."
      );
    } finally {
      setLoading(false);
    }
  }

  function formatRupiah(value) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);
  }

  return (
    <section className="container section">
      <div className="page-title">
        <span className="eyebrow">DIN PAY QRIS</span>

        <h1>Buat pembayaran</h1>

        <p>
          Buat transaksi QRIS dengan aman melalui gateway DIN PAY.
        </p>
      </div>

      {!qrData ? (
        <form
          className="form-card"
          onSubmit={handleCreateQRIS}
        >
          <label>
            Nama pelanggan
            <input
              type="text"
              placeholder="Nama lengkap"
              value={customerName}
              onChange={(e) =>
                setCustomerName(e.target.value)
              }
            />
          </label>

          <label>
            Nominal
            <input
              type="number"
              placeholder="10000"
              min="1000"
              value={amount}
              onChange={(e) =>
                setAmount(e.target.value)
              }
              required
            />
          </label>

          <label>
            Deskripsi
            <input
              type="text"
              placeholder="Pembayaran DIN PAY"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
            />
          </label>

          {error && (
            <div className="login-error">
              <AlertCircle size={17} />
              {error}
            </div>
          )}

          <button
            className="primary-button full"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2
                  size={18}
                  className="spin"
                />
                Membuat QRIS...
              </>
            ) : (
              <>
                <QrCode size={18} />
                Buat QRIS
              </>
            )}
          </button>

          <div className="secure-note">
            <ShieldCheck size={17} />
            Secret Token diproses hanya di backend DIN PAY.
          </div>

          <div className="secure-note">
            🧪 Mode Sandbox aktif — transaksi ini tidak
            menggunakan uang asli.
          </div>
        </form>
      ) : (
        <div className="form-card qr-result-card">
          <div className="qr-success">
            <CheckCircle2 size={30} />

            <span>QRIS berhasil dibuat</span>
          </div>

          <h2>
            {formatRupiah(qrData.amount)}
          </h2>

          {qrData.qr_url ? (
            <div className="qr-box">
              <img
                src={qrData.qr_url}
                alt="QRIS pembayaran"
                width="240"
                height="240"
              />
            </div>
          ) : qrData.qris_image ? (
            <div className="qr-box">
              <img
                src={qrData.qris_image}
                alt="QRIS pembayaran"
                width="240"
                height="240"
              />
            </div>
          ) : null}

          <div className="payment-details">
            <div>
              <span>Transaction ID</span>
              <strong>
                {qrData.transaction_id}
              </strong>
            </div>

            <div>
              <span>Status</span>
              <strong>{qrData.status}</strong>
            </div>

            <div>
              <span>Total</span>
              <strong>
                {formatRupiah(
                  qrData.total_amount ||
                    qrData.amount
                )}
              </strong>
            </div>
          </div>

          {qrData.payment_url && (
            <a
              href={qrData.payment_url}
              target="_blank"
              rel="noreferrer"
              className="primary-button full"
            >
              <ExternalLink size={17} />
              Buka Halaman Pembayaran
            </a>
          )}

          <button
            type="button"
            className="secondary-button full"
            onClick={() => {
              setQrData(null);
              setAmount("");
              setDescription("");
              setCustomerName("");
            }}
          >
            <CreditCard size={17} />
            Buat QRIS Baru
          </button>

          <div className="secure-note">
            <ShieldCheck size={17} />
            Jangan tutup halaman sebelum pembayaran selesai.
          </div>
        </div>
      )}
    </section>
  );
}
