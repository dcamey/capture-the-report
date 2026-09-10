const pasos = [
  {
    n: "1",
    titulo: "Crea la rama de tu equipo",
    detalle: "git checkout -b equipo-XX — nunca trabajes en main.",
  },
  {
    n: "2",
    titulo: "Planteamiento primero",
    detalle:
      "Completa docs/PLANTEAMIENTO.md antes de la primera línea de código. Se evalúa (30%).",
  },
  {
    n: "3",
    titulo: "Construye el camino feliz",
    detalle:
      "Entra el dato de ejemplo (data/), sale el resultado en pantalla. Después se pule.",
  },
  {
    n: "4",
    titulo: "Prepara la demo",
    detalle:
      "Code freeze 6:00 PM. README-EQUIPO.md, ensayo con cronómetro y último push.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a1030] text-white font-mono">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-cyan-400 text-sm tracking-[0.3em] uppercase">
          ES Consulting · Hackathon interna
        </p>
        <h1 className="mt-4 text-5xl font-bold tracking-tight">
          <span className="bg-white text-[#0a1030] px-2">CAPTURE</span>{" "}
          <span className="bg-white text-[#0a1030] px-2">THE</span>{" "}
          <span className="bg-white text-[#0a1030] px-2">REPORT</span>
        </h1>
        <p className="mt-6 text-lg text-slate-300">
          ✅ El boilerplate está corriendo. Este es el punto de partida de tu
          prototipo: bórralo y construye encima.
        </p>

        <ol className="mt-10 space-y-4">
          {pasos.map((p) => (
            <li
              key={p.n}
              className="flex gap-4 rounded-lg border border-slate-700 bg-[#111a42] p-4"
            >
              <span className="text-2xl text-cyan-400 font-bold">
                {p.n}
              </span>
              <div>
                <h2 className="font-bold">{p.titulo}</h2>
                <p className="text-sm text-slate-400">{p.detalle}</p>
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-10 text-sm text-slate-500">
          Stack: Next.js 15 · TypeScript · Tailwind — reglas completas en{" "}
          <span className="text-slate-300">README.md</span> y{" "}
          <span className="text-slate-300">CLAUDE.md</span>. 🔒 Cero datos
          reales de clientes.
        </p>
        <p className="mt-4 text-xs tracking-[0.25em] uppercase text-cyan-400">
          Protection // Security // Privacy
        </p>
      </div>
    </main>
  );
}
