import { SongModal } from "./SongModal";
import { TrashIcon } from "@radix-ui/react-icons";

type TableProps = {
  data: Array<any>;
  editFunction: (object: any) => void;
  deleteFunction: (id: string) => void;
};
const columnTitles = ["Título", "Artista", "Duração", "Álbum"];

export function Table({
  data,
  editFunction,
  deleteFunction,
}: TableProps) {
  return (
    <table className="flex flex-col items-center justify-center rounded-lg w-9/12">
      <thead className="bg-violet-300 text-violet-950 flex items-center justify-between rounded-t-lg w-full">
        <tr className="flex items-center justify-center w-full">
          {columnTitles.map((title, index) => (
            <th
              key={index}
              className="flex font-bold items-center justify-center p-3 w-full"
            >
              {title}
            </th>
          ))}
          <th className="flex h-full items-center justify-center max-w-[120px] rounded-tr-lg font-bold w-full">
            Ações
          </th>
        </tr>
      </thead>

      <tbody className="flex flex-col items-center justify-center py-3 w-full">
        {data.map((item) => (
          <tr key={item["id"]} className="flex items-center justify-center w-full">
            {Object.keys(item).map((key, index) => {
              if (key === "id") return null;
              return (
                <td
                  key={index}
                  className="flex items-center justify-center p-3 w-full"
                >
                  {item[key]}
                </td>
              );
            })}
            <td className="flex items-center justify-center max-w-[120px] p-3 w-full">
              <div className="flex">
                {<SongModal action={editFunction} isEdit={true} song={item} />}
                <button
                  className="bg-red-500 p-2 rounded-md ml-2"
                  onClick={() => deleteFunction(item["id"])}
                >
                  <TrashIcon height={20} width={20} className="text-zinc-900" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
