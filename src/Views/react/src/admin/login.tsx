import { React, Sweetalert2 } from "/jsx/imports";

function AdminLogin() {

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('')
  const [pending, setPending] = React.useState(false)

  const onLogin = React.useCallback((e: React.FormEvent) => {
    e.preventDefault()
    setPending(true)
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({ account: 'admin', username, password }),
    })
    .then(response => response.json())
    .then(({ error, success }) => {
      if (error) {
        Sweetalert2.fire({
          icon: 'error',
          title: error,
          toast: true,
          showConfirmButton: false,
          position: 'center',
          timer: 3000,
        })
        console.log(error)
      } else if (success) {
        window.location.replace('/admin/dashboard');
      }
    })
    .catch((e) => {
      Sweetalert2.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to login. Please try again.',
        toast: true,
        showConfirmButton: false,
        position: 'center',
        timer: 3000,
      })
      console.log(e)
    })
    .finally(() => {
      setPassword('')
      setPending(false)
    })
  }, [username, password])

  const SMCCLogo = React.useMemo(() => <img src="/images/SMCC-logo.svg" alt="SMCC Logo" className="w-[100px] aspect-square mx-auto"/>, [])

  return (
    <div className="w-full pt-16">
      <div className="p-4">
        <form onSubmit={onLogin} className="max-w-md mx-auto flex flex-col gap-8 border border-sky-300 rounded-lg p-8 shadow-lg pt-10">
          {SMCCLogo}
          <div className="text-[24px] font-[700] text-center">Admin Login</div>
          <div className="flex justify-center px-4">
            <input type="text" className="p-4 w-full border-2 border-gray-300 rounded-lg" placeholder="Username" value={username} onChange={(e: any) => setUsername(e.target.value)} />
          </div>
          <div className="flex justify-center px-4">
            <input type="password" className="p-4 w-full border-2 border-gray-300 rounded-lg" placeholder="Password" value={password} onChange={(e: any) => setPassword(e.target.value)} />
          </div>
          <div className="flex justify-center px-4">
            <button type="submit" disabled={pending} className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 text-[22px] w-full disabled:bg-gray-300">
              {pending ? <span className="animate-pulse">Loading...</span> : <>Login</>}
            </button>
          </div>
          <div>
            <a href="/login" className="text-sky-500 hover:text-sky-300 hover:underline pl-4">Login as Student?</a>
            <a href="/teacher/login" className="text-sky-500 hover:text-sky-300 hover:underline pl-4">Login as Teacher?</a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin