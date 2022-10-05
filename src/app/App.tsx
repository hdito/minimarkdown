import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { Editor } from "../Editor";
import { Texts } from "../Texts";
import { text } from "../types/text";
import { textFromServer } from "../types/textFromServer";
import { myFirestore } from "./firebase";
import {
  addTextSuccess,
  deleteTextSuccess,
  fetchError,
  fetchSuccess,
  fetchTexts,
  modifyText,
} from "./textsSlice";
import { signIn, uidSelector } from "./userSlice";

function App() {
  const dispatch = useDispatch();
  const uid = uidSelector();
  useEffect(() => {
    dispatch(signIn());
  }, []);
  useEffect(() => {
    if (!uid) return;
    dispatch(fetchTexts());
    onSnapshot(
      query(collection(myFirestore, "texts"), where("uid", "==", uid)),
      (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          try {
            if (change.type === "added") {
              const docSnap = change.doc.data() as textFromServer;
              const { id, uid, content } = docSnap;
              const newText: text = {
                id,
                uid,
                content,
                createdAt: docSnap.createdAt && docSnap.createdAt.toMillis(),
                isLocal: change.doc.metadata.hasPendingWrites ? true : false,
              };
              if (docSnap.updatedAt) {
                newText.updatedAt = docSnap.updatedAt.toMillis();
              }
              dispatch(
                addTextSuccess({
                  text: newText,
                })
              );
            }
            if (change.type === "modified") {
              const docSnap = change.doc.data() as textFromServer;
              const { id, uid, content } = docSnap;
              const newText: text = {
                id,
                uid,
                content,
                createdAt: docSnap.createdAt && docSnap.createdAt.toMillis(),
                isLocal: change.doc.metadata.hasPendingWrites ? true : false,
              };
              if (docSnap.updatedAt) {
                newText.updatedAt = docSnap.updatedAt.toMillis();
              }
              dispatch(
                modifyText({
                  text: newText,
                })
              );
            }
            if (change.type === "removed") {
              dispatch(deleteTextSuccess({ id: change.doc.data().id }));
            }
          } catch (error) {
            console.log(error);
          }
        });
        dispatch(fetchSuccess());
        console.log(snapshot.docChanges());
      },
      (error) => dispatch(fetchError(error))
    );
  }, [uid]);
  return (
    <>
      {uid && (
        <Routes>
          <Route path="/" element={<Navigate to="texts" />} />
          <Route path="texts">
            <Route index element={<Texts />} />
            <Route path=":id" element={<Editor />} />
          </Route>
        </Routes>
      )}
    </>
  );
}

export default App;
