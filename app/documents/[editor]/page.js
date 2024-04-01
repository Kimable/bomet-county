"use client";
import { useCallback, useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "./styles.css";
import { io } from "socket.io-client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import useAuth from "@/app/middlewares/useAuth";
import { cv, letter, minutes } from "../templates/templates";

import ImageEdit from "quill-image-edit-module";
import { showToast } from "@/app/components/toast";
import { ToastContainer } from "react-toastify";
import BreadCrumb from "@/app/components/common/breadcrumbs/page";
import { FaDownload } from "react-icons/fa";
import { saveAs } from "file-saver";
import { pdfExporter } from "quill-to-pdf";

Quill.register("modules/imageEdit", ImageEdit);

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

  const [fileName, setFileName] = useState("");
  const [email, setEmail] = useState("");

  // Get current user
  const user = useAuth();

  // Get Current Folder Path
  const params = useSearchParams();
  let folderId = params.get("id");
  let template = params.get("template");
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

    if (template == "letter") {
      socket.once("load-document", (document) => {
        setFileName(document.fileName);
        quill.setContents(letter);
        quill.enable();
      });
    } else if (template === "cv") {
      socket.once("load-document", (document) => {
        setFileName(document.fileName);
        quill.setContents(cv);
        quill.enable();
      });
    } else if (template === "minutes") {
      socket.once("load-document", (document) => {
        setFileName(document.fileName);
        quill.setContents(minutes);
        quill.enable();
      });
    } else {
      socket.once("load-document", (document) => {
        setFileName(document.fileName);
        quill.setContents(document.data);
        quill.enable();
      });
    }

    socket.emit("get-document", {
      documentId,
      userId: user.userId,
      parentFolderId: folderId,
    });
  }, [socket, quill, documentId]);

  // Save document automatically
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
      modules: {
        toolbar: TOOLBAR_OPTIONS,
        imageEdit: {
          modules: ["Resize", "DisplaySize", "Toolbar", "Delete"],
        },
      },
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

  // Sharing Document
  const shareDocument = async (data) => {
    let response = await fetch(`/api/user/sharedocument`, {
      method: "POST",
      body: JSON.stringify({ docId: documentId, email: data.email }),
    });
    let updatedFileName = await response.json();
    showToast("Document Shared successfully");
    console.log(updatedFileName);
  };

  // Download pdf
  async function downloadPdf() {
    const delta = quill.getContents(); // gets the Quill delta
    const pdfAsBlob = await pdfExporter.generatePdf(delta); // converts to PDF
    saveAs(pdfAsBlob, `${fileName}.pdf`); // downloads from the browser
  }

  return (
    <>
      <div className="card rounded-lg shadow bg-card p-2 my-2">
        {/* card header start */}
        <div className="flex justify-between items-center my-2">
          <BreadCrumb text="Document" />
          <button
            onClick={downloadPdf}
            className="flex items-center text-white text-sm text-center bg-themeColor p-2 rounded-lg"
          >
            <FaDownload className="text-white mx-2" /> Download File
          </button>
        </div>
      </div>
      <div className="flex flex-row">
        {/* Update file name */}
        <form className="my-5 w-96 mr-3" onSubmit={handleSubmit(onSubmit)}>
          <p className="text-textColor text-sm pt-2.5 font-bold">File Name: </p>
          <div className="flex flex-row">
            <div className="w-96">
              <input
                type="text"
                id="fileName"
                {...register("fileName")}
                className="bg-card border-none text-textColor text-sm focus:outline-none block w-full p-2.5 "
                value={fileName}
                onChange={(event) => {
                  setFileName(event.target.value);
                }}
              />
            </div>

            <button
              type="submit"
              className="text-white bg-themeColor focus:outline-none font-medium text-sm px-5 py-2.5 text-center"
            >
              Change
            </button>
          </div>
        </form>

        {/* Share doument*/}
        <form className="my-5 w-96" onSubmit={handleSubmit(shareDocument)}>
          <p className="text-textColor text-sm pt-2.5 font-bold">Share With:</p>
          <div className="flex flex-row">
            <div className="w-96">
              <input
                type="email"
                id="email"
                {...register("email")}
                className="bg-card border-none text-textColor text-sm focus:outline-none block w-full p-2.5 "
                value={email}
                placeholder="Enter email to share document"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </div>

            <button
              type="submit"
              className="text-white bg-themeColor focus:outline-none font-medium text-sm px-5 py-2.5 text-center inline"
            >
              Share
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
      <div className="container" ref={wrapperRef}></div>
    </>
  );
}
