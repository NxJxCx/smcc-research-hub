import React from "react";
import Scanner from "../qrscan";

function StudentLogin() {
  const [studentId, setStudentId] = React.useState('')
  const onResult = React.useCallback((studentName?: string, studentId?: string) => {
    if (!!studentId) {
      setStudentId(studentId)
    }
  }, [])
  return (
    <div>
      <Scanner onResult={onResult} regExFormat={[/^[A-Z\w]+/, /20\d{7}$/]} />
      <div className="mt-8">
        <div className="border border-green-500 bg-green-50 text-black">
          {!!studentId && <p>Student ID: {studentId}</p>}
        </div>
      </div>
    </div>
  )
}

export default StudentLogin