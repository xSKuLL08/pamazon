"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  ShoppingCart, 
  ChevronRight,
  LogIn,
  UserPlus,
  Search
} from "lucide-react";

export default function StartPage() {
  const router = useRouter();

  const floatingGradients = {
    initial: {
      backgroundPosition: "0% 50%",
    },
    animate: {
      backgroundPosition: "100% 50%",
      transition: {
        repeat: Infinity,
        repeatType: "mirror" as const,
        duration: 15,
        ease: "linear",
      },
    },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Background Effects */}
      <motion.div
        className="absolute inset-0 opacity-40 bg-gradient-to-br from-blue-900 via-purple-900 to-black"
        variants={floatingGradients}
        initial="initial"
        animate="animate"
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/40 to-black pointer-events-none" />
      
      {/* Floating Orbs */}
      <motion.div 
        className="absolute top-20 right-40 w-64 h-64 rounded-full bg-blue-600/20 blur-3xl"
        animate={{ 
          x: [0, 30, 0], 
          y: [0, -30, 0],
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          repeatType: "mirror"
        }}
      />
      <motion.div 
        className="absolute bottom-40 left-20 w-96 h-96 rounded-full bg-purple-600/20 blur-3xl"
        animate={{ 
          x: [0, -40, 0], 
          y: [0, 40, 0],
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          repeatType: "mirror"
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Navbar */}
        <motion.div 
          className="flex justify-between items-center p-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="flex items-center space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <ShoppingCart className="text-white" size={20} />
            </div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Pamazon
            </h1>
          </motion.div>
          
          <div className="flex items-center space-x-4">
            <motion.button 
              className="px-4 py-2 text-blue-300 border border-blue-500/30 rounded-xl hover:bg-blue-500/10 transition"
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              onClick={() => router.push("/login")}
            >
              <span className="flex items-center">
                <LogIn size={18} className="mr-2" />
                Login
              </span>
            </motion.button>
            
            <motion.button 
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl"
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              onClick={() => router.push("/signup")}
            >
              <span className="flex items-center">
                <UserPlus size={18} className="mr-2" />
                Sign Up
              </span>
            </motion.button>
          </div>
        </motion.div>
        
        {/* Main Hero Section */}
        <div className="flex flex-col md:flex-row items-center justify-between px-8 md:px-20 py-12 md:py-20">
          <motion.div 
            className="md:w-1/2 mb-12 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "120px" }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="h-1 bg-gradient-to-r from-blue-400 to-purple-500 mb-6"
            />
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Pamazon</span>
              <br />
              <span className="text-white">The Next-Gen eCom Platform</span>
            </motion.h1>
            
            <motion.p 
              className="text-lg text-gray-300 mb-8 max-w-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Discover a new world of shopping with cutting-edge technology.
              Experience seamless browsing, personalized recommendations, and
              lightning-fast delivery.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <motion.button 
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-medium flex items-center justify-center"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => router.push("/signup")}
              >
                Get Started
                <ChevronRight size={18} className="ml-1" />
              </motion.button>
              
              <motion.button 
                className="px-6 py-3 border border-blue-500/30 rounded-xl hover:bg-blue-500/10 transition flex items-center justify-center"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => router.push("/browse")}
              >
                Browse Products
              </motion.button>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="relative w-80 h-80 md:w-96 md:h-96"
              animate={{ 
                y: [0, -10, 0],
                rotateZ: [0, 2, 0],
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                repeatType: "mirror"
              }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 blur-xl" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-full bg-[url('/heroimage.jpg')] bg-cover bg-center rounded-full shadow-2xl shadow-blue-500/20" />
              </div>
              
              {/* Floating elements around the image */}
              <motion.div 
                className="absolute -top-4 -right-4 bg-blue-900/80 backdrop-blur-md p-3 rounded-xl border border-blue-800/50"
                animate={{ 
                  y: [0, -10, 0],
                  x: [0, 10, 0],
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "mirror",
                  delay: 1
                }}
              >
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2" />
                  <span className="text-sm">Next-day Delivery</span>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-4 -left-4 bg-purple-900/80 backdrop-blur-md p-3 rounded-xl border border-purple-800/50"
                animate={{ 
                  y: [0, 10, 0],
                  x: [0, -10, 0],
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "mirror",
                  delay: 0.5
                }}
              >
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2" />
                  <span className="text-sm">Top Rated Products</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Features Section */}
        <motion.div 
          className="px-8 md:px-20 py-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Pamazon?</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-gray-900/50 backdrop-blur-md border border-gray-800/50 rounded-2xl p-6"
              whileHover={{ y: -10, transition: { type: "spring", stiffness: 300, damping: 15 } }}
            >
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                <Search className="text-blue-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Search</h3>
              <p className="text-gray-400">Our AI-powered search understands exactly what you're looking for.</p>
            </motion.div>
            
            <motion.div 
              className="bg-gray-900/50 backdrop-blur-md border border-gray-800/50 rounded-2xl p-6"
              whileHover={{ y: -10, transition: { type: "spring", stiffness: 300, damping: 15 } }}
            >
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                <ShoppingCart className="text-purple-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Checkout</h3>
              <p className="text-gray-400">Seamless one-click purchasing with multiple payment options.</p>
            </motion.div>
            
            <motion.div 
              className="bg-gray-900/50 backdrop-blur-md border border-gray-800/50 rounded-2xl p-6"
              whileHover={{ y: -10, transition: { type: "spring", stiffness: 300, damping: 15 } }}
            >
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                <LogIn className="text-blue-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Platform</h3>
              <p className="text-gray-400">Your data and transactions are protected with enterprise-grade security.</p>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Footer */}
        <div className="mt-12 border-t border-gray-800/50 px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 Pamazon. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition">Terms</a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}