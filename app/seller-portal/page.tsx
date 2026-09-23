'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Building2, CheckCircle, XCircle, Clock,
  TrendingUp, Users, Eye, MessageSquare, Plus, Bell, Menu,
  BarChart3, Settings, User, Shield, ArrowRight,
} from 'lucide-react';
import { mockProperties } from '@/lib/mock/properties';
import { formatPrice, formatArea } from '@/lib/utils';

const sidebarLinks = [
  { icon: LayoutDashboard, label: 'Overview', id: 'overview' },
  { icon: Building2, label: 'My Listings', id: 'listings', badge: 6 },
  { icon: Clock, label: 'Pending Approval', id: 'pending', badge: 2 },
  { icon: CheckCircle, label: 'Approved', id: 'approved', badge: 4 },
  { icon: XCircle, label: 'Rejected', id: 'rejected' },
  { icon: Users, label: 'Lead Management', id: 'leads', badge: 12 },
  { icon: BarChart3, label: 'Analytics', id: 'analytics' },
  { icon: TrendingUp, label: 'Promote Listing', id: 'promote' },
  { icon: User, label: 'My Profile', id: 'profile' },
  { icon: Settings, label: 'Settings', id: 'settings' },
];

function SellerSidebar({
  activeSection,
  setActiveSection,
  setIsSidebarOpen,
}: {
  activeSection: string;
  setActiveSection: (s: string) => void;
  setIsSidebarOpen: (b: boolean) => void;
}) {
  return (
    <aside className="flex flex-col h-full">
      <div className="p-5 border-b border-gray-100">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center">
            <Building2 className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="font-display font-bold text-sm" style={{ color: '#C9A227' }}>Naradi</span>
            <div className="text-[9px] font-bold tracking-widest uppercase" style={{ color: '#0F5132' }}>Seller Portal</div>
          </div>
        </Link>
      </div>
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ background: 'linear-gradient(135deg, #C9A227, #d4b04a)', color: '#1a0000' }}>S</div>
          <div>
            <p className="font-semibold text-gray-900 text-sm">Suresh Patel</p>
            <span className="badge-verified text-[9px]"><Shield className="w-2.5 h-2.5" /> Verified Seller</span>
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
                activeSection === link.id ? 'text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
              style={activeSection === link.id ? { background: 'linear-gradient(135deg, #C9A227, #d4b04a)', color: '#1a0000' } : {}}
            >
              <link.icon className="w-4 h-4 flex-shrink-0" />
              <span className="flex-1">{link.label}</span>
              {link.badge && (
                <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${activeSection === link.id ? 'bg-black/10 text-gray-900' : 'bg-emerald-100 text-emerald-700'}`}>
                  {link.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </nav>
      <div className="p-4 border-t border-gray-100">
        <Link
          href="/auth/seller/login"
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-bold text-white"
          style={{ background: 'linear-gradient(135deg, #0F5132, #16a34a)', textDecoration: 'none' }}
        >
          <Plus className="w-4 h-4" /> Add New Listing
        </Link>
      </div>
    </aside>
  );
}

export default function SellerDashboard() {
  const [activeSection, setActiveSection] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const overviewStats = [
    { label: 'Total Listings', value: 6, icon: Building2, color: '#0F5132', change: '+1 this month' },
    { label: 'Total Views', value: '8,240', icon: Eye, color: '#2563eb', change: '+12% this week' },
    { label: 'Enquiries', value: 47, icon: MessageSquare, color: '#C9A227', change: '+8 this week' },
    { label: 'Leads', value: 12, icon: Users, color: '#7c3aed', change: '3 hot leads' },
  ];

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

            {/* Chart Placeholder */}
            <div className="chart-placeholder h-48 rounded-2xl">
              <BarChart3 className="w-8 h-8" />
              <p className="font-semibold">Views & Enquiries Chart</p>
              <p className="text-sm">Last 30 days analytics — API integration ready</p>
            </div>

            {/* Active Listings */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">Active Listings</h3>
                <button onClick={() => setActiveSection('listings')} className="text-sm text-amber-600 font-semibold flex items-center gap-1">View All <ArrowRight className="w-3.5 h-3.5" /></button>
              </div>
              <div className="space-y-3">
                {mockProperties.slice(0, 3).map((prop) => (
                  <div key={prop.id} className="flex items-center gap-3 py-3 border-b border-gray-50 last:border-0">
                    <div className="w-14 h-12 rounded-lg bg-cover bg-center flex-shrink-0" style={{ backgroundImage: `url('${prop.images[0]}')` }} />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm line-clamp-1">{prop.title}</p>
                      <p className="text-xs text-gray-500">{prop.location.city} · {formatArea(prop.pricing.totalArea, prop.pricing.areaUnit)}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-bold text-gray-900 text-sm">{formatPrice(prop.pricing.totalPrice)}</p>
                      <span className="badge-verified text-[9px]"><Eye className="w-2.5 h-2.5" />{prop.views}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'analytics':
        return (
          <div className="space-y-5">
            <h2 className="font-bold text-xl text-gray-900">Analytics</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {[
                { title: 'Views Over Time', desc: 'Property views — last 30 days' },
                { title: 'Enquiry Funnel', desc: 'Enquiries by property type' },
                { title: 'Location Heatmap', desc: 'Where buyers are from' },
                { title: 'Conversion Rate', desc: 'Enquiry to site visit ratio' },
              ].map((chart) => (
                <div key={chart.title} className="chart-placeholder h-52 rounded-2xl">
                  <BarChart3 className="w-7 h-7" />
                  <p className="font-semibold">{chart.title}</p>
                  <p className="text-sm">{chart.desc}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'leads':
        return (
          <div>
            <h2 className="font-bold text-xl text-gray-900 mb-5">Lead Management</h2>
            <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50">
              {[
                { name: 'Ramesh Kumar', phone: '+91 9876543210', property: 'ECR Road Plot', interest: 'High', status: 'hot', date: '2h ago' },
                { name: 'Priya Rajan', phone: '+91 8765432109', property: 'Commercial Land', interest: 'Medium', status: 'warm', date: '1d ago' },
                { name: 'Suresh Nair', phone: '+91 7654321098', property: 'Farm House', interest: 'Low', status: 'cold', date: '3d ago' },
              ].map((lead, i) => (
                <div key={i} className="p-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-gray-900">{lead.name}</p>
                    <p className="text-sm text-gray-500">{lead.phone} · {lead.property}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{lead.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      lead.status === 'hot' ? 'bg-red-100 text-red-700' :
                      lead.status === 'warm' ? 'bg-amber-100 text-amber-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>{lead.status}</span>
                    <a href={`tel:${lead.phone}`} className="text-xs px-3 py-1.5 rounded-lg font-semibold text-white" style={{ background: '#0F5132' }}>Call</a>
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
            <p className="text-gray-500 text-sm">This section is under development.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="hidden lg:block w-64 flex-shrink-0 bg-white border-r border-gray-100 min-h-screen">
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
          <SellerSidebar
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        </div>
      </div>
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsSidebarOpen(false)} />
          <motion.div initial={{ x: -300 }} animate={{ x: 0 }} className="absolute left-0 top-0 bottom-0 w-64 bg-white h-screen">
            <SellerSidebar
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
              <Menu className="w-5 h-5 text-gray-700" />
            </button>
            <p className="font-bold text-gray-900 capitalize">{activeSection === 'overview' ? 'Seller Dashboard' : activeSection.replace('-', ' ')}</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative p-2 rounded-lg hover:bg-gray-100">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
            </button>
            <Link href="/auth/seller/login" className="hidden sm:flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-bold" style={{ background: 'linear-gradient(135deg, #C9A227, #d4b04a)', color: '#1a0000', textDecoration: 'none' }}>
              <Plus className="w-3.5 h-3.5" /> Add Listing
            </Link>
          </div>
        </div>
        <div className="p-4 sm:p-6 pb-24 lg:pb-6">{renderContent()}</div>
      </div>
    </div>
  );
}
