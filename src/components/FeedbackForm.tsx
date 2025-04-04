
import { useState, FormEvent, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { issueTypes } from "@/data/mockData";
import { UrgencyLevel } from "@/types";

export default function FeedbackForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    issueType: "",
    title: "",
    description: "",
    urgency: "" as UrgencyLevel,
    images: [] as File[],
    consent: false
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, consent: checked }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...newImages].slice(0, 5) // Limit to 5 images
      }));
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.address || !formData.issueType || !formData.urgency) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please fill in all required fields."
      });
      return;
    }

    if (!formData.consent) {
      toast({
        variant: "destructive",
        title: "Consent required",
        description: "You must agree to share this information with authorities."
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Feedback submitted successfully!",
        description: "Your feedback has been received. You can track its status in 'My Submissions'.",
      });

      // Reset form
      setFormData({
        name: "",
        phone: "",
        address: "",
        issueType: "",
        title: "",
        description: "",
        urgency: "" as UrgencyLevel,
        images: [],
        consent: false
      });
    }, 1500);
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      toast({
        title: "Detecting location...",
        description: "Please allow location access if prompted."
      });

      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, we would reverse geocode these coordinates
          // For now, we'll just set some placeholder text
          setFormData(prev => ({
            ...prev,
            address: `Detected Address (${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)})`
          }));
          
          toast({
            title: "Location detected",
            description: "Your current location has been added to the form."
          });
        },
        (error) => {
          toast({
            variant: "destructive",
            title: "Location error",
            description: error.message
          });
        }
      );
    } else {
      toast({
        variant: "destructive",
        title: "Geolocation not supported",
        description: "Your browser doesn't support geolocation. Please enter your address manually."
      });
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Submit Feedback</h2>
            <p className="text-muted-foreground">
              Help us improve your community by reporting issues. Required fields are marked with *
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Optional"
                value={formData.name}
                onChange={handleInputChange}
              />
              <p className="text-xs text-muted-foreground">
                You can submit anonymously if preferred
              </p>
            </div>

            <div className="space-y-3">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                placeholder="Optional"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label htmlFor="address">Address/Location *</Label>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={handleGetLocation}
                className="text-xs"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Detect Location
              </Button>
            </div>
            <Input
              id="address"
              name="address"
              placeholder="Street name, area, or landmarks"
              required
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="issueType">Issue Type *</Label>
              <Select 
                value={formData.issueType} 
                onValueChange={(value) => handleSelectChange("issueType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select issue type" />
                </SelectTrigger>
                <SelectContent>
                  {issueTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="urgency">Urgency Level *</Label>
              <Select 
                value={formData.urgency} 
                onValueChange={(value) => handleSelectChange("urgency", value as UrgencyLevel)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select urgency level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="title">Issue Title *</Label>
            <Input
              id="title"
              name="title"
              placeholder="Brief summary of the issue"
              required
              value={formData.title}
              onChange={handleInputChange}
              maxLength={100}
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="description">Detailed Description *</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Please provide as much detail as possible about the issue"
              required
              value={formData.description}
              onChange={handleInputChange}
              rows={5}
            />
          </div>

          <div className="space-y-3">
            <Label htmlFor="images">Upload Images (Max 5)</Label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {formData.images.map((file, index) => (
                <div key={index} className="relative group">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index}`}
                    className="h-24 w-full object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-black bg-opacity-50 rounded-full p-1 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </button>
                </div>
              ))}

              {formData.images.length < 5 && (
                <div className="h-24 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center">
                  <label htmlFor="image-upload" className="cursor-pointer text-center p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-1">
                      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                      <circle cx="12" cy="13" r="3" />
                    </svg>
                    <span className="text-xs">Add Image</span>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Images help authorities better understand and address the issue
            </p>
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox 
              id="consent" 
              checked={formData.consent} 
              onCheckedChange={handleCheckboxChange} 
              className="mt-1"
            />
            <Label htmlFor="consent" className="text-sm">
              I consent to share this information with local authorities and understand it may be publicly visible (without personal details) *
            </Label>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Feedback"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
