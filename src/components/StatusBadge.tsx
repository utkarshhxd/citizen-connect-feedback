
import { cn } from "@/lib/utils";
import { FeedbackStatus } from "@/types";

interface StatusBadgeProps {
  status: FeedbackStatus;
  className?: string;
}

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  const getStatusClasses = (status: FeedbackStatus) => {
    switch (status) {
      case "pending":
        return "status-badge status-pending";
      case "in-progress":
        return "status-badge status-in-progress";
      case "resolved":
        return "status-badge status-resolved";
      default:
        return "status-badge";
    }
  };

  const getStatusText = (status: FeedbackStatus) => {
    switch (status) {
      case "pending":
        return "Pending";
      case "in-progress":
        return "In Progress";
      case "resolved":
        return "Resolved";
      default:
        return "Unknown";
    }
  };

  return (
    <span className={cn(getStatusClasses(status), className)}>
      {getStatusText(status)}
    </span>
  );
}
