# 957 Gastrobar demo — contexto para seguir trabajando

Demo comercial de asolux para el 957 Gastrobar (Carrer Major 33, Esterri d'Àneu; Instagram @957.gastrobar). Se enseña en el móvil de Bryan en la reunión; no es producción. Es el proyecto 1 de la propuesta: solo la app del cliente. La pantalla de cocina, el panel de la casa y la gestión quedan para después.

## Qué es
- PWA en React 18 + Vite 5, sin backend ni librerías extra. Base copiada de `../sherry-demo`.
- Sin login: la bienvenida pregunta cómo quiere pedir el cliente (per emportar, llista d'espera, a la taula o solo mirar la carta).
- Flujos:
  - Per emportar: franja de recogida, pago simulado, seguimiento y aviso.
  - Llista d'espera: el local no acepta reservas, así que no se ofrece reserva.
  - Pedir desde la mesa con QR (taula 9), rondas y cuenta dividida.
  - Comandes anteriors con «tornar a demanar».
  - Perfil: idioma, tema, al·lèrgies, avisos.
- Pizzas (`data/pizzas.js`):
  - Base clàssica o de fajol (+2 €), extras, treure ingredients, nota.
  - Etiquetas veggie/vegana/carn/picant.
- Resto de la carta (`data/menu.js`):
  - Brasa con punt de la carn.
  - Pasta `lunchOnly` (solo 13–16 h, `lib/clock.js`).
  - Croquetes de rostit `soldOut`.
- Con el alérgeno gluten activo, las pizzas siguen visibles con aviso de base de fajol.
- Simulaciones: `useOrders` (cocina acelerada), `useWaitlist`, `usePush`. Reloj fijo en sábado 20:52 (`data/venue.js`, `lib/clock.js`).
- Idiomas: interfaz en `data/i18n.js` + `data/i18n-venue.js` (textos propios del 957, se aplican encima); carta en `pizzas.js` y `menu.js`.

## Datos a confirmar con el local
- Carta reconstruida a partir de reseñas, fotos de clientes y Google:
  - precios orientativos;
  - ingredientes con `confirmed: false` sin verificar.
  - Sustituir por la carta real en cuanto se tenga una foto.
- Horario en `week` de `data/venue.js` (lunes y martes cerrado, miércoles y jueves solo noche, viernes a domingo mediodía y noche, 13:00–23:00). Confirmar; varía por temporada y lo publican cada mes en Instagram.
- Fotos de Unsplash (licencia libre), comprobadas a mano, en `data/media.js`. Para la versión final, fotos propias del local.
- Logo recreado a partir de la foto de la fachada (`brand/957-logo.png`): óvalo gris con borde blanco y «957». Pedir el original.

## Reglas
- Código, nombres de archivos, variables y componentes en inglés; textos que ve el usuario en los 4 idiomas.
- Máximo 500 líneas por archivo. Reutilizar antes de duplicar. Capas: `components/`, `hooks/`, `lib/`, `data/`, `styles/`.
- Paleta (la misma de la presentación), sacada de su Instagram:
  - Fondos: negro #161413 y papel #F4F1EC.
  - Rojo: #E2565A → #C9373C → #9E2328; texto rojo #EC6A6D en oscuro, #A3232A en claro.
  - Gris del óvalo del logo: #4A4541.
  - Tipografías: Antonio (titulares, en mayúsculas) + DM Sans.
- Es una maqueta: no conectar a ningún sistema real ni añadir pagos reales.
- Nunca textos que critiquen cómo trabaja el local.

## Ideas si hay que ampliar la demo
- Pantalla de cocina que reciba estas comandas en directo, en catalán.
- Panel de la casa: esgotats, horari, franges i preus.

## Despliegue
GitHub + Vercel (ver README). Tras cada despliegue, subir `CACHE_NAME` en `public/sw.js`.
