import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { Toaster } from './components/ui/sonner';

// Lazy loading to prevent circular dependencies in this single file build
const UserDashboard = React.lazy(() => import('./pages/user/UserDashboard'));
const RentalRequestForm = React.lazy(() => import('./pages/user/RentalRequestForm'));
const RentalHistory = React.lazy(() => import('./pages/user/RentalHistory'));
const ContactUs = React.lazy(() => import('./pages/user/ContactUs'));
const PurchaseRequestForm = React.lazy(() => import('./pages/user/PurchaseRequestForm'));
const PurchaseHistory = React.lazy(() => import('./pages/user/PurchaseHistory'));
const InventoryView = React.lazy(() => import('./pages/user/InventoryView'));

const AdminDashboard = React.lazy(() => import('./pages/admin/AdminDashboard'));
const Inventory = React.lazy(() => import('./pages/admin/Inventory'));
const ManageRequests = React.lazy(() => import('./pages/admin/ManageRequests'));
const ActiveRentals = React.lazy(() => import('./pages/admin/ActiveRentals'));
const ManagePurchaseRequests = React.lazy(() => import('./pages/admin/ManagePurchaseRequests'));
const RequestsHistory = React.lazy(() => import('./pages/admin/RequestsHistory'));
const UserManagement = React.lazy(() => import('./pages/admin/UserManagement'));
const ProfileSettings = React.lazy(() => import('./pages/admin/ProfileSettings'));
const Payouts = React.lazy(() => import('./pages/admin/Payouts'));

export default function App() {
  const { user, role, loading, isConfigured } = useAuth();

  if (!isConfigured) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-200 p-8 text-center space-y-6">
          <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
          </div>
          <div className="space-y-2">
            <h1 className="text-xl font-bold text-slate-900 uppercase tracking-tight">Configuration Required</h1>
            <p className="text-sm text-slate-500 leading-relaxed">
              Supabase environment variables are missing or set to placeholder values. 
              Please configure <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-[11px] font-bold">VITE_SUPABASE_URL</code> and <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-[11px] font-bold">VITE_SUPABASE_ANON_KEY</code> in your environment or Secrets panel.
            </p>
          </div>
          <div className="pt-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            Modarnet V4 • Internal Portal
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center font-sans text-slate-400 text-xs font-bold uppercase tracking-widest">Loading Modarnet...</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
        <Toaster />
      </div>
    );
  }

  return (
    <>
      <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center font-sans text-slate-400 text-xs font-bold uppercase tracking-widest">Loading Component...</div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            {role === 'blocked' ? (
              <Route path="*" element={<div className="min-h-screen flex items-center justify-center font-sans"><div className="text-center space-y-4"><h1 className="text-2xl font-black text-rose-600">Access Denied</h1><p className="text-sm text-slate-500 max-w-md mx-auto">Your account has been blocked by an administrator. If you believe this is a mistake, please contact support.</p></div></div>} />
            ) : role === 'admin' ? (
              <>
                <Route index element={<Navigate to="/admin" replace />} />
                <Route path="admin" element={<AdminDashboard />} />
                <Route path="admin/inventory" element={<Inventory />} />
                <Route path="admin/requests" element={<ManageRequests />} />
                <Route path="admin/purchases" element={<ManagePurchaseRequests />} />
                <Route path="admin/active" element={<ActiveRentals />} />
                <Route path="admin/history" element={<RequestsHistory />} />
                <Route path="admin/users" element={<UserManagement />} />
                <Route path="admin/payouts" element={<Payouts />} />
                <Route path="admin/settings" element={<ProfileSettings />} />
                <Route path="*" element={<Navigate to="/admin" replace />} />
              </>
            ) : (
              <>
                <Route index element={<UserDashboard />} />
                <Route path="inventory" element={<InventoryView />} />
                <Route path="request" element={<RentalRequestForm />} />
                <Route path="purchase" element={<PurchaseRequestForm />} />
                <Route path="history" element={<RentalHistory />} />
                <Route path="purchase-history" element={<PurchaseHistory />} />
                <Route path="contact" element={<ContactUs />} />
                <Route path="settings" element={<ProfileSettings />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </>
            )}
          </Route>
        </Routes>
      </React.Suspense>
      <Toaster />
    </>
  );
}
