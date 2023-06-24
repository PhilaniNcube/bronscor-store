import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/schema'

export const getOrders = async () => {

    const supabase = createServerComponentClient<Database>({cookies})

    const {data:orders, error} = await supabase.from("orders").select('*')

    if (error) {
      throw new Error(error.message);
    }

    return orders

}

export const getOrderById = async (id:string) => {

    const supabase = createServerComponentClient<Database>({cookies})

    const {data:order, error} = await supabase.from("orders").select('*, customer_id(*)').eq('id', id).single()

    if (error) {
      throw new Error(error.message);
    }

    return order

}

export const updateOrderStatus = async (order:Database["public"]['Tables']['orders']['Row']) => {

    const supabase = createServerComponentClient<Database>({cookies})

    if(order.status === "paid") {
      return order
    } else if (order.status === "pending"){

         const {data:updatedOrder, error} = await supabase.from("orders").update({
      status: 'paid',
    }).eq('id', order.id).single()

    if (error) {
      throw new Error(error.message);
    }

     return updatedOrder

    } else {
      return order
    }



}
