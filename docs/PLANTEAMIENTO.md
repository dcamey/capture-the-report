# 📐 Planteamiento — Equipo 05

## 1. Equipo

- **Número de equipo:** 05
- **Integrantes:** Nadia, Denis, Isra, Daniel, Luis
- **Nombre del prototipo:** **ProdigiES** — el radar de talento de ES Consulting
  _(nombre formal ya decidido por el equipo; antes se trabajó como "SkillRadar")_

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

**Visión — a dónde va:** una **plataforma centralizada de gestión de habilidades y cargabilidad**,
centrada en el talento humano y sus competencias, que mantiene una **matriz de habilidades en tiempo
real** para que Comercial, PM y RRHH decidan sobre el mismo dato en lugar de sobre conocimiento
disperso.

**Qué hace la primera rebanada — lo de hoy:**
Un **buscador de talento interno**. El usuario escribe los requisitos de una licitación en lenguaje
natural — por ejemplo *"pentest web + ISO 27001 + inglés"* — y ProdigiES devuelve las personas que
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

**Beneficios esperados de la plataforma completa:**

| Beneficio | En qué se traduce |
|-----------|-------------------|
| **Agilidad comercial** | Identificación inmediata de expertos para licitaciones y dimensionamiento de requerimientos según el tipo de proyecto. |
| **Optimización operativa** | Análisis en tiempo real de la carga de trabajo del equipo para equilibrar asignaciones y evitar sobrecargas. |
| **Desarrollo estratégico de talento** | Brechas de conocimiento visibles por área, para planificar formación y certificaciones de RRHH. |
| **Asignación eficiente** | Criterios claros para ubicar practicantes y nuevos integrantes donde más se necesitan. |

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
   que la ficha salga en la propuesta. ProdigiES propone; la gente decide.

```
[Requisitos de licitación]
        │
        ▼
[Match contra catálogo de skills] ──▶ [Score: cobertura + nivel + disponibilidad]
        │
        ▼
[Lista de candidatos ordenada] ──▶ [Perfil de persona] ──▶ [Ficha de capacidades imprimible]
```

## 4b. Escenario de referencia — el ciclo completo

Historia que usamos para explicar la plataforma en el pitch. Recorre el ciclo entero: incorporación →
oportunidad comercial → ejecución → decisión estratégica. **De los cuatro pasos, el prototipo de hoy
demuestra el paso 2**; los otros tres quedan como el recorrido al que apunta la plataforma.

1. **Ingreso de un nuevo colaborador.** Marvin Tercero Jr. entra a ES Consulting. En la
   incorporación, RRHH registra sus habilidades, conocimientos y certificaciones y le construye el
   perfil en la plataforma: conocimiento **intermedio en Infoblox**, **certificación de Infoblox** y
   **habilidades de liderazgo**. Queda disponible para consulta.
2. **Identificación de talento para una oportunidad comercial** ← _esto es lo que se demuestra hoy._
   Semanas después, Comercial ve una oportunidad de un proyecto de Infoblox para una municipalidad.
   Filtra colaboradores por solución, conocimiento y certificaciones, y encuentra que Marvin tiene
   nivel intermedio y certificación en Infoblox. Sabe de inmediato a quién acudir para dimensionar la
   solución, validar requerimientos técnicos, cumplir requisitos de certificación y definir el
   alcance técnico de la propuesta.
3. **Adjudicación y asignación.** Un mes después el proyecto se adjudica y PM arma el equipo: elige a
   Marvin por su conocimiento técnico **y** su liderazgo, y suma a Pedrito, con nivel inicial en
   Infoblox, para que gane experiencia en el proyecto. PM deja la asignación registrada en la
   plataforma, y con eso se puede ver la carga de trabajo de los ingenieros.
4. **Análisis de capacidades y planificación.** A fin de mes PM descarga los reportes de habilidades
   y carga de proyectos, y se reúne con Dirección y RRHH para revisar brechas, necesidades de
   capacitación y certificación, disponibilidad y carga, necesidad de nuevo personal, distribución
   entre proyectos y áreas de conocimiento por desarrollar.

> Los nombres del escenario son ilustrativos. El seed de datos del prototipo usa **nombres ficticios**
> (ver §5) — ninguna persona real de ES Consulting entra al repo.

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
  problema. El seed es `data/colaboradores.json`: **36 colaboradores** repartidos en Ingeniería (20),
  CSC (8) y Consulting (8), cada uno con rol, % de disponibilidad, niveles por skill y
  certificaciones con fecha de vencimiento.
  - **Ingeniería:** 18 perfiles **sintéticos provisionales** (`origen: sintetico-pendiente-excel`),
    a la espera de los niveles reales de la matriz de habilidades del equipo. Cuando se carguen, los
    **nombres van anonimizados** y el mapeo real→ficticio se queda en
    `data/mapeo-nombres.local.json`, que está en `.gitignore`.
  - **CSC y Consulting:** sintéticos, con la misma escala y categorías.
  - **Marvin Tercero Jr. y Pedrito:** los dos personajes del escenario del pitch (§4b), con
    atributos fijos. Son los únicos con Infoblox en el seed, para que la demo salga igual siempre.

  **Ningún dato de personas reales de ES Consulting entra al repo.**

### Modelo de datos

Tres entidades, tal como quedaron definidas:

- **Persona** — `id`, `nombre`, `equipo`, `rol`, `disponibilidad` (%), `idiomas`, `certificaciones[]`,
  `origen` (de dónde vienen sus datos)
- **Skill** — `id`, `nombre`, `categoria`. **Tres categorías**, tal como las maneja la matriz de
  habilidades de Ingeniería:
  - `technical` — capacidades propias del oficio (VAPT Web, VAPT OT, Active Directory, Evaluación de
    código, y sus equivalentes de GRC para Consulting y de SOC/DFIR para CSC).
  - `solutions` — producto/fabricante que la persona sabe implementar y operar (Infoblox, Cloudflare
    ZTNA, Darktrace NDR, Checkpoint, SonarQube…).
  - `soft` — Redacción, Comunicación verbal, Presentación a clientes, Liderazgo, Gestión de
    proyectos, Uso adecuado de Slack.
- **PersonaSkill** — `personaId` + `skillId` + `nivel`, en **escala 0–3**:

  | Nivel | Significado |
  |-------|-------------|
  | **0** | No tiene conocimiento _(no se guarda: si el skill no aparece en la persona, es 0)_ |
  | **1** | Básico — trabaja con supervisión |
  | **2** | Intermedio — autónomo |
  | **3** | Avanzado — puede liderar, entrenar y diseñar |

**Punteo por categoría:** la suma de niveles de una persona en cada categoría (`technical`,
`solutions`, `soft`) se calcula en el código, no se guarda en el JSON — así no se desincroniza
cuando cambian los niveles. Sirve como perfil de la persona; **no** como orden de los resultados
(ver nota de score abajo).

### Cómo se ordenan los candidatos (score de match)

El orden se calcula **contra los requisitos buscados**, no sobre el punteo total de la categoría. La
diferencia importa: en el seed hay ingenieros con punteo 10–11 en `solutions` que **no saben Infoblox**
— si ordenáramos por punteo de categoría, saldrían arriba de Marvin (punteo 2) en una búsqueda de
Infoblox, y la demo se cae. El score combina, en este orden de peso:

1. **Cobertura** — cuántos de los requisitos buscados cubre la persona.
2. **Nivel** — qué tan alto (1–3) los cubre.
3. **Certificación vigente** en el requisito — distintivo y desempate.
4. **Disponibilidad** — a igualdad de perfil, gana quien puede tomar el proyecto.

Con eso, buscar *"Infoblox"* devuelve **Marvin primero** (intermedio + certificado) y **Pedrito
visible en segundo** (básico, 90% disponible) — que es justo el ángulo de desarrollo de talento del
escenario.

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
- **Con ProdigiES:** la búsqueda baja a minutos; queda solo la validación humana con el líder.
- **Ahorro:** ~3–4 h por propuesta. Con **4 propuestas al mes**, son **~12–16 h/mes** solo en
  Comercial — sin contar el beneficio menos medible pero más caro: dejar de declinar o subcontratar
  oportunidades por una capacidad que sí existía adentro.
