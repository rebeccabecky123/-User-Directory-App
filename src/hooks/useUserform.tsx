import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  age: z.number().min(18, "You must be 18 or older"),
});

export type FormData = z.infer<typeof schema>;

export const useUserForm = () => {
  return useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onTouched",
  });
};
