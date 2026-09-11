import { readFile } from "node:fs/promises";
import path from "node:path";

import type { Inventario, Persona } from "./tipos";

let cache: Inventario | null = null;

/**
 * Lee el inventario de `data/colaboradores.json`.
 * Sin base de datos: un JSON en el repo, cacheado en memoria.
 */
export async function leerInventario(): Promise<Inventario> {
  if (cache) return cache;

  const ruta = path.join(process.cwd(), "data", "colaboradores.json");
  cache = JSON.parse(await readFile(ruta, "utf-8")) as Inventario;
  return cache;
}

export async function leerPersona(id: string): Promise<Persona | null> {
  const inventario = await leerInventario();
  return inventario.personas.find((p) => p.id === id) ?? null;
}
