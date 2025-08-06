"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";
import { 
  ArrowLeft,
  Scissors,
  Clock,
  DollarSign,
  Star,
  ArrowRight
} from "lucide-react";

export default function DemoServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [settings, setSettings] = useState({
    display_style: 'menu',
    show_packages: true,
    currency: 'USD'
  });

  useEffect(() => {
    fetchServices();
    fetchSettings();
  }, []);

  const fetchServices = async () => {
    const { data } = await supabase
      .from('demo_services')
      .select('*')
      .eq('client_id', '780e00e7-2a32-4056-8fa3-eccfd702cd2c')
      .eq('is_active', true)
      .order('price', { ascending: true });
    setServices(data || []);
  };

  const fetchSettings = async () => {
    try {
      // First get the services module ID
      const { data: moduleData, error: moduleError } = await supabase
        .from('modules')
        .select('id')
        .eq('slug', 'services')
        .single();

      if (moduleError) throw moduleError;

      // Then get the client module settings
      const { data, error } = await supabase
        .from('client_modules')
        .select('settings')
        .eq('client_id', '780e00e7-2a32-4056-8fa3-eccfd702cd2c')
        .eq('module_id', moduleData.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      
      if (data?.settings) {
        setSettings(data.settings);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const getServiceCategories = () => {
    const categories = ['all', 'haircuts', 'coloring', 'styling', 'treatments'];
    return categories;
  };

  const filterServicesByCategory = (category: string) => {
    if (category === 'all') return services;
    return services.filter(service => 
      service.name.toLowerCase().includes(category) ||
      service.description.toLowerCase().includes(category)
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.location.href = '/demo'}
                className="flex items-center space-x-2 text-gray-700 hover:text-pink-500 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Demo</span>
              </button>
            </div>
            <div className="flex items-center">
              <Scissors className="w-8 h-8 text-pink-500 mr-2" />
              <span className="text-xl font-bold text-gray-900">Elegance Salon</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.location.href = '/dashboard'}
                className="text-gray-700 hover:text-pink-500 transition-colors text-sm font-medium"
              >
                Dashboard
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Our Services & Pricing</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our comprehensive range of hair services. Each service is tailored to your unique style 
            and performed by our expert stylists using premium products.
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {getServiceCategories().map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 capitalize ${
                selectedCategory === category
                  ? 'bg-pink-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-pink-50 border border-gray-200'
              }`}
            >
              {category === 'all' ? 'All Services' : category}
            </button>
          ))}
        </motion.div>

        {/* Services Display */}
        {settings.display_style === 'card' ? (
          /* Card Style Display */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filterServicesByCategory(selectedCategory).map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
                onClick={() => setSelectedService(service)}
              >
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-pink-200 transition-colors">
                  <Scissors className="w-8 h-8 text-pink-500" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">{service.name}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{service.duration} min</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">4.9</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-pink-500">${service.price}</span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      window.location.href = '/demo/booking';
                    }}
                    className="bg-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-pink-600 transition-colors flex items-center space-x-1"
                  >
                    <span>Book Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Menu Style Display */
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-pink-500 text-white px-8 py-6">
                <h2 className="text-2xl font-bold">Service Menu</h2>
                <p className="text-pink-100">Professional hair services and treatments</p>
              </div>
              <div className="divide-y divide-gray-200">
                {filterServicesByCategory(selectedCategory).map((service, index) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => setSelectedService(service)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">{service.name}</h3>
                          <span className="text-2xl font-bold text-pink-500">${service.price}</span>
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
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          window.location.href = '/demo/booking';
                        }}
                        className="ml-6 bg-pink-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-pink-600 transition-colors flex items-center space-x-1"
                      >
                        <span>Book</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}



        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Look?</h2>
            <p className="text-xl mb-8 opacity-90">
              Book your appointment today and experience the difference our expert stylists can make.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.href = '/demo/booking'}
                className="bg-white text-pink-500 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Book Appointment
              </button>
              <button
                onClick={() => window.location.href = '/demo'}
                className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-pink-500 transition-colors"
              >
                Back to Demo
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-900">{selectedService.name}</h2>
              <button
                onClick={() => setSelectedService(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-6">
              <p className="text-gray-600 text-lg leading-relaxed">{selectedService.description}</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="w-5 h-5 text-pink-500" />
                    <span className="font-semibold">Duration</span>
                  </div>
                  <p className="text-gray-600">{selectedService.duration} minutes</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <DollarSign className="w-5 h-5 text-pink-500" />
                    <span className="font-semibold">Price</span>
                  </div>
                  <p className="text-gray-600">${selectedService.price}</p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-6">
                <button
                  onClick={() => setSelectedService(null)}
                  className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setSelectedService(null);
                    window.location.href = '/demo/booking';
                  }}
                  className="bg-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-pink-600 transition-colors"
                >
                  Book This Service
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
} 