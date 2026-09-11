import type {
  CategoriaSkill,
  Certificacion,
  EscalaNivel,
  Persona,
  Punteos,
  Skill,
} from "./tipos";

/** Orden y nombre en pantalla de las tres categorías de la matriz. */
export const CATEGORIAS: { id: CategoriaSkill; nombre: string; nota: string }[] =
  [
    {
      id: "technical",
      nombre: "Habilidades técnicas",
      nota: "Capacidades propias del oficio",
    },
    {
      id: "solutions",
      nombre: "Soluciones",
      nota: "Producto o fabricante que sabe implementar y operar",
    },
    {
      id: "soft",
      nombre: "Habilidades blandas",
      nota: "Cómo trabaja y comunica",
    },
  ];

/** Etiqueta corta de un nivel según la escala del inventario. */
export function nivelCorto(escala: EscalaNivel[], nivel: number): string {
  return escala.find((e) => e.nivel === nivel)?.corto ?? String(nivel);
}

/** Etiqueta completa de un nivel según la escala del inventario. */
export function nivelEtiqueta(escala: EscalaNivel[], nivel: number): string {
  return escala.find((e) => e.nivel === nivel)?.etiqueta ?? String(nivel);
}

/** Hoy en ISO (YYYY-MM-DD), para comparar contra `vence` sin husos horarios. */
export function hoyISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export function estaVigente(cert: Certificacion, hoy = hoyISO()): boolean {
  return cert.vence >= hoy;
}

/** Certificaciones que no han vencido, de la que vence primero a la última. */
export function certificacionesVigentes(
  persona: Persona,
  hoy = hoyISO(),
): Certificacion[] {
  return persona.certificaciones
    .filter((c) => estaVigente(c, hoy))
    .sort((a, b) => a.vence.localeCompare(b.vence));
}

/** minúsculas, sin acentos, espacios colapsados. */
export function normalizar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Palabras significativas del nombre de un skill, para reconocer si una
 * certificación habla de ese skill. Se ignoran las cortas y las de relleno
 * para no cruzar cosas por accidente ("de", "iso", "soc").
 */
const RELLENO = new Set([
  "de",
  "del",
  "la",
  "las",
  "los",
  "y",
  "en",
  "para",
  "auditoria",
  "analisis",
  "uso",
  "adecuado",
]);

function palabrasClave(nombre: string): string[] {
  return normalizar(nombre)
    .replace(/[()/]/g, " ")
    .split(" ")
    .filter((p) => p.length >= 4 && !RELLENO.has(p));
}

/**
 * La certificación vigente que respalda un skill, si existe.
 *
 * Heurística de prototipo: se cruza por palabra clave del nombre del skill
 * contra el nombre de la certificación ("Infoblox" ↔ "Infoblox Core DDI
 * Associate", "27001" ↔ "ISO 27001 Lead Auditor"). Suficiente para la demo;
 * en la plataforma real la certificación se ligaría al skill por id.
 */
export function certificacionDelSkill(
  persona: Persona,
  skill: Skill,
  hoy = hoyISO(),
): Certificacion | null {
  const claves = palabrasClave(skill.nombre);
  if (claves.length === 0) return null;

  for (const cert of certificacionesVigentes(persona, hoy)) {
    const nombre = normalizar(cert.nombre);
    if (claves.some((clave) => nombre.includes(clave))) return cert;
  }
  return null;
}

/** Suma de niveles de la persona en cada categoría (el "punteo total"). */
export function punteosPorCategoria(
  persona: Persona,
  catalogo: Skill[],
): Punteos {
  const categoriaPorSkill = new Map(catalogo.map((s) => [s.id, s.categoria]));
  const punteos: Punteos = { technical: 0, solutions: 0, soft: 0 };

  for (const ps of persona.skills) {
    const categoria = categoriaPorSkill.get(ps.skillId);
    if (categoria) punteos[categoria] += ps.nivel;
  }
  return punteos;
}

/** Punteo máximo posible de una categoría, para leer el punteo en contexto. */
export function punteoMaximo(
  categoria: CategoriaSkill,
  catalogo: Skill[],
): number {
  return catalogo.filter((s) => s.categoria === categoria).length * 3;
}

export type SkillConNivel = { skill: Skill; nivel: number };

/**
 * Los skills registrados de la persona (nivel ≥ 1), agrupados por categoría y
 * ordenados de mayor a menor nivel. Lo que no aparece está en 0.
 */
export function skillsPorCategoria(
  persona: Persona,
  catalogo: Skill[],
): Record<CategoriaSkill, SkillConNivel[]> {
  const skillPorId = new Map(catalogo.map((s) => [s.id, s]));
  const agrupado: Record<CategoriaSkill, SkillConNivel[]> = {
    technical: [],
    solutions: [],
    soft: [],
  };

  for (const ps of persona.skills) {
    const skill = skillPorId.get(ps.skillId);
    if (!skill || ps.nivel < 1) continue;
    agrupado[skill.categoria].push({ skill, nivel: ps.nivel });
  }

  for (const categoria of Object.keys(agrupado) as CategoriaSkill[]) {
    agrupado[categoria].sort(
      (a, b) => b.nivel - a.nivel || a.skill.nombre.localeCompare(b.skill.nombre),
    );
  }
  return agrupado;
}
