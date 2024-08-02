import React, { FormEvent } from "react";
import Scanner from "../qrscan";

function StudentLogin() {
  const [showScanner, setShowScanner] = React.useState(false);
  const [studentId, setStudentId] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [pending, setPending] = React.useState(false)

  const onResult = React.useCallback((studentName?: string, studentId?: string) => {
    if (!!studentId) {
      fetch(`/api/student?q=exist&id=${studentId}`)
      .then(response => response.json())
      .then(({ error, exists }) => {
        if (error) {
          alert('Failed to check student existence: ' + error)
        } else {
          if (!exists) {
            // redirect to sign up with the scanned studentId
            window.location.href = `/signup?studentId=${studentId}&full_name=${studentName}`;
          } else {
            setStudentId(studentId)
          }
        }
      })
      .catch((e) => {
        console.error('Failed to retrieve student information', e)
        alert('Failed to retrieve student information:' + e.message)
      })

    }
  }, [])

  const onLogin = React.useCallback((e: FormEvent) => {
    e.preventDefault()
    setPending(true)
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({ account: 'student', username: studentId, password }),
    })
    .then(response => response.json())
    .then(({ error, success }) => {
      if (error) {
        alert(error)
        console.log(error)
      } else if (success) {
        window.location.href = '/'
      }
    })
    .catch((e) => {
      alert('Failed to login. Please try again.')
      console.log(e)
    })
    .finally(() => {
      setPassword('')
      setPending(false)
    })
  }, [studentId])

  const SMCCLogo = React.useMemo(() => <img src="/images/SMCC-logo.svg" alt="SMCC Logo" className="w-[100px] aspect-square mx-auto"/>, [])

  return showScanner ? (
    <div className="w-full pt-32">
      <div className="p-4">
        <div className="max-w-md mx-auto flex flex-col gap-8 border border-sky-300 rounded-lg p-8 shadow-lg pt-10">
          {SMCCLogo}
          <div className="text-[24px] font-[700] text-center">Student Login</div>
          <Scanner className="mt-4" onResult={onResult} pause={!showScanner} regExFormat={[/^[A-Z\w]+/, /20\d{7}$/]} />
        </div>
        <div className="mt-8 text-center font-bold">
          Scan your Student ID QR Code
          <br />
          <button type="button" className="text-sky-500 hover:text-sky-300 hover:underline mt-2" onClick={() => setShowScanner(false)}>or Login with your Student ID</button>
        </div>
      </div>
    </div>
  ) : (
    <div className="w-full pt-32">
      <div className="p-4">
        <form onSubmit={onLogin} className="max-w-md mx-auto flex flex-col gap-8 border border-sky-300 rounded-lg p-8 shadow-lg pt-10">
          {SMCCLogo}
          <div className="text-[24px] font-[700] text-center">Student Login</div>
          <div className="flex justify-center px-4">
            <input type="text" className="p-4 w-full border-2 border-gray-300 rounded-lg" placeholder="Student ID" value={studentId} onChange={(e: any) => setStudentId(e.target.value)} required />
          </div>
          <div className="flex justify-center px-4">
            <input type="password" className="p-4 w-full border-2 border-gray-300 rounded-lg" placeholder="Password" value={password} onChange={(e: any) => setPassword(e.target.value)} required />
          </div>
          <div className="flex justify-center px-4">
            <button type="submit" disabled={pending} className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 text-[22px] w-full disabled:bg-gray-300">
              {pending ? <span className="animate-pulse">Loading...</span> : <>Login</>}
            </button>
          </div>
        </form>
        <div className="mt-8 text-center font-bold">
          Login with your Student ID
          <br />
          <button type="button" className="text-sky-500 hover:text-sky-300 hover:underline mt-2" onClick={() => setShowScanner(true)}>or Scan your Student ID QR Code</button>
        </div>
      </div>
    </div>
  )
}

export default StudentLogin