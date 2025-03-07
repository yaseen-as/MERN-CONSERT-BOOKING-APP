import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RootState } from "@/store";
import { User } from "lucide-react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';

export default function MainNav() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.user);

  return (
    <div>
      {isAuthenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="text-black hover:bg-gray-100 text-2xl rounded-sm">
              <div className="flex flex-row justify-between items-center gap-2 p-1">
                <User className="text-white" />
                {user?.name}
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white border-black">
            <DropdownMenuItem className="hover:bg-gray-100">
              <Link to="/user-profile">
                <div className="flex flex-row justify-between gap-2 p-1">
                  <User className="text-black" />
                  <span className="text-black">{user?.name}</span>
                </div>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-gray-200" />
            <DropdownMenuItem className="hover:bg-gray-100">
              <Link to="/order-status" className="font-bold text-black hover:text-gray-700">
                Update user
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-gray-200" />
            <DropdownMenuItem className="hover:bg-gray-100">
              <Button className="w-full bg-black text-white hover:bg-gray-900">
                Logout
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            className="text-white hover:bg-gray-100 hover:text-black text-2xl"
            onClick={() => navigate("login")}
          >
            Login
          </Button>
          <Button
            variant="ghost"
            className="text-white hover:bg-gray-100 hover:text-black text-2xl"
            onClick={() => navigate("register")}
          >
            Register
          </Button>
        </div>
      )}
    </div>
  );
}