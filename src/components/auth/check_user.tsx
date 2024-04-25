import { jwtDecode } from 'jwt-decode';
import router from 'next/router';

// Define a type representing the structure of the decoded token
interface DecodedToken {
  id: number;
  role: number;
  //แนบไฟล์
  // Add other properties as needed
}

export const checkUserLoggedIn = () => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const decodedToken: DecodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // เวลาปัจจุบันในรูปแบบ UNIX timestamp (หน่วยวินาที)
      
      // เช็คว่าเวลาหมดอายุของ token มากกว่าเวลาปัจจุบันหรือไม่
      if (decodedToken.exp > currentTime) {
        if (decodedToken.role === 2) {
          return { loggedIn: true, userId: decodedToken.id, token, username: "John Doe" };
        } else {
          router.back();
          return { loggedIn: false, userId: null };
        }
      } else {
        // ถ้า token หมดอายุแล้ว ลบ token ออกจาก localStorage
        localStorage.removeItem("token");
        return { loggedIn: false, userId: null };
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      return { loggedIn: false, userId: null }; 
    }
  } else {
    return { loggedIn: false, userId: null };
  } 
};

