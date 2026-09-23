'use client';

import Link from 'next/link';
import { Building2, CheckCircle, FileCheck, Shield, Search, Upload, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const verificationSteps = [
  { num: 1, icon: Upload, title: 'Submit Documents', desc: 'Upload your title deed, EC, patta, and DTCP/RERA certificates.' },
  { num: 2, icon: Search, title: 'Initial Review', desc: 'Our team reviews completeness and authenticity within 24 hours.' },
  { num: 3, icon: Shield, title: 'Legal Analysis', desc: '30-year title history check, encumbrance verification, and dispute screening.' },
  { num: 4, icon: CheckCircle, title: 'Verification Badge', desc: 'Property listed with "Verified" badge. 3x more enquiries guaranteed.' },
];

const documentRequirements = [
  { doc: 'Title Deed / Sale Deed', required: true, desc: 'Original registered deed proving ownership chain' },
  { doc: 'Encumbrance Certificate (EC)', required: true, desc: 'EC for last 30 years from Sub-Registrar office' },
  { doc: 'Patta / Chitta', required: true, desc: 'Revenue document showing land ownership' },
  { doc: 'Survey Sketch', required: true, desc: 'Field Measurement Book or FMB sketch' },
  { doc: 'DTCP Approval', required: false, desc: 'Required for layouts/developments' },
  { doc: 'RERA Certificate', required: false, desc: 'Required for projects with 8+ units' },
  { doc: 'NOC / Building Plan', required: false, desc: 'For constructed properties' },
];

export default function VerificationPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-20">
        {/* Hero */}
        <div className="bg-gradient-to-br from-emerald-950 to-emerald-800 py-16">
          <div className="container-xl text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4 text-sm font-semibold" style={{ background: 'rgba(201,162,39,0.15)', color: '#C9A227', border: '1px solid rgba(201,162,39,0.3)' }}>
              <Shield className="w-3.5 h-3.5" /> 12-Point Verification
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
              Get Your Property<br />Verified by Naradi
            </h1>
            <p className="text-emerald-200 text-lg max-w-2xl mx-auto mb-8">
              Our expert legal team verifies 30+ years of title history, encumbrances, and government approvals. Get the coveted Verified badge and triple your enquiry rate.
            </p>
            <Link href="/auth/seller/register" className="btn inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold" style={{ background: 'linear-gradient(135deg, #C9A227, #d4b04a)', color: '#1a0000', textDecoration: 'none' }}>
              Start Verification <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Process */}
        <div className="section-padding bg-white">
          <div className="container-xl">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Verification Process</h2>
              <div className="separator-emerald mx-auto mt-4" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {verificationSteps.map((step) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: step.num * 0.1 }}
                  className="bg-gray-50 rounded-2xl p-6 text-center border border-gray-100 hover:border-emerald-200 hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 rounded-full font-bold text-white flex items-center justify-center mx-auto mb-4 text-lg" style={{ background: 'linear-gradient(135deg, #0F5132, #16a34a)' }}>
                    {step.num}
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center mx-auto mb-3">
                    <step.icon className="w-5 h-5 text-emerald-700" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-500">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Document Requirements */}
        <div className="section-padding bg-gradient-to-br from-gray-50 to-white">
          <div className="container-xl max-w-3xl">
            <div className="text-center mb-10">
              <h2 className="font-display text-3xl font-bold text-gray-900 mb-3">Required Documents</h2>
              <div className="separator-gold mx-auto mt-4" />
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50 shadow-sm">
              {documentRequirements.map((doc) => (
                <div key={doc.doc} className="flex items-start gap-4 p-4">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${doc.required ? 'bg-emerald-100' : 'bg-gray-100'}`}>
                    <CheckCircle className={`w-4 h-4 ${doc.required ? 'text-emerald-700' : 'text-gray-400'}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-900 text-sm">{doc.doc}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${doc.required ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-500'}`}>
                        {doc.required ? 'Required' : 'Optional'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{doc.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-emerald-900">Verification Timeline</p>
                  <p className="text-sm text-emerald-700 mt-1">Standard verification: 48-72 hours · Urgent verification: 24 hours (premium) · Complex cases: 5-7 business days</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="py-16" style={{ background: 'linear-gradient(135deg, #0F5132, #16a34a)' }}>
          <div className="container-xl text-center">
            <h2 className="font-display text-3xl font-bold text-white mb-4">Ready to Get Verified?</h2>
            <p className="text-emerald-200 text-lg mb-8">List your property and start the verification process today. Free for basic verification.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/auth/seller/register" className="btn inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold" style={{ background: 'linear-gradient(135deg, #C9A227, #d4b04a)', color: '#1a0000', textDecoration: 'none' }}>
                List & Verify Property
              </Link>
              <Link href="/contact" className="btn inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold border-2 border-white/40 text-white hover:bg-white/10 transition-colors" style={{ textDecoration: 'none' }}>
                Talk to Legal Team
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
