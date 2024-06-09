declare global {
  namespace Express {
    interface Request {
      currentUser?: any;
    }
  }
}
