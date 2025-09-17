// Fake data to simulate API and database
export const fakeCarData = [
  {
    id: 1,
    plate: "ABC123",
    brand: "Toyota",
    model: "Corolla",
    year: 2020,
    color: "White",
    engine: "1.8L 4-Cylinder",
    transmission: "Automatic",
    fuelType: "Gasoline",
    vin: "1HGBH41JXMN109186",
    owner: "John Smith",
    lastService: "2024-01-15",
    imageUrl: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop&auto=format"
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
    name: "Oil Filter",
    partNumber: "TOY-12345",
    compatibleCars: ["Toyota Corolla 2018-2022"],
    price: 25.99,
    stock: 15,
    location: "Shelf A-1",
    imageUrl: "https://autorecambiosltda.com/wp-content/uploads/2022/10/Lo-que-debes-saber-sobre-los-repuestos-homologados.png"
  },
  {
    id: 2,
    name: "Front Brake Pads",
    partNumber: "HON-67890",
    compatibleCars: ["Honda Civic 2016-2021"],
    price: 89.99,
    stock: 8,
    location: "Shelf B-3",
    imageUrl: "https://autorecambiosltda.com/wp-content/uploads/2022/10/Lo-que-debes-saber-sobre-los-repuestos-homologados.png"
  },
  {
    id: 3,
    name: "12V Battery",
    partNumber: "BAT-55555",
    compatibleCars: ["Toyota Corolla", "Honda Civic", "Ford Focus"],
    price: 149.99,
    stock: 12,
    location: "Shelf C-2",
    imageUrl: "https://autorecambiosltda.com/wp-content/uploads/2022/10/Lo-que-debes-saber-sobre-los-repuestos-homologados.png"
  },
  {
    id: 4,
    name: "Air Filter",
    partNumber: "FOR-99999",
    compatibleCars: ["Ford Focus 2019-2023"],
    price: 18.50,
    stock: 0,
    location: "Out of Stock",
    imageUrl: "https://autorecambiosltda.com/wp-content/uploads/2022/10/Lo-que-debes-saber-sobre-los-repuestos-homologados.png"
  },
  {
    id: 5,
    name: "5W-30 Motor Oil",
    partNumber: "OIL-11111",
    compatibleCars: ["Toyota Corolla", "Honda Civic", "Ford Focus"],
    price: 34.99,
    stock: 25,
    location: "Shelf D-1",
    imageUrl: "https://autorecambiosltda.com/wp-content/uploads/2022/10/Lo-que-debes-saber-sobre-los-repuestos-homologados.png"
  }
];

// AI simulation to identify parts
export const simulateAIIdentification = (imageFile) => {
  // Simulate processing delay
  return new Promise((resolve) => {
    setTimeout(() => {
      const randomPart = fakePartsDatabase[Math.floor(Math.random() * fakePartsDatabase.length)];
      resolve({
        identifiedPart: randomPart,
        confidence: Math.floor(Math.random() * 30) + 70, // 70-100%
        imageAnalysis: "Part identified: " + randomPart.name,
        recommendations: [
          "Verify compatibility with the model",
          "Check current part condition",
          "Consider preventive replacement"
        ]
      });
    }, 2000);
  });
};
