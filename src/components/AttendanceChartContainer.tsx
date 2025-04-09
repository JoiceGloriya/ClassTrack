import Image from "next/image";
import AttendanceChart from "./AttendanceChart";
import prisma from "@/lib/prisma";

const AttendanceChartContainer = async () => {
  const today = new Date();
  const dayOfWeek = today.getDay(); //0-indexed
  const daysSinceLastMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1; //0-indexed [0-> Snnday]
  const lastMonday = new Date(today);
  lastMonday.setDate(today.getDate() - daysSinceLastMonday);

  const responseData = await prisma.attendance.findMany({
    where: {
      date: {
        gte: lastMonday, // Filter for dates greater than or equal to last Monday
      },
    },
    select: {
      date: true,
      present: true,
    },
  });

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const attendanceMap: { [key: string]: { present: number; absent: number } } =
    {
      Mon: { present: 0, absent: 0 },
      Tue: { present: 0, absent: 0 },
      Wed: { present: 0, absent: 0 },
      Thu: { present: 0, absent: 0 },
      Fri: { present: 0, absent: 0 },
      Sat: { present: 0, absent: 0 },
      Sun: { present: 0, absent: 0 },
    };

  responseData.forEach((attendance) => {
    const itemDate = new Date(attendance.date);
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      const dayName = daysOfWeek[dayOfWeek - 1];
      if (attendance.present) {
        attendanceMap[dayName].present += 1;
      } else {
        attendanceMap[dayName].absent += 1;
      }
    } // Get the name of the day (0-indexed)
  });

  const data = daysOfWeek.map((day) => ({
    name: day,
    present: attendanceMap[day].present,
    absent: attendanceMap[day].absent,
  }));

  return (
    <div className="bg-white rounded-lg p-4 h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Attendance</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      <AttendanceChart data={data} />
    </div>
  );
};

export default AttendanceChartContainer;
