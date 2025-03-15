import { useQuery, useMutation } from "@apollo/client";
import { GET_SERVICE, UPDATE_SERVICE } from "@/graphql/queries";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Input, Textarea } from "@/components/ui";

const ServiceEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(GET_SERVICE, { variables: { id } });
  const [updateService] = useMutation(UPDATE_SERVICE, {
    refetchQueries: [{ query: GET_SERVICE, variables: { id } }],
    onCompleted: () => navigate("/services"),
  });

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (data?.service) {
      setName(data.service.name);
      setPrice(data.service.price.toString());
      setDescription(data.service.description);
    }
  }, [data]);

  if (loading) return <p className="text-white">Đang tải dữ liệu...</p>;
  if (error) return <p className="text-red-500">Lỗi khi tải dịch vụ!</p>;

  const handleSubmit = () => {
    if (!name || !price || !description) return alert("Vui lòng nhập đầy đủ thông tin!");
    updateService({ variables: { id, name, price: parseFloat(price), description } });
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-4">✏️ Chỉnh Sửa Dịch Vụ</h1>
      
      <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Tên dịch vụ" />
      <Input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Giá (VND)" />
      <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Mô tả" />
      
      <Button onClick={handleSubmit} className="mt-4">✅ Cập Nhật</Button>
    </div>
  );
};

export default ServiceEditPage;
