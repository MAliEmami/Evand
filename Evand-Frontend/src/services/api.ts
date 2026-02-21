const API_BASE_URL = "http://localhost:5295";

export interface EventListDto {
  guid: string | null;
  name: string | null;
  category: string | null;
  x: number | null;
  y: number | null;
  price: number;
  photo: string | null;
  address: string | null;
  startDate: string | null;
  endDate: string | null;
  capacity: number | null;
}

export interface EventAddDto {
  name: string | null;
  category: string;
  x: number | null;
  y: number | null;
  price: number | null;
  photo: string | null;
  address: string | null;
  startDate: string | null;
  endDate: string | null;
  capacity: number | null;
}

export const eventApi = {
  async getEvents(): Promise<EventListDto[]> {
    const response = await fetch(`${API_BASE_URL}/Event/list`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    return response.json();
  },

  async addEvent(event: EventAddDto): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/Event/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
    });
    if (!response.ok) throw new Error(`API Error: ${response.status}`);
  },

  async askAi(question: string): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/api/ai/question`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });

    if (!response.ok) throw new Error(`API Error: ${response.status}`);

    const data = await response.text();
    return data;
  },
};
