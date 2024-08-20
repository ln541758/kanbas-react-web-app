import * as client from "./client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import * as napsterClient from "../../Napster/client";

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const [likedAlbums, setLikedAlbums] = useState<any>({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fetchProfile = async () => {
    try {
      const account = await client.profile();
      setProfile(account);
    } catch (err: any) {
      navigate("/Kanbas/Account/Signin");
    }
  };
  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    navigate("/Kanbas/Account/Signin");
  };
  const fetchLikedAlbums = async () => {
    const albums = await napsterClient.getAlbumsLikedByUser();
    setLikedAlbums(albums);
  };

  return (
    <div className="wd-profile-screen">
      <h1>Profile</h1>
      {profile && (
        <div>
          <input
            className="wd-username"
            value={profile.username}
            onChange={(e) =>
              setProfile({ ...profile, username: e.target.value })
            }
          />
          <input
            className="wd-password"
            value={profile.password}
            onChange={(e) =>
              setProfile({ ...profile, password: e.target.value })
            }
          />
          <input
            className="wd-firstname"
            value={profile.firstName}
            onChange={(e) =>
              setProfile({ ...profile, firstName: e.target.value })
            }
          />
          <input
            className="wd-lastname"
            value={profile.lastName}
            onChange={(e) =>
              setProfile({ ...profile, lastName: e.target.value })
            }
          />
          <input
            className="wd-dob"
            value={profile.dob}
            onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
            type="date"
          />
          <input
            className="wd-email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />
          <select
            className="wd-role"
            onChange={(e) => setProfile({ ...profile, role: e.target.value })}
          >
            <option value="USER">User</option>{" "}
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>{" "}
            <option value="STUDENT">Student</option>
          </select>
          <button
            onClick={signout}
            className="wd-signout-btn btn btn-danger w-100"
          >
            Sign out
          </button>
          <hr />
          <h2>Liked Albums</h2>
          <div className="wd-liked-albums">
            {likedAlbums &&
              likedAlbums.length > 0 &&
              likedAlbums.map((album: any) => (
                <div key={album.id} className="wd-liked-album">
                  <img
                    src={napsterClient.albumImageUrl({ id: album.albumId })}
                    alt=""
                    className="wd-album-image"
                  />
                  <h3>{album.name}</h3>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
