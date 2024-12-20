const dummyData = Array.from({ length: 15 }, (_, index) => ({
  id: index + 1,
  name: `Item ${index + 1}`,
  count: Math.floor(Math.random() * 50) + 1, // Random number between 1 and 50
}));
const cartItems = [
  {
    id: 1,
    name: "Product 1",
    price: 25.99,
    quantity: 2,
    image: "https://via.placeholder.com/150", // Replace with actual image URL
  },
  {
    id: 2,
    name: "Product 2",
    price: 15.49,
    quantity: 1,
    image: "https://via.placeholder.com/150", // Replace with actual image URL
  },
  {
    id: 3,
    name: "Product 3",
    price: 45.0,
    quantity: 3,
    image: "https://via.placeholder.com/150", // Replace with actual image URL
  },
];

const dummyProductData = Array.from({ length: 35 }, (_, index) => ({
  id: index + 1,
  name: `Dish ${index + 1}`,
  price: (Math.random() * 50 + 10).toFixed(2), // Random price between $10 and $60
  preparationTime: `${Math.floor(Math.random() * 60) + 10} mins`, // Random time between 10 to 70 mins
  isVeg: Math.random() < 0.5, // Randomly assign true or false
  available: Math.random() < 0.8, // 80% chance of being available
}));
const repeat = (arr, n) =>
  Array.from({ length: arr.length * n }, (_, i) => arr[i % arr.length]);
