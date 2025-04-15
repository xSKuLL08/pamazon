"use client";
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, ChevronRight, Lock, User, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, username, password);
      router.push('/home');
    } catch (err: any) {
      setError(err.message || 'Failed to log in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1
      } 
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.03 },
    tap: { scale: 0.97 }
  };

  return (
    <div className="flex h-screen w-full bg-black overflow-hidden">
      {/* Left Side - Login Form */}
      <motion.div 
        className="w-full md:w-1/2 bg-gradient-to-br from-black via-gray-900 to-black p-8 md:p-12 flex flex-col"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Image src="/logo.svg" alt="Logo" width={48} height={48} />
        </motion.div>
        
        <motion.div 
          className="flex-grow flex flex-col justify-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-4xl font-bold text-white mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
            variants={itemVariants}
          >
            Sign In
          </motion.h1>
          
          {error && (
            <motion.div 
              className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {error}
            </motion.div>
          )}
          
          <form onSubmit={handleLogin}>
            <motion.div className="mb-6" variants={itemVariants}>
              <label htmlFor="username" className="block text-gray-400 text-sm mb-2 font-medium">
                User Name
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-gray-900/50 border border-gray-800 pl-10 pr-4 py-3 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                  placeholder="Enter your username"
                  required
                />
                {username && (
                  <motion.div 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  >
                    <div className="w-5 h-5 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <Check size={12} className="text-white" />
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
            
            <motion.div className="mb-6" variants={itemVariants}>
              <label htmlFor="password" className="block text-gray-400 text-sm mb-2 font-medium">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-900/50 border border-gray-800 pl-10 pr-10 py-3 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 focus:outline-none"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </motion.div>
            
            <motion.div className="mb-8" variants={itemVariants}>
              <Link 
                href="#" 
                className="text-gray-400 hover:text-blue-400 text-xs font-medium transition-colors duration-200"
              >
                FORGOT PASSWORD?
              </Link>
            </motion.div>
            
            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium py-3 rounded-xl shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 transition-all duration-300"
              disabled={loading}
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <motion.div 
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                </div>
              ) : (
                "SIGN IN"
              )}
            </motion.button>
          </form>
          
          <motion.div 
            className="mt-8 text-center"
            variants={itemVariants}
          >
            <p className="text-gray-400 text-sm">
              Don't have an account?{" "}
              <Link 
                href="/signup" 
                className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
              >
                Sign up
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Right Side - Image with Text */}
      <motion.div 
        className="hidden md:block w-1/2 bg-gray-900 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 to-black/60 z-10" />
        <motion.div 
          className="absolute inset-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2 }}
        >
          <Image 
            src="/bg.jpg" 
            alt="Abstract architectural lines" 
            fill 
            style={{ objectFit: 'cover' }} 
            className="opacity-80"
          />
        </motion.div>
        <motion.div 
          className="absolute top-1/2 left-12 transform -translate-y-1/2 z-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.p 
            className="text-white text-lg mb-6 font-light leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            A new way to buy or rent<br />
            next-gen tech products or the latest arrivals in the market.
          </motion.p>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "80px" }}
            transition={{ duration: 0.8, delay: 1 }}
            className="h-[1px] bg-gradient-to-r from-blue-400 to-purple-500 mb-6"
          />
          <motion.button 
            className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium flex items-center"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            LEARN MORE
            <ChevronRight size={16} className="ml-1" />
          </motion.button>
        </motion.div>
        <motion.div 
          className="absolute bottom-8 right-8 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <motion.button 
            className="bg-gray-800/50 backdrop-blur-sm p-3 rounded-full border border-gray-700/50 hover:bg-blue-600/20 hover:border-blue-400/30 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight size={20} className="text-white" />
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}