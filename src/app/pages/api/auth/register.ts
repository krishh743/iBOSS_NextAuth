import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, password, name } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 10);

    try {
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
        },
      });
      return res.status(201).json({ message: "User created", user });
    } catch (error) {
      return res.status(400).json({ error: "User already exists" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
