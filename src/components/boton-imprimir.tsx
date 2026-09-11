"use client";

/**
 * Abre el diálogo de impresión del navegador. Desde ahí se imprime o se
 * guarda como PDF: no generamos el PDF en el backend (no hay tiempo y no
 * hace falta para la demo).
 */
export function BotonImprimir() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="rounded-lg bg-[#0a1030] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#111a42]"
    >
      Imprimir / guardar PDF
    </button>
  );
}
