import './App.scss';
import Search from './components/Search/Search';
import Routing from './route/Route';

export default function App() {
  return (
    <>
      <Search>
        <Routing/>
      </Search>
    </>
  );
}