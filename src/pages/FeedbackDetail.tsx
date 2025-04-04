
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { mockFeedback } from "@/data/mockData";
import { Feedback, FeedbackStatus } from "@/types";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import FeedbackCard from "@/components/FeedbackCard";
import StatusBadge from "@/components/StatusBadge";
import { formatDistanceToNow, format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function FeedbackDetail() {
  const { id } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [comment, setComment] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [newStatus, setNewStatus] = useState<FeedbackStatus | "">("");

  // In a real app, this would be determined by authentication
  const userRole: "admin" | "resident" = "admin";

  useEffect(() => {
    // In a real app, this would be an API call
    const found = mockFeedback.find(f => f.id === id);
    if (found) {
      setFeedback(found);
      setNewStatus(found.status);
    } else {
      toast({
        variant: "destructive",
        title: "Feedback not found",
        description: "The requested feedback item could not be found.",
      });
      navigate("/");
    }
  }, [id, navigate, toast]);

  const handleStatusChange = (status: FeedbackStatus) => {
    if (!feedback) return;
    
    setFeedback({
      ...feedback,
      status,
      updatedAt: new Date()
    });
    
    toast({
      title: "Status updated",
      description: `Feedback status changed to ${status}.`,
    });
  };

  const handleSubmitComment = () => {
    if (!feedback || !comment.trim()) return;
    
    setIsSubmittingComment(true);
    
    // Simulate API call
    setTimeout(() => {
      const newComment = {
        id: `comment-${Date.now()}`,
        content: comment,
        createdAt: new Date(),
        author: {
          id: userRole === "admin" ? "admin1" : "user1",
          name: userRole === "admin" ? "Admin User" : "John Doe",
          role: userRole,
        },
      };
      
      setFeedback({
        ...feedback,
        comments: [...(feedback.comments || []), newComment],
        updatedAt: new Date()
      });
      
      setComment("");
      setIsSubmittingComment(false);
      
      toast({
        title: "Comment added",
        description: "Your comment has been added successfully.",
      });
    }, 1000);
  };

  if (!feedback) {
    return (
      <MainLayout userRole={userRole}>
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse">Loading feedback details...</div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout userRole={userRole}>
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Button
            variant="outline"
            className="mb-4"
            onClick={() => navigate(-1)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back
          </Button>
          
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold">{feedback.title}</h1>
              <div className="text-sm text-muted-foreground mt-1">
                Reference ID: {feedback.id}
              </div>
            </div>
            
            {userRole === "admin" && (
              <div className="min-w-32">
                <Select 
                  value={feedback.status} 
                  onValueChange={(value) => handleStatusChange(value as FeedbackStatus)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Update Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <StatusBadge status={feedback.status} />
            <span className="status-badge bg-gray-100 text-gray-800">
              {feedback.issueType}
            </span>
            <span className="status-badge bg-gray-100 text-gray-800">
              Submitted {formatDistanceToNow(new Date(feedback.createdAt), { addSuffix: true })}
            </span>
          </div>
        </div>

        <FeedbackCard feedback={feedback} isDetailView={true} />
        
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Comments & Updates</h2>
          
          {feedback.comments && feedback.comments.length > 0 ? (
            <div className="space-y-4 mb-6">
              {feedback.comments.map((comment) => (
                <div 
                  key={comment.id} 
                  className={`p-4 rounded-lg ${comment.author.role === 'admin' ? 'bg-blue-50 border-blue-100' : 'bg-gray-50 border-gray-100'} border`}
                >
                  <div className="flex justify-between mb-2">
                    <div className="font-medium flex items-center">
                      {comment.author.name}
                      {comment.author.role === "admin" && (
                        <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">
                          Authority
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-500">
                      {format(new Date(comment.createdAt), "MMM d, yyyy 'at' h:mm a")}
                    </div>
                  </div>
                  <p>{comment.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 bg-gray-50 rounded-lg mb-6">
              <p className="text-gray-500">No comments yet</p>
            </div>
          )}
          
          <div className="space-y-3">
            <Textarea 
              placeholder="Add a comment or update..." 
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-24"
            />
            <Button 
              className="w-full sm:w-auto" 
              onClick={handleSubmitComment}
              disabled={!comment.trim() || isSubmittingComment}
            >
              {isSubmittingComment ? "Posting..." : "Post Comment"}
            </Button>
          </div>
        </div>
        
        {userRole === "admin" && feedback.submittedBy?.phone && (
          <div className="mt-8 p-4 border rounded-lg bg-gray-50">
            <h3 className="font-medium mb-2">Contact Submitter</h3>
            <p className="text-sm text-gray-600">
              Name: {feedback.submittedBy.name || "Anonymous"}
            </p>
            <p className="text-sm text-gray-600 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              {feedback.submittedBy.phone}
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
