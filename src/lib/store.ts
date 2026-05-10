type ShareRecord = {
  profile: unknown;
  interpretation: string;
  createdAt: string;
};

declare global {
  // eslint-disable-next-line no-var
  var __shareStore: Map<string, ShareRecord> | undefined;
}

export const shareStore = globalThis.__shareStore ?? new Map<string, ShareRecord>();
if (!globalThis.__shareStore) globalThis.__shareStore = shareStore;
