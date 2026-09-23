'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Heart, Search, MessageSquare, Calendar, Bell, User, Settings,
  Menu, MapPin, Building2, Home,
  Shield, CheckCircle, Clock, ArrowRight,
} from 'lucide-react';
import { mockProperties } from '@/lib/mock/properties';
import { formatPrice } from '@/lib/utils';

const sidebarLinks = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/buyer-portal', id: 'dashboard' },
  { icon: Heart, label: 'Wishlist', href: '/buyer-portal/wishlist', id: 'wishlist', badge: 3 },
  { icon: Search, label: 'Saved Searches', href: '/buyer-portal/saved-searches', id: 'searches', badge: 2 },
  { icon: MessageSquare, label: 'My Enquiries', href: '/buyer-portal/enquiries', id: 'enquiries', badge: 5 },
  { icon: Calendar, label: 'Site Visits', href: '/buyer-portal/visits', id: 'visits', badge: 1 },
  { icon: Bell, label: 'Notifications', href: '/buyer-portal/notifications', id: 'notifications', badge: 4 },
  { icon: User, label: 'My Profile', href: '/buyer-portal/profile', id: 'profile' },
  { icon: Settings, label: 'Settings', href: '/buyer-portal/settings', id: 'settings' },
];

const mockEnquiries = [
  { id: 'e1', property: 'Prime BDA Plot - Judicial Layout, Yelahanka', city: 'Bengaluru', status: 'responded', date: '2 days ago' },
  { id: 'e2', property: 'Luxury Villa in Ooty', city: 'Ooty', status: 'pending', date: '5 days ago' },
  { id: 'e3', property: 'Agricultural Land - Hosur', city: 'Hosur', status: 'closed', date: '1 week ago' },
];

const mockVisits = [
  { id: 'v1', property: 'DTCP Plot - Perumbakkam', date: 'Tomorrow, 10:00 AM', status: 'scheduled' },
  { id: 'v2', property: 'Commercial Land - NH44', date: '28 Sep, 3:00 PM', status: 'scheduled' },
];

function Sidebar({
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
      {/* Logo */}
      <div className="p-5 border-b border-gray-100">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-700 to-emerald-900 flex items-center justify-center">
            <Building2 className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="font-display font-bold text-sm" style={{ color: '#0F5132' }}>Naradi</span>
            <div className="text-[9px] font-bold tracking-widest uppercase" style={{ color: '#C9A227' }}>Buyer Portal</div>
          </div>
        </Link>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-700 to-emerald-900 flex items-center justify-center text-white font-bold text-sm">
            R
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm">Ramesh Kumar</p>
            <p className="text-xs text-gray-500">ramesh@email.com</p>
          </div>
        </div>
      </div>

      {/* Links */}
      <nav className="flex-1 p-3 overflow-y-auto">
        <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase px-2 mb-2">Menu</p>
        <div className="space-y-0.5">
          {sidebarLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => { setActiveSection(link.id); setIsSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${
                activeSection === link.id
                  ? 'text-white'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
              style={activeSection === link.id ? { background: 'linear-gradient(135deg, #0F5132, #16a34a)' } : {}}
            >
              <link.icon className="w-4 h-4 flex-shrink-0" />
              <span className="flex-1">{link.label}</span>
              {link.badge && (
                <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${activeSection === link.id ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-700'}`}>
                  {link.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-gray-100 space-y-2">
        <Link href="/properties" className="flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-900 transition-colors">
          <Search className="w-4 h-4" /> Browse Properties
        </Link>
        <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors">
          <Home className="w-4 h-4" /> Back to Home
        </button>
      </div>
    </aside>
  );
}

export default function BuyerDashboard() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const wishlistProps = mockProperties.slice(0, 3);
  const statsData = [
    { label: 'Properties Saved', value: 12, icon: Heart, color: '#ef4444', change: '+3 this week' },
    { label: 'Active Enquiries', value: 5, icon: MessageSquare, color: '#0F5132', change: '2 awaiting response' },
    { label: 'Site Visits', value: 3, icon: Calendar, color: '#C9A227', change: '1 scheduled tomorrow' },
    { label: 'Saved Searches', value: 2, icon: Search, color: '#7c3aed', change: '5 new matches' },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {statsData.map((stat) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${stat.color}15` }}>
                      <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                    </div>
                    <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                  </div>
                  <p className="font-semibold text-gray-700 text-sm">{stat.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{stat.change}</p>
                </motion.div>
              ))}
            </div>

            {/* Recent Enquiries */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">Recent Enquiries</h3>
                <button onClick={() => setActiveSection('enquiries')} className="text-sm text-emerald-700 font-semibold hover:underline flex items-center gap-1">
                  View All <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="space-y-3">
                {mockEnquiries.map((enquiry) => (
                  <div key={enquiry.id} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{enquiry.property}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1"><MapPin className="w-3 h-3" /> {enquiry.city}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        enquiry.status === 'responded' ? 'bg-emerald-100 text-emerald-700' :
                        enquiry.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                        'bg-gray-100 text-gray-600'
                      }`}>{enquiry.status}</span>
                      <p className="text-xs text-gray-400 mt-1">{enquiry.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Visits */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">Upcoming Site Visits</h3>
                <button onClick={() => setActiveSection('visits')} className="text-sm text-emerald-700 font-semibold hover:underline flex items-center gap-1">
                  View All <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              {mockVisits.map((visit) => (
                <div key={visit.id} className="flex items-center gap-4 py-3 border-b border-gray-50 last:border-0">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-emerald-700" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-sm">{visit.property}</p>
                    <p className="text-xs text-emerald-600 font-medium flex items-center gap-1"><Clock className="w-3 h-3" /> {visit.date}</p>
                  </div>
                  <span className="badge-verified text-[10px]"><CheckCircle className="w-3 h-3" /> {visit.status}</span>
                </div>
              ))}
            </div>

            {/* Wishlist Preview */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">My Wishlist</h3>
                <button onClick={() => setActiveSection('wishlist')} className="text-sm text-emerald-700 font-semibold hover:underline flex items-center gap-1">
                  View All <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {wishlistProps.map((prop) => (
                  <Link
                    key={prop.id}
                    href={`/properties/${prop.slug}`}
                    className="block rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
                    style={{ textDecoration: 'none' }}
                  >
                    <div className="h-28 bg-cover bg-center" style={{ backgroundImage: `url('${prop.images[0]}')` }} />
                    <div className="p-3">
                      <p className="font-semibold text-gray-900 text-xs line-clamp-1">{prop.title}</p>
                      <p className="text-emerald-700 font-bold text-sm mt-0.5">{formatPrice(prop.pricing.totalPrice)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        );

      case 'wishlist':
        return (
          <div>
            <h2 className="font-bold text-xl text-gray-900 mb-5">My Wishlist ({wishlistProps.length})</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {wishlistProps.map((prop) => (
                <div key={prop.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all">
                  <div className="h-40 bg-cover bg-center" style={{ backgroundImage: `url('${prop.images[0]}')` }} />
                  <div className="p-4">
                    <p className="font-semibold text-gray-900 text-sm mb-1 line-clamp-1">{prop.title}</p>
                    <p className="text-xs text-gray-500 mb-2 flex items-center gap-1"><MapPin className="w-3 h-3" />{prop.location.city}</p>
                    <p className="font-bold text-emerald-700">{formatPrice(prop.pricing.totalPrice)}</p>
                    <div className="grid grid-cols-2 gap-2 mt-3">
                      <Link href={`/properties/${prop.slug}`} className="text-center py-2 rounded-lg text-xs font-bold text-white" style={{ background: 'linear-gradient(135deg, #0F5132, #16a34a)', textDecoration: 'none', display: 'block' }}>View</Link>
                      <button className="py-2 rounded-lg text-xs font-semibold border border-red-200 text-red-600 hover:bg-red-50">Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'enquiries':
        return (
          <div>
            <h2 className="font-bold text-xl text-gray-900 mb-5">My Enquiries</h2>
            <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50">
              {mockEnquiries.map((enquiry) => (
                <div key={enquiry.id} className="p-5 hover:bg-gray-50/50 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-gray-900">{enquiry.property}</p>
                      <p className="text-sm text-gray-500 mt-1 flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{enquiry.city}</p>
                      <p className="text-xs text-gray-400 mt-1">{enquiry.date}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0 ${
                      enquiry.status === 'responded' ? 'bg-emerald-100 text-emerald-700' :
                      enquiry.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>{enquiry.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div>
            <h2 className="font-bold text-xl text-gray-900 mb-5">Notifications</h2>
            <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50">
              {[
                { title: 'Price Drop Alert', msg: 'A property in your wishlist dropped by ₹3L', time: '1h ago', unread: true, type: 'price' },
                { title: 'Enquiry Response', msg: 'The seller responded to your Judicial Layout enquiry', time: '3h ago', unread: true, type: 'enquiry' },
                { title: 'Visit Reminder', msg: 'Site visit scheduled for tomorrow 10 AM', time: '1d ago', unread: false, type: 'visit' },
                { title: 'New Listing Alert', msg: '5 new plots in Yelahanka, Bengaluru match your saved search', time: '2d ago', unread: false, type: 'new' },
              ].map((notif, i) => (
                <div key={i} className={`p-4 flex gap-3 ${notif.unread ? 'bg-emerald-50/30' : ''}`}>
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${notif.unread ? 'bg-emerald-500' : 'bg-gray-300'}`} />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{notif.title}</p>
                    <p className="text-xs text-gray-600 mt-0.5">{notif.msg}</p>
                    <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'profile':
        return (
          <div>
            <h2 className="font-bold text-xl text-gray-900 mb-5">My Profile</h2>
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-700 to-emerald-900 flex items-center justify-center text-white font-bold text-2xl">R</div>
                <div>
                  <p className="font-bold text-gray-900 text-lg">Ramesh Kumar</p>
                  <p className="text-sm text-gray-500">ramesh@email.com</p>
                  <span className="badge-verified text-[10px] mt-1 inline-flex"><Shield className="w-3 h-3" /> Verified Buyer</span>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'Full Name', value: 'Ramesh Kumar' },
                  { label: 'Email', value: 'ramesh@email.com' },
                  { label: 'Phone', value: '+91 98765 43210' },
                  { label: 'City', value: 'Bengaluru, Karnataka' },
                ].map((field) => (
                  <div key={field.label}>
                    <label className="block text-xs font-semibold text-gray-500 mb-1">{field.label}</label>
                    <input type="text" className="input-base" defaultValue={field.value} />
                  </div>
                ))}
              </div>
              <button className="mt-5 px-5 py-2.5 rounded-xl font-bold text-white text-sm" style={{ background: 'linear-gradient(135deg, #0F5132, #16a34a)', border: 'none', cursor: 'pointer' }}>
                Save Changes
              </button>
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center">
            <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <LayoutDashboard className="w-7 h-7 text-gray-400" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2 capitalize">{activeSection}</h3>
            <p className="text-gray-500 text-sm">This section is under construction.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar — Desktop */}
      <div className="hidden lg:block w-64 flex-shrink-0 bg-white border-r border-gray-100 min-h-screen">
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
          <Sidebar
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsSidebarOpen(false)} />
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            className="absolute left-0 top-0 bottom-0 w-64 bg-white h-screen overflow-y-auto"
          >
            <Sidebar
              activeSection={activeSection}
              setActiveSection={setActiveSection}
              setIsSidebarOpen={setIsSidebarOpen}
            />
          </motion.div>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 min-w-0">
        {/* Top Bar */}
        <div className="sticky top-0 z-30 bg-white border-b border-gray-100 px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100" aria-label="Open sidebar">
              <Menu className="w-5 h-5 text-gray-700" />
            </button>
            <div>
              <p className="font-bold text-gray-900 capitalize">{activeSection === 'dashboard' ? 'Buyer Dashboard' : activeSection.replace('-', ' ')}</p>
              <p className="text-xs text-gray-400 hidden sm:block">Welcome back, Ramesh! 👋</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative p-2 rounded-lg hover:bg-gray-100">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
            </button>
            <Link href="/properties" className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold text-white" style={{ background: 'linear-gradient(135deg, #0F5132, #16a34a)', textDecoration: 'none' }}>
              <Search className="w-4 h-4" /> Browse
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 pb-24 lg:pb-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
