
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Feedback, FeedbackStatus } from "@/types";
import FeedbackCard from "./FeedbackCard";
import { issueTypes } from "@/data/mockData";

interface FeedbackListProps {
  feedbackItems: Feedback[];
  showFilters?: boolean;
}

export default function FeedbackList({ feedbackItems, showFilters = true }: FeedbackListProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<FeedbackStatus | "all">("all");
  const [issueTypeFilter, setIssueTypeFilter] = useState<string>("all");

  const filteredFeedback = feedbackItems.filter((item) => {
    // Apply search
    const searchMatch = search === "" || 
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase()) ||
      item.location.address.toLowerCase().includes(search.toLowerCase());

    // Apply status filter
    const statusMatch = statusFilter === "all" || item.status === statusFilter;

    // Apply issue type filter
    const typeMatch = issueTypeFilter === "all" || item.issueType === issueTypeFilter;

    return searchMatch && statusMatch && typeMatch;
  });

  const sortedFeedback = [...filteredFeedback].sort((a, b) => {
    // Sort by urgency then date
    const urgencyOrder: Record<string, number> = { high: 0, medium: 1, low: 2 };
    if (urgencyOrder[a.urgency] !== urgencyOrder[b.urgency]) {
      return urgencyOrder[a.urgency] - urgencyOrder[b.urgency];
    }
    // Sort by newest first
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="space-y-6">
      {showFilters && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              placeholder="Search feedback..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="sm:max-w-sm"
            />
            <div className="grid grid-cols-2 gap-3">
              <Select 
                value={statusFilter} 
                onValueChange={(value) => setStatusFilter(value as FeedbackStatus | "all")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
              
              <Select 
                value={issueTypeFilter} 
                onValueChange={setIssueTypeFilter}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by issue type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Issues</SelectItem>
                  {issueTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Showing {sortedFeedback.length} of {feedbackItems.length} total issues
          </p>
        </div>
      )}

      {sortedFeedback.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {sortedFeedback.map((feedback) => (
            <FeedbackCard key={feedback.id} feedback={feedback} />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <div className="inline-block p-6 rounded-full bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
              <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
              <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7 .34.62.5 1.28.5 2s-.16 1.38-.5 2c0 0-3 7-10 7s-10-7-10-7c-.34-.62-.5-1.28-.5-2s.16-1.38.5-2c0 0 1.67-3.89 5.73-5.92" />
              <path d="M21 14.45A13.4 13.4 0 0 0 12 12a13.4 13.4 0 0 0-9 2.45" />
              <line x1="2" x2="22" y1="2" y2="22" />
            </svg>
          </div>
          <h3 className="mt-4 text-lg font-medium">No feedback found</h3>
          <p className="mt-1 text-muted-foreground">
            {search || statusFilter !== "all" || issueTypeFilter !== "all"
              ? "Try adjusting your search or filters"
              : "No feedback has been submitted yet"}
          </p>
        </div>
      )}
    </div>
  );
}
