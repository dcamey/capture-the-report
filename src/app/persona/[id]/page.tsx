import Link from "next/link";
import { notFound } from "next/navigation";

import { Disponibilidad, NivelBarra } from "@/components/nivel";
import { leerInventario } from "@/lib/datos";
import {
  CATEGORIAS,
  certificacionesVigentes,
  estaVigente,
  nivelCorto,
  punteoMaximo,
  punteosPorCategoria,
  skillsPorCategoria,
} from "@/lib/skills";
import type { OrigenDatos } from "@/lib/tipos";

/** De dónde salieron los datos. Se dice en pantalla, no en letra chica. */
const ORIGEN: Record<OrigenDatos, string> = {
  sintetico: "Perfil sintético de demo",
  "sintetico-pendiente-excel":
    "Sintético provisional — pendiente de los niveles reales de la matriz de Ingeniería",
  "escenario-pitch": "Personaje del escenario de demo",
};

export default async function PerfilPersona({
  params,
  searchParams,
}: PageProps<"/persona/[id]">) {
  const { id } = await params;
  const { q } = await searchParams;
  const consulta = typeof q === "string" ? q : "";

  const inventario = await leerInventario();
  const persona = inventario.personas.find((p) => p.id === id);
  if (!persona) notFound();

  const punteos = punteosPorCategoria(persona, inventario.skills);
  const porCategoria = skillsPorCategoria(persona, inventario.skills);
  const vigentes = certificacionesVigentes(persona);

  const volverA = consulta ? `/?q=${encodeURIComponent(consulta)}` : "/";
  const fichaHref = `/reporte?ids=${encodeURIComponent(persona.id)}${
    consulta ? `&q=${encodeURIComponent(consulta)}` : ""
  }`;

  return (
    <main className="min-h-screen bg-[#0a1030] text-slate-100">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <Link
          href={volverA}
          className="text-sm text-cyan-400 hover:text-cyan-300"
        >
          ← Volver al buscador
        </Link>

        <header className="mt-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {persona.nombre}
            </h1>
            <p className="mt-1 text-slate-300">
              {persona.rol} · {persona.equipo}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-400">
              <Disponibilidad pct={persona.disponibilidad} />
              <span>{persona.idiomas.join(" · ")}</span>
            </div>
          </div>
          <Link
            href={fichaHref}
            className="rounded-lg bg-cyan-400 px-5 py-2.5 font-bold text-[#0a1030] transition hover:bg-cyan-300"
          >
            Ficha de capacidades →
          </Link>
        </header>

        <p className="mt-5 rounded-lg border border-slate-800 bg-[#0d1538] px-4 py-2 text-xs text-slate-400">
          Origen de los datos: {ORIGEN[persona.origen]}.
        </p>

        <section className="mt-8 grid gap-3 sm:grid-cols-3">
          {CATEGORIAS.map((categoria) => (
            <div
              key={categoria.id}
              className="rounded-xl border border-slate-700 bg-[#111a42] p-4"
            >
              <p className="text-xs uppercase tracking-wider text-slate-500">
                {categoria.nombre}
              </p>
              <p className="mt-1 text-2xl font-bold text-cyan-300">
                {punteos[categoria.id]}
                <span className="text-base font-normal text-slate-500">
                  {" "}
                  / {punteoMaximo(categoria.id, inventario.skills)}
                </span>
              </p>
              <p className="mt-1 text-xs text-slate-500">
                punteo de la categoría
              </p>
            </div>
          ))}
        </section>

        <section className="mt-8 space-y-6">
          {CATEGORIAS.map((categoria) => {
            const skills = porCategoria[categoria.id];
            return (
              <div key={categoria.id}>
                <h2 className="text-lg font-bold">{categoria.nombre}</h2>
                <p className="text-xs text-slate-500">{categoria.nota}</p>

                {skills.length === 0 ? (
                  <p className="mt-3 text-sm text-slate-500">
                    Sin habilidades registradas en esta categoría.
                  </p>
                ) : (
                  <ul className="mt-3 divide-y divide-slate-800 overflow-hidden rounded-xl border border-slate-700 bg-[#111a42]">
                    {skills.map(({ skill, nivel }) => (
                      <li
                        key={skill.id}
                        className="flex items-center justify-between gap-4 px-4 py-2.5"
                      >
                        <span className="text-sm text-slate-100">
                          {skill.nombre}
                        </span>
                        <span className="flex shrink-0 items-center gap-3">
                          <span className="text-xs text-slate-400">
                            {nivelCorto(inventario.escala, nivel)}
                          </span>
                          <NivelBarra nivel={nivel} />
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </section>

        <section className="mt-8">
          <h2 className="text-lg font-bold">Certificaciones</h2>
          {persona.certificaciones.length === 0 ? (
            <p className="mt-3 text-sm text-slate-500">
              Sin certificaciones registradas.
            </p>
          ) : (
            <ul className="mt-3 divide-y divide-slate-800 overflow-hidden rounded-xl border border-slate-700 bg-[#111a42]">
              {persona.certificaciones.map((cert) => (
                <li
                  key={cert.nombre}
                  className="flex items-center justify-between gap-4 px-4 py-2.5 text-sm"
                >
                  <span>{cert.nombre}</span>
                  <span
                    className={
                      estaVigente(cert)
                        ? "text-emerald-300"
                        : "text-rose-300"
                    }
                  >
                    {estaVigente(cert) ? "vigente" : "vencida"} · vence{" "}
                    {cert.vence}
                  </span>
                </li>
              ))}
            </ul>
          )}
          <p className="mt-2 text-xs text-slate-500">
            {vigentes.length} de {persona.certificaciones.length} vigentes.
          </p>
        </section>

        <footer className="mt-12 border-t border-slate-800 pt-5 text-xs text-slate-500">
          <p>
            Los perfiles son de solo lectura en este prototipo: el registro y la
            actualización los hace RRHH. La disponibilidad la confirma el líder
            del equipo antes de comprometer a la persona.
          </p>
        </footer>
      </div>
    </main>
  );
}
