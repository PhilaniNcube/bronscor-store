export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      admins: {
        Row: {
          id: string
          created_at: string
          user_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          user_id?: string
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
        }
      }
      brands: {
        Row: {
          id: number
          created_at: string
          name: string
          slug: string
          description: string
        }
        Insert: {
          id?: number
          created_at?: string
          name?: string
          slug?: string
          description?: string
        }
        Update: {
          id?: number
          created_at?: string
          name?: string
          slug?: string
          description?: string
        }
      }
      categories: {
        Row: {
          id: number
          created_at: string
          name: string
          slug: string
        }
        Insert: {
          id?: number
          created_at?: string
          name: string
          slug: string
        }
        Update: {
          id?: number
          created_at?: string
          name?: string
          slug?: string
        }
      }
      order_items: {
        Row: {
          order_id: string
          created_at: string
          product_id: string
          quantity: number
          price: number
          subtotal: number
        }
        Insert: {
          order_id: string
          created_at?: string
          product_id: string
          quantity?: number
          price?: number
          subtotal?: number
        }
        Update: {
          order_id?: string
          created_at?: string
          product_id?: string
          quantity?: number
          price?: number
          subtotal?: number
        }
      }
      orders: {
        Row: {
          id: string
          created_at: string
          customer_id: string
          status: string
          shipping_address: Json
          payment_method: string
          total_amount: number
        }
        Insert: {
          id: string
          created_at?: string
          customer_id?: string
          status?: string
          shipping_address?: Json
          payment_method?: string
          total_amount?: number
        }
        Update: {
          id?: string
          created_at?: string
          customer_id?: string
          status?: string
          shipping_address?: Json
          payment_method?: string
          total_amount?: number
        }
      }
      products: {
        Row: {
          id: string
          created_at: string
          name: string
          slug: string
          image: string
          description: string
          item_id: string
          short_description: string
          demensions: Json
          price: number
          brand_id: number
          category_id: number
          in_stock: boolean
          featured: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          name?: string
          slug: string
          image?: string
          description?: string
          item_id?: string
          short_description?: string
          demensions?: Json
          price?: number
          brand_id?: number
          category_id?: number
          in_stock?: boolean
          featured?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          slug?: string
          image?: string
          description?: string
          item_id?: string
          short_description?: string
          demensions?: Json
          price?: number
          brand_id?: number
          category_id?: number
          in_stock?: boolean
          featured?: boolean
        }
      }
      profiles: {
        Row: {
          id: string
          first_name: string
          last_name: string
        }
        Insert: {
          id: string
          first_name?: string
          last_name?: string
        }
        Update: {
          id?: string
          first_name?: string
          last_name?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}

