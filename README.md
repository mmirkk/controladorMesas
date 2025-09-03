# 🗳️ Controlador de Mesas Electorales - Zárate

Aplicación web para el control y seguimiento del recuento de votos durante las elecciones en Zárate. Permite gestionar el estado de las mesas electorales, agregar observaciones y exportar reportes.

## 🚀 Características

- **Gestión de Estados**: Marca las mesas como Pendientes, Controladas o Con Errores
- **Observaciones**: Agrega notas y comentarios para cada mesa
- **Búsqueda y Filtros**: Encuentra mesas por establecimiento o número
- **Estadísticas en Tiempo Real**: Visualiza el progreso del recuento
- **Exportación**: Descarga reportes en formato CSV
- **Persistencia Local**: Los datos se guardan automáticamente en el navegador
- **Interfaz Responsive**: Funciona en dispositivos móviles y desktop

## 📋 Uso

### Estados de las Mesas

- **🟡 Pendiente**: Mesa sin procesar (estado inicial)
- **🟢 Controlada**: Mesa verificada y aprobada
- **🔴 Con Error**: Mesa con inconsistencias que requieren revisión

### Funcionalidades Principales

1. **Cambiar Estado**: Usa los botones de acción para actualizar el estado de cada mesa
2. **Agregar Observaciones**: Haz clic en "📝 Observaciones" para añadir notas
3. **Buscar**: Utiliza el campo de búsqueda para encontrar mesas específicas
4. **Filtrar**: Selecciona un estado para ver solo esas mesas
5. **Exportar**: Descarga un reporte completo en CSV

### Panel de Estadísticas

El panel superior muestra:
- Total de mesas
- Mesas controladas
- Mesas pendientes
- Mesas con errores

## 🛠️ Instalación

1. Descarga todos los archivos del proyecto
2. Abre `index.html` en cualquier navegador web moderno
3. ¡Listo para usar!

## 📁 Estructura del Proyecto

```
proyecto/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # Lógica JavaScript
└── README.md           # Documentación
```

## 💾 Almacenamiento de Datos

- Los datos se guardan automáticamente en el navegador (localStorage)
- No se requiere conexión a internet después de la carga inicial
- Los datos persisten entre sesiones del navegador
- Para hacer backup, usa la función de exportar

## 📱 Compatibilidad

- ✅ Chrome, Firefox, Safari, Edge (versiones modernas)
- ✅ Dispositivos móviles (responsive design)
- ✅ Funciona sin conexión a internet

## 🔧 Personalización

Para agregar más mesas o modificar los datos:

1. Edita el array `mesasData` en `script.js`
2. Sigue el formato existente:
   ```javascript
   {
       "Establecimiento": "Nombre del establecimiento",
       "Mesa": "Número de mesa",
       "Telefono": "Número de teléfono"
   }
   ```

## 📊 Exportación de Datos

El archivo CSV exportado incluye:
- Número de mesa
- Establecimiento
- Teléfono
- Estado actual
- Observaciones
- Fecha de última actualización

## 🆘 Resolución de Problemas

**Los datos se perdieron:**
- Los datos se guardan en el navegador. Si se limpia el cache, se pueden perder
- Usa la función de exportar regularmente para hacer backup

**La aplicación no funciona:**
- Verifica que JavaScript esté habilitado en el navegador
- Usa un navegador moderno y actualizado

**Problemas de visualización:**
- Limpia el cache del navegador
- Verifica que todos los archivos estén en la misma carpeta

## 👤 Desarrollado Para

Data Analyst - Recuento Electoral Zárate

---

**Nota**: Esta aplicación está diseñada específicamente para el proceso electoral de Zárate. Los datos se basan en el archivo CSV proporcionado con la información de las mesas electorales.
