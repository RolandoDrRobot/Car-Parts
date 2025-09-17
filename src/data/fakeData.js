// Fake data to simulate API and database
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
    owner: "John Smith",
    lastService: "2024-01-15",
    imageUrl: "https://www.toyotacr.com/360/rush-prueba/images/pc/D14N_SILVER%20M.M.(1E7)_02.jpg"
  },
  {
    id: 2,
    plate: "XYZ789",
    brand: "Honda",
    model: "Civic",
    year: 2019,
    color: "Black",
    engine: "1.5L Turbo",
    transmission: "Manual",
    fuelType: "Gasoline",
    vin: "2HGFC2F59MH543210",
    owner: "Maria Garcia",
    lastService: "2024-02-10",
    imageUrl: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop&auto=format"
  },
  {
    id: 3,
    plate: "DEF456",
    brand: "Ford",
    model: "Focus",
    year: 2021,
    color: "Blue",
    engine: "2.0L 4-Cylinder",
    transmission: "Automatic",
    fuelType: "Gasoline",
    vin: "1FAHP3F20CL123456",
    owner: "Carlos Lopez",
    lastService: "2024-01-28",
    imageUrl: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop&auto=format"
  }
];

// Fake parts database
export const fakePartsDatabase = [
  {
    id: 1,
    name: "Pastillas de Freno Delanteras",
    partNumber: "TOY-RUSH-FB001",
    compatibleCars: ["Toyota Rush 2018-2023"],
    price: 95.99,
    stock: 12,
    location: "Estante A-2",
    imageUrl: "https://autorecambiosltda.com/wp-content/uploads/2022/10/Lo-que-debes-saber-sobre-los-repuestos-homologados.png",
    description: "Pastillas de freno delanteras originales Toyota Rush. Material cerámico de alta calidad para mayor durabilidad y rendimiento."
  },
  {
    id: 2,
    name: "Discos de Freno Delanteros",
    partNumber: "TOY-RUSH-FD002",
    compatibleCars: ["Toyota Rush 2018-2023"],
    price: 145.99,
    stock: 6,
    location: "Estante A-3",
    imageUrl: "https://autorecambiosltda.com/wp-content/uploads/2022/10/Lo-que-debes-saber-sobre-los-repuestos-homologados.png",
    description: "Discos de freno delanteros ventilados para Toyota Rush. Diseño optimizado para disipación de calor y resistencia al desgaste."
  },
  {
    id: 3,
    name: "Pastillas de Freno Traseras",
    partNumber: "TOY-RUSH-RB003",
    compatibleCars: ["Toyota Rush 2018-2023"],
    price: 78.99,
    stock: 8,
    location: "Estante A-4",
    imageUrl: "https://autorecambiosltda.com/wp-content/uploads/2022/10/Lo-que-debes-saber-sobre-los-repuestos-homologados.png",
    description: "Pastillas de freno traseras para Toyota Rush. Freno de mano integrado y excelente rendimiento en condiciones húmedas."
  },
  {
    id: 4,
    name: "Líquido de Freno DOT 4",
    partNumber: "TOY-RUSH-BF004",
    compatibleCars: ["Toyota Rush 2018-2023"],
    price: 24.99,
    stock: 15,
    location: "Estante B-1",
    imageUrl: "https://autorecambiosltda.com/wp-content/uploads/2022/10/Lo-que-debes-saber-sobre-los-repuestos-homologados.png",
    description: "Líquido de freno DOT 4 de alta calidad. Punto de ebullición superior para mayor seguridad en condiciones extremas."
  },
  {
    id: 5,
    name: "Kit de Frenos Completo",
    partNumber: "TOY-RUSH-FK005",
    compatibleCars: ["Toyota Rush 2018-2023"],
    price: 285.99,
    stock: 4,
    location: "Estante A-1",
    imageUrl: "https://autorecambiosltda.com/wp-content/uploads/2022/10/Lo-que-debes-saber-sobre-los-repuestos-homologados.png",
    description: "Kit completo de frenos delanteros: pastillas, discos, líquido de freno y tornillos. Todo lo necesario para el mantenimiento completo."
  }
];

// AI simulation to identify parts
export const simulateAIIdentification = (imageFile) => {
  // Simulate processing delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // Always return brake-related parts for Toyota Rush
      const brakeParts = fakePartsDatabase.filter(part => 
        part.name.toLowerCase().includes('freno') || 
        part.name.toLowerCase().includes('brake')
      );
      
      const identifiedPart = brakeParts[Math.floor(Math.random() * brakeParts.length)];
      
      resolve({
        identifiedPart: identifiedPart,
        confidence: Math.floor(Math.random() * 20) + 80, // 80-100% for brake parts
        imageAnalysis: `Sistema de frenos identificado: ${identifiedPart.name}. Componente crítico para la seguridad del vehículo.`,
        recommendations: [
          "Verificar el desgaste de las pastillas de freno",
          "Revisar el grosor de los discos de freno",
          "Comprobar el nivel del líquido de frenos",
          "Considerar reemplazo preventivo por seguridad",
          "Realizar prueba de frenado después del reemplazo"
        ],
        urgency: "Alta",
        safetyWarning: "Los frenos son componentes críticos de seguridad. No conduzca si detecta problemas en el sistema de frenado."
      });
    }, 2000);
  });
};
