import React from "react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
function Moviedetails({ match }) {
  const [data, setserverData] = useState([]);
  const location = useLocation();
  useEffect(() => {
    Object.keys(location.datas).map((key) => {
      return location.datas[key].map((data) => {
        if (data.slug === match.params.slug) {
          setserverData(data);
        }
      });
    });
  }, []);

  return (
    data && (
      <>
        <div className="container container-mg">
          <div className="row">
            <div className="col-md-5">
              <img
                src={`https://wookie.codesubmit.io/static/posters/${data.id}.jpg`}
                className="iimg-responsive view-img"
                alt={data.title}
              />
            </div>
            <div className="col-md-7">
              <h1>{data.title}</h1>
              <p>{data.overview}</p>
              <h5>Directed By : {data.director}</h5>
              <h5>Released On : {data.released_on}</h5>
              <h5>
                {data.cast &&
                  data.cast.map((cast, index) => {
                    if (index) return `,${cast}`;
                    return cast;
                  })}
              </h5>
              <Link to="/">Back</Link>
            </div>
          </div>
        </div>
      </>
    )
  );
}
export default Moviedetails;
