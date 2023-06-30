import { createUserAccount } from '../../server/users';
import bcrypt from 'bcryptjs';

export default async function createUser(req: any, res: any) {
  if (req.method === 'POST') {
    let username = req.body.username
    let email = req.body.email
    let password = req.body.password
    if(username === "" || email === "" || password === ""){
      res.status(200).json({ result: "None of these fields can be empty!"})
      return
    }

    const passwordHash = bcrypt.hashSync(password)
    // NOTE: In the future we will need to revalidate the profile page as well as the scoreboard
    const result = await createUserAccount(username, email, passwordHash)
    res.status(200).json({ result: result });
  } else {
    res.status(405).end("Method Not Allowed");
  }
}