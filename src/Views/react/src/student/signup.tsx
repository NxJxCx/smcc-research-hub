import { Courses, Departments, IDRegExFormat, Year } from "/jsx/global/enums";
import { React, Sweetalert2 } from "/jsx/imports";
import Scanner from "/jsx/qrscan";

function StudentSignup() {
  const searchParams = React.useMemo(() => new URLSearchParams(window.location.search), [window.location.search]);
  const { student_id, full_name } = React.useMemo(() => ({ student_id: searchParams.get('student_id'), full_name: searchParams.get('full_name') }), [searchParams]);
  const showScanner = React.useMemo(() => !IDRegExFormat.studentId.test(student_id) || !IDRegExFormat.studentName.test(full_name), [student_id, full_name]);
  const [pause, setPause] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [repeatPassword, setRepeatPassword] = React.useState('');
  const [department, setDepartment] = React.useState<Departments|''>('');
  const [course, setCourse] = React.useState<Courses|''>('');
  const [year, setYear] = React.useState<Year|''>('');
  const [pending, setPending] = React.useState(false);
  const [errors, setErrors] = React.useState<any>({
    password: ''
  });

  const disableSubmit = React.useMemo(() => showScanner || !email || !password || !department || !course || !year, [showScanner, email, password, department, course, year]);

  const clearForm = React.useCallback(() => {
    setPassword('');
    setRepeatPassword('');
  }, [])

  const onResult = React.useCallback((studentName?: string, studentId?: string) => {
    if (!!studentId) {
      setPause(true);
      fetch(`/api/student?q=exist&id=${studentId}`)
      .then(response => response.json())
      .then(({ error, exists }) => {
        if (error) {
          Sweetalert2.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to check student existence: ' + error,
            toast: true,
            showConfirmButton: false,
            position: 'center',
            timer: 3000,
          });
        } else {
          if (!exists) {
            // redirect to sign up with the scanned studentId
            window.location.replace(`/signup?student_id=${studentId}&full_name=${studentName}`);
          } else {
            Sweetalert2.fire({
              icon: 'error',
              title: 'Error',
              text: 'Student ID is already registered',
              timer: 2000,
              toast: true,
              position: 'center',
              showConfirmButton: false,
            }).then(() => {
              Sweetalert2.fire({
                icon: 'question',
                text: 'Do you want to login instead?',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
              }).then(({ isConfirmed }: { isConfirmed: boolean }) => {
                if (isConfirmed) {
                  window.location.replace(`/login?student_id=${studentId}`);
                }
              })
            });
          }
        }
      })
      .catch((e) => {
        Sweetalert2.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to retrieve student information:' + e.message,
          toast: true,
          showConfirmButton: false,
          position: 'center',
          timer: 3000,
        });
      })
      .finally(() => setTimeout(() => setPause(false), 1000));
    }
  }, [])

  const onSubmit = React.useCallback((e: React.FormEvent) => {
    e.preventDefault()
    setPending(true)
    if (password !== repeatPassword) {
      setErrors({ password: 'Passwords do not match' });
      Sweetalert2.fire({
        icon: 'error',
        title: 'Error',
        text: 'Passwords do not match',
        toast: true,
        showConfirmButton: false,
        position: 'center',
        timer: 3000,
      });
      setPending(false);
      return;
    }
    fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({ account: 'student', username: student_id, full_name, email, department, course, year, password }),
    })
    .then(response => response.json())
    .then(({ error, success }) => {
      if (error) {
        Sweetalert2.fire({
          icon: 'error',
          title: 'Error',
          text: error,
          toast: true,
          showConfirmButton: false,
          position: 'center',
          timer: 3000,
        });
        console.log(error)
      } else if (success) {
        clearForm();
        Sweetalert2.fire({
          icon:'success',
          title: 'Registration Successful',
          text: 'You have been registered successfully. Please login.',
          toast: true,
          showConfirmButton: false,
          position: 'center',
          timer: 2000,
        }).then(() => {
          window.location.href = '/login'
        });
      }
    })
    .catch((e) => {
      Sweetalert2.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to login. Please try again.'
      });
      console.log(e)
    })
    .finally(() => {
      setPassword('')
      setPending(false)
    })
  }, [student_id, email, course, year, password, repeatPassword]);

  const SMCCLogo = React.useMemo(() => <img src="/images/SMCC-logo.svg" alt="SMCC Logo" className="w-[100px] aspect-square mx-auto"/>, [])

  return showScanner ? (
    <div className="w-full pt-16">
      <div className="p-4">
        <div className="max-w-md mx-auto flex flex-col gap-8 border border-sky-300 rounded-lg p-8 shadow-lg pt-10">
          {SMCCLogo}
          <div className="text-[24px] font-[700] text-center">Student Registration</div>
          <Scanner className="mt-4" onResult={onResult} pause={pause || !showScanner} regExFormat={[IDRegExFormat.studentName, IDRegExFormat.studentId]} />
        </div>
        <div className="mt-8 text-center font-bold">
          Scan your Student ID QR Code to Register
          <br />
          Already registered? <a href="/login" className="text-sky-500 hover:text-sky-300 hover:underline mt-2">Login</a>
        </div>
      </div>
    </div>
  ) : (
    <div className="w-full pt-2">
      <div className="p-4">
        <form onSubmit={onSubmit} className="max-w-md mx-auto flex flex-col gap-8 border border-sky-300 rounded-lg p-8 shadow-lg pt-10">
          {SMCCLogo}
          <div className="text-[24px] font-[700] text-center">Student Registration</div>
          <div className="flex justify-center px-4">
            <input type="text" className="p-4 w-full border-2 border-gray-300 rounded-lg" placeholder="Student ID" value={student_id} disabled required />
          </div>
          <div className="flex justify-center px-4">
            <input type="text" className="p-4 w-full border-2 border-gray-300 rounded-lg" placeholder="Full Name" value={full_name} disabled required />
          </div>
          <div className="flex justify-center px-4">
            <input type="email" className="p-4 w-full border-2 border-gray-300 rounded-lg" placeholder="Email Address" value={email} onChange={(e: any) => setEmail(e.target.value)} required />
          </div>
          <div className="flex justify-center px-4">
            <select value={department} onChange={(e: any) => setDepartment(e.target.value)} title="Department" className="p-4 w-full border-2 border-gray-300 rounded-lg bg-sky-50" required>
              <option value="">-- Select Department --</option>
              {
                Object.entries(Departments).map(([key, value]) => (
                  <option key={key} value={value}>{value}</option>
                ))
              }
            </select>
          </div>
          <div className="flex justify-center px-4">
            <select value={course} onChange={(e: any) => setCourse(e.target.value)} title="Course" className="p-4 w-full border-2 border-gray-300 rounded-lg bg-sky-50" required>
            <option value="">-- Select Course --</option>
              {
                Object.entries(Courses).map(([key, value]) => (
                  <option key={key} value={value}>{value}</option>
                ))
              }
            </select>
          </div>
          <div className="flex justify-center px-4">
            <select value={year} onChange={(e: any) => setYear(e.target.value)} title="Year" className="p-4 w-full border-2 border-gray-300 rounded-lg bg-sky-50" required>
              <option value="">-- Select Year --</option>
              {
                Object.entries(Year).map(([key, value]) => (
                  <option key={key} value={value}>{value === '1' ? "1st Year" : value === '2' ? "2nd Year" : value === '3' ? "3rd Year" : "4th Year"}</option>
                ))
              }
            </select>
          </div>
          <div className="flex justify-center px-4">
            <input type="password" className={"p-4 w-full border-2 border-gray-300 rounded-lg" + (errors.password ? " border-red-500" : "")} placeholder="Password" value={password} onChange={(e: any) => { setPassword(e.target.value); setErrors({password:''});}} required />
          </div>
          <div className="flex justify-center px-4">
            <input type="password" className="p-4 w-full border-2 border-gray-300 rounded-lg" placeholder="Repeat Password" value={repeatPassword} onChange={(e: any) => { setRepeatPassword(e.target.value); setErrors({password:''});}} required />
          </div>
          <div className="flex justify-center px-4">
            <button type="submit" disabled={pending || disableSubmit} className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 text-[22px] w-full disabled:bg-gray-300">
              {pending ? <span className="animate-pulse">Loading...</span> : <>Register</>}
            </button>
          </div>
        </form>
        <div className="mt-8 text-center font-bold">
          Complete your registration with the details above
          <br />
          <a href="/signup" className="text-sky-500 hover:text-sky-300 hover:underline mt-2">or Scan QR Code again if is not your Student ID</a>
        </div>
      </div>
    </div>
  )
}

export default StudentSignup