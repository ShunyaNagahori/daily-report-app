'use client'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

type Time = {
  startTime: string | null;
  endTime: string | null;
  totalTime: number | null;
};

const Form = () => {
  const [time, setTime] = useState<Time>({startTime: null, endTime: null, totalTime: null});
  const [logs, setLogs] = useState<Array<Time>>([]);
  const [isBreak, setIsBreak] = useState(true);

  useEffect(() => {
    if (isBreak && time.endTime !== null) {
      setLogs(prevLogs => [...prevLogs, time]);
      setTime({ startTime: null, endTime: null, totalTime: null });
    }
  }, [time, isBreak]);

  const handleStart = () => {
    const startTime = new Date().toLocaleTimeString();
    setTime({startTime: startTime, endTime: null, totalTime: null});
    setIsBreak(false);
  };

  const handleBreak = () => {
    if (isBreak) { return; }
    const endTime = new Date().toLocaleTimeString();
    setTime(prevTime => ({ ...prevTime, endTime }));
    setIsBreak(true);
  };

  // const calculateDuration = (startTime: string | null, endTime: string | null): string => {

  // };

  const today = () => {
    const dateObject = new Date();
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const date = dateObject.getDate();
    const day = dateObject.getDay();
    const weekday = ["日","月","火","水","木","金","土"];

    return `${year}年${month}月${date}日(${weekday[day]})`;
  };

  return (
    <div className="max-w-lg">
      <Card>
        <CardHeader>
          <CardTitle>{today()}</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            {logs.map(log => (
              <div className="flex justify-between border-b px-2">
                <div key={log.endTime} className="flex w-2/3">
                  <p className="w-1/4 text-center">{log.startTime}</p>
                  <p className="w-10 text-center">-</p>
                  <p className="w-1/4 text-center">{log.endTime}</p>
                </div>
                <p>(hoge)</p>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            <div className="flex space-x-4">
              {isBreak ? <Button className="w-full" onClick={handleStart}>開始</Button> : <Button variant="secondary" className="w-full" onClick={handleBreak}>休憩</Button>}
            </div>
            <div>
              <Button variant="destructive" className="w-full">終了</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Form
