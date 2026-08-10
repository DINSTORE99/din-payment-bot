import { useState } from "react";
import {
  CreditCard,
  Loader2,
  ShieldCheck,
  AlertCircle,
  QrCode,
  ExternalLink,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

const PRODUCTS = {
  "ssh-singapore": {
    name: "SSH Singapore",
    description: "Server Singapore • 7 Hari",
    price: 5000,
  },

  "ssh-indonesia": {
    name: "SSH Indonesia",
    description: "Server Indonesia • 7 Hari",
    price: 5000,
  },

  "ssh-malaysia": {
    name: "SSH Malaysia",
    description: "Server Malaysia • 7 Hari",
    price: 5000,
  },
};

function formatRupiah(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);
}

export default function Checkout() {
  const [searchParams] = useSearchParams();

  const productId = searchParams.get("product");

  const product =
    PRODUCTS[productId] || PRODUCTS["ssh-singapore"];

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [payment, setPayment] = useState(null);

  async function handlePayment() {
    if (loading) return;

    setLoading(true);
    setError("");
    setPayment(null);

    try {
      const response = await fetch("/api/qris/create", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },

        body: JSON.stringify({
          amount: product.price,
          description: `Pembelian ${product.name}`,
          product: product.name,
          product_id: productId || "ssh-singapore",
        }),
      });

      const text = await response.text();

      let result;

      try {
        result = JSON.parse(text);
      } catch {
        throw new Error(
          `Server mengembalikan response yang tidak valid. HTTP ${response.status}`
        );
      }

      if (!response.ok) {
        throw new Error(
          result.message ||
            `Gagal membuat pembayaran. HTTP ${response.status}`
        );
      }

      if (!result.success) {
        throw new Error(
          result.message || "Gagal membuat pembayaran QRIS."
        );
      }

      if (!result.data) {
        throw new Error(
          "Pembayaran berhasil dibuat tetapi data QRIS tidak ditemukan."
        );
      }

      setPayment(result.data);
    } catch (err) {
      console.error("QRIS ERROR:", err);

      setError(
        err?.message ||
          "Terjadi kesalahan saat membuat pembayaran."
      );
    } finally {
      setLoading(false);
    }
  }

  function resetPayment() {
    setPayment(null);
    setError("");
  }

  /*
   * ==============================
   * HASIL PEMBAYARAN
   * ==============================
   */

  if (payment) {
    const qrUrl =
      payment.qr_url ||
      payment.qris_url ||
      payment.qris_image;

    const paymentUrl =
      payment.payment_url ||
      payment.paymentUrl;

    const totalAmount =
      payment.total_amount ||
      payment.totalAmount ||
      payment.amount ||
      product.price;

    return (
      <section className="container section">
        <div className="page-title">
          <Link to="/" className="back-link">
            <ArrowLeft size={16} />
            Kembali ke beranda
          </Link>

          <span className="eyebrow">
            PEMBAYARAN QRIS
          </span>

          <h1>Scan QRIS</h1>

          <p>
            Selesaikan pembayaran untuk mendapatkan
            akun {product.name}.
          </p>
        </div>

        <div className="form-card qr-result-card">
          <div className="qr-success">
            <CheckCircle2 size={28} />

            <span>
              QRIS berhasil dibuat
            </span>
          </div>

          <h2>{product.name}</h2>

          <p className="muted">
            Total pembayaran
          </p>

          <h1>
            {formatRupiah(totalAmount)}
          </h1>

          {qrUrl ? (
            <div className="qr-box">
              <img
                src={qrUrl}
                alt="QRIS pembayaran"
                width="260"
                height="260"
              />
            </div>
          ) : (
            <div className="login-error">
              <AlertCircle size={18} />

              <span>
                QR Code tidak tersedia dari server.
              </span>
            </div>
          )}

          <div className="payment-details">
            <div>
              <span>Produk</span>

              <strong>
                {product.name}
              </strong>
            </div>

            {payment.transaction_id && (
              <div>
                <span>
                  Transaction ID
                </span>

                <strong>
                  {payment.transaction_id}
                </strong>
              </div>
            )}

            {payment.status && (
              <div>
                <span>Status</span>

                <strong>
                  {payment.status}
                </strong>
              </div>
            )}

            {payment.expired_at && (
              <div>
                <span>Kadaluarsa</span>

                <strong>
                  {payment.expired_at}
                </strong>
              </div>
            )}
          </div>

          {paymentUrl && (
            <a
              href={paymentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="primary-button full"
            >
              <ExternalLink size={18} />

              Buka Halaman Pembayaran
            </a>
          )}

          <button
            type="button"
            className="secondary-button full"
            onClick={resetPayment}
          >
            <CreditCard size={18} />

            Buat Pembayaran Baru
          </button>

          <div className="secure-note">
            <ShieldCheck size={17} />

            Jangan tutup halaman sebelum
            pembayaran selesai.
          </div>
        </div>
      </section>
    );
  }

  /*
   * ==============================
   * HALAMAN CHECKOUT
   * ==============================
   */

  return (
    <section className="container section">
      <div className="page-title">
        <Link
          to="/"
          className="back-link"
        >
          <ArrowLeft size={16} />

          Kembali ke produk
        </Link>

        <span className="eyebrow">
          CHECKOUT
        </span>

        <h1>
          Konfirmasi pembelian
        </h1>
      </div>

      <div className="form-card">
        <div className="checkout-product">
          <span className="eyebrow">
            PRODUK
          </span>

          <h2>
            {product.name}
          </h2>

          <p className="muted">
            {product.description}
          </p>

          <h1>
            {formatRupiah(product.price)}
          </h1>
        </div>

        {error && (
          <div className="login-error">
            <AlertCircle size={18} />

            <span>{error}</span>
          </div>
        )}

        <button
          type="button"
          className="primary-button full"
          onClick={handlePayment}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2
                size={18}
                className="spin"
              />

              Membuat Pembayaran...
            </>
          ) : (
            <>
              <CreditCard size={18} />

              Buat Pembayaran
            </>
          )}
        </button>

        <div className="secure-note">
          <ShieldCheck size={17} />

          Pembayaran QRIS diproses melalui
          backend DIN STORE.
        </div>
      </div>
    </section>
  );
}
