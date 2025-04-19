export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      attendance: {
        Row: {
          created_at: string
          date: string
          employee_id: string
          hours_worked: number
          id: string
          late_minutes: number
          notes: string | null
          status: string
        }
        Insert: {
          created_at?: string
          date: string
          employee_id: string
          hours_worked: number
          id?: string
          late_minutes: number
          notes?: string | null
          status: string
        }
        Update: {
          created_at?: string
          date?: string
          employee_id?: string
          hours_worked?: number
          id?: string
          late_minutes?: number
          notes?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "attendance_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      employees: {
        Row: {
          age: number
          created_at: string
          department: string
          email: string
          first_name: string
          gender: string
          hire_date: string
          id: string
          last_name: string
          performance_score: number
          position: string
          salary: number
          updated_at: string
        }
        Insert: {
          age: number
          created_at?: string
          department: string
          email: string
          first_name: string
          gender: string
          hire_date: string
          id?: string
          last_name: string
          performance_score: number
          position: string
          salary: number
          updated_at?: string
        }
        Update: {
          age?: number
          created_at?: string
          department?: string
          email?: string
          first_name?: string
          gender?: string
          hire_date?: string
          id?: string
          last_name?: string
          performance_score?: number
          position?: string
          salary?: number
          updated_at?: string
        }
        Relationships: []
      }
      performance_reviews: {
        Row: {
          comments: string | null
          communication_score: number
          created_at: string
          employee_id: string
          id: string
          leadership_score: number
          overall_score: number
          review_date: string
          reviewer_id: string
          teamwork_score: number
          technical_score: number
        }
        Insert: {
          comments?: string | null
          communication_score: number
          created_at?: string
          employee_id: string
          id?: string
          leadership_score: number
          overall_score: number
          review_date: string
          reviewer_id: string
          teamwork_score: number
          technical_score: number
        }
        Update: {
          comments?: string | null
          communication_score?: number
          created_at?: string
          employee_id?: string
          id?: string
          leadership_score?: number
          overall_score?: number
          review_date?: string
          reviewer_id?: string
          teamwork_score?: number
          technical_score?: number
        }
        Relationships: [
          {
            foreignKeyName: "performance_reviews_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_age_distribution: {
        Args: Record<PropertyKey, never>
        Returns: {
          range: string
          count: number
        }[]
      }
      get_department_stats: {
        Args: Record<PropertyKey, never>
        Returns: {
          department: string
          employeecount: number
          averagesalary: number
          averageperformance: number
        }[]
      }
      get_salary_distribution: {
        Args: Record<PropertyKey, never>
        Returns: {
          range: string
          count: number
        }[]
      }
      get_tenure_distribution: {
        Args: Record<PropertyKey, never>
        Returns: {
          range: string
          count: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
