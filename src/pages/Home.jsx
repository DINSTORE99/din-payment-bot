import {
  ArrowRight,
  CheckCircle2,
  Server,
  Zap,
  ShieldCheck,
} from "lucide-react";

import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <section className="hero container">

        <div className="hero-content">
          <span className="eyebrow">
            DIGITAL SERVICE STORE
          </span>

          <h1>
            Server & akun digital
            <span> otomatis.</span>
          </h1>

          <p>
            Beli akun SSH, VPN dan layanan
            digital dengan proses otomatis,
            cepat dan praktis.
          </p>

          <div className="hero-actions">
            <Link
              to="/products"
              className="primary-button"
            >
              Lihat Produk
              <ArrowRight size={17} />
            </Link>

            <Link
              to="/login"
              className="secondary-button"
            >
              Login
            </Link>
          </div>

          <div className="hero-points">
            <span>
              <CheckCircle2 size={16} />
              Otomatis
            </span>

            <span>
              <CheckCircle2 size={16} />
              QRIS
            </span>

            <span>
              <CheckCircle2 size={16} />
              Instant Delivery
            </span>
          </div>
        </div>

        <div className="hero-card">
          <div className="hero-card-top">
            <span>DIN STORE</span>

            <Server size={20} />
          </div>

          <div className="hero-server">
            <div className="server-orb">
              D
            </div>

            <div>
              <strong>
                Server Online
              </strong>

              <span>
                Singapore • Indonesia
              </span>
            </div>
          </div>

          <div className="server-status">
            <span className="status-dot" />
            Semua sistem normal
          </div>
        </div>
      </section>

      <section className="container section">

        <div className="section-heading">
          <span className="eyebrow">
            WHY DIN STORE
          </span>

          <h2>
            Dibuat untuk pembelian cepat.
          </h2>
        </div>

        <div className="feature-grid">

          <div className="feature-card">
            <Zap size={23} />

            <h3>Otomatis</h3>

            <p>
              Setelah pembayaran berhasil,
              sistem dapat membuat akun secara
              otomatis.
            </p>
          </div>

          <div className="feature-card">
            <ShieldCheck size={23} />

            <h3>Aman</h3>

            <p>
              Credential API dan proses
              pembayaran berada di backend.
            </p>
          </div>

          <div className="feature-card">
            <Server size={23} />

            <h3>Banyak Server</h3>

            <p>
              Pilih server dan jenis layanan
              sesuai kebutuhan.
            </p>
          </div>

        </div>
      </section>
    </>
  );
}
