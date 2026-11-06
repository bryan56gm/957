# 957 Gastrobar · Demo PWA

Prototipo de demostración de la app del 957 Gastrobar (Carrer Major 33, Esterri d'Àneu) para sus clientes:
- pedir para llevar con hora de recogida;
- apuntarse a la lista de espera con aviso al móvil;
- pedir desde la mesa con el QR y dividir la cuenta;
- seguir el pedido en directo y repetir pedidos anteriores.

La carta incluye pizzas con base clásica o de trigo sarraceno (fajol), tapas, ensaladas, brasa, pasta solo a mediodía, postres y bebidas, con alérgenos, en catalán, castellano, inglés y francés. La app tiene modo oscuro y claro. No hay backend: pagos y avisos son simulados.

Stack: React 18 + Vite 5. PWA con `manifest.webmanifest` y `sw.js` propios, sin plugins. Misma base que `sherry-demo`.

## Arrancar en local

```powershell
cd C:\Users\bryan\Desktop\WorkBoard\957-demo
npm install
npm run dev
```

Abre la URL `Network` que muestra Vite desde el móvil (misma wifi). El service worker solo se registra en el build de producción.

## Subir a GitHub y Vercel

```powershell
git init
git add .
git commit -m "957 Gastrobar demo PWA"
gh repo create 957-demo --private --source=. --push
```

En vercel.com → Add New → Project → importa `957-demo` (framework Vite, build `npm run build`, output `dist`). Cada push a `main` se despliega solo. Con la CLI: `vercel --prod`.

## Instalar como app

- Android (Chrome): botón de instalar de la bienvenida, o menú ⋮ → Instalar app.
- iPhone (Safari): Compartir → Añadir a pantalla de inicio.

Tras cada despliegue, sube `CACHE_NAME` en `public/sw.js`.

## Guion para la reunión (5 minutos)

1. **Bienvenida**: cambiar a FR o EN delante de ellos; toda la app y la carta cambian de idioma. Volver a CA.
2. **Per emportar** → abrir la **Rut** → base de **fajol** (+2 €) → un extra → Afegir. Sale la sugerencia de tapas: añadir croquetes de ceps.
3. Cesta → elegir franja (las llenas salen tachadas) → Pagar amb el mòbil.
4. Seguimiento: Rebuda → Al forn → **aviso «La teva comanda és llesta»** (unos 13 s).
5. Inicio → **Llista d'espera** → apuntarse → el número baja solo → aviso «La vostra taula és a punt» (~25 s) → «Hi anem!».
6. Botón central **Taula** → el escáner encuentra la taula 9 → pedir → «Enviar a la cuina» → «Veure el compte» → dividir entre 3 → pagar.
7. Inicio → banner **sense gluten** → la carta muestra todas las pizzas con base de fajol. Enseñar la **pasta, només al migdia** y las **croquetes de rostit esgotades avui** (lo que haría el panel de la casa).

Recargar la página deja la demo como nueva. El reloj de la demo siempre empieza un sábado a las 20:52, aunque la reunión sea por la mañana.

## Estructura

```
src/
  components/   pantallas, hojas inferiores y piezas de UI
  hooks/        idioma, tema, cesta, pedidos simulados, lista de espera, avisos, instalación PWA
  lib/          reloj de la demo y franjas de recogida, precios
  data/         pizzas, carta, textos en 4 idiomas, fotos, datos del local
  styles/       theme (paleta), layout, menu, sheets, overlays, splash
public/         manifest, service worker, iconos y logos
brand/          logo y foto de la fachada
```
