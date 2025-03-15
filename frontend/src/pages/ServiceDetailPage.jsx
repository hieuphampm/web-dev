import { useQuery } from "@apollo/client";
import { GET_SERVICE } from "@/graphql/queries";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui";

const ServiceDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(GET_SERVICE, { variables: { id } });

  if (loading) return <p className="text-white">Đang tải dữ liệu...</p>;
  if (error || !data?.service) return <p className="text-red-500">Không tìm thấy dịch vụ!</p>;

  const { name, price, description } = data.service;

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-4">📋 Chi Tiết Dịch Vụ</h1>
      <p><strong>Tên:</strong> {name}</p>
      <p><strong>Giá:</strong> {price} VND</p>
      <p><strong>Mô tả:</strong> {description}</p>
      
      <div className="mt-4">
        <Button onClick={() => navigate(`/services/${id}/edit`)} className="mr-2">✏️ Chỉnh sửa</Button>
        <Button onClick={() => navigate("/services")} className="bg-gray-500">🔙 Quay lại</Button>
      </div>
    </div>
  );
};

export default ServiceDetailPage;
