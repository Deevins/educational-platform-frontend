export type SectionComponentType = 'lecture' | 'test' | 'assignment'
export type TestQuestion = {
  question: string
  answers: TestAnswer[]
}

export type TestAnswer = {
  answer: string
  answerIsCorrect: boolean
  answerDescription: string
}

export type SectionTest = {
  componentSerial: number
  type: SectionComponentType
  title: string
  description: string
  questions: TestQuestion[]
}
export type SectionAssignment = {
  componentSerial: number
  type: SectionComponentType
  title: string
  description: string
}
export type SectionLecture = {
  componentSerial: number
  type: SectionComponentType
  title: string
  description: string
}

export type SectionType = {
  sectionNum: number
  title: string
  description: string
  lectures: SectionLecture[]
  tests: SectionTest[]
  assignments: SectionAssignment[]
}
