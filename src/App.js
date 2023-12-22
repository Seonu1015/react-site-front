import HeaderPage from "./components/HeaderPage";
import RouterPage from "./components/RouterPage";
import FooterPage from "./components/FooterPage";

function App() {
  return (
    <div className="mx-3">
      <HeaderPage />
      <div style={{ marginTop: "70px", marginBottom: "70px" }}>
        <RouterPage />
      </div>
      <FooterPage />
    </div>
  );
}

export default App;
