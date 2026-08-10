export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <strong>DIN STORE</strong>

          <p>
            Layanan akun digital dan server
            otomatis.
          </p>
        </div>

        <div className="footer-copy">
          © {new Date().getFullYear()} DIN STORE
        </div>
      </div>
    </footer>
  );
}
