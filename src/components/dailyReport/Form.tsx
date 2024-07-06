'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { createLog, getAllLogs } from "@/functions/workLogs";

const Form = () => {
  const [time, setTime] = useState<Time>({startTime: null, endTime: null, totalTime: null});
  const [logs, setLogs] = useState<Array<Time>>([]);
  const [isBreak, setIsBreak] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      const fetchedLogs = await getAllLogs();
      if (fetchedLogs) {
        setLogs(fetchedLogs);
      }
    };

    fetchLogs();
  }, []);


  useEffect(() => {
    if (isBreak && time.endTime !== null && time.startTime !== null) {
      const insertLog = async (time: Time) => {
        await createLog(time);
      };
      insertLog(time);
      setLogs(prevLogs => [...prevLogs, time]);
      // ここでD1に保存
      setTime({ startTime: null, endTime: null, totalTime: null });
      console.log(logs);
    }
  }, [time.totalTime]);

  useEffect(() => {
    if (time.endTime !== null && time.startTime !== null) {
      const totalTime = calculateDuration(time.startTime, time.endTime)
      setTime(prevTime => ({ ...prevTime, totalTime }));
      setIsBreak(true);
    }
  }, [time.endTime]);

  const handleStart = () => {
    const startTime = new Date()
    setTime({startTime: startTime, endTime: null, totalTime: null});
    setIsBreak(false);
  };

  const handleBreak = () => {
    if (isBreak) { return; }
    const endTime = new Date();
    setTime(prevTime => ({ ...prevTime, endTime }));
  };

  const timeStringToNumber = (timeString: string): number => {
    return parseInt(timeString.replace(/:/g, ''));
  };

  const calculateDuration = (startTime: Date, endTime: Date): number => {
    const startNum = timeStringToNumber(startTime.toLocaleTimeString());
    const endNum = timeStringToNumber(endTime.toLocaleTimeString());

    const startMinutes = Math.floor(startNum / 10000) * 60 + Math.floor((startNum % 10000) / 100);
    const endMinutes = Math.floor(endNum / 10000) * 60 + Math.floor((endNum % 10000) / 100);

    const durationInMinutes = endMinutes - startMinutes;
    return durationInMinutes;
  };

  const showDuration = (durationInMinutes: number): string => {
    const durationInHours = Math.floor(durationInMinutes / 60);
    const remainingMinutes = durationInMinutes - durationInHours;
    return durationInHours == 0 ? `${remainingMinutes}分` : `${durationInHours}時間${remainingMinutes}分`
  }

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
            {logs.map((log, index) => (
              <div className="flex justify-between border-b px-2" key={index}>
                <div className="flex w-2/3">
                  <p className="w-1/4 text-center">{log.startTime && log.startTime.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}</p>
                  <p className="w-10 text-center">-</p>
                  <p className="w-1/4 text-center">{log.endTime && log.endTime.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
                <p>（{log.totalTime} 分）</p>
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
