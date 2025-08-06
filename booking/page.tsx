"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";
import { 
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  Scissors,
  CheckCircle,
  X
} from "lucide-react";

export default function DemoBookingPage() {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedService, setSelectedService] = useState<any>(null);
  const [selectedStaff, setSelectedStaff] = useState<any>(null);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [staff, setStaff] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    notes: ''
  });

  useEffect(() => {
    fetchServices();
    fetchStaff();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      fetchAvailableSlots();
    }
  }, [selectedDate, selectedStaff]);

  const fetchServices = async () => {
    const { data } = await supabase
      .from('demo_services')
      .select('*')
      .eq('client_id', '780e00e7-2a32-4056-8fa3-eccfd702cd2c')
      .eq('is_active', true);
    setServices(data || []);
  };

  const fetchStaff = async () => {
    const { data } = await supabase
      .from('demo_staff')
      .select('*')
      .eq('client_id', '780e00e7-2a32-4056-8fa3-eccfd702cd2c')
      .eq('is_active', true);
    setStaff(data || []);
  };

  const fetchAvailableSlots = async () => {
    if (!selectedDate || !selectedStaff) return;

    const response = await fetch('/api/staff/availability', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        staffId: selectedStaff.id,
        date: selectedDate,
        clientId: '780e00e7-2a32-4056-8fa3-eccfd702cd2c'
      })
    });

    if (response.ok) {
      const data = await response.json();
      setAvailableSlots(data.availableSlots || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime || !selectedService || !selectedStaff) {
      alert('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    try {
      const [hours, minutes] = selectedTime.split(':');
      const startTime = `${hours}:${minutes}:00`;
      const endTime = `${hours}:${parseInt(minutes) + (selectedService.duration || 60)}:00`;

      const { error } = await supabase
        .from('demo_bookings')
        .insert({
          client_id: '780e00e7-2a32-4056-8fa3-eccfd702cd2c',
          customer_name: formData.customerName,
          customer_email: formData.customerEmail,
          customer_phone: formData.customerPhone,
          service_id: selectedService.id,
          staff_id: selectedStaff.id,
          booking_date: selectedDate,
          start_time: startTime,
          end_time: endTime,
          notes: formData.notes,
          status: 'confirmed'
        });

      if (error) throw error;
      setBookingSuccess(true);
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Failed to create booking. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  if (bookingSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl p-12 text-center max-w-md mx-4 shadow-2xl"
        >
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Booking Confirmed!</h2>
          <p className="text-gray-600 mb-8">
            Your appointment has been successfully booked. We'll send you a confirmation email shortly.
          </p>
          <div className="space-y-4 mb-8 text-left">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-pink-500" />
              <span className="text-gray-700">{new Date(selectedDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-pink-500" />
              <span className="text-gray-700">{selectedTime}</span>
            </div>
            <div className="flex items-center space-x-3">
              <User className="w-5 h-5 text-pink-500" />
              <span className="text-gray-700">{selectedService?.name}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Scissors className="w-5 h-5 text-pink-500" />
              <span className="text-gray-700">{selectedStaff?.name}</span>
            </div>
          </div>
          <div className="space-y-3">
            <button
              onClick={() => window.location.href = '/demo'}
              className="w-full bg-pink-500 text-white py-3 rounded-full font-semibold hover:bg-pink-600 transition-colors"
            >
              Back to Demo
            </button>
            <button
              onClick={() => window.location.href = '/dashboard'}
              className="w-full border-2 border-pink-500 text-pink-500 py-3 rounded-full font-semibold hover:bg-pink-50 transition-colors"
            >
              View Dashboard
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

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
            <div className="w-24"></div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Book Your Appointment</h1>
          <p className="text-xl text-gray-600">
            Choose your service, stylist, and preferred time to schedule your visit.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Service Selection */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Select Service</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((service) => (
                <div
                  key={service.id}
                  onClick={() => setSelectedService(service)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedService?.id === service.id
                      ? 'border-pink-500 bg-pink-50'
                      : 'border-gray-200 hover:border-pink-300'
                  }`}
                >
                  <h3 className="font-semibold text-gray-900">{service.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">{service.description}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-pink-500 font-bold">${service.price}</span>
                    <span className="text-gray-500 text-sm">{service.duration} min</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Staff Selection */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Choose Your Stylist</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {staff.map((member) => (
                <div
                  key={member.id}
                  onClick={() => setSelectedStaff(member)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all text-center ${
                    selectedStaff?.id === member.id
                      ? 'border-pink-500 bg-pink-50'
                      : 'border-gray-200 hover:border-pink-300'
                  }`}
                >
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden bg-gray-200">
                    {member.avatar_url ? (
                      <img
                        src={member.avatar_url}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <h3 className="font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-pink-500 text-sm">{member.role}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Date and Time Selection */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Select Date & Time</h2>
            
            {/* Date Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Date</label>
              <div className="grid grid-cols-7 gap-2">
                {getAvailableDates().map((date) => (
                  <button
                    key={date}
                    type="button"
                    onClick={() => setSelectedDate(date)}
                    className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                      selectedDate === date
                        ? 'bg-pink-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {new Date(date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Selection */}
            {selectedDate && selectedStaff && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Time</label>
                <div className="grid grid-cols-4 gap-2">
                  {availableSlots.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                        selectedTime === time
                          ? 'bg-pink-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Customer Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Your Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.customerName}
                  onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={formData.customerEmail}
                  onChange={(e) => setFormData({...formData, customerEmail: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.customerPhone}
                  onChange={(e) => setFormData({...formData, customerPhone: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="(555) 123-4567"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Special Requests</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Any special requests or notes..."
                />
              </div>
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <button
              type="submit"
              disabled={isLoading || !selectedDate || !selectedTime || !selectedService || !selectedStaff}
              className="bg-pink-500 text-white px-12 py-4 rounded-full text-lg font-semibold hover:bg-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Booking...' : 'Confirm Booking'}
            </button>
          </motion.div>
        </form>
      </div>
    </div>
  );
} 