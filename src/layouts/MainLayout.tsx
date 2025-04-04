
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface MainLayoutProps {
  children: React.ReactNode;
  userRole?: "resident" | "admin" | null;
}

export default function MainLayout({ children, userRole = null }: MainLayoutProps) {
  const { toast } = useToast();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    // In a real app, this would handle auth logout
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-primary-foreground shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold flex items-center gap-2">
            <span className="bg-white text-primary rounded-full p-1 w-8 h-8 flex items-center justify-center">
              CC
            </span>
            CitizenConnect
          </Link>
          
          <div className="hidden md:flex space-x-4 items-center">
            <Link to="/" className="hover:underline">Home</Link>
            {userRole === "resident" && (
              <>
                <Link to="/submit-feedback" className="hover:underline">Submit Feedback</Link>
                <Link to="/my-submissions" className="hover:underline">My Submissions</Link>
              </>
            )}
            {userRole === "admin" && (
              <>
                <Link to="/dashboard" className="hover:underline">Dashboard</Link>
                <Link to="/reports" className="hover:underline">Reports</Link>
              </>
            )}
            {!userRole ? (
              <div className="flex space-x-2">
                <Link to="/login">
                  <Button variant="outline" className="bg-white hover:bg-gray-100">Log In</Button>
                </Link>
                <Link to="/signup">
                  <Button variant="secondary">Sign Up</Button>
                </Link>
              </div>
            ) : (
              <Button variant="outline" className="bg-white hover:bg-gray-100" onClick={handleLogout}>
                Log Out
              </Button>
            )}
          </div>
          
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {isMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-primary text-primary-foreground p-4">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="hover:underline" onClick={() => setIsMenuOpen(false)}>Home</Link>
              {userRole === "resident" && (
                <>
                  <Link to="/submit-feedback" className="hover:underline" onClick={() => setIsMenuOpen(false)}>Submit Feedback</Link>
                  <Link to="/my-submissions" className="hover:underline" onClick={() => setIsMenuOpen(false)}>My Submissions</Link>
                </>
              )}
              {userRole === "admin" && (
                <>
                  <Link to="/dashboard" className="hover:underline" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
                  <Link to="/reports" className="hover:underline" onClick={() => setIsMenuOpen(false)}>Reports</Link>
                </>
              )}
              {!userRole ? (
                <div className="flex flex-col space-y-2">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full bg-white hover:bg-gray-100">Log In</Button>
                  </Link>
                  <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="secondary" className="w-full">Sign Up</Button>
                  </Link>
                </div>
              ) : (
                <Button variant="outline" className="bg-white hover:bg-gray-100" onClick={handleLogout}>
                  Log Out
                </Button>
              )}
            </nav>
          </div>
        )}
      </header>

      <main className="flex-grow container mx-auto px-4 py-6">
        {children}
      </main>

      <footer className="bg-gray-100 text-gray-600 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-lg font-bold mb-4">CitizenConnect</h3>
              <p className="text-sm">Empowering communities through feedback</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-semibold mb-3">Resources</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:underline">FAQ</a></li>
                  <li><a href="#" className="hover:underline">How It Works</a></li>
                  <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Contact</h4>
                <ul className="space-y-2 text-sm">
                  <li>info@citizenconnect.gov</li>
                  <li>1-800-555-1212</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-6 text-sm text-center">
            © {new Date().getFullYear()} CitizenConnect. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
