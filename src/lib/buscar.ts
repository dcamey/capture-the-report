import type {
  Candidato,
  Cobertura,
  Inventario,
  Persona,
  Requisito,
  ResultadoBusqueda,
  Skill,
} from "./tipos";

/** minúsculas, sin acentos, espacios colapsados. */
function normalizar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Atajos para cómo la gente escribe de verdad los requisitos de una
 * licitación. Lo que ya calza por nombre no necesita entrada aquí.
 */
const ALIAS: Record<string, string> = {
  ingles: "ingles-tecnico",
  "ingles avanzado": "ingles-tecnico",
  reportes: "redaccion-reportes",
  redaccion: "redaccion-reportes",
  informes: "redaccion-reportes",
  pci: "pci-dss",
  soc2: "soc-2",
  iso27001: "iso-27001",
  iso: "iso-27001",
  incidentes: "dfir",
  "respuesta a incidentes": "dfir",
  forense: "dfir",
  k8s: "kubernetes",
  contenedores: "kubernetes",
  "pentest movil": "pentest-mobile",
  movil: "pentest-mobile",
  "ingenieria social": "ing-social",
  pm: "gestion-proyectos",
  riesgos: "analisis-riesgos",
  continuidad: "bcp",
  privacidad: "proteccion-datos",
};

/** Separa "pentest web + ISO 27001, inglés" en términos sueltos. */
function partirConsulta(consulta: string): string[] {
  return consulta
    .split(/[+,;\n]| y /gi)
    .map((t) => t.trim())
    .filter((t) => t.length > 1);
}

/**
 * Resuelve un término escrito a mano contra el catálogo de skills.
 * Devuelve el mejor match, o null si no se parece a nada.
 */
function resolverSkill(termino: string, skills: Skill[]): Skill | null {
  const t = normalizar(termino);

  const porAlias = ALIAS[t];
  if (porAlias) {
    const skill = skills.find((s) => s.id === porAlias);
    if (skill) return skill;
  }

  let mejor: Skill | null = null;
  let mejorPuntaje = 0;

  for (const skill of skills) {
    const nombre = normalizar(skill.nombre);
    let puntaje = 0;

    if (nombre === t || skill.id === t) {
      puntaje = 100;
    } else if (nombre.includes(t)) {
      // "cisco" → "redes / cisco". Entre varios, gana el nombre más corto:
      // "pentest" debe caer en "Pentest Web", no en "Pentest Infraestructura".
      puntaje = 60 + t.length / nombre.length;
    } else if (t.includes(nombre)) {
      // "auditoría ISO 27001 completa" → "ISO 27001"
      puntaje = 50 + nombre.length / t.length;
    }

    if (puntaje > mejorPuntaje) {
      mejorPuntaje = puntaje;
      mejor = skill;
    }
  }

  return mejor;
}

/** Pesos del score. Explícitos para poder defenderlos en la demo. */
const PESO_COBERTURA = 0.55;
const PESO_NIVEL = 0.3;
const PESO_DISPONIBILIDAD = 0.15;

function evaluar(persona: Persona, requisitos: Requisito[]): Candidato {
  const nivelPorSkill = new Map(
    persona.skills.map((ps) => [ps.skillId, ps.nivel] as const),
  );

  const coberturas: Cobertura[] = requisitos.map((r) => ({
    skill: r.skill,
    nivel: nivelPorSkill.get(r.skill.id) ?? 0,
  }));

  const requisitosCubiertos = coberturas.filter((c) => c.nivel > 0).length;
  const sumaNiveles = coberturas.reduce((acc, c) => acc + c.nivel, 0);

  const cobertura = requisitosCubiertos / requisitos.length;
  const nivel = sumaNiveles / (5 * requisitos.length);
  const disponibilidad = persona.disponibilidad / 100;

  const score = Math.round(
    100 *
      (PESO_COBERTURA * cobertura +
        PESO_NIVEL * nivel +
        PESO_DISPONIBILIDAD * disponibilidad),
  );

  return { persona, score, coberturas, requisitosCubiertos };
}

/**
 * El corazón del prototipo: requisitos escritos a mano → candidatos
 * ordenados por qué tan bien califican.
 */
export function buscar(
  inventario: Inventario,
  consulta: string,
): ResultadoBusqueda {
  const requisitos: Requisito[] = [];
  const noReconocidos: string[] = [];
  const yaAgregados = new Set<string>();

  for (const termino of partirConsulta(consulta)) {
    const skill = resolverSkill(termino, inventario.skills);
    if (!skill) {
      noReconocidos.push(termino);
      continue;
    }
    if (yaAgregados.has(skill.id)) continue;

    yaAgregados.add(skill.id);
    requisitos.push({ textoOriginal: termino, skill });
  }

  if (requisitos.length === 0) {
    return { requisitos, noReconocidos, candidatos: [] };
  }

  const candidatos = inventario.personas
    .map((p) => evaluar(p, requisitos))
    .filter((c) => c.requisitosCubiertos > 0)
    .sort(
      (a, b) =>
        b.score - a.score ||
        b.requisitosCubiertos - a.requisitosCubiertos ||
        b.persona.disponibilidad - a.persona.disponibilidad,
    );

  return { requisitos, noReconocidos, candidatos };
}
