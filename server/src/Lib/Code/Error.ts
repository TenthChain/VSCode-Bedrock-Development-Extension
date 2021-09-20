import { TextDocument } from "../Types/Document/TextDocument";
import { GetFilename } from "./File";

export function HandleError(error: any, doc: TextDocument | string | undefined = undefined): void {
  let msg: string;

  if (errormsg.is(error)) {
    msg = `message: ${error.message}\n\tstack:${error.stack}`;
  } else {
    msg = JSON.stringify(error);
  }

  if (doc) {
    msg = GetFilename(typeof doc === "object" ? doc.uri : doc) + " | " + msg;
  }

  console.error;
}

interface errormsg {
  message: string;
  stack: string;
}

namespace errormsg {
  export function is(value: any): value is errormsg {
    if (typeof value === "object") {
      if (typeof value.message === "string" && typeof value.stack === "string") return true;
    }

    return false;
  }
}
