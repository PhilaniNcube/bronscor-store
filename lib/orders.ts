"use server"

import type { Database } from '@/schema';
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache';

export const getOrders = async () => {

    const supabase = createClient()

    const {data:orders, error} = await supabase.from("orders").select('*')

    if (error) {
      throw new Error(error.message);
    }

    return orders

}

export const getOrderById = async (id:string) => {

    const supabase = createClient()

    const {data:order, error} = await supabase.from("orders").select('*, customer_id(*)').eq('id', id).single()

    if (error) {
      throw new Error(error.message);
    }

    return order

}

export const updateOrderStatus = async (order:Database["public"]['Tables']['orders']['Row']) => {

    const supabase = createClient()

    if(order.status === "paid") {
      return order
    }

        const {data, error} = await supabase.from("orders").update({
      status: 'paid',
    }).eq('id', order.id).single()

    if (error) {
      throw new Error(error.message);
    }

    console.log({data, order})

    revalidatePath(`/account/orders/${order.id}`)

     return data

}


export const getMyOrders = async (customerId:string) => {

    const supabase = createClient()

    const {data:order, error} = await supabase.from("orders").select('*, customer_id(*)').eq('customer_id', customerId)

    if (error) {
      throw new Error(error.message);
    }

    return order

}


export const getPaidOrders = async () => {
  const supabase = createClient()

  const {data:orders, error, count} = await supabase.from("orders").select('*', {count: "exact"}).eq('status', 'paid')

  if (error) {
    throw new Error(error.message);
  }

  return {
    orders,
    count
  }

}


export const getAllOrders = async (page = 1, page_size = 8) => {
  const start = (page - 1) * page_size;
  const end = page * page_size - 1

  const supabase = createClient()

    const {data:orders, error, count} = await supabase.from("orders").select('*, customer_id(first_name, last_name)', {count: "exact"}).range(start, end).order('created_at', {ascending: true})

  if (error) {
    throw new Error(error.message);
  }

  return {
    orders,
    count
  }
}
