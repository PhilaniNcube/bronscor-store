"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import { useRouter } from "next/navigation";

type PaginationProps = {
  currentPage: number;
  total: number;
  lastPage: number;
};

const Pagination = ({ currentPage, total, lastPage }: PaginationProps) => {

  const pathname = usePathname();



  console.log(location.pathname)

  const page = currentPage ? currentPage : 1;

  return (
    <div className="flex items-center justify-between p-3 text-gray-900 rounded-lg bg-slate-100">
      {page !== 1 && (
        <Link href={`${pathname}?page=${page - 1}`}>
          <Button variant="secondary">
            <ChevronLeftIcon className="mr-1" />
            Prev
          </Button>
        </Link>
      )}
      <p className="text-xs font-medium">
        Page {page} of {lastPage} Pages
      </p>
      {page !== lastPage && (
        <Link href={`${pathname}?page=${page + 1}`}>
          <Button variant="secondary">
            Next
            <ChevronRightIcon className="ml-1" />
          </Button>
        </Link>
      )}
    </div>
  );
};
export default Pagination;
