
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Feedback } from "@/types";
import StatusBadge from "@/components/StatusBadge";
import UrgencyBadge from "@/components/UrgencyBadge";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";

interface FeedbackCardProps {
  feedback: Feedback;
  isDetailView?: boolean;
}

export default function FeedbackCard({ feedback, isDetailView = false }: FeedbackCardProps) {
  const { id, title, description, createdAt, status, urgency, issueType, location, images } = feedback;
  
  return (
    <Card className={cn("overflow-hidden transition-all", 
      isDetailView ? "" : "hover:shadow-md")}>
      <CardHeader className="p-4 pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h3 className="font-medium text-lg line-clamp-1">{title}</h3>
          <div className="flex flex-wrap gap-2">
            <StatusBadge status={status} />
            <UrgencyBadge urgency={urgency} />
          </div>
        </div>
        <div className="flex justify-between items-center text-sm text-muted-foreground mt-2">
          <span>{issueType}</span>
          <span>{formatDistanceToNow(new Date(createdAt), { addSuffix: true })}</span>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        {images && images.length > 0 && (
          <div className={cn("overflow-hidden mb-3", isDetailView ? "h-auto" : "h-40")}>
            <div className={cn("grid gap-2", images.length > 1 ? "grid-cols-2" : "grid-cols-1")}>
              {images.slice(0, isDetailView ? images.length : 2).map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Submitted image ${i + 1}`}
                  className="w-full h-40 object-cover rounded-md"
                />
              ))}
            </div>
          </div>
        )}
        <p className={cn("text-gray-700", isDetailView ? "" : "line-clamp-2")}>{description}</p>
        <div className="mt-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {location.address}
          </span>
        </div>
      </CardContent>
      {!isDetailView && (
        <CardFooter className="p-4 pt-0 flex justify-end">
          <Link 
            to={`/feedback/${id}`}
            className="text-primary hover:underline text-sm font-medium"
          >
            View Details
          </Link>
        </CardFooter>
      )}
    </Card>
  );
}

import { cn } from "@/lib/utils";
