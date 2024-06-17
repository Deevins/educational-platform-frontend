export type SectionComponentType = 'lecture' | 'test'

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
