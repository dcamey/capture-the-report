# 🏁 Capture The Report

Hackathon interna de ES Consulting — el inicio de la **plataforma unificada de reportería**.

Cada equipo construye un prototipo web que resuelva un dolor real de reportería: automatizar un reporte manual, convertir la salida de una herramienta en un documento presentable, asistentes de redacción, paneles de hallazgos… lo que su equipo elija.

## 🚀 Cómo empezar (5 minutos)

```bash
# 1. Clona el repo
git clone https://github.com/estrategiayseguridad/capture-the-report.git
cd capture-the-report

# 2. Crea la rama de tu equipo (usa tu número de equipo)
git checkout -b equipo-01

# 3. Instala dependencias y corre el proyecto
npm install
npm run dev
```

Abre http://localhost:3000 — si ves la página de bienvenida, estás listo.

> ⚠️ **Nunca trabajes en `main`.** Todo el trabajo de tu equipo vive en su rama `equipo-XX`. Hagan commits frecuentes y push a su rama.

## 📋 El flujo del día

| Fase | Hora | Qué hacer |
|------|------|-----------|
| **1. Tema** | 1:00 – 1:45 | Durante el almuerzo, el equipo debate y elige su tema. |
| **2. Planteamiento y pitch** | 1:45 – 2:45 | ⛔ **Sin código todavía.** Llenen [`docs/PLANTEAMIENTO.md`](docs/PLANTEAMIENTO.md) con calma: problema, solución y flujo. De ahí sale el pitch ([`docs/PITCH.md`](docs/PITCH.md)). Un buen planteamiento = un agente que trabaja bien. |
| **3. Pitch** | 2:45 – 3:15 | Un representante, máximo 2 minutos. |
| **4. Prototipo** | 3:15 – 6:00 | A construir. El agente ya conoce las reglas (ver `CLAUDE.md`). Prioridad: algo que se vea funcionando en pantalla. |
| **5. Demo** | 6:00 – 7:30 | Máximo 5 minutos por equipo, demo en vivo desde su rama. |

## 🛠 Stack

- **Next.js 15** (App Router) + **TypeScript** + **Tailwind CSS** — ya configurado, solo `npm install`.
- Todo debe ser **web**. El backend va en API routes (`src/app/api/`).
- Para persistencia del prototipo: archivos JSON, memoria o `localStorage` — no pierdan tiempo montando bases de datos.
- Datos de prueba sanitizados en [`data/`](data/) — úsenlos como entrada de sus prototipos.

## 📏 Reglas

1. **Todo vive en el repo.** Si no está en tu rama al code freeze (6:00 PM), no existe.
2. **Planteamiento primero.** `docs/PLANTEAMIENTO.md` completo antes de la primera línea de código. Es obligatorio y se evalúa.
3. **Agentes de IA permitidos y fomentados.** Solo pide una cosa: que el equipo entienda y pueda explicar lo que entrega.
4. **Demo en vivo.** Lo que se evalúa corre en pantalla. Si algo quedó a medias, se muestra hasta donde llegó.
5. **🔒 Cero datos reales de clientes.** Solo datos sanitizados o sintéticos (los de `data/` o los que fabriquen).

## 🏆 Evaluación

| Criterio | Peso |
|----------|------|
| Funciona en vivo | 30% |
| Planteamiento y visión (¿qué tan claro está el problema, la solución y dónde encaja en la plataforma?) | 30% |
| Impacto en el día a día (horas ahorradas) | 20% |
| Calidad y continuidad (README, orden de la rama, retomable el lunes) | 20% |

**Puntos extra:** 🌐 demo desplegada en línea (Vercel u otro) suma al marcador de retos.

## ⚡ Retos bonus (Copa de Retos)

Marcador en vivo durante todo el día. Puntos por: primer prototipo funcional en pantalla, ayudar a destrabar a otro equipo, README que otro equipo pueda seguir, el mejor flujo con agentes de IA, deploy en línea… y sorpresas que se anuncian durante la tarde. El equipo con más puntos gana la **Copa de Retos**.

---

¿Dudas? Tomás o Mei. 🏁
