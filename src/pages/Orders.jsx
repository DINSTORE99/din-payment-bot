import {
  ShoppingBag,
  ArrowRight,
} from "lucide-react";

import { Link } from "react-router-dom";

export default function Orders() {
  return (
    <section className="container section">

      <div className="page-title">

        <span className="eyebrow">
          ORDERS
        </span>

        <h1>
          Pesanan Saya
        </h1>

        <p>
          Semua pesanan dan akun yang
          pernah kamu beli.
        </p>

      </div>

      <div className="empty-card">

        <ShoppingBag size={34} />

        <h2>
          Belum ada pesanan
        </h2>

        <p>
          Kamu belum memiliki pesanan.
        </p>

        <Link
          to="/products"
          className="primary-button"
        >
          Mulai Belanja
          <ArrowRight size={17} />
        </Link>

      </div>

    </section>
  );
}
