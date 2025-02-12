const mockData = {
  categories: [
      { id: 1, name: "Asus" },
      { id: 2, name: "Dell" },
      { id: 3, name: "HP" },
      { id: 4, name: "MSI" },
  ],
  products: [
      { id: 1, name: "Laptop Asus ROG", price: 30000000, categoryId: 1 },
      { id: 2, name: "Laptop Dell XPS", price: 35000000, categoryId: 2 },
  ],
};

const db = {
  categories: {
      getAll: () => mockData.categories,
      findById: (id) => mockData.categories.find((item) => item.id == id),
  },
  products: {
      getAll: () => mockData.products,
      findById: (id) => mockData.products.find((item) => item.id == id),
      create: (input) => {
          const id = mockData.products.length + 1;
          const item = { id, ...input };
          mockData.products.push(item);
          return item;
      },
      deleteById: (id) => {
          const index = mockData.products.findIndex((item) => item.id == id);
          if (index >= 0) {
              return mockData.products.splice(index, 1)[0].id;
          }
          return null;
      },
      updateById: (id, input) => {
          const index = mockData.products.findIndex((item) => item.id == id);
          if (index >= 0) {
              Object.assign(mockData.products[index], input);
              return mockData.products[index];
          }
          return null;
      },
  },
};

export { db };
