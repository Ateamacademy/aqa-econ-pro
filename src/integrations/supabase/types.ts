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
      ai_marking_cache: {
        Row: {
          analysis: Json
          cache_key: string
          created_at: string
          expires_at: string
          id: string
          question_id: string
        }
        Insert: {
          analysis: Json
          cache_key: string
          created_at?: string
          expires_at?: string
          id?: string
          question_id: string
        }
        Update: {
          analysis?: Json
          cache_key?: string
          created_at?: string
          expires_at?: string
          id?: string
          question_id?: string
        }
        Relationships: []
      }
      ai_usage_log: {
        Row: {
          cache_hit: boolean
          created_at: string
          id: string
          input_tokens: number | null
          model: string
          output_tokens: number | null
          paper_id: string | null
          provider: string
          question_id: string | null
          status: string
          user_id: string | null
        }
        Insert: {
          cache_hit?: boolean
          created_at?: string
          id?: string
          input_tokens?: number | null
          model: string
          output_tokens?: number | null
          paper_id?: string | null
          provider: string
          question_id?: string | null
          status?: string
          user_id?: string | null
        }
        Update: {
          cache_hit?: boolean
          created_at?: string
          id?: string
          input_tokens?: number | null
          model?: string
          output_tokens?: number | null
          paper_id?: string | null
          provider?: string
          question_id?: string | null
          status?: string
          user_id?: string | null
        }
        Relationships: []
      }
      class_invites: {
        Row: {
          accepted_at: string | null
          class_id: string
          created_at: string
          display_name: string | null
          email: string
          expires_at: string
          id: string
          invited_by: string
          target_grade: string | null
          token: string
        }
        Insert: {
          accepted_at?: string | null
          class_id: string
          created_at?: string
          display_name?: string | null
          email: string
          expires_at?: string
          id?: string
          invited_by: string
          target_grade?: string | null
          token?: string
        }
        Update: {
          accepted_at?: string | null
          class_id?: string
          created_at?: string
          display_name?: string | null
          email?: string
          expires_at?: string
          id?: string
          invited_by?: string
          target_grade?: string | null
          token?: string
        }
        Relationships: [
          {
            foreignKeyName: "class_invites_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
        ]
      }
      class_students: {
        Row: {
          class_id: string
          joined_at: string
          student_id: string
        }
        Insert: {
          class_id: string
          joined_at?: string
          student_id: string
        }
        Update: {
          class_id?: string
          joined_at?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "class_students_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
        ]
      }
      classes: {
        Row: {
          ability_set: string | null
          created_at: string
          exam_board: string | null
          id: string
          join_code: string
          name: string
          school_id: string
          subject: string | null
          teacher_id: string
          year_group: string | null
        }
        Insert: {
          ability_set?: string | null
          created_at?: string
          exam_board?: string | null
          id?: string
          join_code?: string
          name: string
          school_id: string
          subject?: string | null
          teacher_id: string
          year_group?: string | null
        }
        Update: {
          ability_set?: string | null
          created_at?: string
          exam_board?: string | null
          id?: string
          join_code?: string
          name?: string
          school_id?: string
          subject?: string | null
          teacher_id?: string
          year_group?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "classes_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      client_errors: {
        Row: {
          area: string | null
          component: string | null
          created_at: string
          id: string
          message: string
          meta: Json | null
          route: string | null
          stack: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          area?: string | null
          component?: string | null
          created_at?: string
          id?: string
          message: string
          meta?: Json | null
          route?: string | null
          stack?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          area?: string | null
          component?: string | null
          created_at?: string
          id?: string
          message?: string
          meta?: Json | null
          route?: string | null
          stack?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
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
      director_dashboard_access_log: {
        Row: {
          created_at: string
          id: string
          ip_address: string | null
          time_range: string | null
          user_agent: string | null
          viewer_email: string
          viewer_user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          ip_address?: string | null
          time_range?: string | null
          user_agent?: string | null
          viewer_email: string
          viewer_user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          ip_address?: string | null
          time_range?: string | null
          user_agent?: string | null
          viewer_email?: string
          viewer_user_id?: string | null
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
      grade_calculator_sessions: {
        Row: {
          confidence: string | null
          created_at: string
          exam_board: string
          id: string
          p3_max: number | null
          p3_required_target: number | null
          paper1_max: number | null
          paper1_score: number | null
          paper2_max: number | null
          paper2_score: number | null
          predicted_grade: string | null
          qualification: string
          target_grade: string
          user_id: string | null
        }
        Insert: {
          confidence?: string | null
          created_at?: string
          exam_board: string
          id?: string
          p3_max?: number | null
          p3_required_target?: number | null
          paper1_max?: number | null
          paper1_score?: number | null
          paper2_max?: number | null
          paper2_score?: number | null
          predicted_grade?: string | null
          qualification: string
          target_grade: string
          user_id?: string | null
        }
        Update: {
          confidence?: string | null
          created_at?: string
          exam_board?: string
          id?: string
          p3_max?: number | null
          p3_required_target?: number | null
          paper1_max?: number | null
          paper1_score?: number | null
          paper2_max?: number | null
          paper2_score?: number | null
          predicted_grade?: string | null
          qualification?: string
          target_grade?: string
          user_id?: string | null
        }
        Relationships: []
      }
      homework_assignments: {
        Row: {
          class_id: string
          content_json: Json
          created_at: string
          created_by: string
          difficulty: string | null
          due_date: string | null
          id: string
          mark_scheme_json: Json
          question_type: string | null
          status: string
          time_minutes: number | null
          title: string
          topic: string | null
        }
        Insert: {
          class_id: string
          content_json?: Json
          created_at?: string
          created_by: string
          difficulty?: string | null
          due_date?: string | null
          id?: string
          mark_scheme_json?: Json
          question_type?: string | null
          status?: string
          time_minutes?: number | null
          title: string
          topic?: string | null
        }
        Update: {
          class_id?: string
          content_json?: Json
          created_at?: string
          created_by?: string
          difficulty?: string | null
          due_date?: string | null
          id?: string
          mark_scheme_json?: Json
          question_type?: string | null
          status?: string
          time_minutes?: number | null
          title?: string
          topic?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "homework_assignments_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
        ]
      }
      homework_submissions: {
        Row: {
          ai_marks_json: Json | null
          ao_breakdown_json: Json | null
          assignment_id: string
          feedback_json: Json | null
          id: string
          response_json: Json
          status: string
          student_id: string
          submitted_at: string | null
          teacher_marks_json: Json | null
          total_score: number | null
        }
        Insert: {
          ai_marks_json?: Json | null
          ao_breakdown_json?: Json | null
          assignment_id: string
          feedback_json?: Json | null
          id?: string
          response_json?: Json
          status?: string
          student_id: string
          submitted_at?: string | null
          teacher_marks_json?: Json | null
          total_score?: number | null
        }
        Update: {
          ai_marks_json?: Json | null
          ao_breakdown_json?: Json | null
          assignment_id?: string
          feedback_json?: Json | null
          id?: string
          response_json?: Json
          status?: string
          student_id?: string
          submitted_at?: string | null
          teacher_marks_json?: Json | null
          total_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "homework_submissions_assignment_id_fkey"
            columns: ["assignment_id"]
            isOneToOne: false
            referencedRelation: "homework_assignments"
            referencedColumns: ["id"]
          },
        ]
      }
      interventions: {
        Row: {
          created_at: string
          detected_by_class_id: string
          id: string
          message: string | null
          resolved_at: string | null
          severity: string
          student_id: string
          type: string
        }
        Insert: {
          created_at?: string
          detected_by_class_id: string
          id?: string
          message?: string | null
          resolved_at?: string | null
          severity?: string
          student_id: string
          type: string
        }
        Update: {
          created_at?: string
          detected_by_class_id?: string
          id?: string
          message?: string | null
          resolved_at?: string | null
          severity?: string
          student_id?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "interventions_detected_by_class_id_fkey"
            columns: ["detected_by_class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
        ]
      }
      paid_users: {
        Row: {
          amount_paid: number | null
          created_at: string
          currency: string | null
          email: string
          expires_at: string
          id: string
          stripe_customer_id: string | null
          stripe_session_id: string | null
        }
        Insert: {
          amount_paid?: number | null
          created_at?: string
          currency?: string | null
          email: string
          expires_at: string
          id?: string
          stripe_customer_id?: string | null
          stripe_session_id?: string | null
        }
        Update: {
          amount_paid?: number | null
          created_at?: string
          currency?: string | null
          email?: string
          expires_at?: string
          id?: string
          stripe_customer_id?: string | null
          stripe_session_id?: string | null
        }
        Relationships: []
      }
      paper_feedback: {
        Row: {
          comment: string | null
          created_at: string
          difficulty: string
          exam_board: string
          id: string
          paper_label: string
          predicted_grade: string | null
          qualification: string
          user_id: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string
          difficulty: string
          exam_board: string
          id?: string
          paper_label?: string
          predicted_grade?: string | null
          qualification: string
          user_id?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string
          difficulty?: string
          exam_board?: string
          id?: string
          paper_label?: string
          predicted_grade?: string | null
          qualification?: string
          user_id?: string | null
        }
        Relationships: []
      }
      parent_emails: {
        Row: {
          body: string | null
          class_id: string
          created_by: string
          id: string
          sent_at: string | null
          student_id: string
          subject: string | null
          type: string | null
        }
        Insert: {
          body?: string | null
          class_id: string
          created_by: string
          id?: string
          sent_at?: string | null
          student_id: string
          subject?: string | null
          type?: string | null
        }
        Update: {
          body?: string | null
          class_id?: string
          created_by?: string
          id?: string
          sent_at?: string | null
          student_id?: string
          subject?: string | null
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "parent_emails_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
        ]
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
      pdf_diagram_failures: {
        Row: {
          context: Json
          created_at: string
          debug_enabled: boolean
          diagram_id: string | null
          failure_kind: string
          failure_message: string | null
          id: string
          paper_id: string
          question_number: string | null
          user_id: string
        }
        Insert: {
          context?: Json
          created_at?: string
          debug_enabled?: boolean
          diagram_id?: string | null
          failure_kind: string
          failure_message?: string | null
          id?: string
          paper_id: string
          question_number?: string | null
          user_id: string
        }
        Update: {
          context?: Json
          created_at?: string
          debug_enabled?: boolean
          diagram_id?: string | null
          failure_kind?: string
          failure_message?: string | null
          id?: string
          paper_id?: string
          question_number?: string | null
          user_id?: string
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
      predicted_paper_solutions: {
        Row: {
          created_at: string
          generated_by_user_id: string | null
          has_legacy_unmapped: boolean
          id: string
          legacy_unmapped_ids: string[]
          mark_scheme: Json
          marks: number
          migration_debug: Json
          paper_id: string
          question_number: string
          question_text: string | null
          schema_version: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          generated_by_user_id?: string | null
          has_legacy_unmapped?: boolean
          id?: string
          legacy_unmapped_ids?: string[]
          mark_scheme?: Json
          marks?: number
          migration_debug?: Json
          paper_id: string
          question_number: string
          question_text?: string | null
          schema_version?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          generated_by_user_id?: string | null
          has_legacy_unmapped?: boolean
          id?: string
          legacy_unmapped_ids?: string[]
          mark_scheme?: Json
          marks?: number
          migration_debug?: Json
          paper_id?: string
          question_number?: string
          question_text?: string | null
          schema_version?: number
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          department: string | null
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
          school_id: string | null
          target_grade: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          department?: string | null
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
          school_id?: string | null
          target_grade?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          department?: string | null
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
          school_id?: string | null
          target_grade?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_school_fk"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      qa_tracker_issues: {
        Row: {
          board: string
          category: string
          created_at: string
          description: string
          id: string
          metadata: Json
          paper_code: string
          paper_set: string | null
          question_number: string | null
          resolution_notes: string | null
          resolved_at: string | null
          resolved_by: string | null
          severity: string
          source: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          board?: string
          category: string
          created_at?: string
          description: string
          id?: string
          metadata?: Json
          paper_code: string
          paper_set?: string | null
          question_number?: string | null
          resolution_notes?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          severity?: string
          source?: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          board?: string
          category?: string
          created_at?: string
          description?: string
          id?: string
          metadata?: Json
          paper_code?: string
          paper_set?: string | null
          question_number?: string | null
          resolution_notes?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          severity?: string
          source?: string
          status?: string
          title?: string
          updated_at?: string
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
      school_invites: {
        Row: {
          accepted_at: string | null
          created_at: string
          created_by: string
          email: string
          expires_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          school_id: string
          token: string
        }
        Insert: {
          accepted_at?: string | null
          created_at?: string
          created_by: string
          email: string
          expires_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          school_id: string
          token?: string
        }
        Update: {
          accepted_at?: string | null
          created_at?: string
          created_by?: string
          email?: string
          expires_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          school_id?: string
          token?: string
        }
        Relationships: [
          {
            foreignKeyName: "school_invites_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      schools: {
        Row: {
          created_at: string
          exam_boards: string[]
          id: string
          name: string
          owner_id: string
        }
        Insert: {
          created_at?: string
          exam_boards?: string[]
          id?: string
          name: string
          owner_id: string
        }
        Update: {
          created_at?: string
          exam_boards?: string[]
          id?: string
          name?: string
          owner_id?: string
        }
        Relationships: []
      }
      student_class_metadata: {
        Row: {
          class_id: string
          notes: string | null
          predicted_grade: string | null
          student_id: string
          target_grade: string | null
          updated_at: string
        }
        Insert: {
          class_id: string
          notes?: string | null
          predicted_grade?: string | null
          student_id: string
          target_grade?: string | null
          updated_at?: string
        }
        Update: {
          class_id?: string
          notes?: string | null
          predicted_grade?: string | null
          student_id?: string
          target_grade?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "student_class_metadata_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
        ]
      }
      student_reports: {
        Row: {
          class_id: string
          content: Json
          created_at: string
          created_by: string
          id: string
          period: string | null
          student_id: string
          tone: string | null
        }
        Insert: {
          class_id: string
          content?: Json
          created_at?: string
          created_by: string
          id?: string
          period?: string | null
          student_id: string
          tone?: string | null
        }
        Update: {
          class_id?: string
          content?: Json
          created_at?: string
          created_by?: string
          id?: string
          period?: string | null
          student_id?: string
          tone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "student_reports_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
        ]
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
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
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
      claim_pending_class_invites: { Args: never; Returns: number }
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
      get_class_predictions: {
        Args: { _class_id: string }
        Returns: {
          display_name: string
          email: string
          predicted_grade: string
          recent_avg: number
          sample_size: number
          student_id: string
          target_grade: string
          trend: string
        }[]
      }
      get_class_roster: {
        Args: { _class_id: string }
        Returns: {
          display_name: string
          email: string
          joined_at: string
          student_id: string
        }[]
      }
      get_department_overview: { Args: { _school_id: string }; Returns: Json }
      get_friend_scores: {
        Args: { requesting_user_id: string }
        Returns: {
          display_name: string
          score_avg: number
          session_count: number
          user_id: string
        }[]
      }
      get_user_school: { Args: { _user_id: string }; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_class_teacher: {
        Args: { _class_id: string; _user_id: string }
        Returns: boolean
      }
      is_director: { Args: { _user_id: string }; Returns: boolean }
      is_own_profile: { Args: { profile_user_id: string }; Returns: boolean }
      is_platform_admin: { Args: never; Returns: boolean }
      is_school_hod: {
        Args: { _school_id: string; _user_id: string }
        Returns: boolean
      }
      is_school_staff: { Args: { _user_id: string }; Returns: boolean }
      join_class_by_code: { Args: { _code: string }; Returns: string }
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
      refresh_class_predictions: {
        Args: { _class_id: string }
        Returns: number
      }
      score_to_grade: {
        Args: { _board: string; _score: number }
        Returns: string
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
      app_role:
        | "student"
        | "teacher"
        | "tutor"
        | "hod"
        | "admin"
        | "director"
        | "member"
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
    Enums: {
      app_role: [
        "student",
        "teacher",
        "tutor",
        "hod",
        "admin",
        "director",
        "member",
      ],
    },
  },
} as const
