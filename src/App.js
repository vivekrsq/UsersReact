import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import AddUser from './components/AddUser';
function App() {
  return (
    <>
      <Navbar />
      <AddUser />
      {/* {console.log(process.env.REACT_APP_SERVER)} */}

    </>
  );
}

export default App;
