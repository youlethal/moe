"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase, getClientId } from "../../lib/supabaseClient";
import { defaultConfig } from "../../config";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Menu, 
  X, 
  ArrowRight,
  Star,
  Scissors,
  Users,
  Image,
  FileText,
  Calendar,
  User,
  Eye,
  Heart,
  Share2,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  ChevronDown,
  ChevronUp
} from "lucide-react";

export default function HairdresserTemplate() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState('home');
  const [selectedService, setSelectedService] = useState<any>(null);
  const [selectedStaff, setSelectedStaff] = useState<any>(null);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<any>(null);
  const [selectedBlogPost, setSelectedBlogPost] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBlogCategory, setSelectedBlogCategory] = useState<string>('all');
  
  // Data states
  const [services, setServices] = useState<any[]>([]);
  const [staff, setStaff] = useState<any[]>([]);
  const [galleryItems, setGalleryItems] = useState<any[]>([]);
  const [galleryCategories, setGalleryCategories] = useState<any[]>([]);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [blogCategories, setBlogCategories] = useState<any[]>([]);

  // Configuration from client onboarding
  const [config, setConfig] = useState(defaultConfig);

  // Fetch demo data and config
  useEffect(() => {
    fetchDemoData();
    loadConfig();
  }, []);

  const loadConfig = () => {
    // In a real deployment, this would load from the client's configuration
    // For now, we'll use the default config
    setConfig(defaultConfig);
  };

  const fetchDemoData = async () => {
    try {
      const clientId = config.clientId || getClientId(); // Use environment variable or config
      
      // Only fetch data if the corresponding module is enabled
      if (config.modules.includes('services')) {
        const { data: servicesData } = await supabase
          .from('demo_services')
          .select('*')
          .eq('client_id', clientId)
          .eq('is_active', true);
        setServices(servicesData || []);
      }

      if (config.modules.includes('staff')) {
        const { data: staffData } = await supabase
          .from('demo_staff')
          .select('*')
          .eq('client_id', clientId)
          .eq('is_active', true);
        setStaff(staffData || []);
      }

      if (config.modules.includes('gallery')) {
        const { data: galleryData } = await supabase
          .from('demo_gallery_items')
          .select('*')
          .eq('client_id', clientId);
        setGalleryItems(galleryData || []);

        const { data: galleryCategoriesData } = await supabase
          .from('demo_gallery_categories')
          .select('*')
          .eq('client_id', clientId)
          .eq('is_active', true);
        setGalleryCategories(galleryCategoriesData || []);
      }

      if (config.modules.includes('blog')) {
        const { data: blogData } = await supabase
          .from('demo_blog_posts')
          .select('*')
          .eq('client_id', clientId)
          .eq('is_published', true);
        setBlogPosts(blogData || []);

        const { data: blogCategoriesData } = await supabase
          .from('demo_blog_categories')
          .select('*')
          .eq('client_id', clientId)
          .eq('is_active', true);
        setBlogCategories(blogCategoriesData || []);
      }
    } catch (error) {
      console.error('Error fetching demo data:', error);
    }
  };

  const scrollToSection = (section: string) => {
    setCurrentSection(section);
    setMobileMenuOpen(false);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderHeader = () => (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Scissors className="w-8 h-8 mr-2" style={{ color: config.primaryColor }} />
            <span className="text-xl font-bold text-gray-900">{config.businessName}</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('home')}
              className={`text-sm font-medium transition-colors ${
                currentSection === 'home' ? 'text-pink-500' : 'text-gray-700 hover:text-pink-500'
              }`}
            >
              Home
            </button>
            {config.modules.includes('services') && (
              <button
                onClick={() => scrollToSection('services')}
                className={`text-sm font-medium transition-colors ${
                  currentSection === 'services' ? 'text-pink-500' : 'text-gray-700 hover:text-pink-500'
                }`}
              >
                Services
              </button>
            )}
            {config.modules.includes('staff') && (
              <button
                onClick={() => scrollToSection('staff')}
                className={`text-sm font-medium transition-colors ${
                  currentSection === 'staff' ? 'text-pink-500' : 'text-gray-700 hover:text-pink-500'
                }`}
              >
                Our Team
              </button>
            )}
            {config.modules.includes('gallery') && (
              <button
                onClick={() => scrollToSection('gallery')}
                className={`text-sm font-medium transition-colors ${
                  currentSection === 'gallery' ? 'text-pink-500' : 'text-gray-700 hover:text-pink-500'
                }`}
              >
                Gallery
              </button>
            )}
            {config.modules.includes('blog') && (
              <button
                onClick={() => scrollToSection('blog')}
                className={`text-sm font-medium transition-colors ${
                  currentSection === 'blog' ? 'text-pink-500' : 'text-gray-700 hover:text-pink-500'
                }`}
              >
                Blog
              </button>
            )}
            <button
              onClick={() => scrollToSection('contact')}
              className={`text-sm font-medium transition-colors ${
                currentSection === 'contact' ? 'text-pink-500' : 'text-gray-700 hover:text-pink-500'
              }`}
            >
              Contact
            </button>
            {config.modules.includes('booking') && (
              <button 
                onClick={() => window.location.href = '/booking'}
                className="px-6 py-2 rounded-full text-sm font-medium text-white transition-colors"
                style={{ backgroundColor: config.primaryColor }}
              >
                Book Now
              </button>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-pink-500"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 py-4 space-y-3">
              <button
                onClick={() => scrollToSection('home')}
                className="block w-full text-left text-sm font-medium text-gray-700 hover:text-pink-500 py-2"
              >
                Home
              </button>
              {config.modules.includes('services') && (
                <button
                  onClick={() => scrollToSection('services')}
                  className="block w-full text-left text-sm font-medium text-gray-700 hover:text-pink-500 py-2"
                >
                  Services
                </button>
              )}
              {config.modules.includes('staff') && (
                <button
                  onClick={() => scrollToSection('staff')}
                  className="block w-full text-left text-sm font-medium text-gray-700 hover:text-pink-500 py-2"
                >
                  Our Team
                </button>
              )}
              {config.modules.includes('gallery') && (
                <button
                  onClick={() => scrollToSection('gallery')}
                  className="block w-full text-left text-sm font-medium text-gray-700 hover:text-pink-500 py-2"
                >
                  Gallery
                </button>
              )}
              {config.modules.includes('blog') && (
                <button
                  onClick={() => scrollToSection('blog')}
                  className="block w-full text-left text-sm font-medium text-gray-700 hover:text-pink-500 py-2"
                >
                  Blog
                </button>
              )}
              <button
                onClick={() => scrollToSection('contact')}
                className="block w-full text-left text-sm font-medium text-gray-700 hover:text-pink-500 py-2"
              >
                Contact
              </button>
              {config.modules.includes('booking') && (
                <button 
                  onClick={() => window.location.href = '/booking'}
                  className="w-full px-6 py-3 rounded-full text-sm font-medium text-white transition-colors"
                  style={{ backgroundColor: config.primaryColor }}
                >
                  Book Now
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );

  const renderHero = () => (
    <section id="home" className="pt-16 bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Transform Your
              <span style={{ color: config.primaryColor }}> Style</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Experience the art of hair styling with our expert team. From classic cuts to modern trends, 
              we create looks that make you feel confident and beautiful.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              {config.modules.includes('booking') && (
                <button 
                  onClick={() => window.location.href = '/booking'}
                  className="px-8 py-4 rounded-full text-lg font-semibold text-white transition-colors flex items-center justify-center"
                  style={{ backgroundColor: config.primaryColor }}
                >
                  Book Appointment
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              )}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-3xl p-8 text-white" style={{ background: `linear-gradient(135deg, ${config.primaryColor}, ${config.accentColor})` }}>
              <div className="text-center">
                <Scissors className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Special Offer</h3>
                <p className="text-lg mb-4">20% off your first visit</p>
                {config.modules.includes('booking') && (
                  <button 
                    onClick={() => window.location.href = '/booking'}
                    className="bg-white px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                    style={{ color: config.primaryColor }}
                  >
                    Book Now
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );

  const renderServices = () => {
    if (!config.modules.includes('services')) return null;
    
    return (
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From cuts and colors to styling and treatments, we offer a full range of hair services 
              to keep you looking your best.
            </p>
          </motion.div>

          {/* Menu Style Services Display */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
              <div className="text-white px-8 py-6" style={{ backgroundColor: config.primaryColor }}>
                <h3 className="text-2xl font-bold">Popular Services</h3>
                <p className="opacity-90">Our most requested treatments</p>
              </div>
              <div className="divide-y divide-gray-200">
                {services.slice(0, 5).map((service, index) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => setSelectedService(service)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-xl font-semibold text-gray-900">{service.name}</h4>
                          <span className="text-2xl font-bold" style={{ color: config.primaryColor }}>${service.price}</span>
                        </div>
                        <p className="text-gray-600 mb-3">{service.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{service.duration} min</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span>4.9</span>
                          </div>
                        </div>
                      </div>
                      {config.modules.includes('booking') && (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            window.location.href = '/booking';
                          }}
                          className="ml-6 px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors flex items-center space-x-1"
                          style={{ backgroundColor: config.primaryColor }}
                        >
                          <span>Book</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <button
              onClick={() => scrollToSection('services')}
              className="px-8 py-4 rounded-full text-lg font-semibold text-white transition-colors inline-flex items-center space-x-2"
              style={{ backgroundColor: config.primaryColor }}
            >
              <span>View All Services & Pricing</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </section>
    );
  };

  const renderStaff = () => {
    if (!config.modules.includes('staff')) return null;
    
    return (
      <section id="staff" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our talented stylists are passionate about creating beautiful looks and providing 
              exceptional service to every client.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {staff.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedStaff(member)}
              >
                <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden bg-gray-200">
                  {member.avatar_url ? (
                    <img
                      src={member.avatar_url}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="w-16 h-16 text-gray-400" />
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                <p className="font-medium mb-3" style={{ color: config.primaryColor }}>{member.role}</p>
                <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                <div className="flex justify-center space-x-2">
                  {member.specialties?.slice(0, 3).map((specialty: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{ backgroundColor: `${config.primaryColor}20`, color: config.primaryColor }}
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const renderGallery = () => {
    if (!config.modules.includes('gallery')) return null;
    
    return (
      <section id="gallery" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Work</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Browse through our portfolio of stunning hairstyles and transformations.
            </p>
          </motion.div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === 'all'
                  ? 'text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              style={selectedCategory === 'all' ? { backgroundColor: config.primaryColor } : {}}
            >
              All Work
            </button>
            {galleryCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                style={selectedCategory === category.id ? { backgroundColor: config.primaryColor } : {}}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems
              .filter(item => selectedCategory === 'all' || item.category_id === selectedCategory)
              .map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative overflow-hidden rounded-2xl cursor-pointer"
                  onClick={() => setSelectedGalleryItem(item)}
                >
                  <div className="aspect-square bg-gray-200">
                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Image className="w-16 h-16 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center text-white">
                      <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </section>
    );
  };

  const renderBlog = () => {
    if (!config.modules.includes('blog')) return null;
    
    return (
      <section id="blog" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Latest News & Tips</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Stay updated with the latest hair trends, styling tips, and salon news.
            </p>
          </motion.div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              onClick={() => setSelectedBlogCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedBlogCategory === 'all'
                  ? 'text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              style={selectedBlogCategory === 'all' ? { backgroundColor: config.primaryColor } : {}}
            >
              All Posts
            </button>
            {blogCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedBlogCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedBlogCategory === category.id
                    ? 'text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                style={selectedBlogCategory === category.id ? { backgroundColor: config.primaryColor } : {}}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts
              .filter(post => selectedBlogCategory === 'all' || post.category_id === selectedBlogCategory)
              .map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                  onClick={() => setSelectedBlogPost(post)}
                >
                  {/* Featured Image */}
                  <div className="relative h-48 bg-gray-200">
                    {post.featured_image_url ? (
                      <img
                        src={post.featured_image_url}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FileText className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 rounded-full text-xs font-medium text-white"
                        style={{ backgroundColor: config.primaryColor }}>
                        {blogCategories.find(c => c.id === post.category_id)?.name || 'Uncategorized'}
                      </span>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <div className="flex items-center space-x-2">
                        <User className="w-3 h-3" />
                        <span>{post.author_name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-3 h-3" />
                        <span>{post.reading_time} min read</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {new Date(post.published_at || post.created_at).toLocaleDateString()}
                      </span>
                      <div className="flex items-center space-x-1 text-gray-500 text-xs">
                        <Eye className="w-3 h-3" />
                        <span>{post.views_count} views</span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
          </div>
        </div>
      </section>
    );
  };

  const renderContact = () => (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ready to transform your look? Contact us to book your appointment or ask any questions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-8">Contact Information</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${config.primaryColor}20` }}>
                  <Phone className="w-6 h-6" style={{ color: config.primaryColor }} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Phone</h4>
                  <p className="text-gray-600">(555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${config.primaryColor}20` }}>
                  <Mail className="w-6 h-6" style={{ color: config.primaryColor }} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Email</h4>
                  <p className="text-gray-600">info@{config.businessName.toLowerCase().replace(/\s+/g, '')}.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${config.primaryColor}20` }}>
                  <MapPin className="w-6 h-6" style={{ color: config.primaryColor }} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Address</h4>
                  <p className="text-gray-600">123 Beauty Street<br />Downtown, City 12345</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${config.primaryColor}20` }}>
                  <Clock className="w-6 h-6" style={{ color: config.primaryColor }} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Hours</h4>
                  <p className="text-gray-600">
                    Mon-Fri: 9:00 AM - 8:00 PM<br />
                    Sat: 9:00 AM - 6:00 PM<br />
                    Sun: 10:00 AM - 4:00 PM
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gray-50 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Send us a Message</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                    placeholder="Your first name"
                    style={{ '--tw-ring-color': config.primaryColor } as React.CSSProperties}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                    placeholder="Your last name"
                    style={{ '--tw-ring-color': config.primaryColor } as React.CSSProperties}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                  placeholder="your@email.com"
                  style={{ '--tw-ring-color': config.primaryColor } as React.CSSProperties}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                  placeholder="(555) 123-4567"
                  style={{ '--tw-ring-color': config.primaryColor } as React.CSSProperties}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                  placeholder="Tell us about your hair goals..."
                  style={{ '--tw-ring-color': config.primaryColor } as React.CSSProperties}
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-lg font-semibold text-white transition-colors"
                style={{ backgroundColor: config.primaryColor }}
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );

  const renderFooter = () => (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Salon Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <Scissors className="w-8 h-8 mr-2" style={{ color: config.primaryColor }} />
              <span className="text-xl font-bold">{config.businessName}</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Transform your style with our expert team. We specialize in creating beautiful, 
              personalized looks that make you feel confident and beautiful.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:transition-colors"
                style={{ '--tw-hover-bg-opacity': '1', backgroundColor: config.primaryColor } as React.CSSProperties}>
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:transition-colors"
                style={{ '--tw-hover-bg-opacity': '1', backgroundColor: config.primaryColor } as React.CSSProperties}>
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:transition-colors"
                style={{ '--tw-hover-bg-opacity': '1', backgroundColor: config.primaryColor } as React.CSSProperties}>
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:transition-colors"
                style={{ '--tw-hover-bg-opacity': '1', backgroundColor: config.primaryColor } as React.CSSProperties}>
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><button onClick={() => scrollToSection('home')} className="text-gray-400 hover:text-white transition-colors">Home</button></li>
              {config.modules.includes('services') && (
                <li><button onClick={() => scrollToSection('services')} className="text-gray-400 hover:text-white transition-colors">Services</button></li>
              )}
              {config.modules.includes('staff') && (
                <li><button onClick={() => scrollToSection('staff')} className="text-gray-400 hover:text-white transition-colors">Our Team</button></li>
              )}
              {config.modules.includes('gallery') && (
                <li><button onClick={() => scrollToSection('gallery')} className="text-gray-400 hover:text-white transition-colors">Gallery</button></li>
              )}
              {config.modules.includes('blog') && (
                <li><button onClick={() => scrollToSection('blog')} className="text-gray-400 hover:text-white transition-colors">Blog</button></li>
              )}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>info@{config.businessName.toLowerCase().replace(/\s+/g, '')}.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>123 Beauty Street<br />Downtown, City 12345</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2024 {config.businessName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen" style={{ fontFamily: config.fontFamily }}>
      {renderHeader()}
      {renderHero()}
      {renderServices()}
      {renderStaff()}
      {renderGallery()}
      {renderBlog()}
      {renderContact()}
      {renderFooter()}
    </div>
  );
} 