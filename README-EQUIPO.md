# Equipo 05 — Capture The Report

> Estado: **base de trabajo lista, prototipo por definir.** El planteamiento está en curso en [`docs/PLANTEAMIENTO.md`](docs/PLANTEAMIENTO.md).

## Qué hace el prototipo

Por definir — se completa cuando cerremos [`docs/PLANTEAMIENTO.md`](docs/PLANTEAMIENTO.md).

## Cómo correrlo

```bash
git clone https://github.com/estrategiayseguridad/capture-the-report.git
cd capture-the-report
git checkout equipo-05

npm install
npm run dev
```

Abre http://localhost:3000.

## Stack

- Next.js 15 (App Router) + TypeScript + Tailwind CSS — el boilerplate del repo, sin cambios de stack.
- Interfaz en `src/app/`, backend en API routes (`src/app/api/*/route.ts`).
- Persistencia: archivos JSON / estado en memoria. Sin base de datos ni servicios externos.

## Datos de prueba

Los sanitizados que ya trae el repo en [`data/`](data/):

- `data/escaneo-ejemplo.csv` — salida tipo escáner de vulnerabilidades (host, puerto, servicio, severidad, CVSS, CVE, estado, fechas).
- `data/hallazgos-ejemplo.json` — VAPT web de "ACME Corp" (datos sintéticos) con hallazgos completos: descripción, evidencia, recomendación y referencias OWASP/CWE.

## Agente de IA (Claude Code)

El equipo trabaja con Claude Code sobre Amazon Bedrock. La configuración vive en
`.claude/settings.local.json`, que **está en `.gitignore` a propósito porque contiene una
credencial**. Cada integrante crea el suyo:

```jsonc
// .claude/settings.local.json
{
  "env": {
    "CLAUDE_CODE_USE_BEDROCK": "1",
    "AWS_REGION": "us-east-1",
    "AWS_BEARER_TOKEN_BEDROCK": "<tu-api-key-de-bedrock>",
    "ANTHROPIC_MODEL": "us.anthropic.claude-opus-5",
    "ANTHROPIC_SMALL_FAST_MODEL": "us.anthropic.claude-haiku-4-5-20251001-v1:0"
  }
}
```

Las reglas que sigue el agente en este repo están en [`CLAUDE.md`](CLAUDE.md).

> ⚠️ Nunca pegar la API key en un archivo trackeado por git.

## Reglas de trabajo del equipo

- Toda la rama es `equipo-05`. **Nunca `main`.**
- Commits frecuentes: si no está en la rama al code freeze (6:00 PM), no existe.

## Pendiente

- [ ] Completar `docs/PLANTEAMIENTO.md` (problema, solución, flujo, alcance) — **antes de las 3:15 PM**.
- [ ] Armar el pitch en `docs/PITCH.md`.
- [ ] Construir el camino feliz del prototipo.
- [ ] Actualizar este README con qué hace y cómo se demuestra.
