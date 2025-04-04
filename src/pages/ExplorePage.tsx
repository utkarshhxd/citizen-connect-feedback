
import MainLayout from "@/layouts/MainLayout";
import FeedbackList from "@/components/FeedbackList";
import { mockFeedback } from "@/data/mockData";

export default function ExplorePage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Community Feedback</h1>
          <p className="text-muted-foreground mt-1">
            Explore issues reported in your community
          </p>
        </div>
        
        <FeedbackList feedbackItems={mockFeedback} />
      </div>
    </MainLayout>
  );
}
