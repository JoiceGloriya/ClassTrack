"use client";

import { useRouter } from "next/navigation";
import { useEffect, useReducer, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const EventCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());
  //whenevr date changes, update the URL
  const router = useRouter();
  useEffect(() => {
    router.push(`?date=${value}`);
  }, [value, router]);
  return <Calendar value={value} onChange={onChange} />;
};

export default EventCalendar;
