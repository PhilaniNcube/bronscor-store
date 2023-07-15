import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserIcon } from "lucide-react";

const AccountDropDown = async () => {



  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-amber-500 outline-none">
        <UserIcon className="w-6 h-6" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="text-amber-500">
        <DropdownMenuLabel>User Details</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/account">Account</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Profile</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default AccountDropDown;
