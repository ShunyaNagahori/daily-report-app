interface WorkLogs {
  id: string;
  startTime: Date;
  endTime: Date;
  totalTime: number;
  createdAt: Date;
  updatedAt: Date;
}

type Time = {
  startTime: Date | null;
  endTime: Date | null;
  totalTime: number | null;
};
