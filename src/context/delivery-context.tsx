
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { deliveries as initialDeliveries, couriers, userProfile } from '@/lib/data';

// Define the types based on data.ts structure
type Courier = {
  id: string;
  name: string;
  rating: number;
  avatar: string;
  estTime: string;
};

export type Delivery = {
  id: string;
  item: string;
  status: 'In Transit' | 'Pending Pickup' | 'Delivered';
  pickup: string;
  dropoff: string;
  courier: Courier | null;
  price: number;
  paymentMethod: string;
  date: string;
};

type DeliveryContextType = {
  deliveries: Delivery[];
  addDelivery: (delivery: Omit<Delivery, 'id' | 'status' | 'courier' | 'date'>) => void;
  acceptJob: (deliveryId: string) => void;
  completeDelivery: (deliveryId: string) => void;
  cancelOrder: (deliveryId: string) => void;
};

const DeliveryContext = createContext<DeliveryContextType | undefined>(undefined);

export const DeliveryProvider = ({ children }: { children: ReactNode }) => {
  const [deliveries, setDeliveries] = useState<Delivery[]>(initialDeliveries);

  const addDelivery = (newDeliveryData: Omit<Delivery, 'id' | 'status' | 'courier' | 'date'>) => {
    const newDelivery: Delivery = {
      ...newDeliveryData,
      id: `del-${Date.now()}`,
      status: 'Pending Pickup',
      courier: null,
      date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
    };
    setDeliveries(prevDeliveries => [newDelivery, ...prevDeliveries]);
  };

  const acceptJob = (deliveryId: string) => {
    setDeliveries(prevDeliveries =>
      prevDeliveries.map(d =>
        d.id === deliveryId ? { ...d, status: 'In Transit', courier: { ...userProfile, id: 'courier-user', estTime: '10 mins' } } : d
      )
    );
  };
  
  const completeDelivery = (deliveryId: string) => {
     setDeliveries(prevDeliveries =>
      prevDeliveries.map(d =>
        d.id === deliveryId ? { ...d, status: 'Delivered' } : d
      )
    );
  };

  const cancelOrder = (deliveryId: string) => {
    setDeliveries(prevDeliveries =>
      prevDeliveries.filter(d => d.id !== deliveryId)
    );
  };

  return (
    <DeliveryContext.Provider value={{ deliveries, addDelivery, acceptJob, completeDelivery, cancelOrder }}>
      {children}
    </DeliveryContext.Provider>
  );
};

export const useDeliveries = () => {
  const context = useContext(DeliveryContext);
  if (context === undefined) {
    throw new Error('useDeliveries must be used within a DeliveryProvider');
  }
  return context;
};
