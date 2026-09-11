import Link from "next/link";

import { Disponibilidad, NivelChip } from "@/components/nivel";
import { buscar } from "@/lib/buscar";
import { leerInventario } from "@/lib/datos";
import { CATEGORIAS, nivelCorto } from "@/lib/skills";
import type { EscalaNivel } from "@/lib/tipos";

/** Consultas de arranque: la primera es la del guion de demo. */
const EJEMPLOS = [
  "Infoblox",
  "VAPT Web + inglés",
  "ISO 27001 + redacción",
  "Cloudflare ZTNA + firewall",
  "DFIR + SIEM",
];

function textoDe(valor: string | string[] | undefined): string {
  return typeof valor === "string" ? valor : "";
}

export default async function Home({ searchParams }: PageProps<"/">) {
  const { q } = await searchParams;
  const consulta = textoDe(q);

  const inventario = await leerInventario();
  const resultado = consulta.trim() ? buscar(inventario, consulta) : null;

  return (
    <main className="min-h-screen bg-[#0a1030] text-slate-100">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-400">
          ES Consulting · Equipo 05
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight">
          Prodigi<span className="text-cyan-400">ES</span>
        </h1>
        <p className="mt-2 text-lg text-slate-300">
          ¿Quién de la casa puede hacer esto? Escribe los requisitos de la
          licitación y te decimos quién califica.
        </p>
        <p className="mt-2 text-sm text-slate-500">
          {inventario.personas.length} colaboradores · CSC, Ingeniería y
          Consulting · {inventario.skills.length} habilidades en{" "}
          {CATEGORIAS.length} categorías
        </p>

        <form action="/" className="mt-8 flex flex-col gap-3 sm:flex-row">
          <input
            type="search"
            name="q"
            defaultValue={consulta}
            autoFocus
            placeholder="Infoblox · VAPT Web + inglés · ISO 27001 + redacción"
            aria-label="Requisitos de la licitación"
            className="flex-1 rounded-lg border border-slate-600 bg-[#111a42] px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-lg bg-cyan-400 px-6 py-3 font-bold text-[#0a1030] transition hover:bg-cyan-300"
          >
            Buscar talento
          </button>
        </form>

        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-500">Prueba con:</span>
          {EJEMPLOS.map((ejemplo) => (
            <Link
              key={ejemplo}
              href={`/?q=${encodeURIComponent(ejemplo)}`}
              className="rounded-full border border-slate-700 px-3 py-1 text-slate-300 transition hover:border-cyan-400 hover:text-cyan-300"
            >
              {ejemplo}
            </Link>
          ))}
        </div>

        {resultado === null ? (
          <SinBusqueda escala={inventario.escala} />
        ) : (
          <section className="mt-10">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h2 className="text-xl font-bold">
                {resultado.candidatos.length}{" "}
                {resultado.candidatos.length === 1
                  ? "candidato"
                  : "candidatos"}
              </h2>
              {resultado.requisitos.length > 0 ? (
                <p className="text-sm text-slate-400">
                  para{" "}
                  {resultado.requisitos.map((r, i) => (
                    <span key={r.etiqueta}>
                      {i > 0 ? " + " : ""}
                      <span className="font-semibold text-cyan-300">
                        {r.etiqueta}
                      </span>
                      {r.tipo === "idioma" ? (
                        <span className="text-slate-500"> (idioma)</span>
                      ) : null}
                    </span>
                  ))}
                </p>
              ) : null}
            </div>

            {resultado.noReconocidos.length > 0 ? (
              <p className="mt-3 rounded-lg border border-amber-500/40 bg-amber-400/10 px-4 py-2 text-sm text-amber-200">
                No reconocimos{" "}
                <strong>{resultado.noReconocidos.join(", ")}</strong> en el
                catálogo de habilidades — no se tomó en cuenta para el ranking.
              </p>
            ) : null}

            {resultado.candidatos.length === 0 ? (
              <p className="mt-6 rounded-lg border border-slate-700 bg-[#111a42] px-4 py-6 text-slate-300">
                Nadie tiene registrado ninguno de esos requisitos. Eso también
                es un dato: es una <strong>brecha de conocimiento</strong> que
                RRHH debería ver.
              </p>
            ) : (
              <form action="/reporte" className="mt-6">
                <input type="hidden" name="q" value={consulta} />

                <ul className="space-y-3">
                  {resultado.candidatos.map((c, i) => (
                    <li
                      key={c.persona.id}
                      className="rounded-xl border border-slate-700 bg-[#111a42] p-4 transition hover:border-slate-500"
                    >
                      <div className="flex items-start gap-4">
                        <input
                          type="checkbox"
                          name="ids"
                          value={c.persona.id}
                          defaultChecked={i < 3}
                          aria-label={`Incluir a ${c.persona.nombre} en la ficha`}
                          className="mt-1.5 h-4 w-4 shrink-0 accent-cyan-400"
                        />

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-baseline gap-x-3">
                            <span className="text-sm font-bold text-slate-500">
                              #{i + 1}
                            </span>
                            <Link
                              href={`/persona/${c.persona.id}?q=${encodeURIComponent(consulta)}`}
                              className="text-lg font-bold text-slate-50 underline-offset-4 hover:text-cyan-300 hover:underline"
                            >
                              {c.persona.nombre}
                            </Link>
                            <span className="text-sm text-slate-400">
                              {c.persona.rol} · {c.persona.equipo}
                            </span>
                          </div>

                          <div className="mt-3 flex flex-wrap gap-2">
                            {c.coberturas.map((cob) => (
                              <NivelChip
                                key={cob.requisito.etiqueta}
                                etiqueta={cob.requisito.etiqueta}
                                nivel={cob.nivel}
                                descripcion={nivelCorto(
                                  inventario.escala,
                                  cob.nivel,
                                )}
                                certificacion={cob.certificacion?.nombre}
                              />
                            ))}
                          </div>

                          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-slate-400">
                            <Disponibilidad pct={c.persona.disponibilidad} />
                            <span>{c.persona.idiomas.join(" · ")}</span>
                            <span>
                              cubre {c.requisitosCubiertos}/
                              {resultado.requisitos.length} requisitos
                            </span>
                          </div>
                        </div>

                        <div className="shrink-0 text-right">
                          <div className="text-3xl font-bold leading-none text-cyan-300">
                            {c.score}
                          </div>
                          <div className="text-[10px] uppercase tracking-widest text-slate-500">
                            match
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="sticky bottom-4 mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-cyan-400/30 bg-[#0d1538]/95 p-4 backdrop-blur">
                  <p className="text-sm text-slate-400">
                    Los candidatos marcados entran en la ficha de capacidades.
                  </p>
                  <button
                    type="submit"
                    className="rounded-lg bg-cyan-400 px-5 py-2.5 font-bold text-[#0a1030] transition hover:bg-cyan-300"
                  >
                    Generar ficha de capacidades →
                  </button>
                </div>
              </form>
            )}

            <Leyenda escala={inventario.escala} />
          </section>
        )}

        <footer className="mt-14 border-t border-slate-800 pt-5 text-xs text-slate-500">
          <p>
            ProdigiES propone; la gente decide. El líder del equipo confirma la
            disponibilidad real y Comercial valida el perfil antes de que la
            ficha salga en una propuesta.
          </p>
          <p className="mt-2">
            🔒 Datos de demostración — ninguna persona real de ES Consulting
            aparece con sus datos. Seed generado el {inventario.generado}.
          </p>
        </footer>
      </div>
    </main>
  );
}

function Leyenda({ escala }: { escala: EscalaNivel[] }) {
  return (
    <div className="mt-8 rounded-lg border border-slate-800 bg-[#0d1538] p-4 text-xs text-slate-400">
      <p className="font-bold uppercase tracking-wider text-slate-300">
        Escala de la matriz de habilidades
      </p>
      <ul className="mt-2 grid gap-1 sm:grid-cols-2">
        {escala.map((e) => (
          <li key={e.nivel}>
            <span className="font-bold text-slate-200">{e.nivel}</span> —{" "}
            {e.etiqueta}
          </li>
        ))}
      </ul>
      <p className="mt-3">
        El orden se calcula contra los requisitos buscados: primero{" "}
        <strong>cuántos cubre</strong>, luego <strong>con qué nivel</strong>,
        luego si hay <strong>certificación vigente</strong>, y de último la{" "}
        <strong>disponibilidad</strong> como desempate.
      </p>
    </div>
  );
}

function SinBusqueda({ escala }: { escala: EscalaNivel[] }) {
  return (
    <section className="mt-10">
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          {
            n: "1",
            titulo: "Escribes el requisito",
            detalle:
              "Texto libre, como se lee en la licitación: “Infoblox”, “VAPT Web + inglés”.",
          },
          {
            n: "2",
            titulo: "ProdigiES cruza el catálogo",
            detalle:
              "Habilidades técnicas, soluciones y blandas, más idiomas y certificaciones vigentes.",
          },
          {
            n: "3",
            titulo: "Sale la ficha",
            detalle:
              "Candidatos ordenados por match y una ficha de capacidades imprimible para la propuesta.",
          },
        ].map((paso) => (
          <div
            key={paso.n}
            className="rounded-xl border border-slate-700 bg-[#111a42] p-4"
          >
            <span className="text-2xl font-bold text-cyan-400">{paso.n}</span>
            <h2 className="mt-1 font-bold">{paso.titulo}</h2>
            <p className="mt-1 text-sm text-slate-400">{paso.detalle}</p>
          </div>
        ))}
      </div>
      <Leyenda escala={escala} />
    </section>
  );
}
