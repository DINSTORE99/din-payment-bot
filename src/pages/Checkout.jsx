import {
  ArrowLeft,
  CreditCard,
  ShieldCheck,
} from "lucide-react";

import {
  Link,
  useSearchParams,
} from "react-router-dom";

const products = {
  "ssh-sg-7": {
    name: "SSH Singapore",
    duration: "7 Hari",
    price: 5000,
    location: "Singapore",
  },

  "ssh-sg-30": {
    name: "SSH Singapore",
    duration: "30 Hari",
    price: 15000,
    location: "Singapore",
  },

  "ssh-id-30": {
    name: "SSH Indonesia",
    duration: "30 Hari",
    price: 20000,
    location: "Indonesia",
  },

  "vless-sg-30": {
    name: "VLESS Singapore",
    duration: "30 Hari",
    price: 20000,
    location: "Singapore",
  },
};

function rupiah(value) {
  return new Intl.NumberFormat(
    "id-ID"
  ).format(value);
}

export default function Checkout() {
  const [params] =
    useSearchParams();

  const productId =
    params.get("product");

  const product =
    products[productId];

  if (!product) {
    return (
      <section className="container section">
        <div className="empty-card">
          <h2>
            Produk tidak ditemukan
          </h2>

          <Link
            to="/products"
            className="primary-button"
          >
            Kembali ke produk
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="container section">

      <div className="page-title">

        <Link
          to="/products"
          className="back-link"
        >
          <ArrowLeft size={15} />
          Kembali ke produk
        </Link>

        <span className="eyebrow">
          CHECKOUT
        </span>

        <h1>
          Konfirmasi pembelian
        </h1>

      </div>

      <div className="checkout-grid">

        <div className="form-card">

          <h2>
            {product.name}
          </h2>

          <p className="muted">
            Server {product.location}
            {" • "}
            {product.duration}
          </p>

          <div className="checkout-price">
            Rp {rupiah(product.price)}
          </div>

          <button
            className="primary-button full"
            type="button"
            disabled
          >
            <CreditCard size={18} />
            Buat Pembayaran
          </button>

          <div className="secure-note">
            <ShieldCheck size={17} />

            Pembayaran QRIS akan
            diproses melalui backend
            DIN STORE.
          </div>

        </div>

        <div className="content-card">

          <span className="eyebrow">
            ORDER
          </span>

          <h2>
            Detail Pesanan
          </h2>

          <div className="order-summary">

            <div>
              <span>Produk</span>
              <strong>
                {product.name}
              </strong>
            </div>

            <div>
              <span>Masa aktif</span>
              <strong>
                {product.duration}
              </strong>
            </div>

            <div>
              <span>Server</span>
              <strong>
                {product.location}
              </strong>
            </div>

            <div>
              <span>Total</span>
              <strong>
                Rp {rupiah(product.price)}
              </strong>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
