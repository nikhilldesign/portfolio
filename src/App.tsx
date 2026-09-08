import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { ArrowUpRight, Download } from 'lucide-react'
import { Bodies, Composite, Engine, Mouse, MouseConstraint } from 'matter-js'

gsap.registerPlugin(ScrollTrigger)

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

const projects = [
  {
    number: '01',
    name: 'AEVA LIVING',
    description: 'Premium nature-focused residences offering thoughtfully designed homes that blend timeless architecture, landscape, privacy, and sustainable living.',
    category: 'Luxury Real Estate',
    year: '2026',
    image: '/projects/selected-work-02.png',
    color: '#F2D8C3',
    url: 'https://www.aevaliving.com/',
  },
  {
    number: '02',
    name: 'VPF',
    description: 'Philanthropic foundation supporting education, healthcare, sports, inclusivity, sanitation, and green spaces to create meaningful social impact.',
    category: 'Social Impact',
    year: '2025',
    image: '/projects/selected-work-01.png',
    color: '#C7D8FC',
    url: 'https://vpcf.org/',
  },
  {
    number: '03',
    name: 'HOUSE OF KHEMANI',
    description: 'Indian spirits company producing whisky, vodka, beer, and other beverages while combining traditional craftsmanship with sustainable distilling practices.',
    category: 'Corporate Website',
    year: '2025',
    image: '/projects/selected-work-04.png',
    color: '#F4DEB4',
    url: 'https://dev.khemani.bayalis.in/',
  },
  {
    number: '04',
    name: 'NOT YOUR IDEA',
    description: 'Digital solutions agency offering website development, content strategy, SEO, audits, app development, and online reputation management services.',
    category: 'Creative Studio',
    year: '2026',
    image: '/projects/selected-work-07.png',
    color: '#A1E9DD',
    url: 'https://notyouridea.com/',
  },
  {
    number: '05',
    name: 'PITCHFORK PARTNERS',
    description: 'Strategic communications consultancy providing PR, digital, creative, advisory, reputation management, media relations, and crisis communication solutions.',
    category: 'Creative Agency',
    year: '2026',
    image: '/projects/selected-work-05.png',
    color: '#FAD3D3',
    url: 'https://www.pitchforkpartners.com/',
  },
  {
    number: '06',
    name: 'UNSOBERED',
    description: 'Alcohol-focused digital platform offering beverage knowledge, cocktail content, drinking guides, trends, recommendations, and nightlife experiences.',
    category: 'Editorial Platform',
    year: '2026',
    image: '/projects/selected-work-06.png',
    color: '#FBD2AD',
    url: 'https://unsobered.com/',
  },
  {
    number: '07',
    name: 'DVARA RESEARCH',
    description: 'Independent policy research institution focusing on financial inclusion, social protection, customer protection, digital finance, and financial security.',
    category: 'Research Platform',
    year: '2025',
    image: '/projects/selected-work-03.png',
    color: '#E9EFD0',
    url: 'https://dvararesearch.com/',
  },
]

const processSteps = [
  {
    number: '01',
    title: 'DISCOVER',
    subtitle: 'Understand the brand, audience & goals',
    description: 'Research the business, users, competitors, and project requirements to define the right direction.',
  },
  {
    number: '02',
    title: 'DEFINE',
    subtitle: 'Turn insights into a clear strategy',
    description: 'Establish information architecture, user journeys, content structure, and key project priorities.',
  },
  {
    number: '03',
    title: 'WIREFRAME',
    subtitle: 'Build the experience before the visuals',
    description: 'Create low-fidelity wireframes to map layouts, interactions, hierarchy, and navigation.',
  },
  {
    number: '04',
    title: 'DESIGN',
    subtitle: 'Bring the brand to life',
    description: 'Develop the visual language, typography, color system, components, imagery, and high-fidelity UI.',
  },
  {
    number: '05',
    title: 'PROTOTYPE',
    subtitle: 'Make the experience feel real',
    description: 'Add interactions, transitions, micro-animations, and responsive behavior to create a clickable experience.',
  },
  {
    number: '06',
    title: 'DELIVER & REFINE',
    subtitle: 'Test, polish & launch',
    description: 'Validate the experience, refine based on feedback, prepare developer-ready designs, and support the final launch.',
  },
]

const tools = [
  { name: 'Figma', artwork: '/tool-logos/Frame%202147227677.svg' },
  { name: 'Framer', artwork: '/tool-logos/Frame%202147227678.svg' },
  { name: 'ChatGPT', artwork: '/tool-logos/Frame%202147227679.svg' },
  { name: 'Claude Code', artwork: '/tool-logos/Frame%202147227680.svg' },
  { name: 'Miro', artwork: '/tool-logos/Frame%202147227681.svg' },
  { name: 'Jitter', artwork: '/tool-logos/Frame%202147227682.svg' },
  { name: 'Photoshop', artwork: '/tool-logos/Frame%202147227683.svg' },
  { name: 'Gemini', artwork: '/tool-logos/Frame%202147227684.svg' },
  { name: 'Relume', artwork: '/tool-logos/Frame%202147227685.svg' },
  { name: 'Lovable', artwork: '/tool-logos/Frame%202147227686.svg' },
] as const

function Navbar() {
  const [compact, setCompact] = useState(false)

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`navbar ${compact ? 'is-compact' : ''}`}>
      <a className="wordmark" href="#top" aria-label="Back to top">NIKHIL<span>.</span></a>
      <nav aria-label="Main navigation">
        <a href="#work">WORK</a>
        <a href="#process">PROCESS</a>
        <a href="#contact">CONTACT</a>
      </nav>
      <a className="nav-resume" href="/Nikhil-Patil-Resume.pdf" download>DOWNLOAD RESUME <Download size={13} /></a>
    </header>
  )
}

function Hero() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      tl.from('.navbar', { opacity: 0, y: -14, duration: .8 })
        .from('.hero-kicker', { opacity: 0, y: 16, duration: .7 }, '-=.35')
        .from('.hero-line > span', { yPercent: 115, duration: 1.1, stagger: .11 }, '-=.4')
        .from('.hero-bottom > *', { opacity: 0, y: 18, duration: .8, stagger: .1 }, '-=.6')
        .from('.hero-mark span', { scaleY: 0, transformOrigin: 'bottom', duration: .6, stagger: .08 }, '-=.75')

      gsap.to('.hero-copy', {
        yPercent: -9,
        scale: .985,
        transformOrigin: 'left top',
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: .8 },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const bounds = e.currentTarget.getBoundingClientRect()
    gsap.to('.hero-line span', {
      x: (e.clientX - bounds.left - bounds.width / 2) * .008,
      y: (e.clientY - bounds.top - bounds.height / 2) * .008,
      duration: .8,
      ease: 'power3.out',
    })
  }

  return (
    <section className="hero" id="top" ref={root} onMouseMove={onMove}>
      <Navbar />
      <div className="hero-copy">
        <div className="hero-kicker"><em>hi, I’m</em> <strong>NIKHIL</strong>
          <span className="hero-mark" aria-hidden="true"><span /><span /><span /></span>
        </div>
        <h1 aria-label="I turn ideas into interfaces">
          <span className="hero-line"><span>I TURN IDEAS</span></span>
          <span className="hero-line"><span>INTO INTERFACES.</span></span>
        </h1>
      </div>
      <div className="hero-bottom">
        <p className="intro">UI/UX DESIGNER. I create intuitive, engaging digital experiences through thoughtful UX and clean visual design.</p>
      </div>
    </section>
  )
}

function Project({ project, index }: { project: typeof projects[number], index: number }) {
  return (
    <article
      className="work-card"
      style={{ backgroundColor: project.color, zIndex: index + 1 }}
    >
      <div className="work-card-copy">
        <span className="work-project-number">PROJECT / {project.number}</span>
        <div className="work-copy-mask"><h3>{project.name}</h3></div>
        <div className="work-copy-mask"><p>{project.description}</p></div>
        <a className="case-link" href={project.url} target="_blank" rel="noreferrer">VISIT WEBSITE <ArrowUpRight size={18} /></a>
      </div>
      <div className="work-media">
        <div className="work-media-clip">
          <img src={project.image} alt={`${project.name} responsive project mockup`} loading={index === 0 ? 'eager' : 'lazy'} />
        </div>
      </div>
    </article>
  )
}

function SelectedWork() {
  const section = useRef<HTMLElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.work-card')

      cards.slice(1).forEach((card, index) => {
        const previous = cards[index]
        const stickyOffset = () => window.innerHeight * .12
        const createTrigger = (scrub = .75) => ({
          trigger: card,
          start: 'top 92%',
          end: () => `top ${stickyOffset()}px`,
          scrub,
          invalidateOnRefresh: true,
        })

        gsap.to(previous, {
          yPercent: -2,
          scale: .9,
          autoAlpha: 1,
          ease: 'none',
          scrollTrigger: createTrigger(),
        })

        gsap.fromTo(
          previous,
          { filter: 'brightness(1)' },
          {
            filter: 'brightness(.62)',
            ease: 'none',
            immediateRender: false,
            scrollTrigger: createTrigger(1),
          },
        )

      })
    }, section)
    return () => ctx.revert()
  }, [])

  return (
    <section className="work" id="work" ref={section}>
      <div className="work-intro">
        <div className="section-label"><span>01 / FEATURED PROJECTS</span></div>
        <h2>SELECTED <em>WORK</em></h2>
      </div>
      <div className="work-stage">
        <div className="work-cards">
          {projects.map((project, index) => <Project key={project.number} project={project} index={index} />)}
        </div>
      </div>
    </section>
  )
}

function Process() {
  const root = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)
  const stepCount = processSteps.length

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      const fractions = gsap.utils.toArray<HTMLElement>('.process-fraction')
      const steps = gsap.utils.toArray<HTMLElement>('.process-step')
      const transitionDuration = .72
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: `+=${Math.round((220 / 3) * stepCount)}%`,
          pin: true,
          scrub: .75,
          onUpdate: (self) => setActive(Math.min(stepCount - 1, Math.floor(self.progress * stepCount))),
        },
      })

      gsap.set([...fractions, ...steps], { autoAlpha: 0, zIndex: 0 })
      gsap.set(fractions[0], { autoAlpha: 1, y: 0, zIndex: 1 })
      gsap.set(steps[0], { autoAlpha: 1, y: 0, zIndex: 1 })

      timeline.to('.process-ring', { rotation: 120 * (stepCount - 1), duration: stepCount, ease: 'none' }, 0)
      timeline.to('.process-orbit', { rotation: -120 * stepCount, duration: stepCount, ease: 'none' }, 0)
      timeline.to('.process-progress span', { scaleX: 1, duration: stepCount, ease: 'none' }, 0)

      for (let index = 1; index < stepCount; index += 1) {
        const position = index - transitionDuration / 2
        const previousFraction = fractions[index - 1]
        const currentFraction = fractions[index]
        const previousStep = steps[index - 1]
        const currentStep = steps[index]

        timeline.set([currentFraction, currentStep], { zIndex: 2 }, position)
        timeline.to(previousFraction, { autoAlpha: 0, y: -28, duration: transitionDuration, ease: 'power1.inOut' }, position)
        timeline.fromTo(currentFraction, { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: transitionDuration, ease: 'power1.inOut', immediateRender: false }, position)
        timeline.to(previousStep, { autoAlpha: 0, y: -42, duration: transitionDuration, ease: 'power1.inOut' }, position)
        timeline.fromTo(currentStep, { autoAlpha: 0, y: 42 }, { autoAlpha: 1, y: 0, duration: transitionDuration, ease: 'power1.inOut', immediateRender: false }, position)
        timeline.set([previousFraction, previousStep], { zIndex: 0 }, position + transitionDuration)
      }
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section className="process" id="process" ref={root}>
      <div className="section-label light"><span>02 / DESIGN PROCESS</span></div>
      <div className="process-grid">
        <div>
          <h2>HOW I <em>WORK</em></h2>
          <p className="process-note">A deliberate process, flexible enough for real problems.</p>
        </div>
        <div className="process-visual" aria-hidden="true">
          <div className="process-ring"><i /><i /><i /></div>
          <div className="process-orbit" />
          {processSteps.map(({ number }, index) => (
            <span className={`process-fraction ${index === 0 ? 'active' : ''}`} key={number}>/{number}</span>
          ))}
        </div>
        <div className="process-content">
          {processSteps.map(({ number, title, subtitle, description }, index) => (
            <div className={`process-step ${index === 0 ? 'active' : ''}`} key={title} aria-hidden={active !== index}>
              <span>{number}</span>
              <h3>{title}</h3>
              <h4>{subtitle}</h4>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="process-progress"><span style={{ width: '100%', transform: `scaleX(${1 / stepCount})`, transformOrigin: 'left center' }} /></div>
    </section>
  )
}

function Tools() {
  const root = useRef<HTMLElement>(null)
  const arena = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const element = arena.current
    const cards = cardRefs.current.filter((card): card is HTMLDivElement => Boolean(card))
    if (!element || !cards.length || prefersReducedMotion()) return
    const isCompactTools = window.matchMedia('(max-width: 900px)').matches
    if (!isCompactTools && window.matchMedia('(pointer: coarse)').matches) return

    const engine = Engine.create({ gravity: { x: 0, y: 1, scale: .00092 } })
    const width = element.clientWidth
    const height = element.clientHeight
    const bodies = cards.map((card, index) => {
      const rect = card.getBoundingClientRect()
      return Bodies.rectangle(
        58 + (index % 8) * Math.max(1, (width - 116) / 7) + (Math.random() - .5) * 28,
        -80 - (index % 5) * 72 - Math.floor(index / 5) * 48,
        rect.width,
        rect.height,
        {
          restitution: .56,
          friction: .22,
          frictionStatic: .42,
          frictionAir: .018,
          density: .0016,
          chamfer: { radius: 14 },
          angle: (Math.random() - .5) * .16,
        },
      )
    })
    const boundaries = [
      Bodies.rectangle(width / 2, height + 24, width + 160, 48, { isStatic: true, restitution: .36, friction: .78 }),
      Bodies.rectangle(-24, height / 2, 48, height * 2, { isStatic: true, restitution: .48 }),
      Bodies.rectangle(width + 24, height / 2, 48, height * 2, { isStatic: true, restitution: .48 }),
    ]
    Composite.add(engine.world, [...bodies, ...boundaries])

    const paintBodies = () => {
      bodies.forEach((body, index) => {
        const originX = isCompactTools ? cards[index].offsetLeft : 0
        const originY = isCompactTools ? cards[index].offsetTop : 0
        cards[index].style.transform = `translate3d(${body.position.x - cards[index].offsetWidth / 2 - originX}px, ${body.position.y - cards[index].offsetHeight / 2 - originY}px, 0) rotate(${body.angle}rad)`
      })
    }
    paintBodies()

    const mouse = Mouse.create(element)
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: .12, damping: .18, render: { visible: false } },
    })
    Composite.add(engine.world, mouseConstraint)
    const mouseEvents = mouse as unknown as {
      mousewheel: EventListener
      mousemove: EventListener
      mousedown: EventListener
      mouseup: EventListener
    }
    mouse.element.removeEventListener('wheel', mouseEvents.mousewheel)

    let frame = 0
    let running = false
    let last = performance.now()
    let accumulator = 0
    const tick = (now: number) => {
      const delta = Math.min(32, now - last)
      last = now
      accumulator += delta
      while (accumulator >= 1000 / 60) {
        Engine.update(engine, 1000 / 60)
        accumulator -= 1000 / 60
      }
      paintBodies()
      frame = requestAnimationFrame(tick)
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true
        last = performance.now()
        frame = requestAnimationFrame(tick)
        observer.disconnect()
      }
    }, { threshold: .18 })
    observer.observe(element)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
      mouse.element.removeEventListener('mousemove', mouseEvents.mousemove)
      mouse.element.removeEventListener('mousedown', mouseEvents.mousedown)
      mouse.element.removeEventListener('mouseup', mouseEvents.mouseup)
      mouse.element.removeEventListener('wheel', mouseEvents.mousewheel)
      mouse.element.removeEventListener('touchmove', mouseEvents.mousemove)
      mouse.element.removeEventListener('touchstart', mouseEvents.mousedown)
      mouse.element.removeEventListener('touchend', mouseEvents.mouseup)
      Mouse.clearSourceEvents(mouse)
      Composite.clear(engine.world, false)
      Engine.clear(engine)
    }
  }, [])

  return (
    <section className="tools" id="tools" ref={root}>
      <div className="section-label"><span>03 / EVERYDAY TOOLKIT</span></div>
      <h2>TOOLS I <em>USE</em></h2>
      <div className="tools-stage" ref={arena}>
        {tools.map((tool, index) => (
            <div
              className="tool-tile"
              key={tool.name}
              ref={(node) => { cardRefs.current[index] = node }}
            >
              <img className="tool-artwork" src={tool.artwork} alt={`${tool.name} logo`} draggable="false" />
            </div>
        ))}
      </div>
    </section>
  )
}

function MagneticLink() {
  const link = useRef<HTMLAnchorElement>(null)
  const move = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    gsap.to(link.current, { x: (e.clientX - r.left - r.width / 2) * .18, y: (e.clientY - r.top - r.height / 2) * .18, duration: .35 })
  }
  const reset = () => gsap.to(link.current, { x: 0, y: 0, duration: .7, ease: 'elastic.out(1,.35)' })
  return <a ref={link} className="contact-button" href="mailto:nikhilpatil.design@gmail.com" onMouseMove={move} onMouseLeave={reset}>GET IN TOUCH <ArrowUpRight /></a>
}

function Contact() {
  const root = useRef<HTMLElement>(null)
  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.from('.contact-line > span', { yPercent: 110, duration: 1, stagger: .12, ease: 'power4.out', scrollTrigger: { trigger: '.contact-title', start: 'top 82%' } })
    }, root)
    return () => ctx.revert()
  }, [])
  return (
    <section className="contact" id="contact" ref={root}>
      <div className="section-label"><span>04 / LET’S TALK</span></div>
      <h2 className="contact-title">
          <span className="contact-line"><span>LET’S BUILD</span></span>
          <span className="contact-line"><span>SOMETHING</span></span>
          <span className="contact-line"><span>WORTH <em>USING.</em></span></span>
      </h2>
      <div className="contact-lower">
        <p>Have a product, idea or problem that needs a designer?<br />Let’s talk.</p>
        <MagneticLink />
      </div>
      <footer>
        <span>© 2026 NIKHIL PATIL</span>
        <div><a href="mailto:nikhilcpatil07@gmail.com">EMAIL</a><a href="https://www.linkedin.com/in/nikhil-patil-62a284256/" target="_blank" rel="noreferrer">LINKEDIN</a><a href="/Nikhil-Patil-Resume.pdf" target="_blank">RESUME</a></div>
        <a href="#top">BACK TO TOP ↑</a>
      </footer>
    </section>
  )
}

function CustomCursor() {
  const cursor = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    const x = gsap.quickTo(cursor.current, 'x', { duration: .35, ease: 'power3' })
    const y = gsap.quickTo(cursor.current, 'y', { duration: .35, ease: 'power3' })
    const move = (e: MouseEvent) => { x(e.clientX); y(e.clientY) }
    const over = (e: MouseEvent) => cursor.current?.classList.toggle('cursor-hover', !!(e.target as HTMLElement).closest('a, button, .project-visual, .tool-tile'))
    window.addEventListener('mousemove', move)
    document.addEventListener('mouseover', over)
    return () => { window.removeEventListener('mousemove', move); document.removeEventListener('mouseover', over) }
  }, [])
  return <div className="custom-cursor" ref={cursor} />
}

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: .09,
      smoothWheel: true,
      wheelMultiplier: .92,
      touchMultiplier: 1,
      syncTouch: false,
      overscroll: true,
      anchors: { lerp: .085 },
      autoResize: true,
      respectReducedMotion: true,
    })
    const updateScroll = () => ScrollTrigger.update()
    const updateLenis = (time: number) => lenis.raf(time * 1000)

    lenis.on('scroll', updateScroll)
    gsap.ticker.add(updateLenis)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.off('scroll', updateScroll)
      gsap.ticker.remove(updateLenis)
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    return () => window.removeEventListener('load', refresh)
  }, [])
  return <><CustomCursor /><main><Hero /><SelectedWork /><Process /><Tools /><Contact /></main></>
}
