// Simulates network latency so api/ functions behave like real async calls.
// When the Django REST backend lands, callers stay unchanged — only the
// bodies of api/ functions swap from mock data to httpClient requests.
export const mockResponse = <T>(data: T, ms = 300): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(data), ms));
