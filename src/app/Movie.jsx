import Link from "next/link";
import Image from "next/image";

export default function Movie({ title, overview, poster_path, id, date }) {
  const imagePath = "https://image.tmdb.org/t/p/w500/";

  return (
    <div className="flex flex-col rounded-2xl shadow-[0_0_10px_grey] p-6 bg-white gap-5 items-center hover:scale-105 transition-all duration-300">
      <h1 className="text-[#cc0000] font-bold text-center">{title}</h1>
      <p className="w-1/2 text-black text-center">{overview}</p>
      <p className="text-[#cc0000]">{date}</p>
      <img
        unoptimized="true"
        src={imagePath + poster_path}
        alt={title}
        width={200}
        height={200}
      />
      <Link href={`/${id}`}>
        <button
          className="
            bg-blue-500 text-white p-2 rounded-md cursor-pointer font-bold
            shadow-md shadow-blue-500/50
            hover:bg-white hover:text-blue-500 transition-all duration-300"
        >
          View Details
        </button>
      </Link>
    </div>
  );
}
