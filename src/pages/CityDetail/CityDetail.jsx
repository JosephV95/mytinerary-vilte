import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./cityDetail.css";
import { useDispatch, useSelector } from "react-redux";
import citiesActions from "../../store/actions/citiesAction";
import itinerariesActions from "../../store/actions/itinerariesAction";

export default function CityDetail() {
  const { id } = useParams();
  const cityInStore = useSelector((store) => store.citiesReducer.city);
  const dispatch = useDispatch();
  const itineraryStore = useSelector(
    (store) => store.itinerariesReducer.itineraries
  );

  useEffect(() => {
    dispatch(citiesActions.get_one_city(id));
    dispatch(itinerariesActions.get_itineraries(id));
    // console.log(cityInStore._itineraries);
    // console.log(itineraryStore);

    // return ()=> dispatch(itinerariesActions.reset_ity()) //! dispatch para reiniciar valores al salir o cambiar de pagina
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="py-0 bg-info">
      <div className="container-fluid ">
        <div
          className="row justify-content-center detailCity"
          style={{ backgroundImage: `url(${cityInStore.img})`, height: "75vh" }}
        >
          <div className="col-12 col-md-6 heroDetail  text-center text-white d-flex flex-column justify-content-center ">
            <h2 className="py-4">{cityInStore.city}</h2>
            <p>{cityInStore.nation}</p>
            <p>{cityInStore.description}</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
              voluptas ipsam itaque placeat ullam fuga. Corrupti, dolorem
              pariatur modi sint veritatis vel autem hic, molestias natus sed
              eum provident repellendus!
            </p>

            <button type="button" className="btn btn-primary my-3"  onClick={()=>{}}>
              View itineraries
            </button>
          </div>
        </div>
      </div>

      <div className="container  " >
        <div className="row  gap-4 py-5">
          <h2 className="text-center text-white" id="itineraries"><i>Itineraries</i></h2>

          {itineraryStore.length > 0 ? (
            itineraryStore.map((itinerary, key) => (
              <>
                <div className="col-12  rounded-5 bg-danger " key={key}>
                  <div className="row justify-content-center">
                    <div
                      className="col-md-5  text-white d-flex flex-column justify-content-between  rounded-start-3"
                      style={{
                        backgroundImage: `url(${itinerary.img})`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        minHeight: "15rem",
                      }}
                    >
                      <div className="">
                        <h3 className="pt-2  text-center" style={{textShadow:'0 0 15px gray,0 0 15px gray,0 0 20px gray,0 0 20px black'}}>{itinerary.name}</h3>
                      </div>
                      <div>
                        <h5 className="text-end"> <i className="fa-regular fa-circle-user"></i> Username</h5>
                      </div>
                      
                    </div>
                    <div className="col-md-7 text-white py-3 px-4">
                      <p>{itinerary.desc}</p>
                      <p><b>Price: </b>  {itinerary.price ==0 ? "Free" : "💸"+itinerary.price}</p>
                      <p><b>Duration:</b> {itinerary.duration}</p>
                      <p><b>Likes:</b> ♥ {itinerary.likes}</p>
                      {/* <p><b>Comments:</b> {itinerary.comments}</p> */}
                      <p><b>Tags:</b>{itinerary.hastag.map((val)=>(<a key={val.key}> {val}</a> ))}  </p>
                      
                    </div>
                  </div>
                </div>
              </>
            ))
          ) : (
            <>
                  <div className="col-12  text-center">
                    <img src="../sorryIco.png" alt="no results" style={{width:'12rem'}} />
                    <h2 className="text-center">No itineraries yet.</h2>
                  </div>
          
            </>
          )}
        </div>
      </div>
    </section>
  );
}
