import { Button } from '../ui/Button'


export function CtaBanner() {
  return (
    <section 
      className="relative overflow-hidden py-16 md:py-24 bg-cover bg-center"
      style={{ backgroundImage: 'url(https://images.pexels.com/photos/7682340/pexels-photo-7682340.jpeg)' }}
    >
      {/* Dark gradient overlay (dark on the left, fading to transparent on the right) */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-900/30" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl text-center sm:text-left mx-auto sm:mx-0 flex flex-col items-center sm:items-start">
          {/* Main Heading */}
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6">
            Need a Consultation?
          </h2>

          {/* Gradient line separator */}
          <div className="h-[2px] w-24 bg-gradient-to-r from-primary-400 to-transparent mb-6"></div>
          
          {/* Subtext (previously Eyebrow) */}
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-white/70 mb-8 leading-relaxed">
            DROP US A LINE! WE ARE HERE TO<br className="hidden sm:block" /> ANSWER YOUR QUESTIONS <span className="text-primary-400">24/7</span>
          </p>


          {/* Button */}
          <Button to="/contact" variant="outline" className="mt-8 border-white hover:bg-white hover:text-primary-800" size="lg">
            Contact Us
          </Button>

          {/* Glassmorphism Feature Bar */}
          {/* <div className="inline-flex flex-col sm:flex-row items-start sm:items-center gap-8 sm:gap-12 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:py-5 sm:px-8 shadow-2xl">


        </div> */}
        </div>
      </div>
    </section>
  )
}
