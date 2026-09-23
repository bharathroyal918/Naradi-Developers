'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Building2, Users, Shield, Clock, CheckCircle,
  XCircle, BarChart3, Settings, Bell, Menu, Eye, FileText,
  TrendingUp, ArrowRight, AlertTriangle, MessageSquare,
} from 'lucide-react';
import { mockProperties } from '@/lib/mock/properties';
import { formatPrice } from '@/lib/utils';

const sidebarLinks = [
  { icon: LayoutDashboard, label: 'Overview', id: 'overview' },
  { icon: Building2, label: 'All Listings', id: 'listings', badge: 247 },
  { icon: Clock, label: 'Pending Verification', id: 'pending', badge: 18 },
  { icon: CheckCircle, label: 'Approved', id: 'approved', badge: 182 },
  { icon: XCircle, label: 'Rejected', id: 'rejected', badge: 12 },
  { icon: Users, label: 'Users', id: 'users', badge: '8.2K' },
  { icon: MessageSquare, label: 'Enquiries', id: 'enquiries', badge: 142 },
  { icon: BarChart3, label: 'Analytics', id: 'analytics' },
  { icon: Shield, label: 'Verification Queue', id: 'verification', badge: 18 },
  { icon: AlertTriangle, label: 'Flagged Listings', id: 'flagged', badge: 3 },
  { icon: Settings, label: 'Settings', id: 'settings' },
];

const pendingVerifications = [
  { id: 'pv1', title: 'Plot in Hosur, TN', seller: 'Suresh Nair', submitted: '2h ago', docs: 4, priority: 'high' },
  { id: 'pv2', title: 'Commercial Land, Coimbatore', seller: 'Priya Ltd.', submitted: '5h ago', docs: 6, priority: 'medium' },
  { id: 'pv3', title: 'Agricultural Land, Salem', seller: 'Kumar Farms', submitted: '1d ago', docs: 5, priority: 'medium' },
  { id: 'pv4', title: 'Warehouse, NH44, Krishnagiri', seller: 'MV Logistics', submitted: '2d ago', docs: 7, priority: 'low' },
];

const overviewStats = [
  { label: 'Total Properties', value: '247', icon: Building2, color: '#0F5132', change: '+8 today' },
  { label: 'Total Users', value: '8,240', icon: Users, color: '#2563eb', change: '+42 today' },
  { label: 'Pending Verifications', value: '18', icon: Clock, color: '#f59e0b', change: '4 urgent' },
  { label: 'Revenue Today', value: '₹48K', icon: TrendingUp, color: '#C9A227', change: '+12% vs yesterday' },
];

function AdminSidebar({
  activeSection,
  setActiveSection,
  setIsSidebarOpen,
}: {
  activeSection: string;
  setActiveSection: (s: string) => void;
  setIsSidebarOpen: (b: boolean) => void;
}) {
  return (
    <aside className="flex flex-col h-full bg-gray-900 text-white">
      <div className="p-5 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-red-600 flex items-center justify-center">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="font-display font-bold text-sm text-white">Naradi Admin</span>
            <div className="text-[9px] font-bold tracking-widest uppercase text-red-400">Super Panel</div>
          </div>
        </div>
      </div>
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-red-700 flex items-center justify-center text-white font-bold text-xs">NR</div>
          <div>
            <p className="font-semibold text-white text-sm">G.R Narendra Reddy</p>
            <p className="text-[11px] text-amber-400 font-medium">Founder &amp; CEO</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-3 overflow-y-auto">
        <div className="space-y-0.5">
          {sidebarLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => { setActiveSection(link.id); setIsSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${
                activeSection === link.id
                  ? 'bg-red-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <link.icon className="w-4 h-4 flex-shrink-0" />
              <span className="flex-1">{link.label}</span>
              {link.badge && (
                <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${activeSection === link.id ? 'bg-white/20' : 'bg-gray-700 text-gray-300'}`}>
                  {link.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </nav>
    </aside>
  );
}

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {overviewStats.map((stat) => (
                <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${stat.color}15` }}>
                      <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                    </div>
                    <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                  </div>
                  <p className="font-semibold text-gray-700 text-sm">{stat.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{stat.change}</p>
                </div>
              ))}
            </div>

            {/* Chart */}
            <div className="chart-placeholder h-48 rounded-2xl">
              <BarChart3 className="w-8 h-8" />
              <p className="font-semibold">Platform Growth Chart</p>
              <p className="text-sm">New users, listings, and transactions — API integration ready</p>
            </div>

            {/* Pending Verifications */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-500" /> Pending Verifications
                </h3>
                <button onClick={() => setActiveSection('verification')} className="text-sm text-red-600 font-semibold flex items-center gap-1">View All <ArrowRight className="w-3.5 h-3.5" /></button>
              </div>
              <div className="space-y-3">
                {pendingVerifications.map((pv) => (
                  <div key={pv.id} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{pv.title}</p>
                      <p className="text-xs text-gray-500">{pv.seller} · {pv.docs} docs · {pv.submitted}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                        pv.priority === 'high' ? 'bg-red-100 text-red-700' :
                        pv.priority === 'medium' ? 'bg-amber-100 text-amber-700' :
                        'bg-gray-100 text-gray-600'
                      }`}>{pv.priority}</span>
                      <button className="px-3 py-1 rounded-lg text-xs font-bold text-white bg-emerald-600">Review</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Properties */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="font-bold text-gray-900 mb-4">Recent Listings</h3>
              <div className="space-y-3">
                {mockProperties.slice(0, 4).map((prop) => (
                  <div key={prop.id} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                    <div className="w-12 h-10 rounded-lg bg-cover bg-center flex-shrink-0" style={{ backgroundImage: `url('${prop.images[0]}')` }} />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-xs line-clamp-1">{prop.title}</p>
                      <p className="text-xs text-gray-500">{prop.location.city} · {formatPrice(prop.pricing.totalPrice)}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${prop.isVerified ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                      {prop.isVerified ? 'Verified' : 'Pending'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'verification':
        return (
          <div>
            <h2 className="font-bold text-xl text-gray-900 mb-5">Verification Queue</h2>
            <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50">
              {pendingVerifications.map((pv) => (
                <div key={pv.id} className="p-5">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-gray-900">{pv.title}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                          pv.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                        }`}>{pv.priority}</span>
                      </div>
                      <p className="text-sm text-gray-500">Seller: {pv.seller} · Submitted: {pv.submitted} · {pv.docs} documents</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold text-white bg-emerald-600">
                      <CheckCircle className="w-4 h-4" /> Approve
                    </button>
                    <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold text-white bg-red-600">
                      <XCircle className="w-4 h-4" /> Reject
                    </button>
                    <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold border border-gray-200 text-gray-700">
                      <FileText className="w-4 h-4" /> View Docs
                    </button>
                    <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold border border-gray-200 text-gray-700">
                      <Eye className="w-4 h-4" /> Preview
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'users':
        return (
          <div>
            <h2 className="font-bold text-xl text-gray-900 mb-5">User Management</h2>
            <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50">
              {[
                { name: 'Ramesh Kumar', email: 'ramesh@email.com', role: 'Buyer', verified: true, joined: '12 Jan 2024' },
                { name: 'Priya Rajan', email: 'priya@email.com', role: 'Seller', verified: true, joined: '18 Feb 2024' },
                { name: 'Mohammed Imran', email: 'imran@email.com', role: 'NRI', verified: true, joined: '5 Mar 2024' },
                { name: 'Kavitha Anand', email: 'kavitha@email.com', role: 'Buyer', verified: false, joined: '22 Mar 2024' },
              ].map((user, i) => (
                <div key={i} className="p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-700 to-emerald-900 flex items-center justify-center text-white font-bold text-sm">{user.name[0]}</div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email} · {user.joined}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      user.role === 'Buyer' ? 'bg-blue-100 text-blue-700' :
                      user.role === 'Seller' ? 'bg-amber-100 text-amber-700' :
                      'bg-emerald-100 text-emerald-700'
                    }`}>{user.role}</span>
                    {user.verified
                      ? <span className="flex items-center gap-1 text-xs text-emerald-600 font-semibold"><CheckCircle className="w-3.5 h-3.5" />KYC</span>
                      : <span className="flex items-center gap-1 text-xs text-amber-600 font-semibold"><Clock className="w-3.5 h-3.5" />Pending</span>
                    }
                    <button className="text-xs px-3 py-1.5 rounded-lg font-semibold border border-gray-200 text-gray-700 hover:bg-gray-50">Manage</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center">
            <LayoutDashboard className="w-10 h-10 text-gray-400 mx-auto mb-4" />
            <h3 className="font-bold text-gray-900 mb-2 capitalize">{activeSection.replace('-', ' ')}</h3>
            <p className="text-gray-500 text-sm">This admin section is under development.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="hidden lg:block w-64 flex-shrink-0 min-h-screen">
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col bg-gray-900">
          <AdminSidebar
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        </div>
      </div>
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsSidebarOpen(false)} />
          <motion.div initial={{ x: -300 }} animate={{ x: 0 }} className="absolute left-0 top-0 bottom-0 w-64 bg-gray-900 h-screen">
            <AdminSidebar
              activeSection={activeSection}
              setActiveSection={setActiveSection}
              setIsSidebarOpen={setIsSidebarOpen}
            />
          </motion.div>
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="sticky top-0 z-30 bg-white border-b border-gray-100 px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100">
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-700">ADMIN</span>
              <p className="font-bold text-gray-900 capitalize">{activeSection === 'overview' ? 'Admin Dashboard' : activeSection.replace('-', ' ')}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative p-2 rounded-lg hover:bg-gray-100">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
            </button>
            <Link href="/" className="text-sm font-semibold text-gray-500 hover:text-gray-700">← Back to Site</Link>
          </div>
        </div>
        <div className="p-4 sm:p-6">{renderContent()}</div>
      </div>
    </div>
  );
}
