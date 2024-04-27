"use client"
import { useState } from "react"
import Image from "next/image"
import { MenuIcon, ShoppingBag, UserIcon, UserMinusIcon } from "lucide-react";
import SignUp from "../Modals/SignUp";

import type { User } from "@supabase/supabase-js";
import { Button } from "../ui/button";
import SignIn from "../Modals/SignIn";
import type { Database } from "@/schema";
import { totalCartItemsSelector } from "@/app/store/features/cartSlice";
import { useSelector } from "react-redux";
import Link from "next/link"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { signOutAction } from "@/utils/actions/sign-out-action";

type Props = {
  user: User | null;
  categories: Database["public"]["Tables"]["categories"]["Row"][];
};

const MobileNav = ({user, categories}:Props) => {

 const qty = useSelector(totalCartItemsSelector);


  return (
			<nav className="flex py-2 justify-center items-center md:hidden bg-black z-[9999]">
				<div className="flex items-center justify-between w-full">
					<Link href="/">
						<Image
							src="/images/express-transparent.png"
							width={822}
							height={303}
							alt="logo"
							className="object-cover w-24"
						/>
					</Link>
					<div className="flex items-center justify-end flex-1">
						<Link href="/cart" className="relative">
							<ShoppingBag className="text-amber-500" />
							{qty > 0 && (
								<span className="absolute flex items-center justify-center w-4 h-4 text-xs text-white bg-red-600 rounded-full -top-2 -right-2">
									{qty}
								</span>
							)}
						</Link>
						<Sheet>
							<SheetTrigger asChild>
								<Button className="" variant="ghost">
									<MenuIcon className="text-amber-500" size={24} />
								</Button>
							</SheetTrigger>
							<SheetContent className="text-gray-900 w-[300px]">
								<SheetHeader>
									<SheetTitle>Menu</SheetTitle>
								</SheetHeader>
								<div className="flex flex-col w-full p-3 space-y-4">
									{categories.map((category) => (
										<Link
											key={category.id}
											href={`/categories/${category.slug}`}
										>
											{category.name}
										</Link>
									))}
									<Link href="/steel">Steel</Link>
									<SheetFooter>
										{user === null || !user ? (
											<div>
												<SignIn />
												<SignUp />
											</div>
										) : (
											<div className="flex flex-col space-y-4">
												<Link href="/account" className="flex space-x-2">
													<UserIcon className="text-gray-900 border border-gray-900 rounded-full" />
													<span>My Account</span>
												</Link>
												<form action={signOutAction}>
													<Button
														type="submit"
														variant="ghost"
														className="text-amber-500"
													>
														Logout&nbsp; <UserMinusIcon size={16} />
													</Button>
												</form>
											</div>
										)}
									</SheetFooter>
								</div>
							</SheetContent>
						</Sheet>
					</div>
				</div>
			</nav>
		);
};
export default MobileNav;
