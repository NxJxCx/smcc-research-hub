
export const IDRegExFormat = {
  studentId: new RegExp("^20\\d{7}$"),
  studentName: new RegExp("^[A-ZÑ]+(?: [A-ZÑ]+)*?(?: [A-ZÑ]\\. )?(?:[A-ZÑ]+(?: [A-ZÑ]+)*)?(?: (?:III|IV|V|VI|VII|VIII|IX|X))?$"),
  fullStudentID: new RegExp(
    "^[A-ZÑ]+(?: [A-ZÑ]+)*?(?: [A-ZÑ]\\. )?(?:[A-ZÑ]+(?: [A-ZÑ]+)*)?(?: (?:III|IV|V|VI|VII|VIII|IX|X))?$\\r?\\n^20\\d{7}$"
  )
}

export enum Year {
  FirstYear = '1',
  SecondYear = '2',
  ThirdYear = '3',
  FourthYear = '4',
}

export enum Courses {
  BSCS = 'Bachelor of Science in Computer Science',
  BSIT = 'Bachelor of Science in Information Technology',
  BSIS = 'Bachelor of Science in Information Systems',
  BSAIS = 'Bachelor of Science in Accounting Information Systems',
}

export enum Departments {
  CCIS = 'Computer Science and Information Sciences',
}

export default {
  Year,
  Courses,
  Departments,
}