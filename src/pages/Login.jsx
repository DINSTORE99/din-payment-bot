import { Link } from "react-router-dom";
import { Chrome, Mail } from "lucide-react";

export default function Login() {
  return (
    <section className="auth-page container">
      <div className="auth-card">
        <span className="eyebrow">DIN PAY ACCOUNT</span>
        <h1>Masuk ke DIN PAY</h1>
        <p className="muted">
          Login Google akan diaktifkan pada tahap berikutnya.
        </p>

        <button className="google-button" disabled>
          <Chrome size={19} />
          Lanjutkan dengan Google
        </button>

        <div className="divider"><span>atau</span></div>

        <button className="secondary-button full" disabled>
          <Mail size={18} />
          Login email — tahap berikutnya
        </button>

        <Link to="/" className="back-link">← Kembali ke beranda</Link>
      </div>
    </section>
  );
}
