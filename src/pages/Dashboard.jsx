import {
  ShoppingBag,
  CreditCard,
  User,
  ArrowRight,
} from "lucide-react";

import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Dashboard() {
  const [user, setUser] =
    useState(null);

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    if (!supabase) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUser(user);
  }

  const name =
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    "Member";

  return (
    <section className="container section">

      <div className="page-title">

        <span className="eyebrow">
          DASHBOARD
        </span>

        <h1>
          Halo, {name} 👋
        </h1>

        <p>
          Kelola akun dan pesanan DIN STORE
          kamu.
        </p>

      </div>

      <div className="stats-grid">

        <div className="stat-card">
          <ShoppingBag size={21} />

          <span>
            Pesanan
          </span>

          <strong>
            0
          </strong>
        </div>

        <div className="stat-card">
          <CreditCard size={21} />

          <span>
            Pembayaran
          </span>

          <strong>
            0
          </strong>
        </div>

        <div className="stat-card">
          <User size={21} />

          <span>
            Status
          </span>

          <strong>
            Aktif
          </strong>
        </div>

      </div>

      <div className="dashboard-actions">

        <Link
          to="/products"
          className="primary-button"
        >
          Belanja Sekarang
          <ArrowRight size={17} />
        </Link>

        <Link
          to="/orders"
          className="secondary-button"
        >
          Lihat Pesanan
        </Link>

      </div>

    </section>
  );
}
