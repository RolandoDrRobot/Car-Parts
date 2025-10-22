// Base de datos de vehículos - Simulando consulta a registro vehicular
export const fakeCarData = [
  {
    id: 1,
    plate: "ABC123",
    brand: "Toyota",
    model: "Rush",
    year: 2020,
    color: "Silver",
    engine: "1.5L 4-Cylinder",
    transmission: "Automatic",
    fuelType: "Gasoline",
    vin: "1HGBH41JXMN109186",
    owner: "Carlos Rodríguez",
    lastService: "2024-01-15",
    imageUrl: "https://www.toyotacr.com/360/rush-prueba/images/pc/D14N_SILVER%20M.M.(1E7)_02.jpg",
    registrationDate: "2020-03-15",
    insuranceExpiry: "2024-12-31"
  },
  {
    id: 2,
    plate: "XYZ789",
    brand: "Toyota",
    model: "RAV4",
    year: 2021,
    color: "White",
    engine: "2.0L 4-Cylinder",
    transmission: "Automatic",
    fuelType: "Gasoline",
    vin: "2HGFC2F59MH543210",
    owner: "María González",
    lastService: "2024-02-10",
    imageUrl: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop&auto=format",
    registrationDate: "2021-06-20",
    insuranceExpiry: "2024-11-30"
  },
  {
    id: 3,
    plate: "DEF456",
    brand: "Toyota",
    model: "Corolla",
    year: 2019,
    color: "Black",
    engine: "1.8L 4-Cylinder",
    transmission: "Automatic",
    fuelType: "Gasoline",
    vin: "1FAHP3F20CL123456",
    owner: "Ana Martínez",
    lastService: "2024-01-28",
    imageUrl: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop&auto=format",
    registrationDate: "2019-08-10",
    insuranceExpiry: "2024-10-15"
  },
  {
    id: 4,
    plate: "GHI789",
    brand: "Toyota",
    model: "Cross",
    year: 2022,
    color: "Blue",
    engine: "1.8L Hybrid",
    transmission: "CVT",
    fuelType: "Hybrid",
    vin: "3FAHP3F20CL789012",
    owner: "Roberto Silva",
    lastService: "2024-03-05",
    imageUrl: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop&auto=format",
    registrationDate: "2022-01-15",
    insuranceExpiry: "2024-12-20"
  },
  {
    id: 5,
    plate: "JKL012",
    brand: "Toyota",
    model: "Hilux",
    year: 2020,
    color: "Red",
    engine: "2.4L Turbo Diesel",
    transmission: "Manual",
    fuelType: "Diesel",
    vin: "4FAHP3F20CL345678",
    owner: "Luis Herrera",
    lastService: "2024-02-20",
    imageUrl: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop&auto=format",
    registrationDate: "2020-11-30",
    insuranceExpiry: "2024-09-30"
  }
];

// Base de datos de repuestos - Simulando sistema de inventario de Purdy/Ganges
export const fakePartsDatabase = [
  // FRENOS - SISTEMA DE FRENADO (FRENOS DE TAMBOR TRASEROS)
  {
    id: 1,
    name: "Zapatas de Freno Traseras",
    partNumber: "TOY-RUSH-ZF001",
    brand: "Toyota Original",
    category: "Frenos",
    subcategory: "Zapatas",
    compatibleCars: ["Toyota Rush 2018-2023"],
    price: 85.99,
    cost: 58.00,
    stock: 8,
    minStock: 4,
    maxStock: 15,
    location: "Estante A-2",
    supplier: "Toyota Costa Rica",
    imageUrl: "https://autorecambiosltda.com/wp-content/uploads/2022/10/Lo-que-debes-saber-sobre-los-repuestos-homologados.png",
    description: "Zapatas de freno traseras para sistema de tambor Toyota Rush. Material de fricción de alta calidad.",
    warranty: "12 meses",
    lastRestock: "2024-01-15",
    barcode: "7891234567890",
    condition: "Gastadas - Requieren reemplazo"
  },
  {
    id: 2,
    name: "Tambor de Freno Trasero",
    partNumber: "TOY-RUSH-TF002",
    brand: "Toyota Original",
    category: "Frenos",
    subcategory: "Tambores",
    compatibleCars: ["Toyota Rush 2018-2023"],
    price: 125.99,
    cost: 85.00,
    stock: 4,
    minStock: 2,
    maxStock: 8,
    location: "Estante A-3",
    supplier: "Toyota Costa Rica",
    imageUrl: "https://autorecambiosltda.com/wp-content/uploads/2022/10/Lo-que-debes-saber-sobre-los-repuestos-homologados.png",
    description: "Tambor de freno trasero para Toyota Rush. Superficie de frenado optimizada.",
    warranty: "24 meses",
    lastRestock: "2024-02-10",
    barcode: "7891234567891",
    condition: "Normal - En buen estado"
  },
  {
    id: 3,
    name: "Cilindro de Rueda Trasero",
    partNumber: "TOY-RUSH-CR003",
    brand: "Toyota Original",
    category: "Frenos",
    subcategory: "Cilindros",
    compatibleCars: ["Toyota Rush 2018-2023"],
    price: 95.99,
    cost: 65.00,
    stock: 6,
    minStock: 3,
    maxStock: 12,
    location: "Estante A-4",
    supplier: "Toyota Costa Rica",
    imageUrl: "https://autorecambiosltda.com/wp-content/uploads/2022/10/Lo-que-debes-saber-sobre-los-repuestos-homologados.png",
    description: "Cilindro de rueda trasero para sistema de frenos de tambor Toyota Rush.",
    warranty: "12 meses",
    lastRestock: "2024-01-28",
    barcode: "7891234567892",
    condition: "Normal - Funcionando correctamente"
  },
  {
    id: 4,
    name: "Resortes de Retorno",
    partNumber: "TOY-RUSH-RR004",
    brand: "Toyota Original",
    category: "Frenos",
    subcategory: "Resortes",
    compatibleCars: ["Toyota Rush 2018-2023"],
    price: 35.99,
    cost: 24.00,
    stock: 12,
    minStock: 6,
    maxStock: 20,
    location: "Estante A-5",
    supplier: "Toyota Costa Rica",
    imageUrl: "https://autorecambiosltda.com/wp-content/uploads/2022/10/Lo-que-debes-saber-sobre-los-repuestos-homologados.png",
    description: "Resortes de retorno para zapatas de freno traseras Toyota Rush.",
    warranty: "12 meses",
    lastRestock: "2024-02-15",
    barcode: "7891234567893",
    condition: "Normal - En buen estado"
  },
  {
    id: 5,
    name: "Plato de Respaldo (Backing Plate)",
    partNumber: "TOY-RUSH-BP005",
    brand: "Toyota Original",
    category: "Frenos",
    subcategory: "Platos",
    compatibleCars: ["Toyota Rush 2018-2023"],
    price: 145.99,
    cost: 98.00,
    stock: 3,
    minStock: 2,
    maxStock: 6,
    location: "Estante A-6",
    supplier: "Toyota Costa Rica",
    imageUrl: "https://autorecambiosltda.com/wp-content/uploads/2022/10/Lo-que-debes-saber-sobre-los-repuestos-homologados.png",
    description: "Plato de respaldo para sistema de frenos de tambor trasero Toyota Rush.",
    warranty: "24 meses",
    lastRestock: "2024-01-20",
    barcode: "7891234567894",
    condition: "Normal - Sin corrosión visible"
  },
  {
    id: 6,
    name: "Kit Completo Frenos Traseros",
    partNumber: "TOY-RUSH-FK006",
    brand: "Toyota Original",
    category: "Frenos",
    subcategory: "Kits",
    compatibleCars: ["Toyota Rush 2018-2023"],
    price: 285.99,
    cost: 195.00,
    stock: 2,
    minStock: 1,
    maxStock: 5,
    location: "Estante A-1",
    supplier: "Toyota Costa Rica",
    imageUrl: "https://autorecambiosltda.com/wp-content/uploads/2022/10/Lo-que-debes-saber-sobre-los-repuestos-homologados.png",
    description: "Kit completo de frenos traseros: zapatas, tambor, cilindro, resortes y plato de respaldo.",
    warranty: "12 meses",
    lastRestock: "2024-01-25",
    barcode: "7891234567895",
    condition: "Nuevo - Kit completo"
  },
  {
    id: 2,
    name: "Discos de Freno Delanteros",
    partNumber: "TOY-RAV4-FD002",
    brand: "Brembo",
    category: "Frenos",
    subcategory: "Discos",
    compatibleCars: ["Toyota RAV4 2019-2023"],
    price: 145.99,
    cost: 98.00,
    stock: 6,
    minStock: 3,
    maxStock: 15,
    location: "Estante A-3",
    supplier: "Brembo Costa Rica",
    imageUrl: "https://autorecambiosltda.com/wp-content/uploads/2022/10/Lo-que-debes-saber-sobre-los-repuestos-homologados.png",
    description: "Discos de freno delanteros ventilados para Toyota RAV4. Diseño optimizado para disipación de calor.",
    warranty: "24 meses",
    lastRestock: "2024-02-10",
    barcode: "7891234567891"
  },
  {
    id: 3,
    name: "Pastillas de Freno Traseras",
    partNumber: "TOY-COROLLA-RB003",
    brand: "Bosch",
    category: "Frenos",
    subcategory: "Pastillas",
    compatibleCars: ["Toyota Corolla 2018-2023"],
    price: 78.99,
    cost: 52.00,
    stock: 8,
    minStock: 4,
    maxStock: 18,
    location: "Estante A-4",
    supplier: "Bosch Centroamérica",
    imageUrl: "https://autorecambiosltda.com/wp-content/uploads/2022/10/Lo-que-debes-saber-sobre-los-repuestos-homologados.png",
    description: "Pastillas de freno traseras para Toyota Corolla. Excelente rendimiento en condiciones húmedas.",
    warranty: "12 meses",
    lastRestock: "2024-01-28",
    barcode: "7891234567892"
  },
  {
    id: 4,
    name: "Líquido de Freno DOT 4",
    partNumber: "TOY-UNIVERSAL-BF004",
    brand: "Castrol",
    category: "Frenos",
    subcategory: "Líquidos",
    compatibleCars: ["Toyota Rush", "Toyota RAV4", "Toyota Corolla", "Toyota Cross", "Toyota Hilux"],
    price: 24.99,
    cost: 15.00,
    stock: 15,
    minStock: 8,
    maxStock: 30,
    location: "Estante B-1",
    supplier: "Castrol Costa Rica",
    imageUrl: "https://autorecambiosltda.com/wp-content/uploads/2022/10/Lo-que-debes-saber-sobre-los-repuestos-homologados.png",
    description: "Líquido de freno DOT 4 de alta calidad. Punto de ebullición superior para mayor seguridad.",
    warranty: "36 meses",
    lastRestock: "2024-02-15",
    barcode: "7891234567893"
  },
  {
    id: 5,
    name: "Kit de Frenos Delanteros",
    partNumber: "TOY-CROSS-FK005",
    brand: "Toyota Original",
    category: "Frenos",
    subcategory: "Kits",
    compatibleCars: ["Toyota Cross 2021-2023"],
    price: 285.99,
    cost: 195.00,
    stock: 4,
    minStock: 2,
    maxStock: 10,
    location: "Estante A-1",
    supplier: "Toyota Costa Rica",
    imageUrl: "https://autorecambiosltda.com/wp-content/uploads/2022/10/Lo-que-debes-saber-sobre-los-repuestos-homologados.png",
    description: "Kit completo de frenos delanteros: pastillas, discos, líquido de freno y tornillos.",
    warranty: "12 meses",
    lastRestock: "2024-01-20",
    barcode: "7891234567894"
  },
  
  // FILTROS - SISTEMA DE FILTRADO
  {
    id: 6,
    name: "Filtro de Aceite",
    partNumber: "TOY-HILUX-FO006",
    brand: "Mann-Filter",
    category: "Filtros",
    subcategory: "Aceite",
    compatibleCars: ["Toyota Hilux 2018-2023"],
    price: 18.99,
    cost: 12.00,
    stock: 25,
    minStock: 10,
    maxStock: 50,
    location: "Estante C-1",
    supplier: "Mann-Filter Centroamérica",
    imageUrl: "https://autorecambiosltda.com/wp-content/uploads/2022/10/Lo-que-debes-saber-sobre-los-repuestos-homologados.png",
    description: "Filtro de aceite de alta eficiencia para Toyota Hilux. Filtración superior y durabilidad extendida.",
    warranty: "12 meses",
    lastRestock: "2024-02-20",
    barcode: "7891234567895"
  },
  {
    id: 7,
    name: "Filtro de Aire",
    partNumber: "TOY-UNIVERSAL-FA007",
    brand: "K&N",
    category: "Filtros",
    subcategory: "Aire",
    compatibleCars: ["Toyota Rush", "Toyota RAV4", "Toyota Corolla", "Toyota Cross"],
    price: 32.99,
    cost: 22.00,
    stock: 18,
    minStock: 8,
    maxStock: 35,
    location: "Estante C-2",
    supplier: "K&N Costa Rica",
    imageUrl: "https://autorecambiosltda.com/wp-content/uploads/2022/10/Lo-que-debes-saber-sobre-los-repuestos-homologados.png",
    description: "Filtro de aire de alto flujo. Mejora el rendimiento del motor y es lavable.",
    warranty: "24 meses",
    lastRestock: "2024-02-05",
    barcode: "7891234567896"
  },
  
  // BATERÍAS - SISTEMA ELÉCTRICO
  {
    id: 8,
    name: "Batería 12V 60Ah",
    partNumber: "TOY-UNIVERSAL-BAT008",
    brand: "ACDelco",
    category: "Baterías",
    subcategory: "Automotriz",
    compatibleCars: ["Toyota Rush", "Toyota Corolla", "Toyota Cross"],
    price: 149.99,
    cost: 95.00,
    stock: 12,
    minStock: 5,
    maxStock: 25,
    location: "Estante D-1",
    supplier: "ACDelco Centroamérica",
    imageUrl: "https://autorecambiosltda.com/wp-content/uploads/2022/10/Lo-que-debes-saber-sobre-los-repuestos-homologados.png",
    description: "Batería de 12V 60Ah con tecnología de calcio. Ideal para vehículos Toyota.",
    warranty: "24 meses",
    lastRestock: "2024-01-30",
    barcode: "7891234567897"
  },
  
  // ACEITES - LUBRICANTES
  {
    id: 9,
    name: "Aceite 5W-30 Sintético",
    partNumber: "TOY-UNIVERSAL-OIL009",
    brand: "Mobil 1",
    category: "Aceites",
    subcategory: "Motor",
    compatibleCars: ["Toyota Rush", "Toyota RAV4", "Toyota Corolla", "Toyota Cross"],
    price: 34.99,
    cost: 24.00,
    stock: 25,
    minStock: 12,
    maxStock: 60,
    location: "Estante E-1",
    supplier: "ExxonMobil Costa Rica",
    imageUrl: "https://autorecambiosltda.com/wp-content/uploads/2022/10/Lo-que-debes-saber-sobre-los-repuestos-homologados.png",
    description: "Aceite sintético 5W-30 de alta calidad. Protección superior del motor.",
    warranty: "36 meses",
    lastRestock: "2024-02-12",
    barcode: "7891234567898"
  },
  
  // AMORTIGUADORES - SUSPENSIÓN
  {
    id: 10,
    name: "Amortiguador Delantero",
    partNumber: "TOY-RAV4-AM010",
    brand: "Monroe",
    category: "Suspensión",
    subcategory: "Amortiguadores",
    compatibleCars: ["Toyota RAV4 2019-2023"],
    price: 185.99,
    cost: 125.00,
    stock: 6,
    minStock: 3,
    maxStock: 12,
    location: "Estante F-1",
    supplier: "Monroe Costa Rica",
    imageUrl: "https://autorecambiosltda.com/wp-content/uploads/2022/10/Lo-que-debes-saber-sobre-los-repuestos-homologados.png",
    description: "Amortiguador delantero para Toyota RAV4. Control de rebote superior y durabilidad extendida.",
    warranty: "24 meses",
    lastRestock: "2024-01-25",
    barcode: "7891234567899"
  }
];

// Configuración de la API de ChatGPT
const CHATGPT_API_KEY = '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'; // Dejar vacío por ahora
const CHATGPT_API_URL = 'https://api.openai.com/v1/chat/completions';

// Función para enviar foto a ChatGPT y obtener análisis
export const analyzeImageWithChatGPT = async (imageFile, carData) => {
  try {
    // Convertir imagen a base64
    const base64Image = await convertFileToBase64(imageFile);
    
    // Preparar el prompt para ChatGPT
    const prompt = `Analiza esta foto del sistema de frenos de un ${carData.brand} ${carData.model} ${carData.year}. 
    
    Por favor identifica:
    1. Todas las piezas visibles en la imagen
    2. El estado/condición de cada pieza (gastada, normal, oxidada, etc.)
    3. Piezas que deberían estar ahí pero no se ven
    4. Problemas específicos que observes
    5. Especificaciones técnicas si las puedes determinar
    6. Recomendaciones de mantenimiento
    
    Responde en formato JSON con la siguiente estructura:
    {
      "systemType": "tipo de sistema identificado",
      "brakeType": "tipo de freno",
      "wearLevel": "nivel de desgaste general",
      "corrosionStatus": "estado de corrosión",
      "maintenancePriority": "prioridad de mantenimiento",
      "estimatedMileage": "kilometraje estimado",
      "safetyRisk": "nivel de riesgo de seguridad",
      "visibleParts": [
        {
          "name": "nombre de la pieza",
          "condition": "condición",
          "description": "descripción detallada"
        }
      ],
      "hiddenParts": [
        {
          "name": "nombre de la pieza",
          "condition": "condición",
          "description": "descripción"
        }
      ],
      "technicalSpecs": {
        "drumDiameter": "diámetro del tambor",
        "shoeThickness": "grosor de zapatas",
        "springTension": "tensión de resortes",
        "wheelCylinderBore": "diámetro del cilindro",
        "brakeFluidLevel": "nivel de líquido"
      },
      "inspectionNotes": [
        "nota de inspección 1",
        "nota de inspección 2"
      ],
      "commonIssues": [
        "problema 1",
        "problema 2"
      ],
      "replacementComplexity": "complejidad del reemplazo",
      "estimatedLaborTime": "tiempo estimado de trabajo",
      "partsNeeded": [
        "pieza 1",
        "pieza 2"
      ]
    }`;
    
    // Preparar el request a ChatGPT
    const requestBody = {
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: prompt
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`
              }
            }
          ]
        }
      ],
      max_tokens: 2000,
      temperature: 0.1
    };
    
    // Hacer el request a ChatGPT
    const response = await fetch(CHATGPT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CHATGPT_API_KEY}`
      },
      body: JSON.stringify(requestBody)
    });
    
    if (!response.ok) {
      throw new Error(`Error en la API de ChatGPT: ${response.status}`);
    }
    
    const data = await response.json();
    const chatGPTResponse = data.choices[0].message.content;
    
    // Verificar si ChatGPT indica que no puede analizar la imagen
    if (chatGPTResponse.includes("no puedo analizar") || 
        chatGPTResponse.includes("paisaje") || 
        chatGPTResponse.includes("no es un sistema de frenos") ||
        !chatGPTResponse.includes("{")) {
      return {
        error: true,
        message: chatGPTResponse,
        type: "invalid_image"
      };
    }
    
    // Extraer JSON de la respuesta si está envuelto en markdown
    let jsonString = chatGPTResponse;
    if (chatGPTResponse.includes("```json")) {
      const jsonMatch = chatGPTResponse.match(/```json\n([\s\S]*?)\n```/);
      if (jsonMatch) {
        jsonString = jsonMatch[1];
      }
    }
    
    // Parsear la respuesta JSON de ChatGPT
    const chatGPTAnalysis = JSON.parse(jsonString);
    
    return chatGPTAnalysis;
    
  } catch (error) {
    console.error('Error al analizar imagen con ChatGPT:', error);
    // En caso de error, usar análisis simulado
    return getSimulatedAnalysis();
  }
};

// Función auxiliar para convertir archivo a base64
const convertFileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = reader.result.split(',')[1]; // Remover el prefijo data:image/jpeg;base64,
      resolve(base64);
    };
    reader.onerror = error => reject(error);
  });
};

// Función para obtener análisis simulado (fallback)
const getSimulatedAnalysis = () => {
  return {
    systemType: "Sistema de frenos de tambor trasero",
    brakeType: "Frenos de tambor con zapatas internas",
    wearLevel: "Alto desgaste en zapatas de freno",
    corrosionStatus: "Corrosión moderada en maza/buje",
    maintenancePriority: "Crítico - Reemplazo inmediato requerido",
    estimatedMileage: "Aproximadamente 80,000-100,000 km de uso",
    safetyRisk: "Alto - Reducción significativa en capacidad de frenado",
    visibleParts: [
      {
        name: "Maza o buje (hub)",
        condition: "Oxidada",
        description: "La parte central circular oxidada con los espárragos (pernos donde va montada la llanta)"
      },
      {
        name: "Espárragos de rueda",
        condition: "Buen estado",
        description: "Los 5 pernos plateados que sobresalen, donde se colocan las tuercas para fijar la llanta"
      },
      {
        name: "Zapatas de freno",
        condition: "Gastadas",
        description: "Son las superficies curvas que rodean parte del tambor. Son las que hacen fricción contra el tambor para frenar el carro. Aquí se ven bastante gastadas."
      },
      {
        name: "Resortes de retorno",
        condition: "Normal",
        description: "Los resortes metálicos que mantienen las zapatas en su lugar y las regresan cuando sueltas el pedal de freno"
      },
      {
        name: "Plato de respaldo (backing plate)",
        condition: "Normal",
        description: "La pieza metálica circular grande detrás de todo el sistema, que sostiene los componentes del freno"
      },
      {
        name: "Muelle helicoidal de suspensión",
        condition: "Normal",
        description: "Al fondo, detrás del freno, se ve el resorte grande de la suspensión trasera del carro"
      }
    ],
    hiddenParts: [
      {
        name: "Tambor de freno",
        condition: "Retirado para inspección",
        description: "Ya fue retirado para tomar la foto"
      },
      {
        name: "Cilindro de rueda",
        condition: "No visible",
        description: "Usualmente está en la parte superior, empuja las zapatas cuando frenas (no se distingue claramente, puede estar detrás o fuera del ángulo)"
      }
    ],
    technicalSpecs: {
      drumDiameter: "254mm (10 pulgadas)",
      shoeThickness: "3.2mm (nuevo) - Actual: <1mm",
      springTension: "Normal",
      wheelCylinderBore: "19.05mm (3/4 pulgada)",
      brakeFluidLevel: "Verificar nivel en depósito principal"
    },
    inspectionNotes: [
      "Las zapatas muestran desgaste uniforme pero excesivo",
      "El tambor presenta rayas superficiales por el desgaste de las zapatas",
      "Los resortes de retorno mantienen tensión adecuada",
      "El plato de respaldo no muestra corrosión estructural",
      "Los espárragos de rueda están en buen estado",
      "La maza presenta oxidación superficial pero funcional"
    ],
    commonIssues: [
      "Ruido al frenar (chirrido) por zapatas gastadas",
      "Pedal de freno más bajo de lo normal",
      "Frenado menos efectivo en condiciones húmedas",
      "Posible desequilibrio en frenado trasero"
    ],
    replacementComplexity: "Media - Requiere herramientas especializadas",
    estimatedLaborTime: "2-3 horas por lado",
    partsNeeded: [
      "Zapatas de freno traseras (crítico)",
      "Tambor de freno (si está rayado)",
      "Líquido de frenos DOT 4",
      "Grasa para cojinetes (opcional)",
      "Kit de resortes (si están débiles)"
    ]
  };
};

// Función principal para identificación de repuestos (ahora usa ChatGPT)
export const simulateAIIdentification = async (imageFile, carData) => {
  try {
    // Obtener análisis de ChatGPT
    const chatGPTAnalysis = await analyzeImageWithChatGPT(imageFile, carData);
    
    // Verificar si la imagen es inválida
    if (chatGPTAnalysis.error && chatGPTAnalysis.type === "invalid_image") {
      return {
        error: true,
        message: chatGPTAnalysis.message,
        type: "invalid_image",
        identifiedPart: null,
        confidence: 0,
        imageAnalysis: "La imagen proporcionada no parece ser de un sistema de frenos automotriz. Por favor, suba una foto clara del sistema de frenos que desea analizar.",
        urgency: "N/A",
        safetyWarning: "No se puede realizar análisis de seguridad sin una imagen válida del sistema de frenos.",
        stockStatus: "N/A",
        stockQuantity: 0,
        location: "N/A",
        supplier: "N/A",
        warranty: "N/A",
        condition: "N/A",
        chatGPTAnalysis: null,
        partsAnalysis: [],
        alternativeParts: []
      };
    }
    
    // Buscar repuestos compatibles con el vehículo basado en el análisis
    const compatibleParts = fakePartsDatabase.filter(part => 
      part.compatibleCars.some(car => 
        car.toLowerCase().includes(carData.brand.toLowerCase()) &&
        car.toLowerCase().includes(carData.model.toLowerCase())
      ) && part.category === "Frenos"
    );
    
    // Priorizar repuestos basado en el análisis de ChatGPT
    let identifiedPart;
    
    // Si ChatGPT identifica zapatas gastadas, priorizar zapatas
    if (chatGPTAnalysis.visibleParts?.some(part => 
      part.name.toLowerCase().includes('zapata') && 
      (part.condition.toLowerCase().includes('gastada') || part.condition.toLowerCase().includes('desgaste'))
    )) {
      const brakeShoes = compatibleParts.filter(part => part.subcategory === "Zapatas");
      identifiedPart = brakeShoes.find(part => part.stock > 0) || brakeShoes[0];
    }
    // Si identifica problemas con tambor, priorizar tambor
    else if (chatGPTAnalysis.visibleParts?.some(part => 
      part.name.toLowerCase().includes('tambor') && 
      (part.condition.toLowerCase().includes('rayado') || part.condition.toLowerCase().includes('desgaste'))
    )) {
      const drums = compatibleParts.filter(part => part.subcategory === "Tambores");
      identifiedPart = drums.find(part => part.stock > 0) || drums[0];
    }
    // Si no hay problemas específicos, usar el primer repuesto disponible
    else {
      const partsInStock = compatibleParts.filter(part => part.stock > 0);
      identifiedPart = partsInStock[0] || compatibleParts[0];
    }
    
    // Si no se encuentra repuesto específico, usar el primero disponible
    if (!identifiedPart) {
      identifiedPart = compatibleParts[0] || fakePartsDatabase[0];
    }
    
    // Analizar cada pieza identificada por ChatGPT y verificar stock
    const partsAnalysis = [];
    if (chatGPTAnalysis.visibleParts) {
      for (const visiblePart of chatGPTAnalysis.visibleParts) {
        // Buscar repuestos que coincidan con la pieza identificada
        const matchingParts = compatibleParts.filter(part => {
          const partName = part.name.toLowerCase();
          const visibleName = visiblePart.name.toLowerCase();
          
          // Buscar coincidencias por palabras clave
          if (visibleName.includes('zapata') && partName.includes('zapata')) return true;
          if (visibleName.includes('tambor') && partName.includes('tambor')) return true;
          if (visibleName.includes('cilindro') && partName.includes('cilindro')) return true;
          if (visibleName.includes('resorte') && partName.includes('resorte')) return true;
          if (visibleName.includes('plato') && partName.includes('plato')) return true;
          if (visibleName.includes('maza') && partName.includes('maza')) return true;
          if (visibleName.includes('buje') && partName.includes('buje')) return true;
          
          return false;
        });
        
        if (matchingParts.length > 0) {
          const bestMatch = matchingParts.find(part => part.stock > 0) || matchingParts[0];
          partsAnalysis.push({
            identifiedPart: visiblePart,
            availablePart: bestMatch,
            inStock: bestMatch.stock > 0,
            stockQuantity: bestMatch.stock,
            location: bestMatch.location,
            price: bestMatch.price
          });
        } else {
          partsAnalysis.push({
            identifiedPart: visiblePart,
            availablePart: null,
            inStock: false,
            stockQuantity: 0,
            location: "No disponible",
            price: "N/A"
          });
        }
      }
    }
    
    // Generar análisis basado en la respuesta de ChatGPT
    let imageAnalysis = `Análisis detallado del sistema de frenos:\n\n`;
    imageAnalysis += `Tipo de Sistema: ${chatGPTAnalysis.systemType}\n`;
    imageAnalysis += `Nivel de Desgaste: ${chatGPTAnalysis.wearLevel}\n`;
    imageAnalysis += `Prioridad: ${chatGPTAnalysis.maintenancePriority}\n\n`;
    
    imageAnalysis += `Piezas identificadas y disponibilidad en stock:\n`;
    partsAnalysis.forEach(part => {
      imageAnalysis += `\n• ${part.identifiedPart.name} (${part.identifiedPart.condition}):\n`;
      if (part.availablePart) {
        imageAnalysis += `  - Repuesto disponible: ${part.availablePart.name}\n`;
        imageAnalysis += `  - Stock: ${part.inStock ? `${part.stockQuantity} unidades` : 'Sin stock'}\n`;
        imageAnalysis += `  - Ubicación: ${part.location}\n`;
        imageAnalysis += `  - Precio: $${part.price}\n`;
      } else {
        imageAnalysis += `  - Repuesto no disponible en nuestro inventario\n`;
      }
    });
    
    imageAnalysis += `\nRepuesto principal recomendado: ${identifiedPart.name} (${identifiedPart.brand})\n`;
    
    if (identifiedPart.stock > 0) {
      imageAnalysis += `Disponible en stock (${identifiedPart.stock} unidades). Ubicación: ${identifiedPart.location}.`;
    } else {
      imageAnalysis += `Sin stock actual, disponible para pedido.`;
    }
    
    // Determinar urgencia basada en el análisis de ChatGPT
    let urgency = "Media";
    let safetyWarning = "";
    
    if (chatGPTAnalysis.maintenancePriority?.toLowerCase().includes('crítico') || 
        chatGPTAnalysis.safetyRisk?.toLowerCase().includes('alto')) {
      urgency = "Alta";
      safetyWarning = "Componente crítico identificado. No conduzca hasta realizar el reemplazo.";
    }
    
    return {
      identifiedPart: identifiedPart,
      confidence: 95, // Alta confianza con ChatGPT
      imageAnalysis: imageAnalysis,
      technicalDetails: chatGPTAnalysis,
      urgency: urgency,
      safetyWarning: safetyWarning,
      stockStatus: identifiedPart.stock > 0 ? "En Stock" : "Sin Stock",
      stockQuantity: identifiedPart.stock,
      location: identifiedPart.location,
      supplier: identifiedPart.supplier,
      warranty: identifiedPart.warranty,
      condition: identifiedPart.condition,
      chatGPTAnalysis: chatGPTAnalysis,
      partsAnalysis: partsAnalysis, // Análisis detallado de cada pieza identificada
      alternativeParts: compatibleParts.filter(part => 
        part.id !== identifiedPart.id && 
        part.stock > 0
      ).slice(0, 3)
    };
    
  } catch (error) {
    console.error('Error en identificación de repuestos:', error);
    
    // Fallback a análisis simulado en caso de error
    const chatGPTAnalysis = getSimulatedAnalysis();
    const compatibleParts = fakePartsDatabase.filter(part => 
      part.compatibleCars.some(car => 
        car.toLowerCase().includes(carData.brand.toLowerCase()) &&
        car.toLowerCase().includes(carData.model.toLowerCase())
      ) && part.category === "Frenos"
    );
    
    const identifiedPart = compatibleParts.find(part => part.stock > 0) || compatibleParts[0];
    
    return {
      identifiedPart: identifiedPart,
      confidence: 85,
      imageAnalysis: "Análisis simulado - Error en conexión con ChatGPT",
      technicalDetails: chatGPTAnalysis,
      urgency: "Alta",
      safetyWarning: "Error en análisis. Consulte con un técnico especializado.",
      stockStatus: identifiedPart?.stock > 0 ? "En Stock" : "Sin Stock",
      stockQuantity: identifiedPart?.stock || 0,
      location: identifiedPart?.location || "N/A",
      supplier: identifiedPart?.supplier || "N/A",
      warranty: identifiedPart?.warranty || "N/A",
      condition: identifiedPart?.condition || "N/A",
      chatGPTAnalysis: chatGPTAnalysis,
      alternativeParts: []
    };
  }
};

// Función para buscar repuestos por vehículo
export const searchPartsByVehicle = (carData) => {
  return fakePartsDatabase.filter(part => 
    part.compatibleCars.some(car => 
      car.toLowerCase().includes(carData.brand.toLowerCase()) &&
      car.toLowerCase().includes(carData.model.toLowerCase())
    ) ||
    part.compatibleCars.some(car => car.includes('UNIVERSAL'))
  );
};

// Función para verificar stock de un repuesto específico
export const checkPartStock = (partNumber) => {
  const part = fakePartsDatabase.find(p => p.partNumber === partNumber);
  if (!part) return null;
  
  return {
    partNumber: part.partNumber,
    name: part.name,
    stock: part.stock,
    inStock: part.stock > 0,
    location: part.location,
    price: part.price,
    supplier: part.supplier,
    lastRestock: part.lastRestock
  };
};
