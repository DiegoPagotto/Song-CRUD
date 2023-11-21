import { Cross2Icon, PlusIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { SongModel } from "../api/song/SongModel";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputMask from 'react-input-mask';
import { convertToSeconds } from "../utils/timeConverter";
import toast, { Toaster } from "react-hot-toast";


interface ModalProps {
  action: (song: SongModel) => void;
  isEdit: boolean;
  song?: SongModel;
}

const songFormSchema = z.object({
  title: z.string().nonempty("Esse campo é obrigatório."),
  artist: z.string().nonempty("Esse campo é obrigatório."),
  duration: z.string().nonempty("Esse campo é obrigatório."),
  album: z.string().nonempty("Esse campo é obrigatório."),
});

type SongFormData = z.infer<typeof songFormSchema>;

export const SongModal = ({ action, isEdit, song }: ModalProps) => {
  const [open, setOpen] = useState(false);

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
    setValue,
  } = useForm<SongFormData>({
    resolver: zodResolver(songFormSchema),
  });

  useEffect(() => {
    if (isEdit && song !== undefined) {
      setValue("title", song.title);
      setValue("artist", song.artist);
      setValue("duration", song.duration.toString());
      setValue("album", song.album);
    }
  }, [isEdit, song, setValue]);

  function saveSong(data: SongFormData) {
    try {
      const _song: SongModel = {
        title: data.title,
        artist: data.artist,
        duration: convertToSeconds(data.duration),
        album: data.album,
      };

      if (isEdit && song != undefined) _song.id = song.id;

      reset();
      action(_song);
      setOpen(false);
    } catch (error) {
      toast.error("Formato inválido. Use o formato mm:ss.")
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      {isEdit === true ? (
        <Dialog.Trigger asChild>
          <button className="bg-violet-500 p-2 rounded-md">
            <Pencil2Icon width={20} height={20} className="text-zinc-900" />
          </button>
        </Dialog.Trigger>
      ) : (
        <Dialog.Trigger asChild>
          <button className="bg-violet-500 text-violet-950 flex gap-2 items-center justify-center px-3 py-2 rounded-lg font-bold whitespace-nowrap">
            <PlusIcon /> Música
          </button>
        </Dialog.Trigger>
      )}
      <Dialog.Portal>
        <Dialog.Overlay className="bg-[#18181b99] data-[state=open]:animate-overlayShow fixed inset-0" />

        <Dialog.Content className="bg-violet-400 fixed flex flex-col gap-6 max-w-[580px] p-8 rounded-lg top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full">
          <Dialog.Title className="text-zinc-900 text-lg text-center font-bold font-Inter">
            {isEdit === false ? "Cadastar" : "Editar"} Música
          </Dialog.Title>

          <form
            onSubmit={handleSubmit(saveSong)}
            className="flex flex-col gap-3 items-center justify-center w-full"
          >
            <fieldset className="flex flex-col gap-2 items-start justify-center w-full">
              <label
                className="font-medium text-base text-zinc-900"
                htmlFor="title"
              >
                Título
              </label>

              <input
                id="title"
                className="bg-violet-300 border-2 border-violet-400 outline-0 p-2 rounded-lg text-base text-zinc-900 w-full focus:ring-2 focus:ring-violet-500 focus:ring-offset-1 placeholder:text-zinc-500"
                placeholder="Lux Aeterna"
                type="text"
                {...register("title")}
              />

              {errors.title && (
                <span className="font-medium text-base text-red-500">
                  {errors.title.message}
                </span>
              )}
            </fieldset>

            <fieldset className="flex flex-col gap-2 items-start justify-center w-full">
              <label
                className="font-medium text-base text-zinc-900"
                htmlFor="artist"
              >
                Artista
              </label>

              <input
                id="artist"
                className="bg-violet-300 border-2 border-violet-400 outline-0 p-2 rounded-lg text-base text-zinc-900 w-full focus:ring-2 focus:ring-violet-500 focus:ring-offset-1 placeholder:text-zinc-500"
                placeholder="Metallica"
                type="text"
                {...register("artist")}
              />

              {errors.artist && (
                <span className="font-medium text-base text-red-500">
                  {errors.artist.message}
                </span>
              )}
            </fieldset>

            <div className="flex flex-wrap gap-4">
              <div className="flex flex-col gap-2 items-start justify-center">
                <label className="font-medium text-base text-zinc-900" htmlFor="album">
                  Álbum
                </label>
                <input
                  id="album"
                  className="bg-violet-300 border-2 border-violet-400 outline-0 p-2 rounded-lg text-base text-zinc-900 w-full focus:ring-2 focus:ring-violet-500 focus:ring-offset-1 placeholder:text-zinc-500"
                  placeholder="72 Seasons"
                  type="text"
                  {...register("album")}
                />
                {errors.album && (
                  <span className="font-medium text-base text-red-500">
                    {errors.album.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-2 items-start justify-center">
                <label className="font-medium text-base text-zinc-900" htmlFor="duration">
                  Duração
                </label>
                <InputMask
                  mask="99:99"
                  id="duration"
                  className="bg-violet-300 border-2 border-violet-400 outline-0 p-2 rounded-lg text-base text-zinc-900 w-full focus:ring-2 focus:ring-violet-500 focus:ring-offset-1 placeholder:text-zinc-500"
                  placeholder="04:40"
                  type="text"
                  {...register("duration")}
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-violet-800 font-bold items-center justify-center mt-3 py-2 rounded-lg text-zinc-900 w-full"
            >
              Salvar
            </button>
          </form>

          <Dialog.Close asChild>
            <button
              className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              <Cross2Icon height={20} width={20} />
            </button>
          </Dialog.Close>
        </Dialog.Content>

        <Toaster position="top-right" />
      </Dialog.Portal>
    </Dialog.Root>
  );
};
