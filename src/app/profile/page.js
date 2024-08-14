"use client";
import { useRouter } from "next/navigation";
import { Avatar, Button, TextField } from "@/components";
import { NavigateBeforeIcon } from "@/components/Icons";
import { myFavoritePokemons } from "@/utils/helpers";
import styles from "./styles.module.css";

export default function Details() {
  const router = useRouter();
  const pokemons = myFavoritePokemons();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <main className={styles.myProfileWrapper}>
      <div className={styles.myProfileHeader}>
        <Button color="inherit" variant="outlined" onClick={handleBackClick}>
          <NavigateBeforeIcon />
        </Button>
      </div>

      <section className={styles.myProfilePage}>
        <h2>Profile</h2>
        <div className={styles.myProfilePageDetails}>
          <Avatar sx={{ width: 260, height: 260 }} />

          <div className={styles.myProfileForm}>
            <div className={styles.myProfileFormCol}>
              <TextField disabled id="Name" label="Name" defaultValue="Oğuz" />
              <TextField
                disabled
                id="Surname"
                label="Surname"
                defaultValue="Avcı"
              />

              <TextField
                disabled
                id="E-mail"
                label="E-mail"
                defaultValue="ogzavc@gmail.com"
              />
            </div>

            <div className={styles.myProfileFormCol}>
              <TextField disabled id="Level" label="Level" defaultValue="32" />
              <TextField
                disabled
                id="Experinece"
                label="Experinece"
                defaultValue="14111992"
              />

              <TextField
                disabled
                id="outlined-disabled"
                label="Pokemons"
                defaultValue={pokemons.length}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
