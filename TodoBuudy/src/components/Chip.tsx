import type React from "react";
import clsx from "clsx";

interface ChipProps {
    label: string;
    type: "status" | "priority";
}

const colorMap = {
    status: {
        "todo": "bg-green-100 text-green-800",
        "in-progress": "bg-blue-100 text-blue-800",
        "on-hold": "bg-yellow-100 text-yellow-800",
        "done": "bg-purple-100 text-purple-800",
        "will-not-do": "bg-gray-200 text-gray-800",
    },
    priority: {
        "low": "bg-green-100 text-green-800",
        "medium": "bg-yellow-100 text-yellow-800",
        "high": "bg-red-100 text-red-800",
        "critical": "bg-pink-100 text-pink-800",
    }
}

type StatusKey = keyof typeof colorMap.status;
type PriorityKey = keyof typeof colorMap.priority;

const Chip: React.FC<ChipProps> = ({ label, type }) => {
  const normalized = label.toLowerCase();

  let colorClass: string;

  if (type === "status") {
    colorClass = colorMap.status[normalized as StatusKey] ?? "bg-gray-100 text-gray-800";
  } else {
    colorClass = colorMap.priority[normalized as PriorityKey] ?? "bg-gray-100 text-gray-800";
  }

  return (
    <span
      className={clsx(
        "px-2 py-1 rounded-full text-xs font-semibold capitalize",
        colorClass
      )}
    >
      {label}
    </span>
  );
};

export default Chip;