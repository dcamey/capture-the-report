import { readFile } from "node:fs/promises";
import path from "node:path";

import type { Inventario } from "./tipos";

let cache: Inventario | null = null;

/**
 * Lee el inventario sintético de `data/colaboradores.json`.
 * Sin base de datos: un JSON en el repo, cacheado en memoria.
 */
export async function leerInventario(): Promise<Inventario> {
  if (cache) return cache;

  const ruta = path.join(process.cwd(), "data", "colaboradores.json");
  cache = JSON.parse(await readFile(ruta, "utf-8")) as Inventario;
  return cache;
}
