import Link from "next/link";
import React from "react";

function NewTaskBtn() {
  return (
    <Link href="/newtask" className="button-4 mt-4">
      NEW TASK
    </Link>
  );
}

export default NewTaskBtn;
