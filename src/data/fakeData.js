// Datos falsos para simular la API y base de datos
export const fakeCarData = [
  {
    id: 1,
    plate: "ABC123",
    brand: "Toyota",
    model: "Corolla",
    year: 2020,
    color: "Blanco",
    engine: "1.8L 4-Cilindros",
    transmission: "Automática",
    fuelType: "Gasolina",
    vin: "1HGBH41JXMN109186",
    owner: "Juan Pérez",
    lastService: "2024-01-15"
  },
  {
    id: 2,
    plate: "XYZ789",
    brand: "Honda",
    model: "Civic",
    year: 2019,
    color: "Negro",
    engine: "1.5L Turbo",
    transmission: "Manual",
    fuelType: "Gasolina",
    vin: "2HGFC2F59MH543210",
    owner: "María García",
    lastService: "2024-02-10"
  },
  {
    id: 3,
    plate: "DEF456",
    brand: "Ford",
    model: "Focus",
    year: 2021,
    color: "Azul",
    engine: "2.0L 4-Cilindros",
    transmission: "Automática",
    fuelType: "Gasolina",
    vin: "1FAHP3F20CL123456",
    owner: "Carlos López",
    lastService: "2024-01-28"
  }
];

// Base de datos falsa de repuestos
export const fakePartsDatabase = [
  {
    id: 1,
    name: "Filtro de Aceite",
    partNumber: "TOY-12345",
    compatibleCars: ["Toyota Corolla 2018-2022"],
    price: 25.99,
    stock: 15,
    location: "Estante A-1"
  },
  {
    id: 2,
    name: "Pastillas de Freno Delanteras",
    partNumber: "HON-67890",
    compatibleCars: ["Honda Civic 2016-2021"],
    price: 89.99,
    stock: 8,
    location: "Estante B-3"
  },
  {
    id: 3,
    name: "Batería 12V",
    partNumber: "BAT-55555",
    compatibleCars: ["Toyota Corolla", "Honda Civic", "Ford Focus"],
    price: 149.99,
    stock: 12,
    location: "Estante C-2"
  },
  {
    id: 4,
    name: "Filtro de Aire",
    partNumber: "FOR-99999",
    compatibleCars: ["Ford Focus 2019-2023"],
    price: 18.50,
    stock: 0,
    location: "Agotado"
  },
  {
    id: 5,
    name: "Aceite Motor 5W-30",
    partNumber: "OIL-11111",
    compatibleCars: ["Toyota Corolla", "Honda Civic", "Ford Focus"],
    price: 34.99,
    stock: 25,
    location: "Estante D-1"
  }
];

// Simulación de IA para identificar partes
export const simulateAIIdentification = (imageFile) => {
  // Simular delay de procesamiento
  return new Promise((resolve) => {
    setTimeout(() => {
      const randomPart = fakePartsDatabase[Math.floor(Math.random() * fakePartsDatabase.length)];
      resolve({
        identifiedPart: randomPart,
        confidence: Math.floor(Math.random() * 30) + 70, // 70-100%
        imageAnalysis: "Parte identificada: " + randomPart.name,
        recommendations: [
          "Verificar compatibilidad con el modelo",
          "Revisar estado de la parte actual",
          "Considerar reemplazo preventivo"
        ]
      });
    }, 2000);
  });
};
