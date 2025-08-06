import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'your-service-role-key';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(request: NextRequest) {
  try {
    const { staffId, date, clientId } = await request.json();

    if (!staffId || !date || !clientId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get staff schedule for the date
    const { data: scheduleData, error: scheduleError } = await supabase
      .from('demo_staff_schedules')
      .select('*')
      .eq('staff_id', staffId)
      .eq('day_of_week', new Date(date).getDay())
      .eq('is_active', true)
      .single();

    if (scheduleError || !scheduleData) {
      return NextResponse.json(
        { availableSlots: [] },
        { status: 200 }
      );
    }

    // Get existing bookings for the date
    const { data: bookingsData, error: bookingsError } = await supabase
      .from('demo_bookings')
      .select('start_time, end_time')
      .eq('staff_id', staffId)
      .eq('booking_date', date)
      .eq('status', 'confirmed');

    if (bookingsError) {
      console.error('Error fetching bookings:', bookingsError);
      return NextResponse.json(
        { error: 'Failed to fetch bookings' },
        { status: 500 }
      );
    }

    // Generate available time slots
    const startHour = parseInt(scheduleData.start_time.split(':')[0]);
    const endHour = parseInt(scheduleData.end_time.split(':')[0]);
    const availableSlots: string[] = [];

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeSlot = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        
        // Check if this slot conflicts with existing bookings
        const isAvailable = !bookingsData?.some(booking => {
          const bookingStart = booking.start_time.substring(0, 5);
          const bookingEnd = booking.end_time.substring(0, 5);
          return timeSlot >= bookingStart && timeSlot < bookingEnd;
        });

        if (isAvailable) {
          availableSlots.push(timeSlot);
        }
      }
    }

    return NextResponse.json({ availableSlots });
  } catch (error) {
    console.error('Error in availability API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 