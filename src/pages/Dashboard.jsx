import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  CreditCard,
  Wallet,
  Receipt,
  Activity,
  Plus,
} from "lucide-react";
import { supabase } from "../lib/supabase";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      setUser(user);

      const { data, error } = await supabase
        .from("transactions")
        .select(
          `
            id,
            amount,
            total_amount,
            status,
            description,
            created_at
          `
        )
        .eq("user_id", user.id)
        .order("created_at", {
          ascending: false,
        })
        .limit(5);

      if (error) {
        console.error("Transaction error:", error);
        return;
      }

      setTransactions(data || []);
    } catch (error) {
      console.error("Dashboard error:", error);
    } finally {
      setLoading(false);
    }
  }

  const successTransactions = transactions.filter(
    (transaction) => transaction.status === "success"
  );

  const totalTransactions = transactions.length;

  const totalSuccess = successTransactions.reduce(
    (total, transaction) => total + Number(transaction.amount || 0),
    0
  );

  function formatRupiah(value) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);
  }

  function formatDate(value) {
    return new Date(value).toLocaleString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function statusLabel(status) {
    switch (status) {
      case "success":
        return "Berhasil";

      case "pending":
        return "Menunggu";

      case "expired":
        return "Expired";

      case "failed":
        return "Gagal";

      default:
        return status;
    }
  }

  return (
    <section className="container section">
      <div className="page-title">
        <span className="eyebrow">DIN PAY DASHBOARD</span>

        <h1>
          Halo,{" "}
          {user?.user_metadata?.full_name ||
            user?.email?.split("@")[0] ||
            "Member"}
          👋
        </h1>

        <p>
          Kelola pembayaran QRIS dan transaksi kamu dari satu dashboard.
        </p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <Wallet size={21} />

          <span>Saldo</span>

          <strong>Rp 0</strong>

          <small>Saldo tersedia</small>
        </div>

        <div className="stat-card">
          <CreditCard size={21} />

          <span>Total Transaksi</span>

          <strong>{totalTransactions}</strong>

          <small>5 transaksi terakhir</small>
        </div>

        <div className="stat-card">
          <Activity size={21} />

          <span>Total Berhasil</span>

          <strong>{formatRupiah(totalSuccess)}</strong>

          <small>Pembayaran sukses</small>
        </div>
      </div>

      <div className="dashboard-actions">
        <Link to="/payment" className="primary-button">
          <Plus size={17} />
          Buat QRIS
          <ArrowUpRight size={17} />
        </Link>

        <Link to="/history" className="secondary-button">
          <Receipt size={17} />
          Lihat Riwayat
        </Link>
      </div>

      <div className="content-card">
        <div className="section-title">
          <div>
            <span className="eyebrow">TRANSAKSI</span>
            <h2>Transaksi Terbaru</h2>
          </div>

          <Link to="/history" className="text-link">
            Lihat semua
            <ArrowUpRight size={15} />
          </Link>
        </div>

        {loading ? (
          <div className="empty-card">
            <p>Memuat transaksi...</p>
          </div>
        ) : transactions.length === 0 ? (
          <div className="empty-card">
            <Receipt size={32} />

            <h3>Belum ada transaksi</h3>

            <p>
              Buat transaksi QRIS pertama kamu untuk mulai menggunakan DIN PAY.
            </p>

            <Link to="/payment" className="primary-button">
              Buat pembayaran
              <ArrowUpRight size={17} />
            </Link>
          </div>
        ) : (
          <div className="transaction-list">
            {transactions.map((transaction) => (
              <div className="transaction-item" key={transaction.id}>
                <div className="transaction-icon">
                  <CreditCard size={18} />
                </div>

                <div className="transaction-info">
                  <strong>
                    {transaction.description || "Pembayaran QRIS"}
                  </strong>

                  <span>{formatDate(transaction.created_at)}</span>
                </div>

                <div className="transaction-right">
                  <strong>
                    {formatRupiah(transaction.amount)}
                  </strong>

                  <span
                    className={`status status-${transaction.status}`}
                  >
                    {statusLabel(transaction.status)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
