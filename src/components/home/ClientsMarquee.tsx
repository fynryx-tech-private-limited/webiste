const clients = ['TechCorp', 'CloudNet', 'DataFlow', 'SecureIT', 'InnovateX', 'NextGen']

export function ClientsMarquee() {
  return (
    <section className="border-b border-primary-100 bg-primary-50 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {clients.map((client) => (
            <div
              key={client}
              className="flex h-12 items-center justify-center rounded-md border border-primary-100 bg-white px-8 text-xs font-bold uppercase tracking-widest text-primary-300"
            >
              {client}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
