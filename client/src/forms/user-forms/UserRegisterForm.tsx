import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerSchema } from "@/schemas/auth.schema";
import { fetchRegisterUser } from "@/api/services/authServices";
import { RegisterUserData, UserRole } from "@/types/auth.types";


const defaultValues = {
  name: "",
  email: "",
  phoneNumber: "",
  password: "",
  role: "USER" as UserRole,
};

export function UserRegisterForm() {
  const navigate = useNavigate();
  const form = useForm<RegisterUserData>({
    defaultValues,
    resolver: zodResolver(registerSchema),
  });

  const dispatch = useDispatch<AppDispatch>();
  const { error, isLoading } = useSelector((state: RootState) => state.user);

  const onSubmit = async (data: RegisterUserData) => {
    const resultAction = await dispatch(fetchRegisterUser(data));

    if (fetchRegisterUser.fulfilled.match(resultAction)) {
      form.reset();
      navigate("/login");
    }
  };

  return (
    <div className="flex flex-1 items-center justify-center min-h-svh bg-black">
      <Card className="w-[550px] bg-white border-black">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-black">
            Register
          </CardTitle>
          <CardDescription className="text-gray-600">
            Create a new account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Enter your name"
                        className="bg-white text-black border-black focus:border-black"
                      />
                    </FormControl>
                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="Enter your email"
                        className="bg-white text-black border-black focus:border-black"
                      />
                    </FormControl>
                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="tel"
                        placeholder="Enter your phone number"
                        className="bg-white text-black border-black focus:border-black"
                      />
                    </FormControl>
                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Enter your password"
                        className="bg-white text-black border-black focus:border-black"
                      />
                    </FormControl>
                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">Role</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="bg-white text-black border-black focus:border-black w-full p-2 rounded-md"
                      >
                        <option value="ADMIN">Admin</option>
                        <option value="USER">User</option>
                      </select>
                    </FormControl>
                    <FormMessage className="text-red-600" />
                  </FormItem>
                )}
              />
              {error && <p className="text-red-600">{error}</p>}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-black text-white hover:bg-gray-900"
              >
                {isLoading ? (
                  <div className="flex items-center">Loading...</div>
                ) : (
                  "Register"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default UserRegisterForm;