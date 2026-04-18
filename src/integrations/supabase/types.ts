export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      diagram_exemplars: {
        Row: {
          board: string | null
          created_at: string
          diagram_type: string
          exemplar_image_url: string | null
          exemplar_text: string
          id: string
          mark_level: string
          tags: string[]
        }
        Insert: {
          board?: string | null
          created_at?: string
          diagram_type: string
          exemplar_image_url?: string | null
          exemplar_text: string
          id?: string
          mark_level?: string
          tags?: string[]
        }
        Update: {
          board?: string | null
          created_at?: string
          diagram_type?: string
          exemplar_image_url?: string | null
          exemplar_text?: string
          id?: string
          mark_level?: string
          tags?: string[]
        }
        Relationships: []
      }
      diagram_mark_schemes: {
        Row: {
          accepted_labels: string[]
          board: string | null
          component_name: string
          created_at: string
          diagram_type: string
          id: string
          mark_value: number
          notes: string | null
          positional_required: boolean
          strict_mode: boolean
          updated_at: string
        }
        Insert: {
          accepted_labels?: string[]
          board?: string | null
          component_name: string
          created_at?: string
          diagram_type: string
          id?: string
          mark_value?: number
          notes?: string | null
          positional_required?: boolean
          strict_mode?: boolean
          updated_at?: string
        }
        Update: {
          accepted_labels?: string[]
          board?: string | null
          component_name?: string
          created_at?: string
          diagram_type?: string
          id?: string
          mark_value?: number
          notes?: string | null
          positional_required?: boolean
          strict_mode?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      diagram_marking_results: {
        Row: {
          answer_type: string
          component_results: Json
          created_at: string
          diagram_type: string
          difficulty: string
          examiner_report: Json | null
          feedback_text: string | null
          id: string
          marks_awarded: number
          question_text: string | null
          retry_of: string | null
          scenario_id: string | null
          student_answer: string | null
          topic: string
          total_marks: number
          user_id: string
        }
        Insert: {
          answer_type?: string
          component_results?: Json
          created_at?: string
          diagram_type: string
          difficulty?: string
          examiner_report?: Json | null
          feedback_text?: string | null
          id?: string
          marks_awarded?: number
          question_text?: string | null
          retry_of?: string | null
          scenario_id?: string | null
          student_answer?: string | null
          topic: string
          total_marks: number
          user_id: string
        }
        Update: {
          answer_type?: string
          component_results?: Json
          created_at?: string
          diagram_type?: string
          difficulty?: string
          examiner_report?: Json | null
          feedback_text?: string | null
          id?: string
          marks_awarded?: number
          question_text?: string | null
          retry_of?: string | null
          scenario_id?: string | null
          student_answer?: string | null
          topic?: string
          total_marks?: number
          user_id?: string
        }
        Relationships: []
      }
      diagram_misconceptions: {
        Row: {
          correct_explanation: string | null
          created_at: string
          diagram_type: string
          frequency_count: number
          id: string
          misconception_text: string
          severity: string
        }
        Insert: {
          correct_explanation?: string | null
          created_at?: string
          diagram_type: string
          frequency_count?: number
          id?: string
          misconception_text: string
          severity?: string
        }
        Update: {
          correct_explanation?: string | null
          created_at?: string
          diagram_type?: string
          frequency_count?: number
          id?: string
          misconception_text?: string
          severity?: string
        }
        Relationships: []
      }
      econ_knowledge_nodes: {
        Row: {
          bloom_level: string
          created_at: string
          embedding: string | null
          id: string
          keywords: string[]
          mark_allocation: number
          paper: string
          question_stem: string | null
          related_topics: string[]
          subject: string
          subtopic: string
          topic: string
        }
        Insert: {
          bloom_level: string
          created_at?: string
          embedding?: string | null
          id?: string
          keywords?: string[]
          mark_allocation?: number
          paper: string
          question_stem?: string | null
          related_topics?: string[]
          subject?: string
          subtopic: string
          topic: string
        }
        Update: {
          bloom_level?: string
          created_at?: string
          embedding?: string | null
          id?: string
          keywords?: string[]
          mark_allocation?: number
          paper?: string
          question_stem?: string | null
          related_topics?: string[]
          subject?: string
          subtopic?: string
          topic?: string
        }
        Relationships: []
      }
      email_send_log: {
        Row: {
          created_at: string
          error_message: string | null
          id: string
          message_id: string | null
          metadata: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email?: string
          status?: string
          template_name?: string
        }
        Relationships: []
      }
      email_send_state: {
        Row: {
          auth_email_ttl_minutes: number
          batch_size: number
          id: number
          retry_after_until: string | null
          send_delay_ms: number
          transactional_email_ttl_minutes: number
          updated_at: string
        }
        Insert: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Update: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Relationships: []
      }
      email_unsubscribe_tokens: {
        Row: {
          created_at: string
          email: string
          id: string
          token: string
          used_at: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          token: string
          used_at?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          token?: string
          used_at?: string | null
        }
        Relationships: []
      }
      fingerprint_whitelist: {
        Row: {
          created_at: string
          fingerprint_a_id: string
          fingerprint_b_id: string
          id: string
          reason: string | null
        }
        Insert: {
          created_at?: string
          fingerprint_a_id: string
          fingerprint_b_id: string
          id?: string
          reason?: string | null
        }
        Update: {
          created_at?: string
          fingerprint_a_id?: string
          fingerprint_b_id?: string
          id?: string
          reason?: string | null
        }
        Relationships: []
      }
      friendships: {
        Row: {
          addressee_id: string
          created_at: string
          id: string
          requester_id: string
          status: string
        }
        Insert: {
          addressee_id: string
          created_at?: string
          id?: string
          requester_id: string
          status?: string
        }
        Update: {
          addressee_id?: string
          created_at?: string
          id?: string
          requester_id?: string
          status?: string
        }
        Relationships: []
      }
      parent_links: {
        Row: {
          accepted_at: string | null
          created_at: string
          id: string
          invite_token: string
          parent_email: string
          parent_id: string | null
          status: string
          student_id: string
        }
        Insert: {
          accepted_at?: string | null
          created_at?: string
          id?: string
          invite_token?: string
          parent_email: string
          parent_id?: string | null
          status?: string
          student_id: string
        }
        Update: {
          accepted_at?: string | null
          created_at?: string
          id?: string
          invite_token?: string
          parent_email?: string
          parent_id?: string | null
          status?: string
          student_id?: string
        }
        Relationships: []
      }
      practice_sessions: {
        Row: {
          created_at: string | null
          duration_seconds: number | null
          feedback_summary: string | null
          id: string
          kaae_skills: Json | null
          marks_awarded: number | null
          max_score: number | null
          paper_id: string | null
          score_percent: number | null
          session_type: string
          status: string
          subject: string
          topic: string
          total_marks: number | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          duration_seconds?: number | null
          feedback_summary?: string | null
          id?: string
          kaae_skills?: Json | null
          marks_awarded?: number | null
          max_score?: number | null
          paper_id?: string | null
          score_percent?: number | null
          session_type?: string
          status?: string
          subject: string
          topic: string
          total_marks?: number | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          duration_seconds?: number | null
          feedback_summary?: string | null
          id?: string
          kaae_skills?: Json | null
          marks_awarded?: number | null
          max_score?: number | null
          paper_id?: string | null
          score_percent?: number | null
          session_type?: string
          status?: string
          subject?: string
          topic?: string
          total_marks?: number | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string | null
          exam_board: string | null
          exam_paper1_date: string | null
          exam_paper2_date: string | null
          exam_paper3_date: string | null
          free_diagrams_used: number
          free_papers_used: number
          free_predicted_papers_used: number
          free_questions_used: number
          free_tutor_used: number
          id: string
          onboarding_completed: boolean
          target_grade: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          exam_board?: string | null
          exam_paper1_date?: string | null
          exam_paper2_date?: string | null
          exam_paper3_date?: string | null
          free_diagrams_used?: number
          free_papers_used?: number
          free_predicted_papers_used?: number
          free_questions_used?: number
          free_tutor_used?: number
          id?: string
          onboarding_completed?: boolean
          target_grade?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          exam_board?: string | null
          exam_paper1_date?: string | null
          exam_paper2_date?: string | null
          exam_paper3_date?: string | null
          free_diagrams_used?: number
          free_papers_used?: number
          free_predicted_papers_used?: number
          free_questions_used?: number
          free_tutor_used?: number
          id?: string
          onboarding_completed?: boolean
          target_grade?: string | null
          user_id?: string
        }
        Relationships: []
      }
      question_embeddings: {
        Row: {
          bloom_level: string
          created_at: string
          embedding: string | null
          id: string
          marks: number
          paper: string
          question_text: string
          subject: string
          tags: string[]
          topic: string
          year: string | null
        }
        Insert: {
          bloom_level?: string
          created_at?: string
          embedding?: string | null
          id?: string
          marks: number
          paper: string
          question_text: string
          subject: string
          tags?: string[]
          topic: string
          year?: string | null
        }
        Update: {
          bloom_level?: string
          created_at?: string
          embedding?: string | null
          id?: string
          marks?: number
          paper?: string
          question_text?: string
          subject?: string
          tags?: string[]
          topic?: string
          year?: string | null
        }
        Relationships: []
      }
      question_fingerprints: {
        Row: {
          created_at: string
          id: string
          marks: number
          mcq_answer_value: string | null
          mcq_concept: string | null
          normalised_text: string
          paper_code: string
          paper_id: string | null
          question_number: string
          scenario_key: string | null
          section: string
          semantic_core: string
          set_label: string
          token_set: string[]
          whitelisted_pair_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          marks: number
          mcq_answer_value?: string | null
          mcq_concept?: string | null
          normalised_text: string
          paper_code: string
          paper_id?: string | null
          question_number: string
          scenario_key?: string | null
          section: string
          semantic_core: string
          set_label: string
          token_set?: string[]
          whitelisted_pair_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          marks?: number
          mcq_answer_value?: string | null
          mcq_concept?: string | null
          normalised_text?: string
          paper_code?: string
          paper_id?: string | null
          question_number?: string
          scenario_key?: string | null
          section?: string
          semantic_core?: string
          set_label?: string
          token_set?: string[]
          whitelisted_pair_id?: string | null
        }
        Relationships: []
      }
      reports: {
        Row: {
          board: string | null
          category: string
          created_at: string
          description: string
          id: string
          page: string
          paper_code: string | null
          question_number: string | null
          session_id: string
          status: string
          user_email: string | null
        }
        Insert: {
          board?: string | null
          category: string
          created_at?: string
          description: string
          id?: string
          page: string
          paper_code?: string | null
          question_number?: string | null
          session_id: string
          status?: string
          user_email?: string | null
        }
        Update: {
          board?: string | null
          category?: string
          created_at?: string
          description?: string
          id?: string
          page?: string
          paper_code?: string | null
          question_number?: string | null
          session_id?: string
          status?: string
          user_email?: string | null
        }
        Relationships: []
      }
      suppressed_emails: {
        Row: {
          created_at: string
          email: string
          id: string
          metadata: Json | null
          reason: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          metadata?: Json | null
          reason: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          metadata?: Json | null
          reason?: string
        }
        Relationships: []
      }
      user_activity_log: {
        Row: {
          created_at: string
          event_type: string
          feature: string | null
          id: string
          metadata: Json | null
          session_duration_seconds: number | null
          user_id: string
        }
        Insert: {
          created_at?: string
          event_type: string
          feature?: string | null
          id?: string
          metadata?: Json | null
          session_duration_seconds?: number | null
          user_id: string
        }
        Update: {
          created_at?: string
          event_type?: string
          feature?: string | null
          id?: string
          metadata?: Json | null
          session_duration_seconds?: number | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      accept_parent_invite: { Args: { token: string }; Returns: boolean }
      delete_email: {
        Args: { message_id: number; queue_name: string }
        Returns: boolean
      }
      enqueue_email: {
        Args: { payload: Json; queue_name: string }
        Returns: number
      }
      get_child_profiles: {
        Args: { p_parent_id: string }
        Returns: {
          display_name: string
          student_email: string
          user_id: string
        }[]
      }
      get_child_sessions: {
        Args: { p_parent_id: string }
        Returns: {
          created_at: string
          feedback_summary: string
          id: string
          score_percent: number
          session_type: string
          student_email: string
          subject: string
          topic: string
          user_id: string
        }[]
      }
      get_friend_scores: {
        Args: { requesting_user_id: string }
        Returns: {
          display_name: string
          score_avg: number
          session_count: number
          user_id: string
        }[]
      }
      is_own_profile: { Args: { profile_user_id: string }; Returns: boolean }
      move_to_dlq: {
        Args: {
          dlq_name: string
          message_id: number
          payload: Json
          source_queue: string
        }
        Returns: number
      }
      read_email_batch: {
        Args: { batch_size: number; queue_name: string; vt: number }
        Returns: {
          message: Json
          msg_id: number
          read_ct: number
        }[]
      }
      search_similar_questions: {
        Args: {
          match_count?: number
          match_subject?: string
          query_embedding: string
        }
        Returns: {
          bloom_level: string
          id: string
          marks: number
          question_text: string
          similarity: number
          tags: string[]
          topic: string
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
