# Laboratorio Interactivo de Herramientas TIC

Plataforma educativa y pedagógica con simuladores táctiles de almacenamiento en la nube (Google Drive / OneDrive), explorador de celular, escáner de cuaderno a PDF, automatización de fórmulas en hojas de cálculo y entrenamiento contra ciberamenazas en WhatsApp. Diseñada con un enfoque **mobile-first** para clases sin computadoras de escritorio.

## 🚀 Despliegue en GitHub Pages

Este proyecto ya cuenta con la configuración optimizada para GitHub Pages (rutas relativas `base: './'` y flujo automatizado con GitHub Actions en `.github/workflows/deploy.yml`).

### Pasos para publicar en tu repositorio de GitHub:

1. **Subir los archivos a tu repositorio en GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Laboratorio interactivo de Herramientas TIC"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/TU-REPOSITORIO.git
   git push -u origin main
   ```

2. **Activar GitHub Pages con GitHub Actions:**
   - En tu repositorio de GitHub, haz clic en la pestaña **Settings** (Configuración).
   - En el menú lateral izquierdo, selecciona **Pages**.
   - En la sección **Build and deployment** > **Source**, selecciona:
     👉 **GitHub Actions**.
   - ¡Listo! En cuanto hagas push a la rama `main`, la acción compilará y publicará tu web en la URL:
     `https://TU-USUARIO.github.io/TU-REPOSITORIO/`

---

## 🛠️ Tecnologías Utilizadas
- **React 19 + TypeScript + Vite 8**
- **Tailwind CSS v4**
- **Lucide Icons**
- **Canvas Confetti**
