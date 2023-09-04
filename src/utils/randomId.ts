export function generateRandomId(): string {
    // Generate a random number between 1 and 1000
    const randomNumber: number = Math.floor(Math.random() * 1000) + 1;
    
    // Get the current timestamp
    const timestamp: number = Date.now();
    
    // Combine timestamp and random number to create the ID
    const randomId: string = `${timestamp}-${randomNumber}`;
    
    return randomId;
  }
  