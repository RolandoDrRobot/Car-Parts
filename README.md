# 🚗 CarParts - MVP de Identificación de Repuestos con IA

Una aplicación React que permite identificar repuestos de vehículos usando inteligencia artificial.

## 🎯 Funcionalidades

### Pantalla 1: Búsqueda por Placa
- Ingreso de placa del vehículo
- Validación y búsqueda en base de datos simulada
- Placas de prueba incluidas para demo

### Pantalla 2: Información del Vehículo
- Muestra datos completos del vehículo encontrado
- Información del propietario
- Confirmación antes de continuar

### Pantalla 3: Análisis con IA
- Subida de foto de la parte del vehículo
- Análisis simulado con IA
- Identificación del repuesto
- Verificación de stock en base de datos
- Recomendaciones automáticas

## 🚀 Instalación y Uso

1. **Instalar dependencias:**
```bash
npm install
```

2. **Ejecutar la aplicación:**
```bash
npm start
```

3. **Abrir en el navegador:**
```
http://localhost:3000
```

## 🧪 Datos de Prueba

### Placas Disponibles:
- **ABC123** - Toyota Corolla 2020
- **XYZ789** - Honda Civic 2019  
- **DEF456** - Ford Focus 2021

### Repuestos Simulados:
- Filtro de Aceite
- Pastillas de Freno
- Batería 12V
- Filtro de Aire
- Aceite Motor

## 🛠️ Tecnologías Utilizadas

- **React 18** - Framework principal
- **React Router** - Navegación entre pantallas
- **CSS3** - Estilos modernos y responsivos
- **JavaScript ES6+** - Lógica de la aplicación

## 📱 Características del Diseño

- **Responsive Design** - Adaptable a móviles y desktop
- **UI Moderna** - Gradientes y animaciones suaves
- **UX Intuitiva** - Flujo claro y fácil de usar
- **Feedback Visual** - Estados de carga y confirmaciones

## 🔮 Simulaciones Incluidas

- **API de Vehículos** - Búsqueda por placa
- **Base de Datos de Repuestos** - Stock y precios
- **IA de Identificación** - Análisis de imágenes
- **Sistema de Recomendaciones** - Sugerencias automáticas

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── LicensePlateScreen.js    # Pantalla de búsqueda
│   ├── CarInfoScreen.js         # Información del vehículo
│   └── PhotoUploadScreen.js     # Análisis con IA
├── data/
│   └── fakeData.js              # Datos simulados
├── App.js                       # Componente principal
├── index.js                     # Punto de entrada
└── index.css                    # Estilos globales
```

## 🎨 Personalización

El diseño es completamente personalizable a través del archivo `src/index.css`. Los colores principales son:
- **Primario:** #667eea (Azul)
- **Secundario:** #764ba2 (Púrpura)
- **Éxito:** #28a745 (Verde)
- **Error:** #dc3545 (Rojo)

## 🚀 Próximos Pasos

Para convertir esto en una aplicación real, necesitarías:
1. Integrar APIs reales de vehículos
2. Implementar IA real para análisis de imágenes
3. Conectar con base de datos real de repuestos
4. Agregar autenticación de usuarios
5. Implementar sistema de pagos
6. Agregar notificaciones push

---

**Desarrollado como MVP para demostración de concepto** 🚗✨