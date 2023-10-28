import { conn } from "@/libs/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { UserResult } from "@/interfaces/userResult.d";

export async function POST(req: Request) {
  const { email, password, username } = await req.json();

  console.log(email, password, username);

  if (!password || !email || !username) {
    return NextResponse.json(
      {
        message: "Rellene los campos correctamente",
      },
      {
        status: 400,
      }
    );
  }

  if (!password || password.length < 8) {
    return NextResponse.json(
      {
        message: "Password must be at least 8 characters",
      },
      {
        status: 400,
      }
    );
  }

  try {
    // Verificar si el correo electrónico ya existe en la base de datos
    const emailExistsQuery = "SELECT * FROM users WHERE user_email = ?";
    const emailExistsResult: UserResult[] = await conn.query<UserResult[]>(
      emailExistsQuery,
      [email]
    );

    if (emailExistsResult.length > 0) {
      // El correo electrónico ya existe en la base de datos
      return NextResponse.json(
        {
          message: "El correo electrónico ya está en uso",
        },
        {
          status: 409,
        }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    // El correo electrónico no existe, procede a la inserción
    const insertQuery =
      "INSERT INTO users (username, user_email, user_password) VALUES (?, ?, ?)";
    const insertResult = await conn.query(insertQuery, [
      username,
      email,
      hashedPassword,
    ]);

    console.log(insertResult);

    return NextResponse.json(
      {
        message: "Usuario añadido correctamente en la base de datos:",
        email,
        username,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 500,
        }
      );
  }
}
