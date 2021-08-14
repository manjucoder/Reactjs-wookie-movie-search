import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

export default function Home() {
  const [serverData, setserverData] = useState([]);
  const [searchKey, setsearchKey] = useState("");
  const history = useHistory();

  useEffect(() => {
    fetch("https://wookie.codesubmit.io/movies", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer Wookie2019",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setserverData(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const genres = () => {
    var genres = [];
    Object.keys(serverData).map((key) => {
      serverData[key].map((data, index) => {
        var list = data.genres;
        for (var j = 0; j < list.length; j++) {
          var existingValue = genres.find(function (value) {
            return value.label === list[j];
          });
          if (!existingValue) {
            genres.push({
              label: list[j],
              picture: [data.backdrop],
            });
          } else {
            existingValue.picture = [...existingValue.picture, data.backdrop];
          }
        }
      });
    });
    // return genres;
    // return renderPicturesByGenre(genres);
    return getPicture(genres);
  };

  const getPicture = (genres) => {
    return genres.map((genre, count) => (
      <>
        <h3 keys={genre.label}>{genre.label}</h3>
        {Object.keys(serverData).map((key) => {
          return serverData[key].map((data, index) => {
            const hasGenre = data.genres.includes(genre.label);
            if (hasGenre) {
              return (
                <div className="col-md-4" key={`contain${index}`}>
                  <img
                    src={data.backdrop}
                    className="img-responsive profile"
                    key={index}
                    alt={data.title}
                  />
                  <Link
                    to={{
                      pathname: `/moviedetails/${data.slug}`,
                      datas: serverData,
                    }}
                  >
                    <p className="title" key={`title${index}`}>
                      {data.title}
                    </p>
                  </Link>
                  <p className="detail" key={`detail${index}`}>
                    {data.overview}
                  </p>
                </div>
              );
            }
          });
        })}
      </>
    ));
  };

  const findSearch = () => {
    var k;
    Object.keys(serverData).map((key) => {
      serverData[key].map((data) => {
        if (data.slug.includes(searchKey)) {
          k = data.slug;
        }
      });
    });

    history.push({
      pathname: `/moviedetails/${k}`,
      datas: serverData,
    });
  };

  return (
    <div className="container">
      <h1 className="head">WOOKIE MOVIE </h1>
      <div className="row">
        <div className="col-md-10">
          <input
            type="text"
            placeholder="search..."
            onChange={(e) => setsearchKey(e.target.value.replace(/ /g, "-"))}
          />
        </div>
        <div className="col-md-2">
          <button
            type="button"
            className="btn btn-danger btn-lg button"
            onClick={() => findSearch()}
          >
            Search
          </button>
        </div>
      </div>

      <div className="row">{genres()}</div>
    </div>
  );
}

// const getPicturesByGenre = (genre) => {
//   let pictures = [];
//   Object.keys(serverData).map((key) => {
//     serverData[key].map((movie) => {
//       const hasGenre = movie.genres.includes(genre);
//       if (hasGenre) pictures.push(movie.backdrop);
//     });
//   });
//   return pictures;
// };

// const renderPicturesByGenre = (genres) => {
//   return genres.map((genre) => {
//     return getPicturesByGenre(genre.label).map((pics, index) => (
//       <div className="col-md-4" key={`s${index}`}>
//         <img src={pics} className="img-responsive" key={index} />
//       </div>
//     ));
//   });
// };

// const getPicture2 = () => {
//   genres().map((data) => (
//     <>
//       <h3>{data.label}</h3>
//       {data.picture.map((pic, index) => (
//         <div className="col-md-4" key={`s${index}`}>
//           <img src={pic} className="img-responsive" key={index} />
//           <p className="title">{data.title}</p>
//           <p className="">{data.overview}</p>
//         </div>
//       ))}
//     </>
//   ));
// };
