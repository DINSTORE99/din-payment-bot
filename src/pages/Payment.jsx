import { CreditCard, ShieldCheck } from "lucide-react";

export default function Payment() {
  return (
    <section className="container section">
      <div className="page-title">
        <span className="eyebrow">PAYMENT</span>
        <h1>Buat pembayaran</h1>
        <p>Form pembayaran ini adalah dasar untuk integrasi gateway pada tahap berikutnya.</p>
      </div>

      <div className="form-card">
        <label>
          Nama pelanggan
          <input type="text" placeholder="Nama lengkap" />
        </label>

        <label>
          Nominal
          <input type="number" placeholder="10000" min="1000" />
        </label>

        <label>
          Deskripsi
          <input type="text" placeholder="Pembayaran DIN PAY" />
        </label>

        <button className="primary-button full">
          <CreditCard size={18} />
          Lanjutkan
        </button>

        <div className="secure-note">
          <ShieldCheck size={17} />
          Transaksi akan diproses melalui backend DIN PAY.
        </div>
      </div>
    </section>
  );
}
