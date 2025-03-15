import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_SERVICE, GET_SERVICES } from "@/graphql/queries";
import { useNavigate } from "react-router-dom";
import { Button, Input, Textarea } from "@/components/ui";

const ServiceCreatePage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [createService, { loading, error }] = useMutation(CREATE_SERVICE, {
    refetchQueries: [{ query: GET_SERVICES }],
    onCompleted: () => navigate("/services"),
  });

  const handleSubmit = () => {
    if (!name || !price || !description) return alert("Vui lòng nhập đầy đủ thông tin!");
    createService({ variables: { name, price: parseFloat(price), description } });
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-4">➕ Thêm Dịch Vụ</h1>
      {error && <p className="text-red-500">Lỗi khi thêm dịch vụ!</p>}
      
      <Input placeholder="Tên dịch vụ" value={name} onChange={(e) => setName(e.target.value)} />
      <Input placeholder="Giá (VND)" value={price} onChange={(e) => setPrice(e.target.value)} />
      <Textarea placeholder="Mô tả" value={description} onChange={(e) => setDescription(e.target.value)} />
      
      <Button onClick={handleSubmit} disabled={loading} className="mt-4">
        {loading ? "Đang tạo..." : "✅ Lưu Dịch Vụ"}
      </Button>
    </div>
  );
};

export default ServiceCreatePage;
