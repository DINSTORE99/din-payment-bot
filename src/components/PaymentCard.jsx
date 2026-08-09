import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

export default function PaymentCard() {
  return (
    <div className="payment-card">
      <div className="payment-card-top">
        <span className="eyebrow">PAYMENT</span>
        <ShieldCheck size={19} />
      </div>

      <h3>Pembayaran cepat & aman</h3>
      <p>
        Kelola transaksi dari satu tempat dengan sistem pembayaran DIN PAY.
      </p>

      <Link to="/payment" className="card-action">
        Mulai pembayaran
        <ArrowUpRight size={17} />
      </Link>
    </div>
  );
}
