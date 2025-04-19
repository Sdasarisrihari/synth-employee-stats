
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      employees: {
        Row: {
          id: string
          first_name: string
          last_name: string
          email: string
          gender: string
          age: number
          department: string
          position: string
          salary: number
          hire_date: string
          performance_score: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          first_name: string
          last_name: string
          email: string
          gender: string
          age: number
          department: string
          position: string
          salary: number
          hire_date: string
          performance_score: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          first_name?: string
          last_name?: string
          email?: string
          gender?: string
          age?: number
          department?: string
          position?: string
          salary?: number
          hire_date?: string
          performance_score?: number
          created_at?: string
          updated_at?: string
        }
      }
      attendance: {
        Row: {
          id: string
          employee_id: string
          date: string
          status: string
          hours_worked: number
          late_minutes: number
          notes: string
          created_at: string
        }
        Insert: {
          id?: string
          employee_id: string
          date: string
          status: string
          hours_worked: number
          late_minutes: number
          notes?: string
          created_at?: string
        }
        Update: {
          id?: string
          employee_id?: string
          date?: string
          status?: string
          hours_worked?: number
          late_minutes?: number
          notes?: string
          created_at?: string
        }
      }
      performance_reviews: {
        Row: {
          id: string
          employee_id: string
          review_date: string
          reviewer_id: string
          communication_score: number
          teamwork_score: number
          technical_score: number
          leadership_score: number
          overall_score: number
          comments: string
          created_at: string
        }
        Insert: {
          id?: string
          employee_id: string
          review_date: string
          reviewer_id: string
          communication_score: number
          teamwork_score: number
          technical_score: number
          leadership_score: number
          overall_score: number
          comments?: string
          created_at?: string
        }
        Update: {
          id?: string
          employee_id?: string
          review_date?: string
          reviewer_id?: string
          communication_score?: number
          teamwork_score?: number
          technical_score?: number
          leadership_score?: number
          overall_score?: number
          comments?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Insertable<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type Updatable<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']
