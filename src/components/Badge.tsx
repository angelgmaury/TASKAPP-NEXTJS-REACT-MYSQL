interface BadgeProps {
  status: string;
}

export function Badge({ status }: BadgeProps) {
  let badgeColor = "";
  switch (status) {
    case "pending":
      badgeColor = "bg-yellow-500";
      break;
    case "in-progress":
      badgeColor = "bg-blue-500";
      break;
    case "completed":
      badgeColor = "bg-green-500";
      break;
    case "high":
      badgeColor = "bg-red-500";
      break;
    case "low":
      badgeColor = "bg-gray-500";
      break;
    case "normal":
      badgeColor = "bg-orange-500";
      break;
    default:
      badgeColor = "bg-gray-500";
      break;
  }

  return (
    <span
      className={`inline-block text-white font-semibold text-sm rounded-full px-2 ${badgeColor}`}
    >
      {status}
    </span>
  );
}
