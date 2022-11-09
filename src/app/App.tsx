import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Editor } from '../Editor';
import { Help } from '../Help';
import { Texts } from '../Texts';
import { TextsLayout } from '../TextsLayout';
import { rootState } from './main';
import { subscribeTexts } from './textsSlice';
import { signIn } from './userSlice';

function App() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state: rootState) => state.user);
  const { t, ready } = useTranslation('translation', { useSuspense: false });

  useEffect(() => {
    dispatch(signIn());
  }, []);

  useEffect(() => {
    if (userInfo.uid === null) return;
    dispatch(subscribeTexts(userInfo.uid));
  }, [userInfo]);

  return (
    <>
      {ready &&
        (userInfo.error !== null ? (
          <div className="px-4 py-2">
            <h1 className="text-2xl sm:text-4xl text-black dark:text-gray-50 mb-4">
              {t('error')}
            </h1>
            <p>{t('errorMessage')}</p>
          </div>
        ) : userInfo.uid !== null ? (
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
        ) : (
          <></>
        ))}
    </>
  );
}

export default App;
