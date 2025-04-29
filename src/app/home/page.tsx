"use client";
import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingCart, 
  Star, 
  Search,
  Filter,
  PlusCircle,
  Trash2,
  ChevronRight
} from "lucide-react";
import Navbar from "@/components/Navbar";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  
  const router = useRouter();
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      // Check if the user is admin 
      setIsAdmin(currentUser?.email === "ashrays1234@gmail.com");
    });
    
    return () => unsubscribe();
  }, []);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productList: Product[] = [];
        const categoriesSet = new Set<string>();
        
        querySnapshot.forEach((doc) => {
          const data = doc.data() as Omit<Product, 'id'>;
          const product = { id: doc.id, ...data };
          productList.push(product);
          
          if (product.category) {
            categoriesSet.add(product.category);
          }
        });
        
        setProducts(productList);
        setCategories(Array.from(categoriesSet));
      } catch (err) {
        setError("Failed to fetch products.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteDoc(doc(db, "products", productId));
        setProducts(products.filter(product => product.id !== productId));
      } catch (err) {
        console.error("Failed to delete product:", err);
        setError("Failed to delete product. Please try again.");
      }
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="flex items-center justify-center h-screen">
          <div className="flex flex-col items-center">
            <motion.div 
              className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <p className="mt-4 text-blue-400">Loading amazing products...</p>
          </div>
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
        
        <div className="ml-20 p-8">
          {/* Header Section */}
          <motion.div 
            className="flex justify-between items-center mb-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1 
              className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Pamazon
            </motion.h1>
            
            <div className="flex items-center space-x-4">
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.05 }}
              >
                <ShoppingCart className="text-gray-300" size={22} />
                <span className="absolute -top-2 -right-2 bg-blue-500 text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </motion.div>
              
              <motion.div
                className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-white font-medium text-sm">
                  {user?.email?.charAt(0).toUpperCase() || "U"}
                </span>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Hero Section */}
          <motion.div 
            className="relative mb-12 rounded-3xl overflow-hidden h-64"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-purple-900/90 z-10" />
            <motion.div 
              className="absolute inset-0 z-0"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2 }}
            >
              <div className="w-full h-full bg-[url('/bg.jpg')] bg-cover bg-center opacity-60" />
            </motion.div>
            
            <div className="relative z-20 h-full flex flex-col justify-center px-12">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold mb-4 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                Discover Amazing Products
              </motion.h2>
              
              <motion.p 
                className="text-lg text-gray-200 mb-6 max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Explore our collection of next-gen tech products and latest arrivals in the market.
              </motion.p>
              
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "80px" }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="h-[2px] bg-gradient-to-r from-blue-400 to-purple-500 mb-6"
              />
              
              <motion.button 
                className="flex items-center text-blue-300 hover:text-blue-200 transition-colors text-sm font-medium"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                EXPLORE NOW
                <ChevronRight size={16} className="ml-1" />
              </motion.button>
            </div>
          </motion.div>
          
          {/* Search and Filter */}
          <motion.div 
            className="mb-10 bg-gray-900/50 backdrop-blur-md p-5 rounded-2xl border border-gray-800/50 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-500" />
                </div>
                <input
                  type="text"
                  placeholder="Search for amazing products..."
                  className="pl-12 pr-4 py-3 w-full bg-gray-800/50 border border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="relative min-w-[200px]">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Filter size={18} className="text-gray-500" />
                </div>
                <select
                  className="pl-12 pr-10 py-3 w-full bg-gray-800/50 border border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 appearance-none text-white"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                  <ChevronRight size={18} className="transform rotate-90" />
                </div>
              </div>
            </div>
          </motion.div>
          
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-900/20 border border-red-800/50 text-red-400 p-4 rounded-xl mb-6"
            >
              {error}
            </motion.div>
          )}
          
          {/* Admin Actions */}
          {isAdmin && (
            <motion.div 
              className="mb-8 flex justify-end"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.button
                onClick={() => router.push("/add-product")}
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl shadow-lg shadow-blue-900/20"
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
              >
                <PlusCircle size={18} />
                <span>Add Product</span>
              </motion.button>
            </motion.div>
          )}
          
          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
             {filteredProducts.map((product) => (
  <motion.div 
    key={product.id}
    className="bg-gray-900/50 backdrop-blur-md border border-gray-800/50 rounded-2xl overflow-hidden transition-transform duration-300 hover:shadow-xl hover:shadow-blue-900/10 group cursor-pointer"
    variants={itemVariants}
    whileHover={{ y: -8, transition: { type: "spring", stiffness: 300, damping: 15 } }}
    onClick={() => router.push(`/product/${product.id}`)}
  >
                  <div className="h-48 bg-gray-800 relative overflow-hidden">
                    {product.imageUrl ? (
                      <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                        No Image
                      </div>
                    )}
                    
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-80"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    />
                  </div>
                  
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-white truncate">{product.name}</h3>
                      <div className="flex items-center bg-gray-800/80 rounded-full px-2 py-1">
                        <Star size={14} className="text-yellow-400 fill-current" />
                        <span className="text-xs text-gray-300 ml-1">4.5</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-400 mb-4 line-clamp-2">{product.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-blue-400">₹{product.price.toFixed(2)}</span>
                      <div className="flex space-x-2">
                        {isAdmin && (
                          <motion.button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="p-2 rounded-full bg-red-900/20 text-red-400 hover:bg-red-800/30 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Trash2 size={18} />
                          </motion.button>
                        )}
                        <motion.button
                          className="p-2 rounded-full bg-blue-900/20 text-blue-400 hover:bg-blue-800/30 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <ShoppingCart size={18} />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-gray-900/50 backdrop-blur-md border border-gray-800/50 p-10 rounded-2xl text-center"
            >
              <p className="text-lg text-gray-400 mb-6">
                {searchTerm || selectedCategory ? 
                  "No products found matching your search." :
                  "No products available yet."}
              </p>
              {(!searchTerm && !selectedCategory && isAdmin) && (
                <motion.button
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-blue-900/30 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push("/add-product")}
                >
                  Add Your First Product
                </motion.button>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}