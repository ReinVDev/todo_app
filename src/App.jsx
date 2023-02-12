import { useState, useEffect } from "react";
import store from "./firebase/firebase.config";
import { collection } from "firebase/firestore";

// Styles:
import "./sass/index.scss";
// Firestore:

// Components:
import Add from "./components/Add";
import Config from "./components/Config";
import List from "./components/List";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Msg from "./components/Msg";

// Images:
import HeaderDarkMobile from "./assets/bg-mobile-dark.jpg";
import HeaderDarkDesktop from "./assets/bg-desktop-dark.jpg";
import HeaderLightMobile from "./assets/bg-mobile-light.jpg";
import HeaderLightDesktop from "./assets/bg-desktop-light.jpg";

// Icon:
import { BiLoaderAlt } from "react-icons/bi";
import { onSnapshot } from "firebase/firestore";

const App = () => {
  const [Tasks, setTasks] = useState([]);
  const [tasksAll, setTasksAll] = useState([]);
  const [theme, setTheme] = useState("dark");
  const [id, setId] = useState(null);
  const [currentFilter, setCurrentFilter] = useState("all");
  const [Reset, setReset] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    onSnapshot(collection(store, "tasks"), (snapshot) => {
      let temp = [];
      snapshot.docs.forEach((doc) => {
        temp.push({ ...doc.data(), id: doc.id });
      });
      setLoading(false);
      setTasks(temp);
      setTasksAll(temp);
      const completed = temp.filter((task) => task.completed);
      let arrCompleted = [];
      completed.forEach((item) => {
        arrCompleted.push(item.id);
      });
      console.log(arrCompleted);
      setCompleted(arrCompleted);
    });
  }, []);

  const setCompleted = (newId) => setId(newId);
  const changeTheme = (newTheme) => setTheme(newTheme);
  const getActiveTasks = (activeTasks) => (
    setTasks(activeTasks), setCurrentFilter("active")
  );
  const getAllTasks = () => (setTasks(tasksAll), setCurrentFilter("all"));
  const getCompletedTasks = (completedTasks) => (
    setTasks(completedTasks), setCurrentFilter("completed")
  );
  const reset = (isReset) => setReset(isReset);

  return (
    <>
    <img src={HeaderDarkDesktop} className="img-dark-desktop" alt="desktop header dark"/>
    <img src={HeaderDarkMobile} className="img-dark-mobile" alt="mobile header dark" />
    <img src={HeaderLightDesktop} className="img-light-desktop" alt="desktop header light"/>
    <img src={HeaderLightMobile} className="img-light-mobile" alt="mobile header light" />
      <div className={"content " + theme}>
        <Header changeTheme={changeTheme} />
        <Add countTask={Tasks.length} setReset={reset} reset={Reset} />
        {loading ? (
          <div className="loading">
            <h2>Loading...</h2>
            <BiLoaderAlt className="icon-loading" />
          </div>
        ) : null}
        <Msg tasks={Tasks} filter={currentFilter} loading={loading} />
        <List list={Tasks} />
        <Config
          numTasks={Tasks.length}
          completed={id}
          staticTasks={tasksAll}
          getAllTasks={getAllTasks}
          getActive={getActiveTasks}
          getCompleted={getCompletedTasks}
          reset={Reset}
        />
        <Footer />
      </div>
    </>
  );
};

export default App;
