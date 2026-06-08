const clients = ['TechCorp', 'CloudNet', 'DataFlow', 'SecureIT', 'InnovateX', 'NextGen']

export function ClientsMarquee() {
  return (
    <section className="clients-marquee-section relative overflow-hidden border-b border-primary-200 py-10">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="clients-marquee-blob clients-marquee-blob-1" />
        <div className="clients-marquee-blob clients-marquee-blob-2" />
        <div className="clients-marquee-blob clients-marquee-blob-3" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {clients.map((client) => (
            <div
              key={client}
              className="flex h-12 items-center justify-center rounded-md border border-white/70 bg-white/75 px-8 text-xs font-bold uppercase tracking-widest text-primary-600 shadow-sm backdrop-blur-sm"
            >
              {client}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
