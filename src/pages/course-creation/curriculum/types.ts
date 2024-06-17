export type SectionComponentType = 'lecture' | 'test'

export type SectionType = {
  serial_number: number
  section_title: string
  section_description: string
  lectures: SectionLecture[]
  tests: SectionTest[]
}

export type SectionLecture = {
  title: string
  serial_number: number
  description: string
  video_url: string
  type: SectionComponentType
}

export type SectionTest = {
  test_name: string
  description: string
  serial_number: number
  questions: TestQuestion[]
  type: SectionComponentType
}

export interface TestQuestion {
  question_body: string
  answers: TestAnswer[]
}

export type TestAnswer = {
  answer: string
  answerIsCorrect: boolean
  answerDescription: string
}

export type api_section = {
  section_id: number
  section_title: string
  serial_number: number
  type: SectionComponentType
  section_description: string
  lectures: api_lecture[]
  tests: api_test[]
}

export type api_lecture = {
  id: number
  title: string
  description: string
  type: SectionComponentType
  serial_number: string
  video_url: string
}
export type api_test = {
  test_id: number
  test_name: string
  type: SectionComponentType
  description: string
  serial_number: number
  questions: api_question[]
}

export type api_question = {
  id: number
  question_body: string
  answers: api_answer[]
}

export type api_answer = {
  response_text: string
  description: string
  is_correct: boolean
}
