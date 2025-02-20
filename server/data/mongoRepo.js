import { Category } from "./models/index.js";

const db = {
  categories: {
    getAll: async () => {
      const items = await Category.find();
      return items;
    },
    findById: async (id) => {
      return await Category.findById(id);
    },
    create: async ({ name }) => {
      const created = await Category.create({ name });
      return created;
    },
    deleteById: async (id) => {
      const result = await Category.findByIdAndDelete(id);
      return result;
    },
    updateById: async (id, updateData) => {
      const updated = await Category.findOneAndUpdate(
        { _id: id },
        updateData,
        { new: true }   
      );
      return updated;
    },
  },
};

export { db };
