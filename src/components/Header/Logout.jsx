import React, { useState } from "react";
import { account } from "../../appwrite/appwriteConfig";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const Logout = ({ onLogout }) => {
  const [loggingOut, setLoggingOut] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      document.querySelector("html").style.pointerEvents = "none";
      await account.deleteSession("current");
      onLogout();
    } catch (error) {
      console.log("Appwrite :: Logout Error :: ", error);
    }
    document.querySelector("html").style.pointerEvents = "";
    setLoggingOut(false);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="px-3">
          Logout
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-base">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Click 'logout Anyway' to logout
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-base">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout} disabled={loggingOut}>
            Logout Anyway
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

// function ProfileForm({ className }) {
//   return (
//     <form className={cn("grid items-start gap-4", className)}>
//       <div className="grid gap-2">
//         <Label htmlFor="email">Email</Label>
//         <Input type="email" id="email" defaultValue="shadcn@example.com" />
//       </div>
//       <div className="grid gap-2">
//         <Label htmlFor="username">Username</Label>
//         <Input id="username" defaultValue="@shadcn" />
//       </div>
//       <Button type="submit">Save changes</Button>
//     </form>
//   );
// }
