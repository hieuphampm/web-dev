import mongoose from "mongoose";

import { CategorySchema } from "./category.js";
import { UserSchema } from "./user.js";

export const Category = mongoose.model("category", CategorySchema);
export const User = mongoose.model("user", UserSchema)