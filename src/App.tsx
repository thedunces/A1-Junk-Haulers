import beforeAfter1 from './assets/before-after-1.png'
import beforeAfter2 from './assets/before-after-2.png'
import beforeAfter3 from './assets/before-after-3.png'
import workersLoading from './assets/workers-loading.png'
import { ActionGallery } from './components/ActionGallery'
import { BeforeAfterCarousel3D } from './components/BeforeAfterCarousel3D'
import { ContactForm } from './components/ContactForm'
import { ContactSection } from './components/ContactSection'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { LocationSection } from './components/LocationSection'
import { Services } from './components/Services'

const beforeAfterImages = [
  { src: beforeAfter1, alt: 'Before and after: room cleanup with A1 Junk Haulers' },
  { src: beforeAfter2, alt: 'Before and after: backyard wood debris cleanup' },
  { src: beforeAfter3, alt: 'Before and after: backyard junk removal and lawn cleanup' },
  { src: workersLoading, alt: 'A1 Junk Haulers crew loading junk into the truck' },
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
