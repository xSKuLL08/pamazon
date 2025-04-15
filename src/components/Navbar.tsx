"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import {
  Home,
  Package,
  ShoppingCart,
  UserCircle,
  Moon,
  LogOut
} from "lucide-react";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      router.push('/login');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <motion.div 
      className="fixed h-full w-20 bg-gray-900/50 backdrop-blur-md border-r border-gray-800/50 flex flex-col items-center py-8 z-50"
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Image src="/logo.svg" alt="Logo" width={38} height={38} />
      </motion.div>
      
      <div className="flex flex-col items-center space-y-8 flex-grow">
        <motion.button
          onClick={() => router.push('/home')}
          className="p-3 bg-gray-800/50 rounded-xl text-blue-400 hover:bg-blue-600/20 hover:text-blue-300 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Home size={20} />
        </motion.button>
        <motion.button
          onClick={() => router.push('/products')}
          className="p-3 bg-gray-800/50 rounded-xl text-gray-400 hover:bg-blue-600/20 hover:text-blue-300 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Package size={20} />
        </motion.button>
        <motion.button
          onClick={() => router.push('/cart')}
          className="p-3 bg-gray-800/50 rounded-xl text-gray-400 hover:bg-blue-600/20 hover:text-blue-300 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ShoppingCart size={20} />
        </motion.button>
        <motion.button
          onClick={() => router.push('/profile')}
          className="p-3 bg-gray-800/50 rounded-xl text-gray-400 hover:bg-blue-600/20 hover:text-blue-300 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <UserCircle size={20} />
        </motion.button>
        <motion.button
          className="p-3 bg-gray-800/50 rounded-xl text-gray-400 hover:bg-blue-600/20 hover:text-blue-300 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Moon size={20} />
        </motion.button>
      </div>
      
      <motion.button
        onClick={handleSignOut}
        className="p-3 text-red-400 hover:text-red-300 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <LogOut size={20} />
      </motion.button>
    </motion.div>
  );
}