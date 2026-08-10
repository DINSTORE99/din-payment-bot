import { useState } from "react";
import { CreditCard, Loader2, ShieldCheck, AlertCircle } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

const PRODUCTS = {
  ssh-singapore: {
    name: "SSH Singapore",
    description: "Server Singapore • 7 Hari",
    price: 5000,
  },
  ssh-indonesia: {
    name: "SSH Indonesia",
    description: "Server Indonesia • 7 Hari",
    price: 5000,
  },
};

function formatRupiah(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function Checkout() {
  const [searchParams] = useSearchParams();

  const productId = searchParams.get("product");
  const product = PRODUCTS[productId] || PRODUCTS["ssh-singapore"];

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
        },
        body: JSON.stringify({
          amount: product.price,
          description: `Pembelian ${product.name}`,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Gagal membuat pembayaran QRIS."
        );
      }

      setPayment(result.data);
    } catch (err) {
      console.error(err);
      setError(err.message || "Gagal membuat pembayaran.");
    } finally {
      setLoading(false);
    }
  }

  if (payment) {
    return (
      <section className="container section">
        <div className="page-title">
          <span className="eyebrow">PEMBAYARAN</span>
          <h1>Scan QRIS</h1>
          <p>Selesaikan pembayaran untuk melanjutkan pesanan.</p>
        </div>

        <div className="form-card qr-result-card">
          <h2>{product.name}</h2>

          <p className="muted">
            Total pembayaran
          </p>

          <h1>
            {formatRupiah(
              payment.total_amount || payment.amount
            )}
          </h1>

          {payment.qris_url && (
            <div className="qr-box">
              <img
                src={payment.qris_url}
                alt="QRIS Pembayaran"
                width="260"
                height="260"
              />
            </div>
          )}

          <div className="payment-details">
            <div>
              <span>Transaction ID</span>
              <strong>{payment.transaction_id}</strong>
            </div>

            <div>
              <span>Status</span>
              <strong>{payment.status || "pending"}</strong>
            </div>

            {payment.expired_at && (
              <div>
                <span>Kadaluarsa</span>
                <strong>{payment.expired_at}</strong>
              </div>
            )}
          </div>

          {payment.qris_url && (
            <a
              href={payment.qris_url}
              target="_blank"
              rel="noopener noreferrer"
              className="primary-button full"
            >
              Buka QRIS
            </a>
          )}

          <button
            type="button"
            className="secondary-button full"
            onClick={() => setPayment(null)}
          >
            Kembali
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="container section">
      <div className="page-title">
        <Link to="/" className="back-link">
          ← Kembali
        </Link>

        <span className="eyebrow">CHECKOUT</span>

        <h1>Konfirmasi pembelian</h1>
      </div>

      <div className="form-card">
        <h2>{product.name}</h2>

        <p className="muted">
          {product.description}
        </p>

        <h1>{formatRupiah(product.price)}</h1>

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
              <Loader2 size={18} className="spin" />
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
          Pembayaran QRIS diproses melalui backend DIN STORE.
        </div>
      </div>
    </section>
  );
}
