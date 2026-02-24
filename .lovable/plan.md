

# AQA A-Level Economics Study Platform

## Overview
An AI-powered revision and study platform for AQA A-level Economics, serving both students and teachers. The app combines a past paper library, AI tutoring, revision quizzes, and study notes into one unified experience.

---

## Pages & Features

### 1. Landing Page
- Clean hero section explaining the platform's purpose
- Quick-start buttons: "Start Revising", "Browse Past Papers", "Ask the AI Tutor"
- Topic overview showing Paper 1 (Markets), Paper 2 (National & International), Paper 3 (Synoptic)

### 2. Past Paper Browser
- Organized by Paper (1, 2, 3), year, and type (Question Paper / Mark Scheme)
- Links to past papers sourced from Physics & Maths Tutor
- Filter and search by topic, year, or paper number
- Ability for teachers to bookmark or assign specific papers

### 3. AI Tutor Chat
- Conversational AI assistant specialized in AQA Economics
- Students can ask questions about any economics topic and get clear explanations
- The AI understands AQA specification context — refers to correct terminology, diagram expectations, and mark scheme language
- Supports follow-up questions for deeper understanding
- Streaming responses for a smooth chat experience

### 4. AI Essay Grader
- Students paste or type their essay/long-answer response
- Select the question type (e.g., 9-mark evaluate, 15-mark discuss, 25-mark essay)
- AI grades against AQA mark scheme criteria (KAA, Application, Analysis, Evaluation)
- Returns a mark, detailed feedback, and suggestions for improvement
- Shows model answer excerpts where helpful

### 5. Practice Question Generator
- Select a topic (e.g., "Price Elasticity of Demand", "Fiscal Policy", "Globalisation")
- Choose question style: multiple choice, short answer (data response), or essay
- AI generates questions in the style of AQA past papers
- Immediate feedback and marking after answering

### 6. Study Notes & Topic Summaries
- Organized by specification topic for each paper
- Key definitions, diagrams, evaluation points, and real-world examples
- Search functionality across all notes

### 7. Dashboard
- Track revision progress across topics
- View recent activity (papers browsed, questions attempted, chat history)
- Suggested areas to focus on based on weaker topics

---

## Design & UX
- Clean, modern design with a professional academic feel
- Light/dark mode support
- Mobile-responsive for revision on the go
- Simple navigation between all sections via a top nav bar

---

## Technical Approach
- **Backend**: Supabase for data storage and edge functions
- **AI**: Lovable AI gateway for the tutor chat, essay grading, and question generation
- **No authentication initially** — can be added later for progress tracking and teacher features
- Content from the provided resources will inform the AI's system prompts for accuracy

