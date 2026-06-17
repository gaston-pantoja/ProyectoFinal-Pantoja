const products = [
  {
    id: '1',
    name: 'Biorreactor Automatizado Eco-1',
    price: 1500,
    category: 'biotecnologia',
    img: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=500',
    description: 'Sistema de cultivo celular optimizado con algoritmos de IA para máxima eficiencia en bioprocesos.',
    stock: 5
  },
  {
    id: '2',
    name: 'Módulo de Control Industrial n8n',
    price: 450,
    category: 'automatizacion',
    img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=500',
    description: 'Hardware de automatización perimetral preconfigurado para integración de flujos de trabajo avanzados.',
    stock: 12
  },
  {
    id: '3',
    name: 'Servidor IoT Solar-Efficient',
    price: 890,
    category: 'hardware-eficiente',
    img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=500',
    description: 'Unidad de procesamiento local optimizada para bajo consumo energético e infraestructura sostenible.',
    stock: 8
  }
];

export const getProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products);
    }, 500);
  });
};

export const getProductsByCategory = (categoryId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products.filter(prod => prod.category === categoryId));
    }, 500);
  });
};

export const getProductById = (productId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products.find(prod => prod.id === productId));
    }, 500);
  });
};