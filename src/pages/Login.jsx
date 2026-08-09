import { useState } from "react";
import { Chrome, Loader2, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleGoogleLogin() {
    setError("");

    if (!supabase) {
      setError(
        "Supabase belum dikonfigurasi. Periksa VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY."
      );
      return;
    }

    try {
      setLoading(true);

      const { error: loginError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (loginError) {
        throw loginError;
      }
    } catch (err) {
      console.error("Google login error:", err);
      setError(err.message || "Login Google gagal.");
      setLoading(false);
    }
  }

  return (
    <section className="auth-page container">
      <div className="auth-card">
        <div className="auth-logo">
          <span className="brand-mark">
            <Chrome size={19} />
          </span>
        </div>

        <span className="eyebrow">DIN PAY ACCOUNT</span>

        <h1>Masuk ke DIN PAY</h1>

        <p className="muted">
          Gunakan akun Google kamu untuk masuk ke dashboard DIN PAY.
        </p>

        {error && (
          <div className="login-error">
            {error}
          </div>
        )}

        <button
          className="google-button"
          onClick={handleGoogleLogin}
          disabled={loading}
          type="button"
        >
          {loading ? (
            <>
              <Loader2 size={19} className="spin" />
              Menghubungkan...
            </>
          ) : (
            <>
              <Chrome size={19} />
              Lanjutkan dengan Google
            </>
          )}
        </button>

        <div className="divider">
          <span>AMAN & TERLINDUNGI</span>
        </div>

        <div className="login-info">
          <span>✓ Login menggunakan Google</span>
          <span>✓ Tidak menyimpan password Google</span>
          <span>✓ Data akun dikelola oleh Supabase</span>
        </div>

        <Link to="/" className="back-link">
          <ArrowLeft size={15} />
          Kembali ke beranda
        </Link>
      </div>
    </section>
  );
}
