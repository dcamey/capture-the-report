export type Equipo = "CSC" | "Ingeniería" | "Consulting";

export type CategoriaSkill =
  | "Ofensiva"
  | "GRC"
  | "CSC / SOC"
  | "Ingeniería"
  | "Transversal";

export type Skill = {
  id: string;
  nombre: string;
  categoria: CategoriaSkill;
};

/** La relación PersonaSkill: qué tan fuerte es alguien en un skill (1–5). */
export type PersonaSkill = {
  skillId: string;
  nivel: 1 | 2 | 3 | 4 | 5;
};

export type Certificacion = {
  nombre: string;
  /** Fecha ISO (YYYY-MM-DD). */
  vence: string;
};

export type Persona = {
  id: string;
  nombre: string;
  equipo: Equipo;
  rol: string;
  /** % de tiempo libre para tomar proyecto nuevo. */
  disponibilidad: number;
  idiomas: string[];
  skills: PersonaSkill[];
  certificaciones: Certificacion[];
};

export type Inventario = {
  nota: string;
  generado: string;
  skills: Skill[];
  personas: Persona[];
};

/** Un requisito de la licitación, ya resuelto contra el catálogo de skills. */
export type Requisito = {
  /** El texto tal como lo escribió el usuario. */
  textoOriginal: string;
  skill: Skill;
};

/** Cómo cubre una persona un requisito puntual. */
export type Cobertura = {
  skill: Skill;
  /** 0 = no lo tiene registrado. */
  nivel: number;
};

export type Candidato = {
  persona: Persona;
  /** 0–100. */
  score: number;
  coberturas: Cobertura[];
  /** Cuántos requisitos cubre con nivel ≥ 1. */
  requisitosCubiertos: number;
};

export type ResultadoBusqueda = {
  requisitos: Requisito[];
  /** Términos que no se pudieron mapear a ningún skill del catálogo. */
  noReconocidos: string[];
  candidatos: Candidato[];
};
