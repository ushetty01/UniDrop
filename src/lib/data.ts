export const couriers = [
  {
    id: "courier-1",
    name: "Rajesh Kumar",
    rating: 4.8,
    avatar: "https://placehold.co/100x100.png",
    estTime: "15 mins",
  },
  {
    id: "courier-2",
    name: "Priya Sharma",
    rating: 4.9,
    avatar: "https://placehold.co/100x100.png",
    estTime: "12 mins",
  },
  {
    id: "courier-3",
    name: "Amit Singh",
    rating: 4.5,
    avatar: "https://placehold.co/100x100.png",
    estTime: "20 mins",
  },
    {
    id: "courier-4",
    name: "Sunita Devi",
    rating: 4.7,
    avatar: "https://placehold.co/100x100.png",
    estTime: "18 mins",
  },
];

export const deliveries = [
    {
        id: "del-1",
        item: "Lunch from Food Court",
        status: "In Transit",
        pickup: "KC Food Court",
        dropoff: "Block 5, Room 201",
        courier: couriers[1],
        price: 50,
        paymentMethod: "UPI",
    },
    {
        id: "del-2",
        item: "Library Book Return",
        status: "Pending Pickup",
        pickup: "Block 17, Room 404",
        dropoff: "MIT Central Library",
        courier: null,
        price: 25,
        paymentMethod: "Cash",
    },
    {
        id: "del-3",
        item: "Documents from Xerox Shop",
        status: "Delivered",
        pickup: "Student Plaza Xerox",
        dropoff: "Block 1, Room 110",
        courier: couriers[0],
        price: 30,
        paymentMethod: "Card",
    },
];

export const userProfile = {
    name: "Student Name",
    email: "student.name@manipal.edu",
    campusId: "210912345",
    avatar: "https://placehold.co/100x100.png",
    deliveriesMade: 12,
    deliveriesReceived: 25,
    rating: 4.9,
};
