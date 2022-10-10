import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Editor } from '../Editor';
import { Help } from '../Help';
import { Texts } from '../Texts';
import { TextsLayout } from '../TextsLayout';
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
import { selectUid, signIn } from './userSlice';

function App(): JSX.Element {
  const dispatch = useDispatch();
  const uid = useSelector(selectUid());
  const { ready } = useTranslation('translation', { useSuspense: false });
  useEffect(() => {
    dispatch(signIn());
  }, []);
  useEffect(() => console.log({ ready }));
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
      {uid !== null && ready && (
        <Routes>
          <Route path="/" element={<Navigate to="texts" />} />
          <Route path="texts">
            <Route element={<TextsLayout />}>
              <Route index element={<Texts />} />
            </Route>
            <Route path=":id" element={<Editor />} />
          </Route>
          <Route path="help" element={<Help />} />
        </Routes>
      )}
    </>
  );
}

export default App;
