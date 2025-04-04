
import MainLayout from "@/layouts/MainLayout";
import FeedbackList from "@/components/FeedbackList";
import { mockFeedback } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function MySubmissionsPage() {
  // Filter feedback to only show the current user's submissions
  // In a real app, this would filter based on the authenticated user's ID
  const userFeedback = mockFeedback.filter(
    (item) => item.submittedBy?.userId === "user1"
  );

  return (
    <MainLayout userRole="resident">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">My Submissions</h1>
            <p className="text-muted-foreground mt-1">
              Track and manage your feedback submissions
            </p>
          </div>
          <Link to="/submit-feedback">
            <Button>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
              New Feedback
            </Button>
          </Link>
        </div>

        {userFeedback.length > 0 ? (
          <FeedbackList feedbackItems={userFeedback} />
        ) : (
          <div className="py-16 text-center">
            <div className="inline-block p-6 rounded-full bg-gray-100 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M7 12h10" />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2">No submissions yet</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              You haven't submitted any feedback yet. Help improve your community by reporting local issues.
            </p>
            <Link to="/submit-feedback">
              <Button>Submit Feedback</Button>
            </Link>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
