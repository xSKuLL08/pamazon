"use client";
import { useState } from "react";
import { auth, db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Link, 
  Check, 
  AlertCircle,
  Tag, 
  DollarSign,
  FileText,
  ShoppingBag,
  Layers,
  ChevronLeft,
  Home
} from "lucide-react";

export default function AddProductPage() {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setSuccess(false);

    try {
      // Validate inputs
      if (!productName || !description || !price || !category) {
        throw new Error("Please fill in all required fields.");
      }

      const priceValue = parseFloat(price);
      if (isNaN(priceValue) || priceValue <= 0) {
        throw new Error("Please enter a valid price.");
      }

      const user = auth.currentUser;
      if (!user) {
        throw new Error("You must be logged in to add a product.");
      }

      // Validate image URL if provided
      if (imageUrl && !isValidUrl(imageUrl)) {
        throw new Error("Please enter a valid image URL.");
      }

      // Add product to Firestore
      await addDoc(collection(db, "products"), {
        name: productName,
        description,
        price: priceValue,
        category,
        imageUrl, // Directly save the image URL
        userId: user.uid,
        createdAt: serverTimestamp(),
      });

      // Reset form and show success message
      setSuccess(true);
      
      // After 2 seconds, redirect to home
      setTimeout(() => {
        router.push("/home");
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Failed to add product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Validate URL function
  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
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
        {/* Centralized Menu/Navigation */}
        <div className="fixed top-0 left-0 w-full bg-gray-900/80 backdrop-blur-md shadow-md z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <motion.h1 
                  className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  Pamazon
                </motion.h1>
              </div>
              
              <div className="flex items-center space-x-6">
                <motion.button
                  onClick={() => router.push("/home")}
                  className="flex items-center text-gray-300 hover:text-blue-400 transition-colors text-sm font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Home size={18} className="mr-1" />
                  Home
                </motion.button>
                
                <motion.div
                  className="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-white font-medium text-sm">
                    {auth.currentUser?.email?.charAt(0).toUpperCase() || "U"}
                  </span>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-20 p-8">
          {/* Header with Back Button */}
          <motion.div 
            className="flex items-center mb-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.button
              onClick={() => router.push("/home")}
              className="mr-4 p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/60 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft size={20} />
            </motion.button>
            <motion.h1 
              className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Add New Product
            </motion.h1>
          </motion.div>
          
          {/* Main Content */}
          <motion.div 
            className="max-w-4xl mx-auto bg-gray-900/50 backdrop-blur-md border border-gray-800/50 rounded-2xl shadow-lg p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="mb-6 p-4 bg-red-900/20 border border-red-800/50 rounded-xl flex items-start"
                >
                  <AlertCircle size={20} className="text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-red-400">{error}</p>
                </motion.div>
              )}
              
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="mb-6 p-4 bg-green-900/20 border border-green-800/50 rounded-xl flex items-start"
                >
                  <Check size={20} className="text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-green-400">Product added successfully! Redirecting to home page...</p>
                </motion.div>
              )}
            </AnimatePresence>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              >
                {/* Left column - Text inputs */}
                <motion.div variants={itemVariants} className="space-y-6">
                  <div>
                    <label htmlFor="productName" className="block text-sm font-medium text-gray-300 mb-2">
                      Product Name*
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Tag size={18} className="text-gray-500" />
                      </div>
                      <input
                        id="productName"
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className="pl-12 block w-full rounded-xl bg-gray-800/50 border border-gray-700/50 focus:border-blue-500 focus:ring-blue-500/30 text-white placeholder-gray-500 py-3"
                        placeholder="Enter product name"
                        disabled={loading}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-2">
                      Price (₹)*
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <DollarSign size={18} className="text-gray-500" />
                      </div>
                      <input
                        id="price"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        step="0.01"
                        min="0"
                        className="pl-12 block w-full rounded-xl bg-gray-800/50 border border-gray-700/50 focus:border-blue-500 focus:ring-blue-500/30 text-white placeholder-gray-500 py-3"
                        placeholder="0.00"
                        disabled={loading}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">
                      Category*
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Layers size={18} className="text-gray-500" />
                      </div>
                      <input
                        id="category"
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="pl-12 block w-full rounded-xl bg-gray-800/50 border border-gray-700/50 focus:border-blue-500 focus:ring-blue-500/30 text-white placeholder-gray-500 py-3"
                        placeholder="e.g. Electronics, Clothing, etc."
                        disabled={loading}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                      Description*
                    </label>
                    <div className="relative">
                      <div className="absolute top-3 left-4 flex items-start pointer-events-none">
                        <FileText size={18} className="text-gray-500" />
                      </div>
                      <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={5}
                        className="pl-12 block w-full rounded-xl bg-gray-800/50 border border-gray-700/50 focus:border-blue-500 focus:ring-blue-500/30 text-white placeholder-gray-500 py-3"
                        placeholder="Describe your product..."
                        disabled={loading}
                        required
                      />
                    </div>
                  </div>
                </motion.div>
                
                {/* Right column - Image URL and preview */}
                <motion.div variants={itemVariants} className="space-y-6">
                  <div>
                    <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-300 mb-2">
                      Image URL
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Link size={18} className="text-gray-500" />
                      </div>
                      <input
                        id="imageUrl"
                        type="url"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="pl-12 block w-full rounded-xl bg-gray-800/50 border border-gray-700/50 focus:border-blue-500 focus:ring-blue-500/30 text-white placeholder-gray-500 py-3"
                        placeholder="https://example.com/image.jpg"
                        disabled={loading}
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-2 ml-1">
                      Enter a direct link to an image (jpg, png, webp)
                    </p>
                  </div>
                  
                  {/* Image Preview */}
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Image Preview
                    </label>
                    <div className="h-64 w-full bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700/50 flex items-center justify-center">
                      {imageUrl ? (
                        <div className="w-full h-full">
                          <img 
                            src={imageUrl} 
                            alt="Product preview" 
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = "/placeholder-image.png"; // Fallback to placeholder
                              target.onerror = null; // Prevent infinite loops
                            }}
                          />
                        </div>
                      ) : (
                        <div className="text-gray-500 flex flex-col items-center">
                          <Link size={40} strokeWidth={1} className="mb-2" />
                          <p className="text-sm">Image preview will appear here</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Helper Text */}
                  <div className="mt-4 bg-blue-900/20 p-4 rounded-xl border border-blue-800/50">
                    <p className="text-sm text-blue-300">
                      <strong>Tip:</strong> For best results, use images with a 1:1 aspect ratio and size of at least 500×500 pixels.
                    </p>
                  </div>
                </motion.div>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="flex justify-end pt-4"
              >
                <motion.button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium shadow-lg shadow-blue-900/20 transition-colors"
                  variants={buttonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <motion.div 
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <span>Adding Product...</span>
                    </div>
                  ) : (
                    <>
                      <ShoppingBag size={18} className="mr-2" />
                      Add Product
                    </>
                  )}
                </motion.button>
              </motion.div>
            </form>
          </motion.div>
          
          {/* Footer */}
          <div className="max-w-4xl mx-auto mt-8 px-4 text-center text-gray-500 text-sm">
            <p>© 2025 Pamazon. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}