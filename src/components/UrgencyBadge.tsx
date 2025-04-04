
import { cn } from "@/lib/utils";
import { UrgencyLevel } from "@/types";

interface UrgencyBadgeProps {
  urgency: UrgencyLevel;
  className?: string;
}

export default function UrgencyBadge({ urgency, className }: UrgencyBadgeProps) {
  const getUrgencyClasses = (urgency: UrgencyLevel) => {
    switch (urgency) {
      case "low":
        return "urgency-low";
      case "medium":
        return "urgency-medium";
      case "high":
        return "urgency-high";
      default:
        return "";
    }
  };

  return (
    <span className={cn("status-badge", getUrgencyClasses(urgency), className)}>
      {urgency.charAt(0).toUpperCase() + urgency.slice(1)} Urgency
    </span>
  );
}
