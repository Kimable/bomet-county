"use client";
import { useCallback, useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "./styles.css";
import { io } from "socket.io-client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { verifyUser } from "@/app/middlewares/verifyLoggedInUser";
import { useForm } from "react-hook-form";

const SAVE_INTERVAL_MS = 2000;
const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
];

export default function TextEditor() {
  const { editor: documentId } = useParams();
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();
  const { register, handleSubmit } = useForm();

  // Get current user
  const [user, setUser] = useState("");
  const router = useRouter();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token == "" || token == null) {
      return router.push("/");
    }
    const loggedUser = verifyUser(token);
    setUser(loggedUser);
  }, []);

  // Get Current Folder Path
  const params = useSearchParams();
  let folderId = params.get("id");
  if (folderId == null) {
    folderId = 0;
  }

  useEffect(() => {
    const s = io("https://bomet.mayyelites.com/");
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket == null || quill == null) return;

    socket.once("load-document", (document) => {
      quill.setContents(document);
      quill.enable();
    });

    socket.emit("get-document", {
      documentId,
      userId: user.userId,
      parentFolderId: folderId,
    });
  }, [socket, quill, documentId]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const interval = setInterval(() => {
      socket.emit("save-document", quill.getContents());
    }, SAVE_INTERVAL_MS);

    return () => {
      clearInterval(interval);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta) => {
      quill.updateContents(delta);
    };
    socket.on("receive-changes", handler);

    return () => {
      socket.off("receive-changes", handler);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      socket.emit("send-changes", delta);
    };
    quill.on("text-change", handler);

    return () => {
      quill.off("text-change", handler);
    };
  }, [socket, quill]);

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;

    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    });
    q.disable();
    q.setText("Loading...");
    setQuill(q);
  }, []);

  // File name update
  const onSubmit = async (data) => {
    let response = await fetch(`/api/user/createdocument`, {
      method: "POST",
      body: JSON.stringify({ docId: documentId, fileName: data.fileName }),
    });
    let updatedFileName = await response.json();
    console.log(updatedFileName);
  };
  return (
    <>
      <form className="flex flex-row my-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-96">
          <input
            type="text"
            id="fileName"
            {...register("fileName")}
            className="bg-card border-none text-textColor text-sm focus:outline-none block w-full p-2.5 "
            placeholder="File Name..."
          />
        </div>

        <button
          type="submit"
          className="text-white bg-themeColor focus:outline-none font-medium text-sm px-5 py-2.5 text-center"
        >
          Change File Name
        </button>
      </form>
      <div className="container" ref={wrapperRef}></div>
    </>
  );
}
