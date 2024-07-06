export const getAllLogs = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/worklogs`, { cache: 'no-store' })
    if (!response.ok) {
      throw new Error('Failed to fetch');
    }
    const data = await response.json();

    const convertedData = data.map((log: WorkLogs) => ({
      ...log,
      startTime: new Date(log.startTime),
      endTime: new Date(log.endTime),
      created_at: new Date(log.createdAt),
      updated_at: new Date(log.updatedAt)
    }));

    return convertedData;
  } catch (err) {
    console.error(err);
  }
};

export const createLog = async (time: Time) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/worklogs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(time)
    })
  } catch (err) {
    console.error(err);
  }
};
