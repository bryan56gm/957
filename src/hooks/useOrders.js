import { useCallback, useEffect, useReducer, useRef } from "react";
import { PAST_ORDERS } from "../data/venue";
import { addMinutes, demoNow, formatTime } from "../lib/clock";
import { linesSubtotal, terraceFee } from "../lib/pricing";

// Accelerated kitchen for the demo: seconds instead of minutes.
const STEP_MS = { received: 3500, grill: 9000, ready: 4500 };
const PREP_MINUTES = 18;
const FIRST_CODE = 24;

function nextStatus(order) {
  if (order.status === "received") return "grill";
  if (order.status === "grill") return "ready";
  if (order.status === "ready" && order.mode.type === "table") return "served";
  return null;
}

function reducer(state, action) {
  switch (action.type) {
    case "place":
      return { ...state, nextCode: state.nextCode + 1, active: [action.order, ...state.active] };
    case "advance":
      return { ...state, active: state.active.map((order) => (order.id === action.id ? { ...order, status: action.status } : order)) };
    case "collect":
      return {
        ...state,
        active: state.active.filter((order) => order.id !== action.id),
        history: [{ ...state.active.find((order) => order.id === action.id), daysAgo: 0 }, ...state.history]
      };
    case "payTable": {
      const tableOrders = state.active.filter((order) => order.mode.type === "table");
      return {
        ...state,
        active: state.active.filter((order) => order.mode.type !== "table"),
        history: [...tableOrders.map((order) => ({ ...order, daysAgo: 0 })), ...state.history]
      };
    }
    default:
      return state;
  }
}

const initialState = { nextCode: FIRST_CODE, active: [], history: PAST_ORDERS };

// Orders placed in the demo and their (simulated) progress through the kitchen.
// `onUpdate(order, status)` is called on each change so the app can show a phone-style alert.
export function useOrders(onUpdate) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const timers = useRef({});
  const updateRef = useRef(onUpdate);
  updateRef.current = onUpdate;

  useEffect(() => {
    state.active.forEach((order) => {
      const status = nextStatus(order);
      const timerKey = `${order.id}:${order.status}`;
      if (!status || timers.current[timerKey]) return;
      timers.current[timerKey] = setTimeout(() => {
        dispatch({ type: "advance", id: order.id, status });
        updateRef.current?.({ ...order, status }, status);
      }, STEP_MS[order.status]);
    });
  }, [state.active]);

  useEffect(() => () => Object.values(timers.current).forEach(clearTimeout), []);

  const placeOrder = useCallback((lines, mode) => {
    const now = demoNow();
    const fee = mode.type === "table" ? terraceFee(lines, mode.zone) : 0;
    const order = {
      id: `order-${Date.now()}`,
      code: state.nextCode,
      lines,
      mode,
      fee,
      total: linesSubtotal(lines) + fee,
      status: "received",
      placedAt: formatTime(now),
      readyAt: mode.type === "takeaway" ? mode.slot : formatTime(addMinutes(now, PREP_MINUTES))
    };
    dispatch({ type: "place", order });
    return order;
  }, [state.nextCode]);

  const collect = useCallback((id) => dispatch({ type: "collect", id }), []);
  const payTable = useCallback(() => dispatch({ type: "payTable" }), []);

  const tableOrders = state.active.filter((order) => order.mode.type === "table");

  return { active: state.active, history: state.history, tableOrders, placeOrder, collect, payTable };
}
