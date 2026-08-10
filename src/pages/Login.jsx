import {
  Chrome,
  ArrowLeft,
  Loader2,
} from "lucide-react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function loginGoogle() {
    if (!supabase) {
      setError(
        "Supabase belum dikonfigurasi."
      );
      return;
    }

    try {
      setLoading(true);
      setError("");

      const {
        error: loginError,
      } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo:
            `${window.location.origin}/dashboard`,
        },
      });

      if (loginError) {
        throw loginError;
      }
    } catch (error) {
      setError(
        error.message ||
          "Login Google gagal."
      );

      setLoading(false);
    }
  }

  return (
    <section className="auth-page container">

      <div className="auth-card">

        <div className="auth-logo">
          <span className="brand-mark">
            D
          </span>
        </div>

        <span className="eyebrow">
          DIN STORE ACCOUNT
        </span>

        <h1>
          Masuk ke DIN STORE
        </h1>

        <p className="muted">
          Gunakan akun Google untuk
          mengakses dashboard dan pesanan.
        </p>

        {error && (
          <div className="login-error">
            {error}
          </div>
        )}

        <button
          className="google-button"
          onClick={loginGoogle}
          disabled={loading}
          type="button"
        >
          {loading ? (
            <>
              <Loader2
                size={18}
                className="spin"
              />

              Menghubungkan...
            </>
          ) : (
            <>
              <Chrome size={18} />

              Lanjutkan dengan Google
            </>
          )}
        </button>

        <Link
          to="/"
          className="back-link"
        >
          <ArrowLeft size={15} />
          Kembali
        </Link>

      </div>

    </section>
  );
}
