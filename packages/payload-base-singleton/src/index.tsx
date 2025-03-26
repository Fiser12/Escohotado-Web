
import type { Payload } from 'payload';
import React, { createContext, useContext, useEffect, useState } from 'react';

// Asegurarse de que la instancia global esté disponible
declare global {
  var payloadInstance: Payload | null;
}

export const getPayloadSingleton = (): Payload => {
  if (!global.payloadInstance) {
    throw new Error('Payload instance not initialized');
  }
  return global.payloadInstance;
};

export const loadPayloadSingleton = async (payload: () => Promise<Payload>) => {
  if (global.payloadInstance) return;
  global.payloadInstance = await payload();
};

const PayloadContext = createContext<Payload | null>(null);

export const usePayload = () => {
  const context = useContext(PayloadContext);
  if (!context) {
    throw new Error('usePayload must be used within a PayloadProvider');
  }
  return context;
};

export const PayloadProvider: React.FC<{ payload: Payload, children: React.ReactNode }> = ({ children, payload }) => {
  return (
    <PayloadContext.Provider value={payload}>
      {children}
    </PayloadContext.Provider>
  );
};