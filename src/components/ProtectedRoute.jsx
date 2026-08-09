import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  // Tahap 1: authentication belum diaktifkan.
  // Tahap 2 akan menghubungkan komponen ini dengan Supabase Auth.
  const isAuthenticated = false;

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}
