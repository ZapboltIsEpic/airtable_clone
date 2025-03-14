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
      _prisma_migrations: {
        Row: {
          applied_steps_count: number
          checksum: string
          finished_at: string | null
          id: string
          logs: string | null
          migration_name: string
          rolled_back_at: string | null
          started_at: string
        }
        Insert: {
          applied_steps_count?: number
          checksum: string
          finished_at?: string | null
          id: string
          logs?: string | null
          migration_name: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Update: {
          applied_steps_count?: number
          checksum?: string
          finished_at?: string | null
          id?: string
          logs?: string | null
          migration_name?: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Relationships: []
      }
      Base: {
        Row: {
          id: string
          name: string
          userId: string
        }
        Insert: {
          id: string
          name: string
          userId: string
        }
        Update: {
          id?: string
          name?: string
          userId?: string
        }
        Relationships: []
      }
      bases: {
        Row: {
          createdat: string | null
          id: string
          name: string
          updatedat: string | null
          userid: string
          workspace: string
        }
        Insert: {
          createdat?: string | null
          id?: string
          name: string
          updatedat?: string | null
          userid: string
          workspace: string
        }
        Update: {
          createdat?: string | null
          id?: string
          name?: string
          updatedat?: string | null
          userid?: string
          workspace?: string
        }
        Relationships: []
      }
      columns: {
        Row: {
          columncontent: string
          createdat: string | null
          fieldname: string
          id: string
          numberedid: number
          rowid: string
          updatedat: string | null
        }
        Insert: {
          columncontent: string
          createdat?: string | null
          fieldname: string
          id?: string
          numberedid?: number
          rowid: string
          updatedat?: string | null
        }
        Update: {
          columncontent?: string
          createdat?: string | null
          fieldname?: string
          id?: string
          numberedid?: number
          rowid?: string
          updatedat?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_row"
            columns: ["rowid"]
            isOneToOne: false
            referencedRelation: "rows"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          first_name: string | null
          id: string
          last_name: string | null
        }
        Insert: {
          first_name?: string | null
          id: string
          last_name?: string | null
        }
        Update: {
          first_name?: string | null
          id?: string
          last_name?: string | null
        }
        Relationships: []
      }
      rows: {
        Row: {
          createdat: string | null
          id: string
          numberedid: number
          tableid: string
          updatedat: string | null
        }
        Insert: {
          createdat?: string | null
          id?: string
          numberedid?: number
          tableid: string
          updatedat?: string | null
        }
        Update: {
          createdat?: string | null
          id?: string
          numberedid?: number
          tableid?: string
          updatedat?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_table"
            columns: ["tableid"]
            isOneToOne: false
            referencedRelation: "tables"
            referencedColumns: ["id"]
          },
        ]
      }
      tables: {
        Row: {
          baseid: string
          createdat: string | null
          id: string
          name: string
          numberedid: number
          updatedat: string | null
        }
        Insert: {
          baseid: string
          createdat?: string | null
          id?: string
          name: string
          numberedid?: number
          updatedat?: string | null
        }
        Update: {
          baseid?: string
          createdat?: string | null
          id?: string
          name?: string
          numberedid?: number
          updatedat?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_base"
            columns: ["baseid"]
            isOneToOne: false
            referencedRelation: "bases"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: Record<never, never>
    Functions: Record<never, never>
    Enums: Record<never, never>
    CompositeTypes: Record<never, never>
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

// export type Enums<
//   PublicEnumNameOrOptions extends
//     keyof PublicSchema["Enums"]
//     | { schema: keyof Database },
//   EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
//     ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
//     : never = never,
// > = PublicEnumNameOrOptions extends { schema: keyof Database }
//   ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
//   : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
//     ? PublicSchema["Enums"][PublicEnumNameOrOptions]
//     : never

// export type CompositeTypes<
//   PublicCompositeTypeNameOrOptions extends
//     | keyof PublicSchema["CompositeTypes"]
//     | { schema: keyof Database },
//   CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
//     schema: keyof Database
//   }
//     ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
//     : never = never,
// > = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
//   ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
//   : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
//     ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
//     : never
