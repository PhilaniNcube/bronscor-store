"use client";

import {
  Fragment,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  SupabaseClient,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { Database } from "@/schema";
import { useRouter } from "next/navigation";

type SupabaseContext = {
  supabase: SupabaseClient<Database>;
};

const Context = createContext<SupabaseContext | undefined>(undefined);

const SupabaseProvider = ({ children }: { children: React.ReactNode }) => {
  const [supabase] = useState(() => createClientComponentClient<Database>());
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      router.refresh();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, supabase]);

  return (
    <Context.Provider value={{ supabase }}>
      <div>{children}</div>
    </Context.Provider>
  );
};

export default SupabaseProvider;

export const useSupabase = () => {
  let context = useContext(Context);
  if (context === undefined) {

    throw new Error("useSupabase must be used inside SupabaseProvider");
  } else {
    return context;
  }
};
