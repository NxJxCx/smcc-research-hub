import { React } from "/jsx/imports";

interface LogMessage {
  type: string,
  message: string,
}

export default function LogsApp() {
  const [logs, setLogs] = React.useState<LogMessage[]>([])
  const [testLogs, setTestLogs] = React.useState<string>()
  const [eventSource, setEventSource] = React.useState<EventSource|undefined>()
  const logEntryRegex = /\[(USER_INFO|USER_DEBUG|USER_ERROR|USER_WARNING)\] ([^\[]+)/g;

  const onMessage = React.useCallback((ev: MessageEvent) => {
    const data = ev.data
    console.log("Received message: ", data);
    // const data = JSON.parse(ev.data)
    // const mappedLogs = data.logs.split("\n").map((d: string) => {
    //   const match = logEntryRegex.exec(d)
    //   return ({ type: match?.[1], message: match?.[2] });
    // })
    setTestLogs(data);
    (eventSource as EventSource)?.close()
  }, [eventSource])

  const onError = React.useCallback((ev: Event) => {
    if (!!eventSource?.OPEN) {
      eventSource.close()
    }
  }, [eventSource])

  const refreshLogs = React.useCallback(() => {
    if (!!eventSource?.OPEN) {
      eventSource.close()
    }
    const url = new URL('/api/stream/logs', window.location.origin)
    const newEventSource = new EventSource(url, { withCredentials: true });
    setEventSource(newEventSource)

    newEventSource.onmessage = onMessage;

    newEventSource.onerror = onError;

    return newEventSource
  }, [eventSource, onMessage, onError])

  React.useEffect(() => {
    const newEventSource = refreshLogs()
    console.log("event source: ", newEventSource);
    return () => {
      if (!!newEventSource?.OPEN) {
        newEventSource.close();
      }
    };
  }, []);

  return (
    <div>
      <h1>Logs</h1>
      <div className="w-full p-8 min-h-[calc(100vh - 100px)]">
        <div className="bg-slate-900 p-3 text-white border border-white rounded shadow mx-auto w-full h-full">
          {/* {
            logs.map(({ type, message }: LogMessage, index: number) => (
              <p key={index}>
                <span className={
                  clsx(
                    "text-green-300"
                  )
                }>
                  {type}
                </span>
                &nbsp;
                <span>
                  {message}
                </span>
              </p>
            ))
          } */}
          {testLogs}
        </div>
      </div>
    </div>
  )
}