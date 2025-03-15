import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui";

const NoPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-6xl font-bold mb-4">😢 404</h1>
      <p className="text-xl mb-6">Trang bạn tìm không tồn tại!</p>
      <Button onClick={() => navigate("/services")}>🏠 Quay về trang chính</Button>
    </div>
  );
};

export default NoPage;
