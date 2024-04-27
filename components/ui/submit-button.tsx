"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./button";
import { cn } from "@/lib/utils";

export function SubmitButton({className}:{className?:string}) {
	const { pending } = useFormStatus();

	return (
		<Button
			type="submit"
			disabled={pending}
			className={cn(className, "min-w-[180px]")}
		>
			{pending ? "Loading..." : "Submit"}
		</Button>
	);
}
