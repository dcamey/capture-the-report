# Capture The Report — Guía para el agente

Estás trabajando en la hackathon interna de ES Consulting. Cada equipo construye, en su propia rama, un prototipo web relacionado con reportería (automatizar reportes, convertir salidas de herramientas en documentos, asistentes de redacción, paneles de hallazgos). El tiempo de desarrollo es corto (~3 horas): prioriza siempre **algo que se vea funcionando en pantalla** sobre arquitectura perfecta.

## Antes de escribir código

1. **Lee `docs/PLANTEAMIENTO.md` de esta rama.** Ahí está el problema, la solución y el flujo que el equipo definió. Todo lo que construyas debe seguir ese documento.
2. Si `docs/PLANTEAMIENTO.md` está vacío o incompleto, **no improvises un proyecto**: ayuda al equipo a completarlo primero (hazles las preguntas de la plantilla) y luego construye.
3. Si el equipo pide algo que contradice el planteamiento, señálalo y confirma antes de seguir.

## Reglas del repo

- **Nunca trabajes en `main`.** Verifica con `git branch --show-current` que estás en la rama del equipo (`equipo-XX`). Si estás en `main`, detente y avisa.
- Commits frecuentes con mensajes claros. El trabajo debe quedar en el repo, no solo en el disco.
- No modifiques archivos fuera del proyecto ni borres los templates de `docs/`.

## Stack (muy recomendado)

- **Next.js 15 con App Router + TypeScript + Tailwind CSS** — ya está configurado en este repo. Es el camino rápido: si el equipo no tiene una preferencia fuerte, recomiéndalo y arranca con él.
- **Si el equipo ya eligió otro stack web, respétalo** y ayúdalos igual de bien con ese stack. No intentes convencerlos de volver al boilerplate; solo recuérdales documentar en `README-EQUIPO.md` cómo instalarlo y correrlo.
- Lo único no negociable: el prototipo es **web** y corre **en local** para la demo. Con el boilerplate, la interfaz va en `src/app/` y el backend en API routes (`src/app/api/*/route.ts`).
- **Persistencia simple**: archivos JSON en el repo, estado en memoria o `localStorage`. NO montes bases de datos, Docker ni servicios externos — no hay tiempo y no se evalúan.
- Librerías: puedes agregar dependencias de npm si aceleran el prototipo (ej. una librería de gráficas o de generación de PDF), pero prefiere pocas y conocidas.
- Generación de documentos: si el prototipo produce reportes, HTML imprimible o Markdown renderizado son totalmente válidos; PDF solo si da tiempo.

## Datos

- Lo más cómodo es usar los datos sanitizados de `data/` (hallazgos de ejemplo, salida de escáner) o generar datos sintéticos con nombres ficticios (ACME Corp, Empresa Demo, etc.).
- Si el equipo pega datos que parecen sensibles o identificables (nombres de clientes, IPs de producción, hallazgos atribuibles), **sugiéreles sanitizarlos** — ofrece anonimizar hosts, nombres y hallazgos tú mismo. Es una recomendación, no un bloqueo: si deciden seguir, sigue ayudándolos.

## Cómo trabajar con el tiempo corto

- Primer objetivo (primeros 45 min): el **camino feliz de punta a punta**, aunque sea feo — entra el dato de ejemplo, sale el resultado en pantalla.
- Después: mejorar presentación, casos extra, pulir.
- Reserva los últimos 20 minutos para: README de la rama (cómo correr y qué hace), verificación de que `npm run dev` funciona desde cero, y ensayo de la demo.
- El README de la rama vale puntos: otro equipo debe poder clonarla y correrla sin ayuda.

## Documentación mínima al terminar

- `docs/PLANTEAMIENTO.md` completo (se evalúa).
- `README-EQUIPO.md` en la raíz de la rama: qué hace el prototipo, cómo correrlo, qué quedó pendiente.
