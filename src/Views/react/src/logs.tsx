import clsx from "/jsx/global/clsx";
import { React } from "/jsx/imports";

enum LogType {
  USER_INFO = "USER INFO",
  USER_ERROR = "USER ERROR",
  USER_WARNING = "USER WARNING",
  USER_DEBUG = "USER DEBUG",
}

interface LogMessage {
  type: LogType,
  message: string,
}


export default function LogsApp() {
  const [logs, setLogs] = React.useState<LogMessage[]>([])
  const logRef = React.useRef(null);

  const fetchLogs = React.useCallback(() => {
    fetch('/api/logs')
    .then(response => response.json())
    .then(({ data }) => {
      const splitted = data.split('\n');
      const mapped = splitted.reduce((init: LogMessage[], msg: string, index: number, orig: any) => {
        const result = msg.substring(1).split('] ');
        if (Object.values(LogType).includes(result[0] as LogType)) {
          return [
            ...init,
            {
              type: result[0],
              message: result[1] + "] " + result[2],
            }
          ];
        }
        return [
          ...init,
          {
            type: "",
            message: msg,
          }
        ];
      }, []).filter((v: LogMessage) => !(!v.type && !v.message));
      mapped;
      setLogs(mapped);
      // then scroll to bottom using logRef
      setTimeout(() => {
        logRef.current?.scroll({ top: logRef.current?.scrollHeight });
      }, 15);
    })
  }, [logRef]);


  React.useEffect(() => {
    fetchLogs();
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      fetchLogs();
    }, 1000);
  }, [logs])

  return (
    <div>
      <h1 className="p-8 text-2xl pb-0">Server Logs</h1>
      <div className="w-full p-8">
        <div ref={logRef} className="bg-slate-900 p-3 text-white border border-white rounded shadow mx-auto h-full max-h-[calc(100vh-250px)] overflow-x-hidden overflow-y-auto">
          {
            logs.map(({ type, message }: LogMessage, index: number) => (
              <p key={index} className="text-wrap">
                <span className={
                  clsx(
                    type === LogType.USER_INFO
                    ? "text-green-300"
                    : type === LogType.USER_ERROR
                    ? "text-red-500"
                    : type === LogType.USER_WARNING
                    ? "text-yellow-400"
                    : type === LogType.USER_DEBUG
                    ? "text-gray-500"
                    : "text-gray-400"
                  )
                }>
                  {type}{type && ": "}
                </span>
                &nbsp;
                <span>
                  {message}
                </span>
              </p>
            ))
          }
        </div>
      </div>
    </div>
  )
}