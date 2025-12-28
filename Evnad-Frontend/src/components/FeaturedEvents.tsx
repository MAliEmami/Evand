import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EventCard from "@/components/EventCard";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Event {
  id: string;
  title: string;
  description: string | null;
  date: string;
  time: string;
  location: string;
  category: string;
  image_url: string | null;
  max_attendees: number;
}

const sampleEvents: Event[] = [
  {
    id: "sample-1",
    title: "همایش نوآوران فناوری ۱۴۰۳",
    description: "همراه با رهبران صنعت و نوآوران برای یک روز بحث‌های فناوری پیشرفته و شبکه‌سازی.",
    date: "2025-01-07",
    time: "09:00:00",
    location: "مرکز همایش‌های تهران",
    category: "فناوری",
    image_url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
    max_attendees: 300,
  },
  {
    id: "sample-2",
    title: "کارگاه طراحی خلاقانه",
    description: "کارگاه عملی برای کشف جدیدترین روندها و ابزارهای طراحی. مناسب برای مبتدیان و حرفه‌ای‌ها.",
    date: "2025-01-15",
    time: "14:00:00",
    location: "استودیو طراحی اصفهان",
    category: "کارگاه",
    image_url: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800",
    max_attendees: 30,
  },
  {
    id: "sample-3",
    title: "شب شبکه‌سازی استارتاپ‌ها",
    description: "ارتباط با بنیان‌گذاران، سرمایه‌گذاران و علاقه‌مندان استارتاپ در یک شب گفتگوهای معنادار.",
    date: "2025-01-22",
    time: "18:00:00",
    location: "هاب استارتاپ، شیراز",
    category: "شبکه‌سازی",
    image_url: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800",
    max_attendees: 150,
  },
  {
    id: "sample-4",
    title: "اردوگاه سلامت و آرامش",
    description: "یک آخر هفته تحول‌آفرین متمرکز بر سلامت ذهنی، مدیتیشن و رشد شخصی.",
    date: "2025-01-30",
    time: "08:00:00",
    location: "اقامتگاه کوهستانی تهران",
    category: "سلامت",
    image_url: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800",
    max_attendees: 50,
  },
  {
    id: "sample-5",
    title: "فستیوال موسیقی زنده",
    description: "سه روز اجراهای زنده باورنکردنی از هنرمندان برتر در ژانرهای مختلف.",
    date: "2025-02-11",
    time: "12:00:00",
    location: "پارک ساحلی، کیش",
    category: "موسیقی",
    image_url: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800",
    max_attendees: 5000,
  },
  {
    id: "sample-6",
    title: "کلاس پخت حرفه‌ای",
    description: "تکنیک‌های آشپزی حرفه‌ای را از سرآشپزهای برنده جایزه در این کلاس عملی انحصاری بیاموزید.",
    date: "2025-02-25",
    time: "11:00:00",
    location: "آکادمی آشپزی، مشهد",
    category: "غذا و نوشیدنی",
    image_url: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800",
    max_attendees: 20,
  },
];

const sampleAttendeeCounts: Record<string, number> = {
  "sample-1": 245,
  "sample-2": 28,
  "sample-3": 89,
  "sample-4": 42,
  "sample-5": 4800,
  "sample-6": 18,
};

const FeaturedEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [attendeeCounts, setAttendeeCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(6);

      if (error) throw error;

      if (!data || data.length === 0) {
        setEvents(sampleEvents);
        setAttendeeCounts(sampleAttendeeCounts);
      } else {
        setEvents(data);
        const counts: Record<string, number> = {};
        for (const event of data) {
          const { count } = await supabase
            .from("event_registrations")
            .select("*", { count: "exact", head: true })
            .eq("event_id", event.id);
          counts[event.id] = count || 0;
        }
        setAttendeeCounts(counts);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      setEvents(sampleEvents);
      setAttendeeCounts(sampleAttendeeCounts);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours);
    const period = hour >= 12 ? "عصر" : "صبح";
    const hour12 = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${hour12}:${minutes} ${period}`;
  };

  if (loading) {
    return (
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">
            رویدادهای ویژه
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            تجربه‌هایی که الهام‌بخش هستند را کشف کنید
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            مجموعه دست‌چین ما از هیجان‌انگیزترین رویدادهای پیش رو را کاوش کنید. چیزی پیدا کنید که با شما صحبت کند.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <div
              key={event.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <EventCard
                id={event.id}
                title={event.title}
                description={event.description || ""}
                date={formatDate(event.date)}
                time={formatTime(event.time)}
                location={event.location}
                attendees={attendeeCounts[event.id] || 0}
                maxAttendees={event.max_attendees}
                category={event.category}
                imageUrl={event.image_url || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800"}
                organizer="ایونته‌من"
              />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild className="gap-2">
            <Link to="/events">
              مشاهده همه رویدادها
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents;
