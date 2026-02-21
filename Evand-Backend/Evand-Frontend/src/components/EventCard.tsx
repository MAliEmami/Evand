import { Calendar, MapPin, Users, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface EventCardProps {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  maxAttendees: number;
  category: string;
  imageUrl: string;
  organizer: string;
}

const EventCard = ({
  id,
  title,
  description,
  date,
  time,
  location,
  attendees,
  maxAttendees,
  category,
  imageUrl,
  organizer,
}: EventCardProps) => {
  const spotsLeft = maxAttendees - attendees;
  const isAlmostFull = spotsLeft <= 5;

  return (
    <Link to={`/events/${id}`}>
      <article className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
          <Badge className="absolute top-4 right-4 bg-primary/90 text-primary-foreground border-0">
            {category}
          </Badge>
          {isAlmostFull && (
            <Badge className="absolute top-4 left-4 bg-amber text-accent-foreground border-0 animate-pulse">
              {spotsLeft} جای باقی‌مانده!
            </Badge>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {description}
          </p>

          {/* Event Details */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4 text-primary" />
              <span>{date}</span>
              <Clock className="w-4 h-4 text-primary mr-2" />
              <span>{time}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="line-clamp-1">{location}</span>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-teal flex items-center justify-center text-xs font-bold text-secondary-foreground">
                {organizer.charAt(0)}
              </div>
              <span className="text-sm text-muted-foreground">{organizer}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>{attendees}/{maxAttendees}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default EventCard;