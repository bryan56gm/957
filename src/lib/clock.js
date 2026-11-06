import { DEMO_CLOCK_START, FULL_SLOT_INDEXES, VENUE } from "../data/venue";

const SLOT_MINUTES = 15;
const FIRST_SLOT_LEAD_MINUTES = 15;
const loadedAt = Date.now();

function demoStart() {
  const date = new Date();
  const shift = (DEMO_CLOCK_START.weekday - date.getDay() + 7) % 7;
  date.setDate(date.getDate() + shift);
  date.setHours(DEMO_CLOCK_START.hour, DEMO_CLOCK_START.minute, 0, 0);
  return date;
}

const START = demoStart();

// Demo time: a Saturday evening that advances in real time from the moment the app opens.
export function demoNow() {
  return new Date(START.getTime() + (Date.now() - loadedAt));
}

export function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

export function formatTime(date) {
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}

export function greetingKey(date) {
  const hour = date.getHours();
  if (hour < 13) return "greetMorning";
  if (hour < 20) return "greetAfternoon";
  return "greetEvening";
}

function parseTime(text, reference) {
  const [hours, minutes] = text.split(":").map(Number);
  const date = new Date(reference);
  date.setHours(hours, minutes, 0, 0);
  return date;
}

export function kitchenOpen(now) {
  return now >= parseTime(VENUE.opensAt, now) && now < parseTime(VENUE.kitchenClose, now);
}

// 15-minute pick-up slots from "now + lead" until the kitchen closes; a couple are shown as full.
export function pickupSlots(now) {
  const first = addMinutes(now, FIRST_SLOT_LEAD_MINUTES);
  first.setMinutes(Math.ceil(first.getMinutes() / SLOT_MINUTES) * SLOT_MINUTES, 0, 0);
  const close = parseTime(VENUE.kitchenClose, now);
  const slots = [];
  for (let time = first; time <= close && slots.length < 8; time = addMinutes(time, SLOT_MINUTES)) {
    slots.push({ time: formatTime(time), full: FULL_SLOT_INDEXES.includes(slots.length) });
  }
  return slots;
}

// Lunch service (pasta and the lunch-only dishes are served until 16:00).
export function isLunchTime(now) {
  const hour = (now || demoNow()).getHours();
  return hour >= 13 && hour < 16;
}
