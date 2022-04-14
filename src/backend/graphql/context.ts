export function createContext({ req }: any): any {
  const token = req.headers.authorization || ''
  return { token }
}
