"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";
// import { useRouter } from "next/navigation";

type PaginationProps = {
  currentPage: number;
  total: number;
  lastPage: number;
};

const Pagination = ({ currentPage, total, lastPage }: PaginationProps) => {



  console.log(location.pathname)

  const page = currentPage ? currentPage : 1;

  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-slate-100">
      {page !== 1 && (
        <Link href={`${location.pathname}?page=${page - 1}`}>
          <Button variant="outline">
            <ChevronLeftIcon className="mr-1" />
            Prev
          </Button>
        </Link>
      )}
      <p className="text-xs font-medium text-slate-700">
        Page {page} of {lastPage} Pages
      </p>
      {page !== lastPage && (
        <Link href={`${location.pathname}?page=${page + 1}`}>
          <Button variant="outline">
            Next
            <ChevronRightIcon className="ml-1" />
          </Button>
        </Link>
      )}
    </div>
  );
};
export default Pagination;
