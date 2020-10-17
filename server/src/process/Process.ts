/*BSD 3-Clause License

Copyright (c) 2020, Blockception Ltd
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its
   contributors may be used to endorse or promote products derived from
   this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.*/
import * as Mcfunction from "./Mcfunction";
import * as Json from "./Json";
import * as Language from "./Language";
import { GetDocument, GetFilename } from "../code/include";
import { McFunctionIdentifier, McLanguageIdentifier, McOtherIdentifier } from "../Constants";
import { TextDocumentChangeEvent } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";

export async function OndDocumentChangedAsync(
  e: TextDocumentChangeEvent<TextDocument>
): Promise<void> {
  return new Promise((resolve, reject) => {
    let doc = GetDocument(e.document.uri, e.document, e.document.languageId);
    Process(doc);
    resolve();
  });
}

//Process the given document
export function Process(document: TextDocument): void {
  console.log(
    "Processing: " + GetFilename(document.uri) + " | " + document.languageId
  );

  switch (document.languageId) {
    case McFunctionIdentifier:
      Mcfunction.Process(document);
      break;

    case McLanguageIdentifier:
      Language.Process(document);
      break;

    case McOtherIdentifier:
    case "jsonc":
    case "json":
      Json.Process(document);
      break;
  }
}
