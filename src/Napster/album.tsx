import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import * as client from "./client";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import * as clients from "../Kanbas/Account/client";

export default function NapsterAlbumDetails() {
  const { currentUser } = useSelector((state: any) => state.users);
  const { albumId } = useParams();
  const [album, setAlbum] = React.useState<any>({});
  const [tracks, setTracks] = useState([]);
  const findAlbum = async (id: string) => {
    const album = await client.getAlbumDetails(id);
    setAlbum(album);
  };
  const findTracks = async (id: string) => {
    const tracks = await client.getAlbumTracks(id);
    setTracks(tracks);
  };

  const userLikesAlbum = async () => {
    await clients.userLikesAlbum({ name: album.name, albumId });
  };
  useEffect(() => {
    if (albumId) {
      findAlbum(albumId);
      findTracks(albumId);
    }
  }, [albumId]);

  return (
    <div>
      <h1>{album.name}</h1>
      <h2>{currentUser && currentUser.username}</h2>
      {currentUser && (
        <button onClick={userLikesAlbum} className="btn btn-warning mb-2">
          Like
        </button>
      )}
      <img src={client.albumImageUrl(album)} alt="" />
      <ul className="list-group mt-2">
        {tracks &&
          tracks.length > 0 &&
          tracks.map((track: any) => (
            <li className="list-group-item" key={track.id}>
              <Link to={`/Kanbas/Napster/Track/${track.id}`}>{track.name}</Link>
              <audio
                className="float-end"
                controls
                src={track.previewURL}
              ></audio>
            </li>
          ))}
      </ul>
    </div>
  );
}
