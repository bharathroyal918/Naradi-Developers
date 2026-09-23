'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Building2, Users, MapPin, ShieldCheck, Globe, IndianRupee } from 'lucide-react';
import { mockStats } from '@/lib/mock/testimonials';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'building-2': Building2,
  'users': Users,
  'map-pin': MapPin,
  'shield-check': ShieldCheck,
  'globe': Globe,
  'indian-rupee': IndianRupee,
};

function AnimatedCounter({ target, suffix, prefix = '', duration = 2000 }: {
  target: number;
  suffix: string;
  prefix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString('en-IN')}{suffix}
    </span>
  );
}

export default function StatsCounter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="stats"
      aria-label="Company statistics"
      className="py-16 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #022c22 0%, #0F5132 100%)' }}
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-white blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl" style={{ background: '#C9A227' }} />
      </div>

      <div className="container-xl relative">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 text-center"
        >
          {mockStats.map((stat) => {
            const IconComponent = iconMap[stat.icon] || Building2;
            return (
              <motion.div
                key={stat.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                }}
                className="group"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 transition-transform group-hover:scale-110 duration-300"
                  style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}
                >
                  <IconComponent className="w-6 h-6 text-green-400" />
                </div>
                <div
                  className="font-display text-3xl sm:text-4xl font-bold mb-1"
                  style={{ color: '#C9A227' }}
                >
                  <AnimatedCounter
                    target={stat.value}
                    suffix={stat.suffix}
                    prefix={stat.prefix}
                  />
                </div>
                <p className="text-emerald-200/80 text-sm font-medium">{stat.label}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
