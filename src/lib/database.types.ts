export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          name: string;
          icon: string;
          color: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          icon: string;
          color?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          icon?: string;
          color?: string;
          created_at?: string;
        };
      };
      locations: {
        Row: {
          id: string;
          name: string;
          description: string;
          short_description: string;
          latitude: number;
          longitude: number;
          category_id: string | null;
          images: string[];
          city: string;
          region: string;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string;
          short_description?: string;
          latitude: number;
          longitude: number;
          category_id?: string | null;
          images?: string[];
          city?: string;
          region?: string;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          short_description?: string;
          latitude?: number;
          longitude?: number;
          category_id?: string | null;
          images?: string[];
          city?: string;
          region?: string;
          is_active?: boolean;
          created_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          full_name: string;
          phone: string;
          email: string;
          transport_class: string;
          needs_accommodation: boolean;
          needs_airport_pickup: boolean;
          needs_guide: boolean;
          number_of_people: number;
          travel_date: string | null;
          additional_notes: string;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          phone: string;
          email?: string;
          transport_class?: string;
          needs_accommodation?: boolean;
          needs_airport_pickup?: boolean;
          needs_guide?: boolean;
          number_of_people?: number;
          travel_date?: string | null;
          additional_notes?: string;
          status?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          phone?: string;
          email?: string;
          transport_class?: string;
          needs_accommodation?: boolean;
          needs_airport_pickup?: boolean;
          needs_guide?: boolean;
          number_of_people?: number;
          travel_date?: string | null;
          additional_notes?: string;
          status?: string;
          created_at?: string;
        };
      };
      order_locations: {
        Row: {
          id: string;
          order_id: string;
          location_id: string;
          order_index: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          location_id: string;
          order_index?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          location_id?: string;
          order_index?: number;
          created_at?: string;
        };
      };
    };
  };
}

export type Category = Database['public']['Tables']['categories']['Row'];
export type Location = Database['public']['Tables']['locations']['Row'];
export type Order = Database['public']['Tables']['orders']['Row'];
export type OrderLocation = Database['public']['Tables']['order_locations']['Row'];

export interface LocationWithCategory extends Location {
  category: Category | null;
}
