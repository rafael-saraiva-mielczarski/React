import Header from "./components/Header";
import Main from "./components/Main";
import Archive from "./components/Archive";
import Footer from "./components/Footer";
import { PostProvider } from "./contexts/PostContext";
import Button from "./components/Button";

export default function App() {
  return (
    <section>
      <Button />
      <PostProvider>
        <Header />
        <Main />
        <Archive />
        <Footer />
      </PostProvider>
    </section>
  );
}
