import { SongModel } from "./SongModel.tsx";
import { api } from "../connection.tsx";


export async function findAllSongs() {
  return await api.get(`/songs`);
}

export async function findById(id: string) {
  await api.get(`/songs/${id}`);
}

export async function save(song: SongModel) {
  await api.post("/songs", song);
}

export async function update(song: SongModel) {
  await api.put(`/songs/${song.id}`, song);
}

export async function deleteById(id: string) {
  await api.delete(`/songs/${id}`);
}
