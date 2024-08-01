import React, { FormEvent } from "react";
import Scanner from "../qrscan";

function StudentLogin() {
  const [studentId, setStudentId] = React.useState('')
  const onResult = React.useCallback((studentName?: string, studentId?: string) => {
    if (!!studentId) {
      setStudentId(studentId)
    }
  }, [])
  const onLogin = React.useCallback((e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const studentId = formData.get('studentId');
    const password = formData.get('password');
    // TODO: implement authentication logic here
    console.log("Login auth: (ID: ", studentId, ", Password: ", password, ")")
  }, [studentId])
  return !studentId ? (
    <div>
      <div className="text-[32px] font-[700] text-center mt-16">Student Login</div>
      <Scanner className="mt-4" onResult={onResult} regExFormat={[/^[A-Z\w]+/, /20\d{7}$/]} />
      <div className="mt-8 text-center font-bold">
        Scan your Student ID QR Code
      </div>
    </div>
  ) : (
    <div>
      {/* TODO: should be <form> with <input> named "studentId" readonly and <input> named "password" to login */}
      <form onSubmit={onLogin}>
        <div className="text-[24px] font-[700] text-center mt-16">Student Login</div>
        <div className="flex justify-center mt-4">
          <input type="text" className="p-4 w-full border-2 border-gray-300 rounded-lg" placeholder="Student ID" readOnly value={studentId} />
        </div>
        <div className="flex justify-center mt-4">
          <input type="password" className="p-4 w-full border-2 border-gray-300 rounded-lg" placeholder="Password" />
        </div>
        <div className="flex justify-center mt-8">
          <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700">
            Login
          </button>
        </div>
      </form>
    </div>
  )
}

export default StudentLogin