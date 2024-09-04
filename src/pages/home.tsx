import { createSignal } from "solid-js";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Input } from "../components/Input";
import { MagicalText } from "../components/MagicalText";
import styles from "./../styles/home.module.css";
import { useNavigate } from "@solidjs/router";

const Home = () => {
  const [tableCode, setTableCode] = createSignal("");
  const navigate = useNavigate();

  return (
    <>
      <div class={styles.background}></div>
      <main class={styles.main}>
        <MagicalText>
          <h1 style={{ "font-size": "10em", margin: "0px" }}>Spellbound</h1>
        </MagicalText>
        <Card>
          <h2>Enter The Table Code</h2>
          <Input OnChange={(newValue: string) => setTableCode(newValue)} />
          <Button
            OnClick={() => {
              if (!!tableCode()) {
                navigate(`/gm/${tableCode()}`);
              }
            }}
          >
            Join
          </Button>
        </Card>
      </main>
    </>
  );
};

export default Home;
