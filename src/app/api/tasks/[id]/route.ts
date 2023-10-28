import { conn } from "@/libs/db";
import { NextResponse } from "next/server";

interface Params {
  id: string | number;
}

export async function GET(request: Request, { params }: { params: Params }) {
  const task_id = params.id;
  try {
    const result: any[] = await conn.query(
      "SELECT * FROM tasks WHERE task_id = ?",
      [task_id]
    );

    if (result.length === 0) {
      return NextResponse.json(
        {
          message: "Task not found",
        },
        {
          status: 404,
        }
      );
    }
    return NextResponse.json(result[0]);
  } catch (error) {
    if (error instanceof Error) {
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
}

export async function DELETE(request: Request, { params }: { params: any }) {
  try {
    const result: any = await conn.query(
      "DELETE FROM tasks WHERE task_id = ?",
      [params.id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        {
          message: "Tarea no encontrada",
        },
        {
          status: 404,
        }
      );
    }
    return new Response(null, {
      status: 204,
    });
  } catch (error) {
    if (error instanceof Error) {
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
}

export async function PUT(request: Request, { params }: { params: Params }) {
  try {
    const data = await request.json();

    console.log(data);

    console.log(params.id);

    const result: any = await conn.query(
      "UPDATE tasks SET ? WHERE task_id = ?",
      [data, params.id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        {
          message: "Tarea no encontrada",
        },
        {
          status: 404,
        }
      );
    }

    const updatedTask: any = await conn.query(
      "SELECT * FROM tasks WHERE task_id = ?",
      [params.id]
    );

    return NextResponse.json(updatedTask[0]);
  } catch (error) {
    if (error instanceof Error) {
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
}
