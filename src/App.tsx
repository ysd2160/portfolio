import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { Code2, Server, Database, ShieldCheck, Cloud, Github, Linkedin, Mail, Phone, Layers, Cpu, Palette } from 'lucide-react'

const ME = {
  email: 'ysd2445@gmail.com', phone: '+91 7575097762',
  linkedin: 'https://linkedin.com/in/yadav-shivam-23ab57288', github: 'https://github.com/ysd2160',
}
const ease = [0.25, 0.1, 0.25, 1] as const

/* ---------- reusable ---------- */
function FadeIn({ children, delay = 0, duration = 0.7, x = 0, y = 30, className = '' }:
  { children: ReactNode; delay?: number; duration?: number; x?: number; y?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, x, y }} whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }} transition={{ duration, delay, ease }}>
      {children}
    </motion.div>
  )
}

function Magnet({ children, padding = 150, strength = 3 }: { children: ReactNode; padding?: number; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const move = (e: MouseEvent) => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2
      if (Math.abs(cx - e.clientX) < r.width / 2 + padding && Math.abs(cy - e.clientY) < r.height / 2 + padding) {
        setActive(true); setPos({ x: (e.clientX - cx) / strength, y: (e.clientY - cy) / strength })
      } else { setActive(false); setPos({ x: 0, y: 0 }) }
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [padding, strength])
  return (
    <div ref={ref} style={{
      transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`, willChange: 'transform',
      transition: active ? 'transform 0.3s ease-out' : 'transform 0.6s ease-in-out',
    }}>{children}</div>
  )
}

function Char({ c, i, n, p }: { c: string; i: number; n: number; p: MotionValue<number> }) {
  const o = useTransform(p, [i / n, (i + 1) / n], [0.2, 1])
  return (
    <span className="relative">
      <span className="opacity-0">{c}</span>
      <motion.span style={{ opacity: o }} className="absolute left-0 top-0">{c}</motion.span>
    </span>
  )
}

function AnimatedText({ text, className, style }: { text: string; className?: string; style?: CSSProperties }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.2'] })
  let k = 0
  return (
    <p ref={ref} className={className} style={style}>
      {text.split(' ').map((w, wi, arr) => {
        const start = k; k += w.length + 1
        return (
          <span key={wi}>
            <span className="inline-block whitespace-nowrap">
              {w.split('').map((c, ci) => <Char key={ci} c={c} i={start + ci} n={text.length} p={scrollYProgress} />)}
            </span>
            {wi < arr.length - 1 && ' '}
          </span>
        )
      })}
    </p>
  )
}

function ContactButton({ label = 'Contact Me', href = '#contact' }: { label?: string; href?: string }) {
  return (
    <a href={href} className="inline-block rounded-full px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base font-medium uppercase tracking-widest text-white whitespace-nowrap"
      style={{
        background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
        outline: '2px solid white', outlineOffset: '-3px',
      }}>{label}</a>
  )
}

function LiveProjectButton({ href }: { href: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer"
      className="inline-block rounded-full border-2 border-[#D7E2EA] px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base font-medium uppercase tracking-widest text-[#D7E2EA] whitespace-nowrap transition-colors hover:bg-[#D7E2EA]/10">
      Live Project
    </a>
  )
}

const bigNum = { fontSize: 'clamp(3rem, 10vw, 140px)' }
const bigHead = { fontSize: 'clamp(3rem, 12vw, 160px)' }

/* ---------- hero ---------- */
function Hero() {
  const links = [['About', '#about'], ['Services', '#services'], ['Projects', '#projects'], ['Contact', '#contact']]
  return (
    <section className="relative flex h-screen flex-col" style={{ overflowX: 'clip', background: '#0C0C0C' }}>
      <FadeIn y={-20} delay={0} className="relative z-20">
        <nav className="flex justify-between px-6 pt-6 md:px-10 md:pt-8">
          {links.map(([l, h]) => (
            <a key={l} href={h} className="text-sm font-medium uppercase tracking-wider text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70 md:text-lg lg:text-[1.4rem]">{l}</a>
          ))}
        </nav>
      </FadeIn>
      <div className="overflow-hidden px-2">
        <FadeIn y={40} delay={0.15}>
          <h1 className="hero-heading mt-6 w-full whitespace-nowrap text-center text-[12vw] font-black uppercase leading-none tracking-tight sm:mt-4 sm:text-[13vw] md:-mt-5 md:text-[14vw] lg:text-[15vw]">
            Hi, i&apos;m shivam
          </h1>
        </FadeIn>
      </div>
      <div className="absolute left-1/2 top-1/2 z-10 w-[280px] -translate-x-1/2 -translate-y-1/2 sm:bottom-0 sm:top-auto sm:w-[360px] sm:translate-y-0 md:w-[440px] lg:w-[520px]">
        <FadeIn y={30} delay={0.6}>
          <Magnet padding={150} strength={3}>
            <img src="/shivam.png" alt="Shivam Yadav" className="w-full select-none"
              style={{ maskImage: 'linear-gradient(to right, transparent, #000 14%, #000 86%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, #000 14%, #000 86%, transparent)' }} />
          </Magnet>
        </FadeIn>
      </div>
      <div className="flex-1" />
      <div className="relative z-20 flex items-end justify-between px-6 pb-7 sm:pb-8 md:px-10 md:pb-10">
        <FadeIn y={20} delay={0.35}>
          <p className="max-w-[160px] font-light uppercase leading-snug tracking-wide text-[#D7E2EA] sm:max-w-[220px] md:max-w-[260px]" style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}>
            a mern stack developer driven by building fast, scalable and unforgettable web apps
          </p>
        </FadeIn>
        <FadeIn y={20} delay={0.5}><ContactButton /></FadeIn>
      </div>
    </section>
  )
}

/* ---------- marquee ---------- */
const ROW1 = ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'Redux Toolkit', 'Tailwind CSS', 'JWT Auth', 'Cloudinary', 'REST APIs', 'Git & GitHub']
const ROW2 = ['Postman', 'Vercel Deploys', 'Video Uploads', 'Image Uploads', 'Likes & Comments', 'Follow System', 'Subscriptions', 'Responsive UI', 'Live Dev Tasks', 'Bug Fixing']
const GRADS = [
  'linear-gradient(135deg,#18011F,#7621B0)', 'linear-gradient(135deg,#1b1b2f,#646973)',
  'linear-gradient(135deg,#B600A8,#18011F)', 'linear-gradient(135deg,#7621B0,#BE4C00)', 'linear-gradient(135deg,#0f2027,#BBCCD7)',
]
function Tile({ t, i }: { t: string; i: number }) {
  return (
    <div className="flex h-[270px] w-[420px] shrink-0 items-end rounded-2xl p-6" style={{ background: GRADS[i % GRADS.length] }}>
      <span className="text-4xl font-black uppercase leading-none tracking-tight text-white/90">{t}</span>
    </div>
  )
}
function Marquee() {
  const ref = useRef<HTMLElement>(null)
  const [offset, setOffset] = useState(0)
  useEffect(() => {
    const on = () => {
      const top = (ref.current?.getBoundingClientRect().top ?? 0) + window.scrollY
      setOffset((window.scrollY - top + window.innerHeight) * 0.3)
    }
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  const row = (items: string[], dir: 1 | -1) => {
    const tripled = [...items, ...items, ...items]
    const w = items.length * (420 + 12)
    return (
      <div className="flex gap-3" style={{ marginLeft: -w, width: 'max-content', willChange: 'transform', transform: `translateX(${dir * (offset - 200)}px)` }}>
        {tripled.map((t, i) => <Tile key={i} t={t} i={i} />)}
      </div>
    )
  }
  return (
    <section ref={ref} className="flex flex-col gap-3 pb-10 pt-24 sm:pt-32 md:pt-40" style={{ background: '#0C0C0C', overflow: 'hidden' }}>
      {row(ROW1, 1)}{row(ROW2, -1)}
    </section>
  )
}

/* ---------- about ---------- */
function Deco({ children, pos, delay, x, size }: { children: ReactNode; pos: string; delay: number; x: number; size: string }) {
  return (
    <FadeIn x={x} y={0} delay={delay} duration={0.9} className={`pointer-events-none absolute ${pos} ${size}`}>
      <div className="flex aspect-square w-full items-center justify-center rounded-[28%] text-white/90"
        style={{ background: 'linear-gradient(135deg,#18011F,#7621B0 60%,#BE4C00)', boxShadow: '4px 4px 24px #7721B1 inset' }}>{children}</div>
    </FadeIn>
  )
}
function About() {
  return (
    <section id="about" className="relative flex min-h-screen items-center justify-center px-5 py-20 sm:px-8 md:px-10" style={{ background: '#0C0C0C' }}>
      <Deco x={-80} delay={0.1} pos="top-[4%] left-[1%] sm:left-[2%] md:left-[4%]" size="w-[120px] sm:w-[160px] md:w-[210px]"><Code2 className="h-1/2 w-1/2" /></Deco>
      <Deco x={-80} delay={0.25} pos="bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%]" size="w-[100px] sm:w-[140px] md:w-[180px]"><Database className="h-1/2 w-1/2" /></Deco>
      <Deco x={80} delay={0.15} pos="top-[4%] right-[1%] sm:right-[2%] md:right-[4%]" size="w-[120px] sm:w-[160px] md:w-[210px]"><Server className="h-1/2 w-1/2" /></Deco>
      <Deco x={80} delay={0.3} pos="bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%]" size="w-[130px] sm:w-[170px] md:w-[220px]"><Layers className="h-1/2 w-1/2" /></Deco>
      <div className="relative z-10 flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
        <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
          <FadeIn y={40}>
            <h2 className="hero-heading text-center font-black uppercase leading-none tracking-tight" style={bigHead}>About me</h2>
          </FadeIn>
          <AnimatedText className="max-w-[560px] text-center font-medium leading-relaxed text-[#D7E2EA]" style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
            text="I'm a MERN stack developer from Ahmedabad with a BCA (9.0 CGPA) from Silver Oak University. I build REST APIs, secure JWT authentication and fast React interfaces, and I've shipped two full-stack apps that are live today. Let's build something incredible together!" />
        </div>
        <ContactButton />
      </div>
    </section>
  )
}

/* ---------- services ---------- */
const SERVICES = [
  ['Frontend Development', 'Responsive, accessible interfaces built with React.js, Redux Toolkit and Tailwind CSS that feel fast on every screen.'],
  ['Backend & REST APIs', 'Clean, well-structured APIs with Node.js and Express.js, tested with Postman and ready to scale.'],
  ['Database Design', 'MongoDB and Mongoose schemas modelled around how your app actually reads and writes data.'],
  ['Authentication', 'Secure sign-up, login and protected routes using JWT, so users and their data stay safe.'],
  ['Media & Cloud Storage', 'Image and video uploads handled end to end with Cloudinary, from the browser to the CDN.'],
]
function Services() {
  return (
    <section id="services" className="rounded-t-[40px] bg-white px-5 py-20 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32">
      <h2 className="mb-16 text-center font-black uppercase leading-none tracking-tight text-[#0C0C0C] sm:mb-20 md:mb-28" style={bigHead}>Services</h2>
      <div className="mx-auto max-w-5xl">
        {SERVICES.map(([name, desc], i) => (
          <FadeIn key={name} delay={i * 0.1}>
            <div className="flex items-start gap-5 py-8 sm:gap-8 sm:py-10 md:gap-12 md:py-12" style={{ borderTop: '1px solid rgba(12,12,12,0.15)', borderBottom: i === SERVICES.length - 1 ? '1px solid rgba(12,12,12,0.15)' : undefined }}>
              <span className="font-black leading-none text-[#0C0C0C]" style={bigNum}>0{i + 1}</span>
              <div className="flex flex-col gap-3 text-[#0C0C0C]">
                <h3 className="font-medium uppercase" style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}>{name}</h3>
                <p className="max-w-2xl font-light leading-relaxed opacity-60" style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}>{desc}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}

/* ---------- projects ---------- */
const PROJECTS = [
  { name: 'YouTube Clone', cat: 'MERN Full Stack', live: 'https://ytfrontend-one.vercel.app/',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Cloudinary'],
    feats: ['Video uploads', 'Likes & comments', 'Subscriptions'],
    desc: 'A YouTube-inspired video platform with JWT authentication, Cloudinary storage and a responsive UI.', icon: <Cloud className="h-16 w-16" /> },
  { name: 'Instagram Clone', cat: 'Social Media Platform', live: 'https://socia-insta-frontend.vercel.app/',
    tech: ['React', 'Redux Toolkit', 'Node.js', 'MongoDB', 'Cloudinary'],
    feats: ['Posts & image uploads', 'Follow / unfollow', 'Saved posts'],
    desc: 'A social media platform with authentication, posts, likes, comments and Redux Toolkit state management.', icon: <Palette className="h-16 w-16" /> },
]
const R = 'rounded-[40px] sm:rounded-[50px] md:rounded-[60px]'
function ProjectCard({ p, index, total, progress }: { p: typeof PROJECTS[number]; index: number; total: number; progress: MotionValue<number> }) {
  const target = 1 - (total - 1 - index) * 0.03
  const scale = useTransform(progress, [index / total, 1], [1, target])
  const panel = `${R} flex flex-col justify-end gap-3 p-6 sm:p-8 text-[#D7E2EA]`
  return (
    <div className="sticky top-24 h-[85vh] md:top-32">
      <motion.div style={{ scale, top: index * 28, background: '#0C0C0C', transformOrigin: 'top center' }}
        className={`relative border-2 border-[#D7E2EA] p-4 sm:p-6 md:p-8 ${R}`}>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4 sm:mb-6">
          <div className="flex items-center gap-4 sm:gap-8">
            <span className="hero-heading font-black leading-none" style={bigNum}>0{index + 1}</span>
            <div className="text-[#D7E2EA]">
              <p className="text-xs font-light sm:text-sm md:text-lg">{p.cat}</p>
              <h3 className="font-medium uppercase" style={{ fontSize: 'clamp(1.1rem, 2.4vw, 2.4rem)' }}>{p.name}</h3>
            </div>
          </div>
          <LiveProjectButton href={p.live} />
        </div>
        <div className="flex gap-3">
          <div className="flex w-[40%] flex-col gap-3">
            <div className={panel} style={{ height: 'clamp(130px, 16vw, 230px)', background: 'linear-gradient(135deg,#18011F,#7621B0)' }}>
              <p className="text-xs font-light sm:text-base">{p.tech.join(' / ')}</p>
            </div>
            <div className={panel} style={{ height: 'clamp(160px, 22vw, 340px)', background: 'linear-gradient(135deg,#1b1b2f,#646973)' }}>
              {p.feats.map(f => <p key={f} className="text-sm font-medium uppercase sm:text-xl">{f}</p>)}
            </div>
          </div>
          <div className={`${panel} w-[60%] items-start justify-between`} style={{ background: 'linear-gradient(160deg,#B600A8,#18011F 60%,#BE4C00)' }}>
            {p.icon}
            <p className="max-w-md text-sm font-light leading-snug sm:text-xl md:text-2xl">{p.desc}</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
function Projects() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  return (
    <section id="projects" className="relative z-10 -mt-10 rounded-t-[40px] px-5 pb-24 pt-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pt-32" style={{ background: '#0C0C0C' }}>
      <h2 className="hero-heading mb-16 text-center font-black uppercase leading-none tracking-tight sm:mb-20 md:mb-28" style={bigHead}>Project</h2>
      <div ref={ref} className="mx-auto max-w-7xl">
        {PROJECTS.map((p, i) => <ProjectCard key={p.name} p={p} index={i} total={PROJECTS.length} progress={scrollYProgress} />)}
      </div>
    </section>
  )
}

/* ---------- contact ---------- */
function Contact() {
  const item = 'flex items-center gap-3 text-[#D7E2EA] transition-opacity hover:opacity-70 text-base sm:text-xl font-light'
  return (
    <section id="contact" className="flex flex-col items-center gap-12 px-5 py-24 text-center sm:px-8 md:py-32" style={{ background: '#0C0C0C' }}>
      <FadeIn y={40}><h2 className="hero-heading font-black uppercase leading-none tracking-tight" style={bigHead}>Contact</h2></FadeIn>
      <p className="max-w-xl font-light leading-relaxed text-[#D7E2EA]" style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}>
        Looking for a fresher MERN developer? Send me a message and I&apos;ll reply soon.
      </p>
      <div className="flex flex-col items-center gap-5">
        <a className={item} href={`mailto:${ME.email}`}><Mail />{ME.email}</a>
        <a className={item} href={`tel:${ME.phone.replace(/\s/g, '')}`}><Phone />{ME.phone}</a>
        <a className={item} href={ME.linkedin} target="_blank" rel="noreferrer"><Linkedin />LinkedIn</a>
        <a className={item} href={ME.github} target="_blank" rel="noreferrer"><Github />GitHub</a>
      </div>
      <ContactButton label="Email Me" href={`mailto:${ME.email}`} />
      <p className="mt-10 flex items-center gap-2 text-sm font-light text-[#D7E2EA]/50"><Cpu size={16} />Shivam Yadav, Ahmedabad</p>
    </section>
  )
}

export default function App() {
  return (
    <main style={{ background: '#0C0C0C', overflowX: 'clip' }}>
      <Hero /><Marquee /><About /><Services /><Projects /><Contact />
    </main>
  )
}
