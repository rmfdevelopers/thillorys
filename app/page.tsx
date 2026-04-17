'use client';

// DESIGN DECISIONS:
// Layout Energy: editorial
// Depth Treatment: layered
// Divider Style: D-RULE
// Typography Personality: refined

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Heart, 
  Scissors, 
  Palette, 
  Award, 
  Users, 
  Phone, 
  Mail, 
  MapPin, 
  CheckCheck, 
  ArrowRight, 
  Loader2, 
  ImageOff,
  Menu,
  X,
  Instagram
} from 'lucide-react';

// --- Types ---
interface SectionProps {
  isVisible: boolean;
}

// --- Components ---

const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
};

function SafeImage({ src, alt, fill, width, height, className, priority, fallbackClassName }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean; fallbackClassName?: string;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br
        from-[var(--primary)]/60 to-[var(--accent)]/10 ${fallbackClassName ?? className ?? ''}`}>
        <ImageOff size={28} className="text-white/20" />
      </div>
    );
  }
  return (
    <Image src={src} alt={alt} fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={className} priority={priority}
      onError={() => setError(true)} />
  );
}

const Divider = () => (
  <div className="py-16 flex items-center gap-8 px-8 max-w-6xl mx-auto">
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
    <span className="text-accent font-serif text-xs tracking-[0.4em] uppercase whitespace-nowrap opacity-70">
      The Art of Softly Spoken Style
    </span>
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
  </div>
);

// --- Sections ---

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { name: "Atelier", href: "#about" },
    { name: "Collections", href: "#products" },
    { name: "Lookbook", href: "#gallery" },
    { name: "Consultation", href: "#contact" }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-primary/95 backdrop-blur-xl shadow-2xl py-4' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border border-accent flex items-center justify-center font-heading text-xl text-accent group-hover:bg-accent group-hover:text-black transition-all">
              TY
            </div>
            <span className="font-heading text-2xl tracking-tighter text-white">THILLORYS</span>
          </div>
        </a>
        
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-sm font-medium text-white/70 hover:text-accent transition-colors tracking-widest uppercase">
              {link.name}
            </a>
          ))}
          <a href="#contact" className="bg-accent text-black px-6 py-2.5 text-sm font-bold tracking-widest uppercase hover:brightness-110 transition-all rounded-sm">
            Book Atelier
          </a>
        </div>

        <button className="md:hidden text-white" onClick={() => setMobileMenu(true)}>
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-[60] transition-all duration-500 ${mobileMenu ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setMobileMenu(false)} />
        <div className={`absolute right-0 top-0 h-full w-[80%] max-w-sm bg-primary border-l border-white/10 p-10 transition-transform duration-500 ${mobileMenu ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex justify-between items-center mb-16">
            <div className="font-heading text-2xl text-accent">TY</div>
            <button onClick={() => setMobileMenu(false)} className="text-white/50 hover:text-white">
              <X size={32} />
            </button>
          </div>
          <div className="flex flex-col gap-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} onClick={() => setMobileMenu(false)} className="text-2xl font-heading text-white hover:text-accent transition-colors">
                {link.name}
              </a>
            ))}
          </div>
          <div className="mt-20 border-t border-white/10 pt-10">
            <p className="text-accent text-xs font-serif tracking-widest uppercase mb-4">Ibadan, Nigeria</p>
            <p className="text-white/50 text-sm">Fine bespoke tailoring for the understated luxury enthusiast.</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  const { ref, isVisible } = useScrollReveal();
  
  return (
    <section id="home" ref={ref} className="min-h-screen grid md:grid-cols-[1.1fr_0.9fr] items-stretch bg-primary overflow-hidden">
      <div className={`flex flex-col justify-center px-8 md:px-20 py-24 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0 skew-y-0' : 'opacity-0 translate-y-8 skew-y-1'}`}>
        <p className="text-accent font-serif text-sm tracking-[0.5em] uppercase mb-8 opacity-70">
          Est. Ibadan, Nigeria
        </p>
        <h1 className="font-heading text-6xl md:text-[5.5rem] font-normal text-white leading-[0.85] tracking-tighter">
          Timeless Art <br/> of You
        </h1>
        <p className="text-white/45 mt-10 text-xl max-w-md leading-relaxed font-serif italic">
          Step into a world where style is softly spoken and every stitch is a legacy. Experience the art of bespoke bridal and fashion design.
        </p>
        <div className="flex gap-6 mt-12 flex-wrap">
          <a href="#contact" className="bg-accent text-black px-10 py-4 font-bold tracking-widest uppercase hover:brightness-110 hover:scale-[1.02] transition-all duration-300">
            Book Your Atelier Visit
          </a>
        </div>
        <div className="mt-20 flex gap-12 border-t border-white/10 pt-10">
          <div>
            <p className="font-heading text-4xl text-white">150+</p>
            <p className="text-white/40 text-[10px] uppercase tracking-[0.3em] mt-2 font-bold">Bespoke Brides</p>
          </div>
          <div>
            <p className="font-heading text-4xl text-white">12</p>
            <p className="text-white/40 text-[10px] uppercase tracking-[0.3em] mt-2 font-bold">Years of Craft</p>
          </div>
        </div>
      </div>
      <div className="relative min-h-[50vh] md:min-h-full overflow-hidden">
        <div className={`absolute inset-0 transition-all duration-1500 ease-out ${isVisible ? 'scale-100 blur-0' : 'scale-110 blur-xl'}`}>
          <SafeImage src="https://images.unsplash.com/photo-1678115978875-bf1bc2969c23?q=80&w=1080" alt="Thillorys Atelier" fill className="object-cover" priority />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/10 to-transparent" />
        <div className="absolute inset-0 bg-black/10" />
      </div>
    </section>
  );
};

const About = () => {
  const { ref, isVisible } = useScrollReveal();
  
  return (
    <section id="about" ref={ref} className="py-32 px-6 bg-secondary text-primary relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-accent/20" />
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        <div className={`relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
          <div className="relative aspect-[4/5] w-full max-w-md mx-auto">
            <div className="absolute -inset-4 border border-accent/20 translate-x-4 translate-y-4" />
            <div className="relative h-full w-full overflow-hidden">
               <SafeImage src="https://images.unsplash.com/photo-1601846610114-e85058d3619d?q=80&w=1080" alt="About Thillorys" fill className="object-cover" />
            </div>
          </div>
        </div>
        <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
          <h2 className="font-heading text-5xl md:text-6xl text-primary leading-tight mb-8">
            The Art of Softly <br/> Spoken Style
          </h2>
          <p className="text-primary/70 text-xl leading-relaxed font-serif max-w-lg italic mb-10">
            At Thillorys, we believe that true elegance doesn&apos;t need to shout. Our Ibadan-based atelier is dedicated to the creation of bridal and prom wear that feels like a second skin—refined, ethereal, and undeniably you.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { icon: <Heart className="text-accent" />, title: "Bespoke", desc: "One-on-one sessions" },
              { icon: <Scissors className="text-accent" />, title: "Artisanal", desc: "Hand-crafted finish" },
              { icon: <Palette className="text-accent" />, title: "Timeless", desc: "Classic silhouettes" }
            ].map((item, i) => (
              <div key={i} className="group">
                <div className="mb-4 transition-transform group-hover:scale-110">{item.icon}</div>
                <h4 className="font-heading text-lg font-bold mb-1">{item.title}</h4>
                <p className="text-primary/50 text-xs tracking-wider uppercase">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Products = () => {
  const { ref, isVisible } = useScrollReveal();
  const products = [
    {
      name: "The Heirloom Bridal Gown",
      description: "A masterpiece of silk and hand-stitched lace, designed for the bride who values understated luxury.",
      price: "₦950,000",
      img: "https://images.unsplash.com/photo-1772945493050-c0bb5d528e2d?q=80&w=1080"
    },
    {
      name: "Bespoke Silhouette Suit",
      description: "Custom-tailored charcoal wool blend with ivory silk lining, embodying the art of personal style.",
      price: "₦185,000",
      img: "https://images.unsplash.com/photo-1704564552245-3dc77c6c6b78?q=80&w=1080"
    },
    {
      name: "Evening Prom Luminescence",
      description: "A soft-focus chiffon gown in burnt orange, designed to command the room with grace.",
      price: "₦120,000",
      img: "https://images.unsplash.com/photo-1601846167370-94b67afa8f70?q=80&w=1080"
    }
  ];

  return (
    <section id="products" ref={ref} className="py-32 px-6 bg-primary">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
          <div className={isVisible ? 'animate-slideUp' : 'opacity-0'}>
            <h2 className="font-heading text-6xl text-white mb-4">The Collections</h2>
            <p className="text-white/40 font-serif text-lg">Explore our curated categories of Bridal, Bespoke, and Prom couture.</p>
          </div>
          <div className={`h-px flex-1 bg-white/10 hidden md:block mx-10 mb-5 ${isVisible ? 'scale-x-100 transition-transform duration-1000 origin-left' : 'scale-x-0'}`} />
          <a href="#contact" className="text-accent border border-accent/30 px-8 py-3 uppercase tracking-widest text-xs font-bold hover:bg-accent hover:text-black transition-all">
            Inquire for Custom
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className={`md:col-span-7 group relative rounded-sm overflow-hidden h-[600px] transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <SafeImage src={products[0].img} alt={products[0].name} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-10">
              <span className="text-accent text-xs font-serif tracking-[0.4em] uppercase mb-4 block">Signature Bridal</span>
              <h3 className="font-heading text-4xl text-white mb-2">{products[0].name}</h3>
              <p className="text-white/60 font-serif max-w-sm italic mb-6">{products[0].description}</p>
              <div className="flex items-center gap-8">
                <span className="text-white font-heading text-2xl">{products[0].price}</span>
                <a href="#contact" className="group flex items-center gap-2 text-accent text-sm font-bold tracking-widest uppercase">
                  Order Piece <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          <div className="md:col-span-5 flex flex-col gap-8">
            {products.slice(1).map((p, i) => (
              <div key={i} 
                style={{ transitionDelay: `${(i + 1) * 200}ms` }}
                className={`flex-1 group relative rounded-sm overflow-hidden h-full transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                <SafeImage src={p.img} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8">
                  <h3 className="font-heading text-2xl text-white mb-1">{p.name}</h3>
                  <p className="text-white/50 font-serif text-sm italic mb-4">{p.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-accent font-heading text-xl">{p.price}</span>
                    <a href="#contact" className="text-white/70 hover:text-white text-xs uppercase tracking-widest border-b border-white/20 pb-1">Enquire</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Gallery = () => {
  const { ref, isVisible } = useScrollReveal();
  const images = [
    "https://images.unsplash.com/photo-1595156210483-560123baba96?q=80&w=1080",
    "https://images.unsplash.com/photo-1696579866263-886c77a611cb?q=80&w=1080",
    "https://images.unsplash.com/photo-1642431363031-10081552acc0?q=80&w=1080",
    "https://images.unsplash.com/photo-1630411997282-231a2b85ccaa?q=80&w=1080",
    "https://images.unsplash.com/photo-1593608485126-dd092850ed75?q=80&w=1080",
    "https://images.unsplash.com/photo-1538060322543-819f7f9e6eb5?q=80&w=1080"
  ];

  return (
    <section id="gallery" ref={ref} className="py-32 px-6 bg-accent/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className={`font-heading text-6xl text-white mb-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            The Editorial Lookbook
          </h2>
          <p className="text-white/40 font-serif text-lg tracking-wide italic">A visual journey through our soft-focus aesthetic and timeless silhouettes.</p>
        </div>
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((src, i) => (
            <div key={i} 
              style={{ transitionDelay: `${i * 100}ms` }}
              className={`break-inside-avoid relative group rounded-sm overflow-hidden transition-all duration-1000 ${isVisible ? 'animate-blurIn' : 'opacity-0'}`}>
              <SafeImage src={src} alt={`Lookbook ${i}`} width={600} height={800} className="w-full h-auto object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700" />
              <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Process = () => {
  const { ref, isVisible } = useScrollReveal();
  const steps = [
    { number: "01", title: "The Vision", description: "A collaborative session to map your style and silhouette preferences." },
    { number: "02", title: "The Toile", description: "Creating the foundation of your garment with precise measurements." },
    { number: "03", title: "The Final Stitch", description: "The meticulous finishing of your piece with artisanal details." }
  ];

  return (
    <section ref={ref} className="py-32 px-6 bg-secondary text-primary">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-heading text-5xl text-primary mb-20 text-center">The Atelier Journey</h2>
        <div className="relative">
          <div className={`absolute left-6 top-0 bottom-0 w-px bg-accent/20 hidden md:block transition-all duration-1500 ${isVisible ? 'scale-y-100' : 'scale-y-0'} origin-top`} />
          <div className="space-y-20">
            {steps.map((step, i) => (
              <div key={i} className={`flex gap-12 items-start group transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`} style={{ transitionDelay: `${i * 200}ms` }}>
                <div className="w-14 h-14 rounded-full bg-accent text-white flex items-center justify-center shrink-0 relative z-10 font-heading text-xl shadow-xl shadow-accent/20">
                  {step.number}
                </div>
                <div className="pt-2">
                  <h3 className="font-heading text-3xl text-primary mb-4 group-hover:text-accent transition-colors">{step.title}</h3>
                  <p className="text-primary/60 text-lg leading-relaxed font-serif italic max-w-xl">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-24 text-center">
           <p className="text-accent font-serif text-sm tracking-widest uppercase mb-4">Sharp craftsmanship, nationwide delivery.</p>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const { ref, isVisible } = useScrollReveal();
  const items = [
    { name: "Tiwa Adebayo", text: "The softest silk and the most perfect fit I have ever experienced. Thillorys made my wedding day feel like a dream.", role: "Bridal Client" },
    { name: "Oluchi Okafor", text: "A masterclass in tailoring. My prom dress was the talk of the evening.", role: "Prom Client" }
  ];

  return (
    <section ref={ref} className="py-32 px-6 bg-primary border-y border-white/5">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-heading text-5xl text-white mb-20">Voices of Elegance</h2>
        <div className="space-y-16">
          {items.map((t, i) => (
            <div key={i} className={`relative transition-all duration-1000 ${isVisible ? 'animate-rotateFade' : 'opacity-0'}`} style={{ transitionDelay: `${i * 300}ms` }}>
              <div className="text-accent/30 text-[10rem] font-serif leading-none absolute -top-20 left-0 pointer-events-none select-none italic opacity-20">&ldquo;</div>
              <p className="text-white/80 text-2xl md:text-3xl font-serif italic relative z-10 leading-relaxed">
                {t.text}
              </p>
              <div className="mt-8 flex items-center justify-center gap-4">
                <div className="h-px w-10 bg-accent/40" />
                <div>
                  <p className="font-heading text-xl text-white tracking-widest">{t.name}</p>
                  <p className="text-accent text-[10px] uppercase tracking-[0.4em] mt-1">{t.role}</p>
                </div>
                <div className="h-px w-10 bg-accent/40" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const { ref, isVisible } = useScrollReveal();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  return (
    <section id="contact" ref={ref} className="relative min-h-[800px] overflow-hidden">
      <div className="absolute inset-0 bg-accent" />
      <div className="absolute inset-0 bg-primary [clip-path:polygon(0_0,60%_0,45%_100%,0_100%)] hidden md:block" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 grid md:grid-cols-2 gap-20 items-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <h2 className="font-heading text-7xl md:text-8xl text-white leading-none mb-10">
            Begin Your <br/> Story
          </h2>
          <div className="space-y-8">
            <div className="flex items-center gap-6 group">
              <div className="w-12 h-12 border border-white/20 flex items-center justify-center rounded-full group-hover:border-accent transition-colors">
                 <Instagram className="text-white group-hover:text-accent" size={20} />
              </div>
              <span className="text-white/60 tracking-widest uppercase text-sm font-bold">@thillorys</span>
            </div>
            <div className="flex items-center gap-6 group">
              <div className="w-12 h-12 border border-white/20 flex items-center justify-center rounded-full group-hover:border-accent transition-colors">
                 <Phone className="text-white group-hover:text-accent" size={20} />
              </div>
              <span className="text-white/60 tracking-widest uppercase text-sm font-bold">wa.me/message/JTC4N22MWZXZK1</span>
            </div>
            <div className="flex items-center gap-6 group">
              <div className="w-12 h-12 border border-white/20 flex items-center justify-center rounded-full group-hover:border-accent transition-colors">
                 <MapPin className="text-white group-hover:text-accent" size={20} />
              </div>
              <span className="text-white/60 tracking-widest uppercase text-sm font-bold">Ibadan, Nigeria</span>
            </div>
          </div>
        </div>

        <div className="w-full max-w-md ml-auto">
          {sent ? (
            <div className="bg-primary/95 backdrop-blur-xl p-12 text-center rounded-sm border border-white/10 animate-scaleIn">
              <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mb-8 mx-auto border border-accent/40">
                <CheckCheck size={40} className="text-accent" />
              </div>
              <h3 className="font-heading text-4xl text-white mb-4">Vision Received</h3>
              <p className="text-white/50 font-serif italic text-lg">Thank you. Our atelier team will review your inquiry and reach out for a consultation shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-primary p-10 md:p-12 shadow-2xl border border-white/5 rounded-sm">
              <h3 className="font-heading text-3xl text-white mb-8">Atelier Inquiry</h3>
              <div className="space-y-5">
                {['name', 'email', 'phone'].map(field => (
                  <input
                    key={field}
                    type={field === 'email' ? 'email' : 'text'}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    required={field !== 'phone'}
                    onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 px-6 py-4 text-white placeholder-white/30 text-sm focus:border-accent outline-none transition-all font-serif"
                  />
                ))}
                <textarea
                  placeholder="Tell us about your garment vision..."
                  rows={4}
                  required
                  onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 px-6 py-4 text-white placeholder-white/30 text-sm focus:border-accent outline-none transition-all resize-none font-serif"
                />
                <button type="submit" disabled={loading} className="w-full bg-accent text-black py-5 font-bold tracking-[0.2em] uppercase text-sm hover:brightness-110 transition-all flex justify-center items-center gap-3">
                  {loading ? <Loader2 className="animate-spin" size={20} /> : 'Request Consultation'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-primary pt-24 pb-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 border border-accent flex items-center justify-center font-heading text-xl text-accent">
                TY
              </div>
              <span className="font-heading text-3xl tracking-tighter text-white">THILLORYS</span>
            </div>
            <p className="text-white/40 font-serif italic text-lg leading-relaxed max-w-sm">
              Ibadan&apos;s premier atelier specializing in bespoke bridal, couture fashion, and high-glamour designs with a signature soft-focus aesthetic.
            </p>
          </div>
          <div className="md:col-span-3">
            <h4 className="font-heading text-xl text-white mb-6 uppercase tracking-widest">Atelier</h4>
            <ul className="space-y-4">
              {['Home', 'Atelier Journey', 'Collections', 'Lookbook'].map(link => (
                <li key={link}><a href={`#${link.toLowerCase().replace(' ', '-')}`} className="text-white/50 hover:text-accent transition-colors text-sm uppercase tracking-widest">{link}</a></li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-4">
            <h4 className="font-heading text-xl text-white mb-6 uppercase tracking-widest">Connect</h4>
            <p className="text-white/40 text-sm mb-6 font-serif">Visit us in the heart of Ibadan for a personalized styling experience.</p>
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:border-accent hover:text-accent transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:border-accent hover:text-accent transition-all">
                <Phone size={20} />
              </a>
              <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:border-accent hover:text-accent transition-all">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-white/30 text-xs tracking-widest uppercase">
            &copy; {new Date().getFullYear()} Thillorys Atelier. All rights reserved.
          </p>
          <p className="text-accent/40 font-serif text-[10px] tracking-[0.4em] uppercase">
            Heritage & Ochre Collection
          </p>
          <div className="flex gap-8 text-[10px] text-white/20 uppercase tracking-[0.2em] font-bold">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function Home() {
  return (
    <main className="bg-primary">
      <Navbar />
      <Hero />
      <Divider />
      <About />
      <Divider />
      <Products />
      <Gallery />
      <Divider />
      <Process />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}