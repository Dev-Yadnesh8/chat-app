import { Container, HomeContent } from "../components";

function Home() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-full max-w-2xl">
        <Container child={<HomeContent />} />
      </div>
    </div>
  );
}

export default Home;
