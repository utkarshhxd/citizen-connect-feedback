
import MainLayout from "@/layouts/MainLayout";
import FeedbackForm from "@/components/FeedbackForm";

export default function SubmitFeedback() {
  return (
    <MainLayout userRole="resident">
      <div className="max-w-3xl mx-auto">
        <FeedbackForm />
      </div>
    </MainLayout>
  );
}
