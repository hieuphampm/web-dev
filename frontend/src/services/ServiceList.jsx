// Thêm import mutation
import { useMutation } from '@apollo/client';
import { DELETE_SERVICE, GET_SERVICES } from '../../graphql/services';

// Trong component ServiceList, thêm đoạn mã này
const [deleteService, { loading: deleteLoading }] = useMutation(DELETE_SERVICE, {
  refetchQueries: [{ query: GET_SERVICES }],
  onError: (error) => {
    console.error('Lỗi khi xóa dịch vụ:', error);
    // Hiển thị thông báo lỗi cho người dùng
    alert('Không thể xóa dịch vụ: ' + error.message);
  }
});

const handleDelete = (id) => {
  // Thêm console.log để kiểm tra ID
  console.log('Đang xóa dịch vụ với ID:', id);
  
  deleteService({ 
    variables: { 
      id // Đảm bảo ID được truyền đúng
    } 
  });
};

// Cập nhật phần xử lý onClick trong nút Xóa
<button 
  onClick={() => handleDelete(service.id)}
  disabled={deleteLoading}
>
  Xóa
</button>
