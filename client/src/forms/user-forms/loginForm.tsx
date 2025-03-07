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
import { loginSchema } from "@/schemas/auth.schema";
import { UserCredentials } from "@/types/auth.types";
import { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchLoginUser } from "@/api/services/authServices";

const defaultValues = {
  email: "",
  password: "",
};

export function LoginForm() {
  const navigate = useNavigate();
  const form = useForm<UserCredentials>({
    defaultValues,
    resolver: zodResolver(loginSchema),
  });

  const dispatch = useDispatch<AppDispatch>();
  const { error, isLoading } = useSelector((state: RootState) => state.user);

  const onSubmit = async (data: UserCredentials) => {
    const resultAction = await dispatch(fetchLoginUser(data));

    if (fetchLoginUser.fulfilled.match(resultAction)) {
      form.reset();
      const accessToken = resultAction.payload.data.accessToken;
      const refreshToken = resultAction.payload.data.refreshToken;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      navigate("/");
    }
  };

  return (
    <div className="flex flex-1 items-center justify-center min-h-svh bg-black">
      <Card className="w-[550px] bg-white border-black">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-black">Login</CardTitle>
          <CardDescription className="text-gray-600">
            Enter your email and password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
              {error && <p className="text-red-600">{error}</p>}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-black text-white hover:bg-gray-900"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    Loading...
                  </div>
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginForm;