
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockFeedback } from "@/data/mockData";
import FeedbackList from "../FeedbackList";
import { Feedback, FeedbackStatus } from "@/types";
import { useToast } from "@/components/ui/use-toast";

export default function AdminDashboard() {
  const { toast } = useToast();
  const [feedbackData, setFeedbackData] = useState<Feedback[]>(mockFeedback);
  
  const pendingCount = feedbackData.filter(f => f.status === "pending").length;
  const inProgressCount = feedbackData.filter(f => f.status === "in-progress").length;
  const resolvedCount = feedbackData.filter(f => f.status === "resolved").length;
  
  const updateFeedbackStatus = (id: string, status: FeedbackStatus) => {
    setFeedbackData(prev => 
      prev.map(feedback => 
        feedback.id === id 
          ? { ...feedback, status, updatedAt: new Date() }
          : feedback
      )
    );
    
    toast({
      title: "Status updated",
      description: `Feedback #${id.slice(-4)} has been marked as ${status}.`,
    });
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Manage and respond to community feedback
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Pending</CardTitle>
            <CardDescription>Awaiting review</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{pendingCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">In Progress</CardTitle>
            <CardDescription>Being addressed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{inProgressCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Resolved</CardTitle>
            <CardDescription>Completed issues</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{resolvedCount}</div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Feedback</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="inProgress">In Progress</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <div className="mt-6">
            <FeedbackList feedbackItems={feedbackData} />
          </div>
        </TabsContent>
        <TabsContent value="pending">
          <div className="mt-6">
            <FeedbackList feedbackItems={feedbackData.filter(f => f.status === "pending")} />
          </div>
        </TabsContent>
        <TabsContent value="inProgress">
          <div className="mt-6">
            <FeedbackList feedbackItems={feedbackData.filter(f => f.status === "in-progress")} />
          </div>
        </TabsContent>
        <TabsContent value="resolved">
          <div className="mt-6">
            <FeedbackList feedbackItems={feedbackData.filter(f => f.status === "resolved")} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
