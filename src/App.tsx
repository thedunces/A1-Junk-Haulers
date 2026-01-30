import before1 from './assets/beforeandafter1.png'
import before2 from './assets/beforeandafter2.png'
import before3 from './assets/beforeandafter3.png'
import { ActionGallery } from './components/ActionGallery'
import { BeforeAfterCarousel3D } from './components/BeforeAfterCarousel3D'
import { ContactForm } from './components/ContactForm'
import { ContactSection } from './components/ContactSection'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { LocationSection } from './components/LocationSection'
import { Services } from './components/Services'

function App() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Hero />
      <main>
        <Services />
        <ActionGallery />

        <div id="before-after" className="scroll-mt-24">
          <BeforeAfterCarousel3D
            items={[
              { src: before1, alt: 'Before and after cleanup example 1' },
              { src: before2, alt: 'Before and after cleanup example 2' },
              { src: before3, alt: 'Before and after cleanup example 3' },
            ]}
          />
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
