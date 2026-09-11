# 👤 Guía para líderes de equipo

Eres el punto de contacto de tu equipo. Esta guía tiene tres partes: lo que haces **hoy** (antes del evento), cómo **configurar Claude Code** el día del evento, y tu **rol durante el día**.

---

## ✅ Checklist de HOY (antes del evento)

Toma 10 minutos. Si algo falla, avisa a Tomás o Mei **hoy** — no mañana a la 1:00 PM.

- [ ] **Acepta la invitación al repo** (llega por correo de GitHub).
- [ ] **Clona el repo:**
  ```bash
  git clone https://github.com/estrategiayseguridad/capture-the-report.git
  cd capture-the-report
  ```
- [ ] **Instala dependencias:** `npm install`
- [ ] **Corre el proyecto:** `npm run dev` → abre http://localhost:3000 y verifica que se vea la **página de bienvenida**.
- [ ] **Instala Claude Code:**
  ```bash
  npm install -g @anthropic-ai/claude-code
  ```
  (o usa el instalador nativo si prefieres)
- [ ] **Verifica que quedó bien:** `claude --version` debe imprimir un número de versión.
- [ ] **Lee el [README](../README.md) y el [PLANTEAMIENTO](PLANTEAMIENTO.md)** para llegar con el flujo del día claro.

---

## 🔑 Configurar Claude Code para el evento

El día del evento los organizadores comparten un **token en el canal del evento**. Con ese token, cada integrante que vaya a usar el agente pega este bloque en su terminal **ANTES de correr `claude`**:

```bash
export CLAUDE_CODE_USE_BEDROCK=1
export AWS_REGION=us-east-1
export AWS_BEARER_TOKEN_BEDROCK=<TOKEN_DEL_EVENTO>
export ANTHROPIC_MODEL='us.anthropic.claude-opus-5'
export ANTHROPIC_SMALL_FAST_MODEL='us.anthropic.claude-haiku-4-5-20251001-v1:0'
```

Reemplaza `<TOKEN_DEL_EVENTO>` por el token que compartan en el canal. Luego arranca el agente:

```bash
claude
```

**Verifica que quedó bien:** dentro de `claude`, escribe `/status`. Debe decir **Bedrock**. Si no lo dice, cierra el agente, vuelve a pegar el bloque en esa misma terminal y entra de nuevo.

> 💡 **Tranquilo:** esas variables solo viven en **esa terminal**. Si ya usas Claude Code con tu cuenta personal, tus otras pestañas siguen igual — nada se toca ni se pierde.

---

## 🏁 Durante el evento — tu rol

- **Apenas inicie:** crea la rama del equipo y súbela.
  ```bash
  git checkout -b equipo-XX
  git push -u origin equipo-XX
  ```
  Nadie trabaja en `main`.
- **Antes de las 3:15 PM:** que `docs/PLANTEAMIENTO.md` esté **completo y committeado**. Se evalúa con el **timestamp de git** — un commit a las 3:16 no cuenta. Es el criterio que más pesa (35%).
- **Commits frecuentes.** Si no está pusheado en la rama al code freeze, no existe.
- **Code freeze 6:00 PM.** Último push antes de esa hora. Planea cerrar a las 5:45 para no correr.
- **Designa quién presenta:** una persona para el **pitch** (2:45 PM, 2 minutos) y una para la **demo** (6:00 PM, 5 minutos). Pueden ser distintas — repartan el protagonismo.

---

## 🤖 Tips con el agente

- **Primer prompt: pégale el `PLANTEAMIENTO.md` completo.** Literal, todo el documento. El agente trabaja muchísimo mejor con el contexto del problema que con "hazme una web de reportes".
- **Pide el camino feliz primero.** "Que entre el CSV de `data/` y salga el reporte en pantalla, aunque se vea feo." Lo bonito viene después.
- **Itera en pasos pequeños.** Un cambio, lo pruebas en el navegador, commit. Pedirle cinco cosas a la vez es la forma más rápida de enredarse.
- **Si algo se traba:** pídele que te explique qué está pasando antes de pedirle que lo arregle. Y si siguen atorados 15 minutos, llamen a un árbitro — destrabar a otro equipo da puntos, así que alguien los ayudará.

---

¿Dudas? Tomás o Mei. 🏁
