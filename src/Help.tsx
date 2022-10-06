import { Link } from 'react-router-dom';

export const Help = () => {
  return (
    <>
      <header>
        <h1>Help</h1>
        <Link to="/">Texts</Link>
      </header>
      <main>
        <h1>Markdown syntax</h1>
      </main>
    </>
  );
};
