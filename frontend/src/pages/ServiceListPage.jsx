import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const services = [
  { id: 1, name: "Buffet bữa sáng", price: "100.000", desc: "Bắt đầu từ 5:30 đến 9:30" },
  { id: 2, name: "Buffet bữa trưa", price: "299.000", desc: "Bắt đầu từ 11:00 đến 13:00" },
  { id: 3, name: "Buffet bữa tối", price: "349.000", desc: "Bắt đầu từ 17:30 đến 21:00" },
  { id: 4, name: "Ăn sáng tại phòng", price: "79.000", desc: "Giá tính cho 1 người, chưa bao gồm tiền tip" },
  { id: 5, name: "Ăn trưa tại phòng", price: "149.000", desc: "Giá tính cho 1 người, chưa bao gồm tiền tip" },
  { id: 6, name: "Ăn tối tại phòng", price: "249.000", desc: "Giá tính cho 1 người, chưa bao gồm tiền tip" },
  { id: 7, name: "Massage tại phòng", price: "400.000", desc: "Giá cho 1 nhân viên phục vụ, chưa bao gồm tiền tip" },
  { id: 8, name: "Giặt ủi", price: "50.000", desc: "Giá cho 1 kg quần áo" },
  { id: 9, name: "Két sắt giữ đồ", price: "50.000", desc: "Giá cho 1 ngày" },
  { id: 10, name: "Đưa đón từ sân bay", price: "100.000", desc: "Cho 1 khách" },
];

const ServiceListPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-8">
      {/* Tiêu đề */}
      <h1 className="text-4xl font-bold mb-6">🏨 Danh sách dịch vụ khách sạn</h1>

      {/* Nút thêm dịch vụ */}
      <Button
        className="bg-blue-500 hover:bg-blue-600 transition-all px-6 py-3 text-lg rounded-xl shadow-md mb-6"
        onClick={() => navigate("/services/create")}
      >
        ➕ Thêm dịch vụ mới
      </Button>

      {/* Bảng danh sách dịch vụ */}
      <div className="w-full max-w-5xl">
        <table className="w-full border border-gray-700 rounded-lg overflow-hidden">
          <thead className="bg-gray-800">
            <tr className="text-left">
              <th className="p-3 border-b border-gray-700">#</th>
              <th className="p-3 border-b border-gray-700">Tên dịch vụ</th>
              <th className="p-3 border-b border-gray-700">Giá (VND)</th>
              <th className="p-3 border-b border-gray-700">Mô tả</th>
              <th className="p-3 border-b border-gray-700 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, index) => (
              <tr key={service.id} className="hover:bg-gray-800 transition">
                <td className="p-3 border-b border-gray-700">{index + 1}</td>
                <td className="p-3 border-b border-gray-700">{service.name}</td>
                <td className="p-3 border-b border-gray-700">{service.price}</td>
                <td className="p-3 border-b border-gray-700">{service.desc}</td>
                <td className="p-3 border-b border-gray-700 flex justify-center">
                  <Button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">
                    ❌ Xóa
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServiceListPage;
