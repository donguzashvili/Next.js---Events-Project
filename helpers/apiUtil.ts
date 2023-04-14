import { eventType } from "@/types/eventDataType";

export async function getFeaturedEvents() {
  const data = await getAllData()
  return data.filter((el) => el.isFeatured)
  }

export async function getAllData(){
  const response = await fetch("https://nextjs-course-c4de9-default-rtdb.europe-west1.firebasedatabase.app/events.json");
  const data = await response.json();
  return handleFirebaseData(data)
}

export async function getEventById(id: string) {
  const data = await getAllData()
  return data.find((event) => event.id === id);
}

export async function getFilteredEvents({ year, month }: { year: number; month: number }) {
  const allEvents = await getAllData()
  const filteredEvents = filterEvents(allEvents, year, month)
  return filteredEvents;
}

export const filterEvents = (events: eventType[], year:number, month:number) => events.filter((event) => {
  const eventDate = new Date(event.date);
  return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
});


export function handleFirebaseData(data: any){
  let dataArray = []
  for (const key in data) {
    dataArray.push({id: key, ...data[key]})
  }
  return dataArray
}