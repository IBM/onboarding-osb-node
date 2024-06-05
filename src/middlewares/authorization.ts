// import { NextFunction, Request, Response } from 'express'
// import DataSource from '../db/data-source'
// import { User } from '../db/entities/User.entity'

// export const authorization = (roles: string[]) => {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     const userRepo = DataSource.getRepository(User)
//     const user = await userRepo.findOne({
//       where: { id: req[' currentUser'].id },
//     })
//     
//     if (!roles.includes(user.role)) {
//       return res.status(403).json({ message: 'Forbidden' })
//     }
//     next()
//   }
// }
