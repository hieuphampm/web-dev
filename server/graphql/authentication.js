import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const typeDef = `
    type LoginResult {
        jwt: String!
    }

    type LoginResponse {
        success: Boolean!
        message: String!
        data: LoginResult
    }

    input LoginInput {
      username: String!
      password: String!
    }

    extend type Mutation {
        login(input: LoginInput): LoginResponse
    }
`;

export const resolvers = {
  Mutation: {
    login: async (parent, args, context, info) => {
      const { username, password } = args.input;

      // Kiểm tra nếu thiếu thông tin
      if (!username || !password) {
        return {
          success: false,
          message: "Username or password cannot be empty",
        };
      }

      // Kiểm tra kết nối database
      if (!context.db || !context.db.users) {
        return {
          success: false,
          message: "Database connection error",
        };
      }

      // Tìm user trong database
      const user = await context.db.users.findOne({ username });

      if (!user) {
        return {
          success: false,
          message: "Invalid username or password",
        };
      }

      // So sánh mật khẩu
      let isOkay;
      try {
        isOkay = await bcrypt.compare(password, user.password);
      } catch (error) {
        return {
          success: false,
          message: "Error processing password",
        };
      }

      if (isOkay) {
        if (!process.env.JWT_SECRET) {
          return {
            success: false,
            message: "Server error: Missing JWT secret",
          };
        }

        const token = jwt.sign(
          {
            username: user.username,
            role: user.role,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "24h",
          }
        );

        return {
          success: true,
          message: "Login successfully",
          data: {
            jwt: token,
          },
        };
      }

      return {
        success: false,
        message: "Invalid username or password",
      };
    },
  },
};

// Middleware xác thực người dùng từ JWT
export const isAuthenticated = (context) => {
  if (!context.user) {
    throw new Error("You must be logged in");
  }
};

// Kiểm tra vai trò của user (admin, user, v.v.)
export const hasRole = (context, roles) => {
  if (!context.user || !roles.includes(context.user.role)) {
    throw new Error("Not authorized");
  }
};
