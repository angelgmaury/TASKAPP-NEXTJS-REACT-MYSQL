import { conn } from "@/libs/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const urlParams = new URL(request.url).searchParams;
    const user_id = urlParams.get("user_id");

    if (!user_id) {
      return NextResponse.json(
        {
          message:
            "Debes proporcionar un user_id para filtrar las tareas del usuario.",
        },
        {
          status: 400,
        }
      );
    }

    const results = await conn.query("SELECT * FROM tasks WHERE user_id = ?", [
      user_id,
    ]);
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json(
      {
        message: (error as Error).message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log(data);

    const {
      task_title,
      task_description,
      task_priority,
      task_status,
      user_id,
    } = data;

    const results = await conn.query(
      "INSERT INTO tasks (task_title, task_description, task_priority, task_status, user_id) VALUES (?, ?, ?, ?, ?)",
      [task_title, task_description, task_priority, task_status, user_id]
    );

    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json(
      {
        message: (error as Error).message,
      },
      {
        status: 500,
      }
    );
  }
}
