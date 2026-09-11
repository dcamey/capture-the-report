# 🎤 Guía de pitch y demo — Equipo 05 · ProdigiES

## El pitch (2:45 PM — máximo 2 minutos, un representante)

### 1. El dolor (30 seg)

> **"¿Quién de la casa sabe hacer esto?"** Cada vez que entra una licitación, Comercial tiene que
> preguntarle a los líderes de CSC, Ingeniería y Consulting quién califica — y esperar. Son **3 a 5
> horas de trabajo repartidas en uno o dos días**, y el tiempo no se va buscando: se va **esperando
> respuestas**. Lo peor: la respuesta depende de a quién le preguntaste. Se propone a quien alguien
> recordó, no a quien mejor califica — y a veces se subcontrata o se declina una oportunidad por una
> capacidad que **sí existía adentro** y nadie tenía visible.

### 2. La solución (30 seg)

> Construimos **ProdigiES**: le escribes el requisito de la licitación — *"Infoblox"*, *"VAPT Web +
> inglés"* — y te devuelve **quién califica, ordenado por mejor match**, con su nivel en cada skill
> (0 a 3), sus certificaciones y su **% de disponibilidad**. De ahí sale la **ficha de capacidades
> imprimible** para adjuntar a la propuesta.

### 3. El flujo (30 seg)

> 1. Escribes el requisito de la licitación.
> 2. ProdigiES cruza el catálogo de habilidades — **técnicas, soluciones y blandas** — y ordena a
>    las personas por nivel, certificación y disponibilidad.
> 3. Generas la ficha del candidato para la propuesta.

### 4. La promesa de demo (30 seg)

> A las 6 nos van a ver **escribir "Infoblox" y encontrar en segundos a la persona certificada,
> disponible al 50%, y al practicante que puede acompañarla** — con la ficha lista para la propuesta.

---

## La demo (6:00 PM — máximo 5 minutos)

**Guión de 4 actos.** No es un recorrido de features: es la historia de una oportunidad real,
de punta a punta. Un solo hilo — Infoblox para una municipalidad.

### Acto 1 · Entra un colaborador nuevo (30 seg)

**Pantalla:** ficha de **Marvin Tercero Jr.**

> "Marvin entra a ES Consulting. En su incorporación, RRHH registra lo que trae: **Infoblox
> intermedio**, su **certificación de Infoblox** y **liderazgo avanzado**. A partir de ese momento la
> organización *sabe* que Marvin existe."

⚠️ Hoy los perfiles son de solo lectura: **no hay formulario de alta**. Dilo así — "el registro lo
hace RRHH; hoy les muestro el perfil ya cargado" — y no prometas la pantalla de captura.

### Acto 2 · La oportunidad comercial (60 seg) ← *el corazón de la demo*

**Pantalla:** buscador → escribir `Infoblox` → resultados.

> "Semanas después, Comercial ve una oportunidad: un proyecto de **Infoblox para una municipalidad**.
> Antes, esto eran correos a tres líderes y un día de espera. Ahora —" *(escribes Infoblox)* "—
> **Marvin, primer resultado**: nivel intermedio, certificado, 50% disponible."

Luego generas la **ficha de capacidades** y remátalo:

> "Esta ficha se adjunta a la propuesta. Comercial ya sabe a quién buscar para dimensionar la
> solución, validar requerimientos y cubrir el requisito de certificación."

### Acto 3 · PM arma el equipo (45 seg)

**Pantalla:** el perfil de Marvin, y de vuelta a los resultados para señalar a **Pedrito**.

> "Un mes después el proyecto se adjudica. PM entra, confirma que Marvin sigue al 50% y lo toma —
> no solo por Infoblox, también por su **liderazgo**. Y mira lo que ve abajo: **Pedrito, nivel
> básico, 90% disponible**. PM lo suma al proyecto **para que desarrolle experiencia**."

Ese es el ángulo que nadie más va a mostrar: el buscador no solo encuentra al experto, **también
encuentra a quién hay que hacer crecer**.

### Acto 4 · Cierre: la decisión estratégica (45 seg)

Sin construirlo — se cuenta, no se muestra:

> "A fin de mes, PM y RRHH usarían esta misma base para ver **brechas de conocimiento**: qué skills
> tiene un solo experto, qué certificaciones vencen, dónde ubicar a los practicantes. Eso no está
> hoy, pero sale del mismo dato que ya están viendo."

**Frase de cierre — con esta se termina, sin agregar nada después:**

> ### "Pasamos de conocimiento disperso a gestión integral de talento, capacidades y recursos."

---

### Notas de honestidad para la demo

Si un árbitro pregunta, esto es lo que se responde sin titubear:

- **Los datos son de demo.** Ninguna persona real aparece con sus datos. Los 18 perfiles de
  Ingeniería son sintéticos provisionales, en espera de los niveles reales de la matriz de
  habilidades; cuando entren, los nombres van anonimizados y el mapeo se queda fuera del repo.
- **La escala 0–3 sí es la lógica real** de la matriz de Ingeniería: 0 no tiene, 1 básico con
  supervisión, 2 intermedio autónomo, 3 avanzado — puede liderar, entrenar y diseñar.
- **ProdigiES propone; la gente decide.** El líder del equipo confirma la disponibilidad real y
  Comercial valida el perfil antes de que la ficha salga en la propuesta.

### Checklist antes de la demo

- [ ] `npm run dev` corre desde cero en la rama (pruébenlo).
- [ ] Buscar `Infoblox` devuelve a Marvin primero y a Pedrito visible abajo — **ensáyenlo tal cual**.
- [ ] `docs/PLANTEAMIENTO.md` está completo y committeado (faltan integrantes y reparto).
- [ ] `README-EQUIPO.md` existe: qué hace, cómo correrlo, qué quedó pendiente.
- [ ] Último push hecho ANTES de las 6:00 PM (code freeze).
- [ ] 🌐 ¿Les dio tiempo de desplegarlo en línea? Puntos extra — avisen a los árbitros con el link.
