import { createUserAccount } from '../../server/users';

export default async function createUser(req: any, res: any) {
  if (req.method === 'POST') {
    let username = req.body.username
    let displayName = req.body.displayName
    let email = req.body.email
    let passwordHash = req.body.passwordHash

    // NOTE: In the future we will need to revalidate the profile page as well as the scoreboard
    const result = createUserAccount(displayName, username, email, passwordHash)
    res.status(200).json({ result: result });
  } else {
    res.status(405).end("Method Not Allowed");
  }
}