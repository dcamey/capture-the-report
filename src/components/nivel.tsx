import { NIVEL_MAX } from "@/lib/tipos";

/** Un color por nivel de la escala 0–3. Se usa igual en buscador y ficha. */
const RELLENO_NIVEL: Record<number, string> = {
  0: "bg-slate-500",
  1: "bg-amber-400",
  2: "bg-cyan-400",
  3: "bg-emerald-400",
};

const TEXTO_NIVEL: Record<number, string> = {
  0: "text-slate-400",
  1: "text-amber-300",
  2: "text-cyan-300",
  3: "text-emerald-300",
};

/**
 * Tres bloquecitos: cuántos están encendidos es el nivel. Se lee de un
 * vistazo al comparar candidatos, que es todo el punto del buscador.
 */
export function NivelBarra({
  nivel,
  claro = false,
}: {
  nivel: number;
  claro?: boolean;
}) {
  const vacio = claro ? "bg-slate-200" : "bg-slate-700";

  return (
    <span className="inline-flex gap-[3px] align-middle">
      {Array.from({ length: NIVEL_MAX }, (_, i) => (
        <span
          key={i}
          className={`h-3 w-2 rounded-sm ${
            i < nivel ? RELLENO_NIVEL[nivel] : vacio
          }`}
        />
      ))}
    </span>
  );
}

/** Nombre del requisito o skill + su nivel, para las listas del buscador. */
export function NivelChip({
  etiqueta,
  nivel,
  descripcion,
  certificacion,
}: {
  etiqueta: string;
  nivel: number;
  descripcion: string;
  certificacion?: string | null;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-md border px-2.5 py-1 text-xs ${
        nivel > 0
          ? "border-slate-600 bg-[#0d1538]"
          : "border-slate-800 bg-[#0b1230] opacity-60"
      }`}
      title={`${etiqueta} — ${descripcion}`}
    >
      <NivelBarra nivel={nivel} />
      <span className="font-semibold text-slate-100">{etiqueta}</span>
      <span className={TEXTO_NIVEL[nivel]}>{descripcion}</span>
      {certificacion ? (
        <span
          className="rounded bg-emerald-400/15 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-300"
          title={`Certificación vigente: ${certificacion}`}
        >
          ✓ Certificado
        </span>
      ) : null}
    </span>
  );
}

/** % de tiempo libre para tomar proyecto nuevo. */
export function Disponibilidad({
  pct,
  claro = false,
}: {
  pct: number;
  claro?: boolean;
}) {
  const color =
    pct >= 70 ? "bg-emerald-400" : pct >= 40 ? "bg-amber-400" : "bg-rose-400";

  return (
    <span className="inline-flex items-center gap-2">
      <span
        className={`h-1.5 w-20 overflow-hidden rounded-full ${
          claro ? "bg-slate-200" : "bg-slate-700"
        }`}
      >
        <span
          className={`block h-full ${color}`}
          style={{ width: `${pct}%` }}
        />
      </span>
      <span className={claro ? "text-slate-700" : "text-slate-300"}>
        {pct}% disponible
      </span>
    </span>
  );
}
