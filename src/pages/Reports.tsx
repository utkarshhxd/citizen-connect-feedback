
import { useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockFeedback } from "@/data/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function Reports() {
  const [timeRange, setTimeRange] = useState("month");
  
  // Calculate issue types statistics
  const issueTypeStats = mockFeedback.reduce((acc, feedback) => {
    acc[feedback.issueType] = (acc[feedback.issueType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const issueTypeData = Object.keys(issueTypeStats).map((type) => ({
    name: type,
    count: issueTypeStats[type],
  }));
  
  // Calculate status statistics
  const statusStats = mockFeedback.reduce((acc, feedback) => {
    acc[feedback.status] = (acc[feedback.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const statusData = [
    { name: "Pending", value: statusStats["pending"] || 0 },
    { name: "In Progress", value: statusStats["in-progress"] || 0 },
    { name: "Resolved", value: statusStats["resolved"] || 0 },
  ];
  
  // Calculate resolution time (mock data)
  const resolutionTimeData = [
    { name: "Roads", days: 5.2 },
    { name: "Water", days: 2.8 },
    { name: "Electricity", days: 3.5 },
    { name: "Public Safety", days: 1.9 },
  ];
  
  return (
    <MainLayout userRole="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Analytics & Reports</h1>
          <p className="text-muted-foreground mt-1">
            Insights and statistics about community feedback
          </p>
        </div>
        
        <div className="flex justify-end">
          <Tabs defaultValue={timeRange} onValueChange={setTimeRange} className="w-[200px]">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="year">Year</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Total Submissions</CardTitle>
              <CardDescription>All reported issues</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{mockFeedback.length}</div>
              <p className="text-sm text-green-600 mt-1">↑ 12% from previous period</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Resolution Rate</CardTitle>
              <CardDescription>Issues marked as resolved</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {Math.round((statusStats["resolved"] || 0) / mockFeedback.length * 100)}%
              </div>
              <p className="text-sm text-green-600 mt-1">↑ 5% from previous period</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Avg. Response Time</CardTitle>
              <CardDescription>Time to first response</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">1.5 days</div>
              <p className="text-sm text-green-600 mt-1">↓ 0.3 days improvement</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Issues by Type</CardTitle>
              <CardDescription>Distribution of reported issues</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={issueTypeData}
                    margin={{ top: 20, right: 30, left: 0, bottom: 40 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" name="Number of Issues" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Average Resolution Time</CardTitle>
              <CardDescription>Days to resolve by category</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={resolutionTimeData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="days" name="Days to Resolve" fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Issue Status Overview</CardTitle>
              <CardDescription>Current state of all reported issues</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={statusData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" name="Number of Issues" fill="#6B7280" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
