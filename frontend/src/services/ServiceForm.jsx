import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Service Form Component
export function ServiceForm({ onSubmit, defaultValues }) {
  const { register, handleSubmit } = useForm({ defaultValues });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 bg-white rounded-xl shadow-md">
      <Input {...register("name")} placeholder="Service Name" required />
      <Input {...register("price")} placeholder="Price" type="number" required />
      <Button type="submit">Save</Button>
    </form>
  );
}