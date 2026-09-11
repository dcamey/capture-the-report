# 📐 Planteamiento — Equipo 05

## 1. Equipo

- **Número de equipo:** 05
- **Integrantes:** _⚠️ PENDIENTE — llenar antes de commitear la versión final_
- **Nombre del prototipo:** **SkillRadar** — el radar de talento de ES Consulting
  _(alternativas si no gusta: "¿Quién Sabe?", "Radar de Talento", "TalentoES")_

## 2. El problema

**¿Qué reporte/proceso es?**
Responder la pregunta *"¿quién de la casa puede hacer esto?"*. Hoy no existe un repositorio
centralizado y actualizado de las habilidades y competencias de los colaboradores de **CSC,
Ingeniería y Consulting**. Cada vez que se necesita saber quién califica para algo, se arma a
mano: correos y mensajes a los líderes de los tres equipos, memoria personal de quién hizo qué,
y revisión de CVs sueltos.

**¿Quién lo sufre y con qué frecuencia?** La falta de visibilidad golpea en tres niveles:

| Área | Qué no puede hacer hoy |
|------|------------------------|
| **Comercial / Ventas** | Identificar rápido al personal calificado para dimensionar proyectos y sacar propuestas y licitaciones **a tiempo**. Cada oportunidad nueva reabre la misma búsqueda manual. |
| **Gestión de Proyectos (PM)** | Analizar la carga de trabajo (*workload*) y asignar el recurso adecuado a cada proyecto, por no tener las capacidades individuales en un solo lugar. |
| **RRHH** | Detectar brechas de conocimiento (*skill gaps*), planificar estratégicamente las próximas certificaciones y ubicar practicantes y nuevos colaboradores donde suman. |

**¿Cuánto tiempo toma hoy y por qué?**
_Estimación de trabajo, a validar con Comercial antes del pitch:_ entre **3 y 5 horas de trabajo
efectivo por propuesta**, repartidas en **1 o 2 días calendario** — porque el tiempo real no se va
buscando, se va **esperando** que los líderes de los tres equipos contesten. Con varias licitaciones
al mes, el costo se multiplica.

**¿Qué es lo peor del proceso actual?**
Que la respuesta depende de a quién le preguntaste y de qué se acordó ese día. Se propone a la
persona que alguien recordó, no necesariamente a la que mejor califica — y a veces se subcontrata
o se declina una oportunidad por una capacidad que **sí existía adentro** y nadie tenía visible.

## 3. La solución

**¿Qué hace?**
Un **buscador de talento interno**. El usuario escribe los requisitos de una licitación en lenguaje
natural — por ejemplo *"pentest web + ISO 27001 + inglés"* — y SkillRadar devuelve las personas que
califican, **ordenadas por mejor match**, mostrando su nivel en cada skill requerido (1–5), su
equipo, su rol y su **% de disponibilidad**. De ahí se genera una **ficha de capacidades imprimible**
lista para adjuntar a la propuesta.

**¿Qué deja de hacer el humano gracias a esto?**
Deja de mandar correos a tres líderes y esperar un día por la respuesta. La búsqueda pasa de
**horas repartidas en días** a **segundos**, y el resultado es el mismo para todos: comparable,
ordenado por criterio explícito y no por memoria.

**¿Dónde encajaría en la futura plataforma unificada de reportería?**
Es el **panel de capacidades + generador de fichas de talento** de la plataforma. La misma base de
datos de skills alimenta reportería para las otras dos áreas:

- **Para RRHH:** reporte de brechas por equipo y calendario de certificaciones por vencer.
- **Para PM:** reporte de disponibilidad y carga para armar el equipo de un proyecto.
- **Para Comercial:** la ficha de capacidades que ya generamos hoy, como anexo de la propuesta.

> **Hacia dónde escala (no es de hoy):** formulario de autoevaluación para que cada colaborador
> mantenga su perfil al día, vista de workload real por proyecto, e integración con el inventario
> de certificaciones de RRHH.

## 4. El flujo

1. **Entrada:** los requisitos de una licitación, escritos como texto libre o seleccionados de un
   catálogo de skills (ej. *"pentest web + ISO 27001 + inglés"*). Los perfiles de los colaboradores
   vienen precargados desde `data/colaboradores.json` (**datos sintéticos**, ver §5).
2. **Proceso:** se interpretan los requisitos contra el catálogo de skills, se filtran las personas
   que los cubren y se calcula un **score de match** por persona: cuántos requisitos cubre, con qué
   nivel, y qué tan disponible está.
3. **Salida:**
   - **En pantalla:** lista de candidatos ordenada por match, con nivel por skill y % de
     disponibilidad. Clic en una persona → su perfil completo de skills y certificaciones.
   - **Documento:** vista `/reporte` con la **ficha de capacidades** del candidato o del grupo
     seleccionado — HTML limpio con `@media print`, para imprimir o guardar como PDF desde el
     navegador y adjuntar a la propuesta.
4. **¿Quién valida antes de que se use/envíe?** El **líder del equipo** de la persona propuesta
   confirma disponibilidad real, y **Comercial** valida que el perfil calce con el cliente antes de
   que la ficha salga en la propuesta. SkillRadar propone; la gente decide.

```
[Requisitos de licitación]
        │
        ▼
[Match contra catálogo de skills] ──▶ [Score: cobertura + nivel + disponibilidad]
        │
        ▼
[Lista de candidatos ordenada] ──▶ [Perfil de persona] ──▶ [Ficha de capacidades imprimible]
```

## 5. Alcance del prototipo de HOY

- **Hoy SÍ se demuestra:**
  1. **Buscador:** escribir requisitos → lista de personas que califican, ordenada por match, con
     nivel por skill y % de disponibilidad.
  2. **Perfil de persona:** ver el detalle de skills y certificaciones de un candidato.
  3. **Ficha de capacidades imprimible** (`/reporte`) a partir del resultado del buscador.

- **Hoy NO (queda para después):**
  - Formulario de autoevaluación / edición de perfiles (los datos son de solo lectura).
  - Vista de workload y asignación a proyectos (el dolor de PM).
  - Matriz de brechas y planificación de certificaciones (el dolor de RRHH) — _si sobra tiempo, una
    versión mínima; no cuenta como alcance comprometido._
  - Login, roles y permisos.
  - Base de datos, PDF generado en backend, despliegue.

- **Datos de entrada para la demo:**
  Los datos de `data/` que ya trae el repo son de VAPT y vulnerabilidades: **no aplican** a este
  problema. Creamos un seed nuevo, **100% sintético**: `data/colaboradores.json` con ~25
  colaboradores ficticios repartidos en CSC / Ingeniería / Consulting, cada uno con rol,
  % de disponibilidad, skills con nivel 1–5, y 1–2 certificaciones con fecha de vencimiento.
  **Ningún dato de personas reales de ES Consulting entra al repo.**

### Modelo de datos

Tres entidades, tal como quedaron definidas:

- **Persona** — `id`, `nombre`, `equipo`, `rol`, `disponibilidad` (%), `idiomas`, `certificaciones[]`
- **Skill** — `id`, `nombre`, `categoria` (Ofensiva / GRC / CSC-SOC / Ingeniería / Transversal)
- **PersonaSkill** — `personaId` + `skillId` + `nivel` (1–5)

**Persistencia:** un archivo **JSON en el repo**, leído en memoria por las API routes. Sin base de
datos — la regla del evento lo pide así, y además es el camino más corto al reto *Manual de vuelo*:
la rama corre con `npm install && npm run dev`, sin migraciones ni `.env`.

### Stack

Next.js 15 (App Router) + TypeScript + Tailwind — el boilerplate del repo. Interfaz en `src/app/`,
búsqueda en una API route (`src/app/api/buscar/route.ts`).

## 6. Reparto rápido

- **¿Quién maneja el agente / código?** _PENDIENTE_
- **¿Quién prepara datos y prueba el flujo?** _PENDIENTE_
- **¿Quién arma el pitch y la demo?** _PENDIENTE_

## Impacto estimado

_Argumento para el criterio de impacto (20%). Los números son estimación del equipo, a validar con
Comercial antes del pitch:_

- **Hoy:** 3–5 h de trabajo efectivo por propuesta buscando quién califica, repartidas en 1–2 días
  de espera de respuestas.
- **Con SkillRadar:** la búsqueda baja a minutos; queda solo la validación humana con el líder.
- **Ahorro:** ~3–4 h por propuesta. Con **4 propuestas al mes**, son **~12–16 h/mes** solo en
  Comercial — sin contar el beneficio menos medible pero más caro: dejar de declinar o subcontratar
  oportunidades por una capacidad que sí existía adentro.
