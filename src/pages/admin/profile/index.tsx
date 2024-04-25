import Sidebar from "@/components/admin/Sidebar";
import { useEffect } from "react";
import { checkAdminLoggedIn } from "@/components/auth/check_admin";
import { useRouter } from "next/router";

const Admin = ({ params }: { params: { user: number } }) => {
  const router = useRouter();

  useEffect(() => {
    const { loggedIn, userId } = checkAdminLoggedIn();
    if (!loggedIn) {
      router.push("/login");
    }
    console.log("User is logged in with ID:", userId);
  }, []);

  return (
    <Sidebar>
      <h1>555</h1>
    </Sidebar>
  );
};

export default Admin;
