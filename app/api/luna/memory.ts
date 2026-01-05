type Memory = {
  name?: string;
  mood?: string;
  likes?: string[];
  lastFeeling?: string;
};

const memoryStore: Record<string, Memory> = {};

export function getMemory(userId: string) {
  if (!memoryStore[userId]) memoryStore[userId] = {};
  return memoryStore[userId];
}

export function updateMemory(userId: string, data: Partial<Memory>) {
  memoryStore[userId] = { ...getMemory(userId), ...data };
}
