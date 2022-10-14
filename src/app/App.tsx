import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Editor } from '../Editor';
import { Help } from '../Help';
import { Texts } from '../Texts';
import { TextsLayout } from '../TextsLayout';
import { subscribeTexts } from './textsSlice';
import { selectUid, signIn } from './userSlice';

function App() {
  const dispatch = useDispatch();
  const uid = useSelector(selectUid());
  const { ready } = useTranslation('translation', { useSuspense: false });
  useEffect(() => {
    dispatch(signIn());
  }, []);
  useEffect(() => {
    if (uid === null) return;
    dispatch(subscribeTexts(uid));
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
