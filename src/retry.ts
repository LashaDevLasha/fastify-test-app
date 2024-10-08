export async function retry<T>(fn: () => Promise<T>, retries: number = 3, delay: number = 1000): Promise<T> {
    try {
      return await fn();
    } catch (error) {
      if (retries > 0) {
        console.warn(`Retrying... (${retries} attempts left)`);
        await new Promise(res => setTimeout(res, delay));
        return retry(fn, retries - 1, delay);
      }
      throw error;
    }
  }