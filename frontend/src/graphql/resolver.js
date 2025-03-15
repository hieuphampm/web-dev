// Kiểm tra trong tệp GraphQL resolver của bạn
const resolvers = {
    Mutation: {
      createService: async (_, args, context) => {
        // Đảm bảo user đã được xác thực và có trong context
        if (!context.user) {
          throw new Error('Bạn chưa đăng nhập');
        }
        
        // Kiểm tra vai trò
        if (!['admin', 'staff'].includes(context.user.role)) {
          throw new Error('Bạn không có quyền thêm dịch vụ');
        }
        
        // Tiếp tục xử lý...
      },
      
      deleteService: async (_, { id }, context) => {
        // Tương tự như trên...
      }
    }
  };
  