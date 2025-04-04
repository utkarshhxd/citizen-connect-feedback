
import { Feedback, User } from "@/types";

export const mockUsers: User[] = [
  {
    id: "user1",
    name: "John Doe",
    email: "john@example.com",
    role: "resident",
    phone: "555-123-4567",
  },
  {
    id: "user2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "resident",
  },
  {
    id: "admin1",
    name: "Admin User",
    email: "admin@citycouncil.gov",
    role: "admin",
    phone: "555-987-6543",
  },
];

export const mockFeedback: Feedback[] = [
  {
    id: "feedback1",
    title: "Pothole on Main Street",
    description: "Large pothole causing damage to vehicles near 123 Main St intersection",
    createdAt: new Date("2023-03-15T10:30:00"),
    updatedAt: new Date("2023-03-15T14:22:00"),
    status: "in-progress",
    urgency: "medium",
    issueType: "Roads",
    location: {
      address: "123 Main Street, Downtown",
      latitude: 40.712776,
      longitude: -74.005974,
    },
    images: ["/placeholder.svg"],
    submittedBy: {
      name: "John Doe",
      phone: "555-123-4567",
      userId: "user1",
    },
    assignedTo: "admin1",
    comments: [
      {
        id: "comment1",
        content: "We have scheduled repairs for next week",
        createdAt: new Date("2023-03-15T14:22:00"),
        author: {
          id: "admin1",
          name: "Admin User",
          role: "admin",
        },
      },
    ],
  },
  {
    id: "feedback2",
    title: "Street Light Out",
    description: "Street light has been out for 3 days at corner of Elm and 5th",
    createdAt: new Date("2023-03-10T18:45:00"),
    updatedAt: new Date("2023-03-10T18:45:00"),
    status: "pending",
    urgency: "low",
    issueType: "Electricity",
    location: {
      address: "Corner of Elm St and 5th Ave",
      latitude: 40.730610,
      longitude: -73.935242,
    },
    images: ["/placeholder.svg"],
    submittedBy: {
      name: "Anonymous",
    },
  },
  {
    id: "feedback3",
    title: "Water main break",
    description: "Water flowing onto street from broken main, creating hazardous conditions",
    createdAt: new Date("2023-03-14T08:15:00"),
    updatedAt: new Date("2023-03-14T09:30:00"),
    status: "resolved",
    urgency: "high",
    issueType: "Water",
    location: {
      address: "456 Park Avenue",
      latitude: 40.7580,
      longitude: -73.9855,
    },
    images: ["/placeholder.svg", "/placeholder.svg"],
    submittedBy: {
      name: "Jane Smith",
      userId: "user2",
    },
    assignedTo: "admin1",
    comments: [
      {
        id: "comment2",
        content: "Emergency crew dispatched",
        createdAt: new Date("2023-03-14T08:30:00"),
        author: {
          id: "admin1",
          name: "Admin User",
          role: "admin",
        },
      },
      {
        id: "comment3",
        content: "Issue has been resolved, road has been cleaned",
        createdAt: new Date("2023-03-14T09:30:00"),
        author: {
          id: "admin1",
          name: "Admin User",
          role: "admin",
        },
      },
    ],
  },
];

export const issueTypes = [
  "Roads",
  "Water",
  "Electricity",
  "Sanitation",
  "Public Safety",
  "Parks",
  "Public Transport",
  "Noise",
  "Other",
];
