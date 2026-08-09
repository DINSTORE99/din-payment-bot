import { Clock3 } from "lucide-react";

export default function History() {
  return (
    <section className="container section">
      <div className="page-title">
        <span className="eyebrow">TRANSACTIONS</span>
        <h1>Riwayat transaksi</h1>
        <p>Riwayat transaksi akan terhubung ke database Supabase pada tahap berikutnya.</p>
      </div>

      <div className="empty-card center">
        <Clock3 size={32} />
        <h2>Belum ada transaksi</h2>
        <p>Transaksi yang berhasil akan muncul di sini.</p>
      </div>
    </section>
  );
}
