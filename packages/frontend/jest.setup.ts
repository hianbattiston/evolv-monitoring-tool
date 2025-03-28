// Mock fetch globally
global.fetch = jest.fn();

// Silence console errors during tests
beforeAll(() => {
  // Mock console.error to avoid noisy console outputs during tests
  jest.spyOn(console, 'error').mockImplementation(() => { });
  // Mock console.warn too
  jest.spyOn(console, 'warn').mockImplementation(() => { });
});

afterAll(() => {
  // Restore all mocks
  jest.restoreAllMocks();
});

// Reset all mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
}); 