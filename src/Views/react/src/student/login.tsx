import React from "react";
import Scanner from "../qrscan";

function StudentLogin() {
  const [studentId, setStudentId] = React.useState('')
  const onResult = React.useCallback((studentName?: string, studentId?: string) => {
    if (!!studentId) {
      setStudentId(studentId)
    }
  }, [])
  React.useEffect(() => {
    console.log('Student ID:', studentId)
  }, [studentId]);
  return <Scanner onResult={onResult} regExFormat={[/^[A-Z\w]+/, /20\d{7}$/]} />
}

export default StudentLogin