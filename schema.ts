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
          shipping_address: {
            city: string
            code: string
            company?: string | null
            country: string
            local_area: string
            phone: string
            street_address: string
            type: string
            zone: string
          }
          payment_method: string
          total_amount: number
          tracking_number:string | null
          order_items: CartItem[]
        }
        Insert: {
          id?: string
          created_at?: string
          customer_id?: string
          status?: string
          shipping_address?: {
            city: string
            code: string
            company?: string | null
            country: string
            local_area: string
            phone: string
            street_address: string
            type: string
            zone: string
          }
          payment_method?: string
          total_amount?: number
          tracking_number?:string
          order_items: CartItem[]
        }
        Update: {
          id?: string
          created_at?: string
          customer_id?: string
          status?: string
          shipping_address?: {
            city: string
            code: string
            company?: string | null
            country: string
            local_area: string
            phone: string
            street_address: string
            type: string
            zone: string
          }
          payment_method?: string
          total_amount?: number
          tracking_number?:string
          order_items?: CartItem[]
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
          dimensions?: {
            width?: number
            height?: number
            depth?: number
            weight?: number
          }
          price: number
          brand_id: {
            id: number
            name: string
            slug: string
            description: string
            created_at: string
          }
          category_id: Database['public']['Tables']['categories']['Row']
          in_stock: boolean
          featured: boolean
          details: {
            key: string
            value: string
          }[]
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
                 dimensions?: {
            width?: number
            height?: number
            depth?: number
            weight?: number
          }
          price?: number
          brand_id?: number
          category_id?: number
          in_stock?: boolean
          featured?: boolean
          details?: {
            key: string
            value: string
          }[]
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
          dimensions?: {
            width?: number
            height?: number
            depth?: number
            weight?: number
          }
          price?: number
          brand_id?: number
          category_id?: number
          in_stock?: boolean
          featured?: boolean
          details?: {
            key: string
            value: string
          }[]
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


export interface CartItem {
  product: Database['public']['Tables']['products']['Row']
  quantity: number
}
