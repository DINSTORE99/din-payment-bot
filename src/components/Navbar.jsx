import {
  Menu,
  X,
  ShoppingBag,
  User,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Navbar() {
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadUser();

    if (!supabase) return;

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  async function loadUser() {
    if (!supabase) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUser(user);
  }

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header className="navbar">
      <div className="container nav-inner">

        <Link
          to="/"
          className="brand"
          onClick={closeMenu}
        >
          <span className="brand-mark">
            D
          </span>

          <span>
            DIN <strong>STORE</strong>
          </span>
        </Link>

        <button
          className="mobile-menu"
          onClick={() => setOpen(!open)}
          type="button"
        >
          {open ? (
            <X size={22} />
          ) : (
            <Menu size={22} />
          )}
        </button>

        <nav
          className={`nav-links ${
            open ? "nav-open" : ""
          }`}
        >
          <Link
            to="/"
            className={
              location.pathname === "/"
                ? "active"
                : ""
            }
            onClick={closeMenu}
          >
            Beranda
          </Link>

          <Link
            to="/products"
            className={
              location.pathname === "/products"
                ? "active"
                : ""
            }
            onClick={closeMenu}
          >
            Produk
          </Link>

          {user && (
            <>
              <Link
                to="/dashboard"
                onClick={closeMenu}
              >
                Dashboard
              </Link>

              <Link
                to="/orders"
                onClick={closeMenu}
              >
                Pesanan
              </Link>
            </>
          )}

          {user ? (
            <Link
              to="/dashboard"
              className="nav-account"
              onClick={closeMenu}
            >
              <User size={16} />
              Akun
            </Link>
          ) : (
            <Link
              to="/login"
              className="nav-account"
              onClick={closeMenu}
            >
              <User size={16} />
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
