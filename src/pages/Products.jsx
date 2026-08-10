import {
  Server,
  ArrowRight,
} from "lucide-react";

import { Link } from "react-router-dom";

const products = [
  {
    id: "ssh-sg-7",
    name: "SSH Singapore",
    duration: "7 Hari",
    price: 5000,
    location: "Singapore",
  },
  {
    id: "ssh-sg-30",
    name: "SSH Singapore",
    duration: "30 Hari",
    price: 15000,
    location: "Singapore",
  },
  {
    id: "ssh-id-30",
    name: "SSH Indonesia",
    duration: "30 Hari",
    price: 20000,
    location: "Indonesia",
  },
  {
    id: "vless-sg-30",
    name: "VLESS Singapore",
    duration: "30 Hari",
    price: 20000,
    location: "Singapore",
  },
];

function rupiah(value) {
  return new Intl.NumberFormat(
    "id-ID"
  ).format(value);
}

export default function Products() {
  return (
    <section className="container section">

      <div className="page-title">
        <span className="eyebrow">
          PRODUCTS
        </span>

        <h1>
          Pilih layanan
        </h1>

        <p>
          Pilih produk yang kamu butuhkan.
          Akun akan dikirim secara otomatis
          setelah pembayaran berhasil.
        </p>
      </div>

      <div className="product-grid">

        {products.map((product) => (
          <div
            className="product-card"
            key={product.id}
          >
            <div className="product-icon">
              <Server size={22} />
            </div>

            <div className="product-location">
              {product.location}
            </div>

            <h2>
              {product.name}
            </h2>

            <p>
              Masa aktif {product.duration}
            </p>

            <div className="product-price">
              Rp {rupiah(product.price)}
            </div>

            <Link
              to={`/checkout?product=${product.id}`}
              className="primary-button full"
            >
              Beli Sekarang
              <ArrowRight size={17} />
            </Link>
          </div>
        ))}

      </div>
    </section>
  );
}
