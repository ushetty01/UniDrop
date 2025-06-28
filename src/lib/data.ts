
export const userProfile = {
    name: "Student Name",
    email: "student.name@manipal.edu",
    campusId: "210912345",
    avatar: "https://placehold.co/100x100.png",
    deliveriesMade: 12,
    deliveriesReceived: 25,
    rating: 4.9,
};

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

export const vendorCourier = {
  id: "vendor-courier-1",
  name: "Campus Store Courier",
  rating: 5.0,
  avatar: "https://placehold.co/100x100.png",
  estTime: "N/A",
};

export const vendors = [
  {
    id: "vendor-1",
    name: "Campus Store",
    courier: vendorCourier,
    avatar: "https://placehold.co/100x100.png",
    menu: [
      { id: 'item-1', name: 'Pen', price: 10 },
      { id: 'item-2', name: '100pg Notebook', price: 70 },
      { id: 'item-3', name: 'Calculator', price: 250 },
      { id: 'item-4', name: 'Highlighter Set', price: 120 },
    ]
  },
  {
    id: "vendor-2",
    name: "KC Food Court",
    courier: { ...vendorCourier, id: 'vendor-courier-2', name: 'KC Food Court Courier' },
    avatar: "https://placehold.co/100x100.png",
    menu: [
      { id: 'item-5', name: 'Aloo Paratha', price: 60 },
      { id: 'item-6', name: 'Masala Dosa', price: 80 },
      { id: 'item-7', name: 'Veg Biryani', price: 120 },
      { id: 'item-8', name: 'Coke (250ml)', price: 30 },
    ]
  }
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
        date: "2024-07-28",
        mapImageUrl: "https://placehold.co/800x400.png",
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
        date: "2024-07-28",
        mapImageUrl: "https://placehold.co/800x400.png",
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
        date: "2024-07-27",
        mapImageUrl: "https://placehold.co/800x400.png",
    },
    {
        id: "del-4",
        item: "Snacks from Campus Store",
        status: "Delivered",
        pickup: "Campus Store",
        dropoff: "Block 12, Room 303",
        courier: couriers[1],
        price: 40,
        paymentMethod: "UPI",
        date: "2024-07-27",
        mapImageUrl: "https://placehold.co/800x400.png",
    },
    {
        id: "del-5",
        item: "Notebooks and Pens",
        status: "Delivered",
        pickup: "Stationery Shop",
        dropoff: "Block 8, Room 101",
        courier: couriers[0],
        price: 35,
        paymentMethod: "Cash",
        date: "2024-07-26",
        mapImageUrl: "https://placehold.co/800x400.png",
    },
    {
        id: "del-6",
        item: "Late night coffee",
        status: "Pending Pickup",
        pickup: "Night Canteen",
        dropoff: "Block 1, Room 10",
        courier: null,
        price: 20,
        paymentMethod: "Cash",
        date: "2024-07-28",
        mapImageUrl: "https://placehold.co/800x400.png",
    },
    {
        id: "del-7",
        item: "1x Highlighter Set, 2x Pen",
        status: "In Transit",
        pickup: "Campus Store",
        dropoff: "Block 20, Room 101",
        courier: vendorCourier,
        price: 170,
        paymentMethod: "Card",
        date: "2024-07-28",
        mapImageUrl: "https://placehold.co/800x400.png",
    },
    {
        id: "del-8",
        item: "2x 100pg Notebook",
        status: "Delivered",
        pickup: "Campus Store",
        dropoff: "Block 15, Room 210",
        courier: vendorCourier,
        price: 170,
        paymentMethod: "UPI",
        date: "2024-07-27",
        mapImageUrl: "https://placehold.co/800x400.png",
    },
];
