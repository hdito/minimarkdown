import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Editor } from '../Editor';
import { Texts } from '../Texts';
import { text, textFromServer } from '../types/textTypes';
import { myFirestore } from './firebase';
import {
  addTextSuccess,
  deleteTextSuccess,
  fetchError,
  fetchSuccess,
  fetchTexts,
  modifyText,
} from './textsSlice';
import { signIn, uidSelector } from './userSlice';

function App(): JSX.Element {
  const dispatch = useDispatch();
  const uid = uidSelector();
  useEffect(() => {
    dispatch(signIn());
  }, []);
  useEffect(() => {
    if (uid === null) return;
    dispatch(fetchTexts());
    onSnapshot(
      query(collection(myFirestore, 'texts'), where('uid', '==', uid)),
      (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          try {
            if (change.type === 'added') {
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
              dispatch(addTextSuccess(newText));
            }
            if (change.type === 'modified') {
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
              dispatch(modifyText(newText));
            }
            if (change.type === 'removed') {
              dispatch(deleteTextSuccess(change.doc.data().id));
            }
          } catch (error) {
            console.log(error);
          }
        });
        dispatch(fetchSuccess());
      },
      (error) => dispatch(fetchError(error))
    );
  }, [uid]);
  return (
    <>
      {uid !== null && (
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
