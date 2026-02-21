import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EventCard from "@/components/EventCard";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft } from "lucide-react";
import { eventApi, type EventListDto } from "@/services/api";

const sampleEvents: EventListDto[] = [
  {
    guid: "sample-1",
    name: "همایش نوآوران فناوری ۱۴۰۳",
    category: "فناوری",
    x: 35.6892,
    y: 51.389,
    price: 0,
    photo: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
    address: "مرکز همایش‌های تهران",
    startDate: "2025-01-07T09:00:00",
    endDate: "2025-01-07T18:00:00",
    capacity: 300,
  },
  {
    guid: "sample-2",
    name: "کارگاه طراحی خلاقانه",
    category: "کارگاه",
    x: 32.6546,
    y: 51.668,
    price: 150000,
    photo: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800",
    address: "استودیو طراحی اصفهان",
    startDate: "2025-01-15T14:00:00",
    endDate: "2025-01-15T18:00:00",
    capacity: 30,
  },
  {
    guid: "sample-3",
    name: "شب شبکه‌سازی استارتاپ‌ها",
    category: "شبکه‌سازی",
    x: 29.5918,
    y: 52.5836,
    price: 50000,
    photo: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800",
    address: "هاب استارتاپ، شیراز",
    startDate: "2025-01-22T18:00:00",
    endDate: "2025-01-22T22:00:00",
    capacity: 150,
  },
  {
    guid: "sample-4",
    name: "اردوگاه سلامت و آرامش",
    category: "سلامت",
    x: 35.6892,
    y: 51.389,
    price: 300000,
    photo: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800",
    address: "اقامتگاه کوهستانی تهران",
    startDate: "2025-01-30T08:00:00",
    endDate: "2025-02-01T16:00:00",
    capacity: 50,
  },
  {
    guid: "sample-5",
    name: "فستیوال موسیقی زنده",
    category: "موسیقی",
    x: 26.5362,
    y: 53.9801,
    price: 200000,
    photo: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800",
    address: "پارک ساحلی، کیش",
    startDate: "2025-02-11T12:00:00",
    endDate: "2025-02-13T23:00:00",
    capacity: 5000,
  },
  {
    guid: "sample-6",
    name: "کلاس پخت حرفه‌ای",
    category: "غذا و نوشیدنی",
    x: 36.2972,
    y: 59.6068,
    price: 120000,
    photo: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800",
    address: "آکادمی آشپزی، مشهد",
    startDate: "2025-02-25T11:00:00",
    endDate: "2025-02-25T15:00:00",
    capacity: 20,
  },
];

const FeaturedEvents = () => {
  const [events, setEvents] = useState<EventListDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await eventApi.getEvents();
      if (data.length === 0) {
        setEvents(sampleEvents);
      } else {
        setEvents(data.slice(0, 6));
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      setEvents(sampleEvents);
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

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const hour = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const period = hour >= 12 ? "عصر" : "صبح";
    const hour12 = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${hour12}:${minutes} ${period}`;
  };

  const formatPrice = (price: number) => {
    if (price === 0) return "رایگان";
    return `${price.toLocaleString("fa-IR")} تومان`;
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
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">
            رویدادهای ویژه
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            تجربه‌هایی که الهام‌بخش هستند را کشف کنید
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            مجموعه دست‌چین ما از هیجان‌انگیزترین رویدادهای پیش رو را کاوش کنید.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <div
              key={event.guid}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <EventCard
                id={event.guid}
                title={event.name}
                description={`${formatPrice(event.price)} · ${event.address}`}
                date={formatDate(event.startDate)}
                time={formatTime(event.startDate)}
                location={event.address}
                attendees={0}
                maxAttendees={event.capacity}
                category={event.category}
                imageUrl={event.photo || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800"}
                organizer="Evand"
              />
            </div>
          ))}
        </div>

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
