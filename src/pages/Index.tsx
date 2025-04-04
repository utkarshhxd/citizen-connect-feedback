
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import FeedbackList from "@/components/FeedbackList";
import { mockFeedback } from "@/data/mockData";
import MainLayout from "@/layouts/MainLayout";

const Index = () => {
  const recentFeedback = mockFeedback.slice(0, 3);

  return (
    <MainLayout>
      <section className="py-12 px-4 sm:px-6 md:px-8 bg-gradient-to-r from-primary to-civic-blue text-primary-foreground rounded-lg mb-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Empowering Communities Through Feedback
          </h1>
          <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto">
            Report local issues, track their status, and see how your feedback helps improve your neighborhood.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/submit-feedback">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Submit Feedback
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border-white">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Recent Community Feedback</h2>
          <Link to="/explore" className="text-primary hover:underline">
            View All
          </Link>
        </div>
        <FeedbackList feedbackItems={recentFeedback} showFilters={false} />
      </section>
      
      <section className="mb-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                <circle cx="12" cy="13" r="3" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Submit Issues</h3>
            <p className="text-gray-600">
              Report problems with roads, water, electricity, and more. Add photos to help authorities better understand.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" />
                <path d="M4 16s.5-1 2-1 2.5 1 4 1 2.5-1 4-1 2.5 1 4 1 2-1 2-1" />
                <path d="M2 21h20" />
                <path d="M7 8v2" />
                <path d="M12 8v2" />
                <path d="M17 8v2" />
                <path d="M7 4h.01" />
                <path d="M12 4h.01" />
                <path d="M17 4h.01" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Track Progress</h3>
            <p className="text-gray-600">
              Follow the status of your submissions from pending to resolved. Get notified when there are updates.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
                <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
                <path d="M7 21h10" />
                <path d="M12 3v18" />
                <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">See Results</h3>
            <p className="text-gray-600">
              Watch how community feedback translates into real improvements and track resolved issues in your area.
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-12 px-6 bg-gray-50 rounded-lg">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Join Your Community</h2>
          <p className="text-lg text-gray-600 mb-8">
            Sign up today to start submitting feedback and tracking local issues. Together, we can build a better community.
          </p>
          <Link to="/signup">
            <Button size="lg">Create Free Account</Button>
          </Link>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
