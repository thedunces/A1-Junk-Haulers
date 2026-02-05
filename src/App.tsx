import { ActionGallery } from './components/ActionGallery'
import { BeforeAfterCarousel3D } from './components/BeforeAfterCarousel3D'
import { ContactForm } from './components/ContactForm'
import { ContactSection } from './components/ContactSection'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { LocationSection } from './components/LocationSection'
import { Services } from './components/Services'

const beforeAfterImages = [
  { src: 'https://placehold.co/800x500/1e293b/94a3b8?text=Before+%26+After+1', alt: 'Before and after cleanup 1' },
  { src: 'https://placehold.co/800x500/1e293b/94a3b8?text=Before+%26+After+2', alt: 'Before and after cleanup 2' },
  { src: 'https://placehold.co/800x500/1e293b/94a3b8?text=Before+%26+After+3', alt: 'Before and after cleanup 3' },
]

function App() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Hero />
      <main>
        <Services />
        <ActionGallery />
        <div id="before-after" className="scroll-mt-24">
          <BeforeAfterCarousel3D items={beforeAfterImages} />
        </div>
        <LocationSection />
        <ContactSection>
          <ContactForm />
        </ContactSection>
      </main>
      <Footer />
    </div>
  )
}

export default App
