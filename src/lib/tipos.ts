export type Equipo = "CSC" | "Ingeniería" | "Consulting";

/**
 * Las tres categorías con las que trabaja la matriz de habilidades de
 * Ingeniería (ver docs/PLANTEAMIENTO.md §Modelo de datos).
 */
export type CategoriaSkill = "technical" | "solutions" | "soft";

export type Skill = {
  id: string;
  nombre: string;
  categoria: CategoriaSkill;
};

/**
 * Escala 0–3 de la matriz real:
 * 0 no tiene · 1 básico (con supervisión) · 2 intermedio (autónomo)
 * · 3 avanzado (puede liderar, entrenar y diseñar).
 */
export type Nivel = 0 | 1 | 2 | 3;

export const NIVEL_MAX = 3;

/** El nivel de una persona en un skill. Si no aparece, es 0. */
export type PersonaSkill = {
  skillId: string;
  nivel: Nivel;
};

export type Certificacion = {
  nombre: string;
  /** Fecha ISO (YYYY-MM-DD). */
  vence: string;
};

/** De dónde salieron los datos de esta persona. Se muestra en su perfil. */
export type OrigenDatos =
  | "sintetico"
  | "sintetico-pendiente-excel"
  | "escenario-pitch";

export type Persona = {
  id: string;
  nombre: string;
  equipo: Equipo;
  rol: string;
  /** % de tiempo libre para tomar proyecto nuevo. */
  disponibilidad: number;
  idiomas: string[];
  origen: OrigenDatos;
  skills: PersonaSkill[];
  certificaciones: Certificacion[];
};

/** Cómo se lee cada nivel de la escala. Viene del JSON, no se hardcodea. */
export type EscalaNivel = {
  nivel: Nivel;
  etiqueta: string;
  corto: string;
};

export type Inventario = {
  nota: string;
  generado: string;
  escala: EscalaNivel[];
  skills: Skill[];
  personas: Persona[];
};

/**
 * Un requisito de la licitación ya resuelto: o cae en un skill del catálogo,
 * o es un idioma (los idiomas viven en la persona, no en el catálogo).
 */
export type Requisito =
  | { tipo: "skill"; textoOriginal: string; etiqueta: string; skill: Skill }
  | { tipo: "idioma"; textoOriginal: string; etiqueta: string; idioma: string };

/** Cómo cubre una persona un requisito puntual. */
export type Cobertura = {
  requisito: Requisito;
  /** 0–3. 0 = no lo tiene registrado. */
  nivel: number;
  /** Certificación vigente relacionada con el requisito, si la hay. */
  certificacion: Certificacion | null;
};

/** Suma de niveles de la persona en cada categoría. Se calcula, no se guarda. */
export type Punteos = Record<CategoriaSkill, number>;

export type Candidato = {
  persona: Persona;
  /** 0–100. */
  score: number;
  coberturas: Cobertura[];
  /** Cuántos requisitos cubre con nivel ≥ 1. */
  requisitosCubiertos: number;
  /** Cuántos requisitos respalda con certificación vigente. */
  requisitosCertificados: number;
};

export type ResultadoBusqueda = {
  consulta: string;
  requisitos: Requisito[];
  /** Términos que no se pudieron mapear a ningún skill ni idioma. */
  noReconocidos: string[];
  candidatos: Candidato[];
};
