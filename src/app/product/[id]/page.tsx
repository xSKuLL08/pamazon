"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingCart, 
  Star, 
  ChevronLeft,
  Heart,
  Share2,
  ChevronRight,
  Check,
  Info,
  Truck
} from "lucide-react";
import Navbar from "@/components/Navbar";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stock?: number;
  features?: string[];
  specifications?: Record<string, string>;
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  
  // Dummy images array for the image slider
  const additionalImages = [
    "", // Will be replaced with the main product image
    "/api/placeholder/800/800",
    "/api/placeholder/800/800",
  ];
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", productId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setProduct({
            id: docSnap.id,
            ...docSnap.data() as Omit<Product, 'id'>
          });
          // Set the first image as the product's main image
          if (additionalImages[0] === "") {
            additionalImages[0] = docSnap.data().imageUrl;
          }
        } else {
          setError("Product not found");
          router.push("/");
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [productId, router]);
  
  // Simulated add to cart functionality
  const handleAddToCart = () => {
    setAddingToCart(true);
    // Simulate API call
    setTimeout(() => {
      setAddingToCart(false);
      // Show success message
      // You'd typically update a cart state or context here
    }, 800);
  };
  
  const handleBuyNow = () => {
    // Add to cart first, then redirect to checkout
    handleAddToCart();
    // Redirect to checkout (to be implemented)
    // router.push("/checkout");
  };
  
  // Animations
  const floatingGradients = {
    initial: { backgroundPosition: "0% 50%" },
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
  
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-900 text-white">
        <div className="flex items-center justify-center h-screen">
          <div className="flex flex-col items-center">
            <motion.div 
              className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <p className="mt-4 text-blue-400">Loading product details...</p>
          </div>
        </div>
      </div>
    );
  }
  
  if (error || !product) {
    return (
      <div className="min-h-screen bg-zinc-900 text-white p-8">
        <div className="max-w-4xl mx-auto bg-zinc-800/50 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-semibold text-red-400 mb-4">Oops! Something went wrong</h2>
          <p className="text-zinc-300 mb-6">{error || "Product could not be loaded"}</p>
          <motion.button
            onClick={() => router.back()}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl"
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            <ChevronLeft size={18} className="mr-2" />
            Go Back
          </motion.button>
        </div>
      </div>
    );
  }
  
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
        {/* Include the Navbar component */}
        <Navbar />
        
        <div className="container mx-auto p-8">
          {/* Breadcrumb Navigation */}
          <motion.div 
            className="flex items-center mb-8 text-sm"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <button 
              onClick={() => router.push("/home")} 
              className="text-zinc-400 hover:text-blue-400 transition-colors flex items-center"
            >
              <ChevronLeft size={16} className="mr-1" />
              Home
            </button>
            <ChevronRight size={14} className="mx-2 text-zinc-600" />
            <span className="text-zinc-400">{product.category}</span>
            <ChevronRight size={14} className="mx-2 text-zinc-600" />
            <span className="text-blue-400 truncate max-w-xs">{product.name}</span>
          </motion.div>
          
          {/* Product Detail Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Images Column */}
            <motion.div 
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {/* Main Image */}
              <motion.div 
                className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800/50 rounded-2xl overflow-hidden h-96 lg:h-[500px] relative"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <img 
                  src={additionalImages[selectedImage] || product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-full object-contain p-6"
                />
                
                {/* Image navigation buttons */}
                {additionalImages.length > 1 && (
                  <>
                    <button 
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 rounded-full p-2 transition-colors"
                      onClick={() => setSelectedImage((prev) => (prev === 0 ? additionalImages.length - 1 : prev - 1))}
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button 
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 rounded-full p-2 transition-colors"
                      onClick={() => setSelectedImage((prev) => (prev === additionalImages.length - 1 ? 0 : prev + 1))}
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
                
                {/* Favorite and Share buttons */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <motion.button 
                    className="bg-zinc-800/70 hover:bg-zinc-700/80 rounded-full p-2 transition-colors backdrop-blur-sm"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Heart size={18} className="text-zinc-300" />
                  </motion.button>
                  <motion.button 
                    className="bg-zinc-800/70 hover:bg-zinc-700/80 rounded-full p-2 transition-colors backdrop-blur-sm"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Share2 size={18} className="text-zinc-300" />
                  </motion.button>
                </div>
              </motion.div>
              
              {/* Thumbnail Images */}
              {additionalImages.length > 1 && (
                <motion.div 
                  className="flex space-x-4 justify-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {additionalImages.map((img, index) => (
                    <motion.button
                      key={index}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        selectedImage === index ? "border-blue-500" : "border-zinc-700"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedImage(index)}
                    >
                      <img 
                        src={img || product.imageUrl} 
                        alt={`${product.name} view ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </motion.div>
            
            {/* Product Info Column */}
            <motion.div 
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              {/* Product Title and Rating */}
              <div>
                <motion.h1 
                  className="text-3xl font-bold text-white mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {product.name}
                </motion.h1>
                
                <motion.div 
                  className="flex items-center space-x-4 mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <div className="flex items-center">
                    <Star size={18} className="text-yellow-400 fill-current" />
                    <Star size={18} className="text-yellow-400 fill-current" />
                    <Star size={18} className="text-yellow-400 fill-current" />
                    <Star size={18} className="text-yellow-400 fill-current" />
                    <Star size={18} className="text-zinc-500" />
                    <span className="ml-2 text-zinc-400 text-sm">(24 reviews)</span>
                  </div>
                  <span className="text-zinc-500">|</span>
                  <span className="text-green-400 text-sm flex items-center">
                    <Check size={16} className="mr-1" /> In Stock
                  </span>
                </motion.div>
                
                <motion.p 
                  className="text-zinc-400 text-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Category: <span className="text-blue-400">{product.category}</span>
                </motion.p>
              </div>
              
              {/* Price */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex items-baseline space-x-2"
              >
                <span className="text-3xl font-bold text-blue-400">₹{product.price.toFixed(2)}</span>
                <span className="text-lg text-zinc-500 line-through">₹{(product.price * 1.2).toFixed(2)}</span>
                <span className="text-green-400 text-sm">20% OFF</span>
              </motion.div>
              
              {/* Description */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
                <p className="text-zinc-300">{product.description}</p>
              </motion.div>
              
              {/* Features */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="space-y-2"
              >
                <h3 className="text-lg font-semibold text-white">Key Features</h3>
                <ul className="space-y-2">
                  {(product.features || [
                    "Premium quality materials",
                    "Advanced functionality",
                    "User-friendly design",
                    "Durable and long-lasting"
                  ]).map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check size={18} className="text-green-400 mr-2 mt-0.5" />
                      <span className="text-zinc-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
              
              {/* Quantity Selector */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="space-y-2"
              >
                <h3 className="text-lg font-semibold text-white">Quantity</h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center bg-zinc-800 rounded-lg">
                    <motion.button 
                      className="px-3 py-2 text-zinc-400 hover:text-white transition-colors"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      whileTap={{ scale: 0.9 }}
                      disabled={quantity <= 1}
                    >
                      -
                    </motion.button>
                    <span className="px-4 py-2 text-white">{quantity}</span>
                    <motion.button 
                      className="px-3 py-2 text-zinc-400 hover:text-white transition-colors"
                      onClick={() => setQuantity(quantity + 1)}
                      whileTap={{ scale: 0.9 }}
                    >
                      +
                    </motion.button>
                  </div>
                  <p className="text-zinc-400 text-sm">
                    {product.stock ? `${product.stock} units available` : 'Limited stock available'}
                  </p>
                </div>
              </motion.div>
              
              {/* Shipping Info */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="bg-zinc-900/50 backdrop-blur-sm rounded-xl p-4 border border-zinc-800/50"
              >
                <div className="flex items-start">
                  <Truck size={20} className="text-blue-400 mr-3 mt-1" />
                  <div>
                    <h4 className="font-medium text-white">Fast Delivery</h4>
                    <p className="text-zinc-400 text-sm">Free shipping on orders over $50</p>
                  </div>
                </div>
              </motion.div>
              
              {/* Purchase Actions */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4"
              >
                <motion.button
                  onClick={handleAddToCart}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-4 rounded-xl flex items-center justify-center"
                  variants={buttonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  disabled={addingToCart}
                >
                  {addingToCart ? (
                    <motion.div 
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                  ) : (
                    <>
                      <ShoppingCart size={20} className="mr-2" />
                      Add to Cart
                    </>
                  )}
                </motion.button>
                
                <motion.button
                  onClick={handleBuyNow}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium px-6 py-4 rounded-xl flex items-center justify-center"
                  variants={buttonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  disabled={addingToCart}
                >
                  Buy Now
                </motion.button>
              </motion.div>
              
              {/* Additional Info */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="flex items-center space-x-2 text-sm text-zinc-400"
              >
                <Info size={14} />
                <span>30-day money-back guarantee</span>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Product Details & Specifications */}
          <motion.div 
            className="mt-16 bg-zinc-900/50 backdrop-blur-md border border-zinc-800/50 rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Product Specifications</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                {Object.entries(product.specifications || {
                  "Material": "Premium quality",
                  "Dimensions": "12 x 8 x 3 inches",
                  "Weight": "1.5 lbs",
                  "Warranty": "1 year",
                  "Model Number": `PM-${Math.floor(Math.random() * 10000)}`,
                  "Country of Origin": "United States"
                }).slice(0, 3).map(([key, value]) => (
                  <div key={key} className="flex justify-between pb-2 border-b border-zinc-800">
                    <span className="text-zinc-400">{key}</span>
                    <span className="text-white">{value}</span>
                  </div>
                ))}
              </div>
              
              <div className="space-y-4">
                {Object.entries(product.specifications || {}).slice(3, 6).map(([key, value]) => (
                  <div key={key} className="flex justify-between pb-2 border-b border-zinc-800">
                    <span className="text-zinc-400">{key}</span>
                    <span className="text-white">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Recommended Products Section */}
          <motion.div 
            className="mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">You Might Also Like</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((item) => (
                <motion.div 
                  key={item}
                  className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800/50 rounded-xl overflow-hidden cursor-pointer"
                  whileHover={{ y: -5, transition: { type: "spring", stiffness: 300, damping: 15 } }}
                >
                  <div className="h-40 bg-zinc-800 overflow-hidden">
                    <img 
                      src="/api/placeholder/400/320" 
                      alt="Related product" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-white text-sm truncate">Related Product {item}</h3>
                    <p className="text-blue-400 font-semibold mt-1">${(product.price * (0.8 + (item * 0.1))).toFixed(2)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}