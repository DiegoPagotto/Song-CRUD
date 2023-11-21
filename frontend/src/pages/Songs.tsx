import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Table } from "../components/Table";
import { convertToTimeString } from "../utils/timeConverter";

import {
  deleteById,
  save,
  update,
  findAllSongs,
} from "../api/song/Song";

import { useNavigate } from "react-router-dom";
import { validateAuth } from "../utils/validateAuth";
import { SongModel } from "../api/song/SongModel";
import toast, { Toaster } from "react-hot-toast";

export const Song = () => {
  const [songs, setSongs] = useState(Array<any>);
  const navigate = useNavigate();

  useEffect(() => {
    validateAuth(navigate);
    loadSongs();
  }, [navigate]);

  const loadSongs = () => {
    findAllSongs().then((response) => {
      const songsData = response.data.success.songs.map((song: SongModel) => {
        return {
          id: song.id,
          title: song.title,
          artist: song.artist,
          duration: convertToTimeString(song.duration),
          album: song.album,
        };
      });

      setSongs(songsData);
    });
  };

  const createSong = (song: SongModel) => {
    save(song)
      .then(() => {
        toast.success("Música cadastrada!");
        loadSongs();
      })
      .catch(() => {
        toast.error(
          "Não foi possivel cadastrar a música.\nTente novamente mais tarde."
        );
      });
  };

  const updateSong = (song: SongModel) => {
    update(song)
      .then(() => {
        toast.success("Música atualizada.");
        loadSongs();
      })
      .catch(() => {
        toast.error(
          "Não foi possivel atualizar a música.\nTente novamente mais tarde."
        );
      });
  };

  const deleteSong = (id: string) => {
    deleteById(id)
      .then(() => {
        toast.success("Música apagada.");
        loadSongs();
      })
      .catch(() => {
        toast.error(
          "Não foi possivel apagar a música.\nTente novamente mais tarde."
        );
      });
  };

  return (
    <>
      <main className="flex flex-col gap-10 items-center justify-center w-full ">
        <Header
          modalAction={createSong}
          showOptions={true}
        />

        <Table
          data={songs}
          editFunction={updateSong}
          deleteFunction={deleteSong}
        />
      </main>

      <Toaster position="top-right" />
    </>
  );
};
